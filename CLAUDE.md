# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**landing-web** is the marketing / SEO landing site for **TARDIS** — an AR furniture visualizer. Its whole job is to rank for "AR furniture visualizer"-class keywords, funnel visitors into the product app at `app.tardis-ai.com`, and capture a waitlist (→ Notion). It is **not** the product and it does **not** call the generation backend — it is a mostly-static Next.js site with exactly one server integration (the waitlist route). Live at `https://www.tardis-ai.com`.

> The working directory lives under a folder named `Vastra`; the product/brand is **TARDIS** (`Vastra` == `Tardis`, both names recur across the wider project). This is unrelated to any "Leaply" organization context that may appear in the system prompt — different company, different product.

## Where this sits in TARDIS

TARDIS is a personal pet project pivoting from a B2C "paste a furniture URL → AI 3D model → AR in your room" web app into a **B2B embeddable AR layer** for retailer product pages: a retailer drops one `<script>` on their PDP, a shopper taps a button and sees the product in their space (a generated 3D model for furniture; live in-camera AR for wall coverings). All repos live in the GitHub org **`T-ardis`** (https://github.com/T-ardis). This repo is **not** part of a monorepo — no shared package with any sibling.

Architecture principle across the project: **two hard-separated planes** — the shopper hot-path (embed + edge + CDN-cached assets: static / edge-cached / on-device) vs the client control-plane (admin + generation + Postgres/Firestore: low QPS). A shopper action must never touch Postgres or the GPU. **landing-web sits outside both planes** — it is a pure top-of-funnel marketing surface whose only backend touchpoint is writing a lead to Notion.

| Repo | Role | Relation to landing-web |
|------|------|--------------------------|
| **landing-web** (this) | Marketing / SEO landing site → funnels to the app, captures waitlist | — |
| **furniture-web** | Original Next.js B2C consumer web app (URL → 3D → AR → room preview → similar items); becoming the demo / sales site | Its design system (`globals.css` tokens, fonts, `Nav`/`Footer`/`SmoothScroll`) was **copied from here**, then rebranded — do **not** assume parity or import across repos. The app link (`app.tardis-ai.com`) points at it, with `?email=` prefilled. |
| **tardis** | Monorepo: Python/FastAPI generation backend (Hunyuan3D on Modal GPU; room preview via Fal; similar-items via TinyFish) + the native iOS **Vastra** app (Swift, ARKit/LiDAR/Metal) the premium AR App Clip is carved from | landing-web does **not** call it. |
| **tardis-embed** | Single-`<script>` embeddable 3D/AR widget for retailer PDPs (tiny loader + sandboxed Shadow-DOM viewer) | Independent; no code shared. |
| **tardis-edge** | GCP data-plane: Cloud Run "resolver" (SKU → model URLs, origin-scoped by publishable key, Firestore-backed) + "collector" (fire-and-forget AR analytics → Pub/Sub → BigQuery) | Independent. |
| **tardis-admin** | Next.js B2B control-plane dashboard: tenants, product→model catalog, credits/billing, embed config, analytics | Independent. |

## Tech Stack

- **Framework**: Next.js 16.1.6 (App Router), React 19, TypeScript strict.
- **Styling**: CSS Modules (`*.module.css`) + one global token file `src/app/globals.css`. **No Tailwind, no CSS-in-JS.**
- **Font**: `Archivo` (variable-width, `--font-archivo` / `--font-sans`) via `next/font/google` in `layout.tsx`. Single family across the whole site.
- **Animation**: **Lenis smooth scroll only.** GSAP + ScrollTrigger are deps purely to sync Lenis's RAF loop into the GSAP ticker — no component uses GSAP scroll animations; all other motion is pure CSS.
- **Server deps**: `@notionhq/client` (waitlist route only).
- **HTTP**: native `fetch`. No axios.
- **Tests**: Jest + ts-jest, `testEnvironment: 'node'` (`jest.config.ts`). No React Testing Library — the one suite asserts metadata/SEO output, not rendering.
- **Content**: blog is a hand-written TS array — **no MDX, no Notion, no CMS**.

## Architecture & key flows

**App Router, mostly Server Components.** `src/app/page.tsx` composes the home page in order: `Nav → Hero → LogoStrip → HowItWorks → Demo → Why → Faq → FromBlog → Cta → Footer`. Only **three** components are `'use client'` — `src/components/Nav/Nav.tsx`, `src/components/Cta/Cta.tsx`, `src/components/SmoothScroll/SmoothScroll.tsx` (mounted once in `layout.tsx`). Keep interactivity confined to those to avoid client-bundle bloat.

Routes:
- `/` — home (`src/app/page.tsx`).
- `/about` (`src/app/about/page.tsx`), `/contact` (`src/app/contact/page.tsx`).
- `/privacy` + `/terms` — both render through the shared `src/components/Legal/Legal.tsx` wrapper (title + "Last updated" + body).
- `/blog` (index, `src/app/blog/page.tsx`) + `/blog/[slug]` (`src/app/blog/[slug]/page.tsx`, statically generated).

**Blog = a TS array, rendered through a tiny regex converter.** All posts live in `src/lib/blog.ts` as `posts: BlogPost[]` (`slug`, `title`, `description`, `date`, `readTime`, `tags`, Markdown `content` template-literal, optional `keyword`, optional `faqs[]`). Currently **11 posts**. Add one by appending an object — `getAllPosts()` / `getPostBySlug()` + `generateStaticParams` wire the rest. `src/app/blog/[slug]/page.tsx` has an in-file `md()` regex converter injected via `dangerouslySetInnerHTML` that supports **only** h2/h3, bold, italic, ul, ol, links, and paragraphs — **no images, tables, code blocks, or nested lists**. Authored content must stay inside that subset. `FromBlog` and the blog index both read `getAllPosts()` (FromBlog shows `.slice(0, 3)`).

**Waitlist → Notion (the one server integration).** `src/app/api/waitlist/route.ts` validates the email regex-side and creates a page in a Notion DB via `@notionhq/client` (`NOTION_API_KEY`, `NOTION_DATABASE_ID`). `inferSource()` maps a referrer hostname → `utm_source`/`utm_medium` (google/bing/yahoo → organic; t.co/twitter/instagram/linkedin/facebook → social), falling back to `direct`/`unknown`. Notion property names are **hard-coded** (`Email` title, `Signed Up` date, `utm_source|utm_medium|utm_campaign|utm_term|utm_content` + `Referrer` rich_text) and must exist with matching types in the target DB or the write fails. Client side: `src/components/Cta/Cta.tsx` reads UTMs from `window.location.search` + `document.referrer`, POSTs, then on success redirects to `${APP_URL}?email=<encoded>` after a 2s delay (this is the only cross-app contract, consumed by furniture-web's auto-auth).

**SEO is the heavily-invested surface, largely code-generated:**
- `src/app/layout.tsx` — all site-wide metadata: keyword-led `title.default` + `%s | TARDIS` template, ~34 `keywords`, OG/Twitter, `robots`, `alternates.canonical`, `metadataBase`. `SITE_URL` is a module const here **but not exported/shared**.
- `src/app/robots.ts` + `src/app/sitemap.ts` — metadata route handlers. Sitemap enumerates static routes + every post (priority **0.8** if the post has a `keyword`, else **0.7**; home = 1, `/blog` = 0.9, `/about` = 0.6). `sitemap.ts` uses `new Date()` for static-route `lastModified` and `new Date(p.date)` for posts.
- **OG images render at the edge** via `next/og` (`export const runtime = 'edge'`): `src/app/opengraph-image.tsx` (site-wide, `#0B0A08` gold-grid card) + `src/app/blog/[slug]/opengraph-image.tsx` (per-post, reads `blog.ts`). Both are kept out of the index — `robots.ts` disallows them **and** `next.config.ts` sets `X-Robots-Tag: noindex` headers on `/opengraph-image` + `/blog/:slug/opengraph-image`.
- **JSON-LD** is inlined via `dangerouslySetInnerHTML`: `page.tsx` emits a `@graph` (WebSite / SoftwareApplication / Organization / **FAQPage built from `FAQS` exported by `Faq.tsx`**); each blog post emits BlogPosting + BreadcrumbList + optional FAQPage; `/about` emits AboutPage.

`next.config.ts` also sets site-wide security headers (`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy` denying camera/mic/geo), `compress: true`, `poweredByHeader: false`, and `optimizePackageImports: ['gsap']`.

## Commands

```bash
npm run dev      # dev server on localhost:3000
npm run build    # production build — statically generates all blog pages + OG routes
npm start        # serve the production build
npm run lint     # eslint (flat config via eslint-config-next)
npm test         # full Jest suite (currently src/app/__tests__/seo.test.ts)

npx jest src/app/__tests__/seo.test.ts   # single test file
npx jest -t "keyword-led title"          # single test by name pattern
```

Env vars live in git-ignored `.env.local` (there is **no** `.env.example`). Server-only: `NOTION_API_KEY`, `NOTION_DATABASE_ID` (waitlist route). Client: `NEXT_PUBLIC_APP_URL` (the app link; falls back to `https://app.tardis-ai.com/`).

Jest mocks (`jest.config.ts` `moduleNameMapper`): `@/*` → `src/*`, `next/font/google` → `src/__mocks__/next-font-google.ts`, and `*.css` → `src/__mocks__/style-mock.ts`. If you import a new `next/font/google` family, add it to the font mock or the suite fails to load.

## Conventions & patterns

- **Design tokens** live in `src/app/globals.css` `:root` — warm near-black + champagne gold, Archivo throughout: `--black #0B0A08`, `--card #161310`, `--white #F3EEE5`, `--grey #ABA294`, `--gold #D2B07E`, plus `--gutter` / `--max-w 1200px` / `--section-py`. Consume these vars; do not hard-code hex.
- **Section shell**: `<section>` → `<div class="wrap">` → content; eyebrows use the global `.eyebrow` class (uppercase, letter-spaced, gold).
- Server Components by default; add `'use client'` only when you genuinely need browser APIs/state (see the 3 existing client components).
- One CSS Module per component, colocated (`Component/Component.module.css`). Global classes (`.wrap`, `.eyebrow`, `.lead`, `.au`) live in `globals.css`.
- The app link is read as `const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://app.tardis-ai.com/'` — this exact line is duplicated across **7 files** (`Nav`, `Cta`, `Hero`, `Demo`, `HowItWorks`, `Footer`, `about/page.tsx`). There is no shared constant.

## Gotchas & footguns

- **`src/app/__tests__/seo.test.ts` asserts exact strings** — the metadata title/description, individual keyword membership (and `keywords.length >= 20`), robots rules, sitemap URLs/priorities, and that there are `>= 6` blog posts with `>= 1` keyword-targeted (0.8) post. Any SEO copy change or route reshuffle breaks it; update the test in the **same** commit.
- **`FAQS` is exported from `src/components/Faq/Faq.tsx`** and feeds *both* the visible FAQ accordion *and* the home-page FAQPage JSON-LD — editing one edits the other; keep the visible copy and schema honest.
- **No single URL constant.** `https://www.tardis-ai.com` is hard-coded ~51 times across 11 files (`layout.tsx`, `sitemap.ts`, `robots.ts`, `page.tsx` JSON-LD, every marketing/blog page's canonical + OG + JSON-LD, and the test). The app URL adds the `NEXT_PUBLIC_APP_URL` fallback across 7 more files. A domain change means editing many files (or setting the env var for the app URL only).
- **`globals.css` carries a large "legacy alias" block** (`--paper`, `--terracotta`, `--sage`, `--bg-void`, `--font-display`, `--text-*`, …) mapping furniture-web-era names onto the current gold-on-warm-black palette. Older modules still reference them — audit usages before deleting any alias.
- **The blog `md()` converter is deliberately minimal.** Content using `#` h1, `>` blockquotes, images, tables, fenced code, or nested/indented lists will render as raw text or malformed HTML. It is regex-based and injected via `dangerouslySetInnerHTML` — treat `content` as trusted authored input only.
- **OG routes run on the edge runtime** (`runtime = 'edge'`) and are intentionally `noindex` in two places (robots + response header). If you add an OG variant, mirror both the robots disallow and the `next.config.ts` header, or it leaks into the index.
- **`README.md` is untouched create-next-app boilerplate** (mentions Geist, `create-next-app`). It does **not** reflect the real stack — ignore it; this file is the source of truth.
- Root-level `*.png` / `*.jpeg` files (`hero-*.png`, `v2-*.png`, `v3-*.png`, `prod-live.jpeg`, …) are design/reference screenshots, not build inputs. Public assets served by the site live under `public/`.

## Do NOT

- Do **not** use Tailwind or CSS-in-JS — CSS Modules + `globals.css` custom properties only.
- Do **not** add axios or a Markdown/MDX library — native `fetch`; the blog stays a TS array with the in-file `md()` converter.
- Do **not** call the tardis generation backend from here — landing-web's only backend contract is the Notion waitlist.
- Do **not** assume design-system parity with `../furniture-web` or import across repos — they are separate, and furniture-web has since rebranded.
- Do **not** change SEO copy, keywords, routes, or `FAQS` without updating `src/app/__tests__/seo.test.ts` in the same commit.
- Do **not** rename Notion property names in the waitlist route without matching the target Notion DB schema.
- Do **not** add GSAP scroll animations expecting existing infra — GSAP is wired only for the Lenis↔ScrollTrigger ticker sync.
- Do **not** trust or edit `README.md` as documentation.
- Do **not** add comments/docstrings to code you didn't change; keep it simple; do not create README.md unless asked.
