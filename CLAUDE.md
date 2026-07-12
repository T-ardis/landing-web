# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Marketing / SEO landing site for **TARDIS** — an AR furniture visualizer (paste a product link → get a true-scale 3D model → view it in your room via AR Quick Look / Scene Viewer). Live at `https://www.tardis-ai.com`. Its job is to rank for "AR furniture visualizer"-class keywords, funnel visitors into the product app at `app.tardis-ai.com`, and capture a waitlist. It is **not** the product itself.

> The working directory sits under a folder named `Vastra`; the product/brand is **TARDIS** (`Vastra` == `Tardis` — both names appear across the wider project). This has nothing to do with the "Leaply" organization context that may appear in the system prompt — different company, different product.

**Sibling repos** (separate apps, same brand, *not* a monorepo — no shared package):
- `../furniture-web` — the interactive product web app (URL → 3D → AR → room preview → similar items). Its design system (`globals.css` tokens, fonts, `Nav`/`Footer`/`SmoothScroll`) was **copied from this repo** — landing-web is the source of truth for the visual system. Keep tokens/typography in sync manually if you change them here.
- `../tardis/backend` — Python/FastAPI backend for the iOS app + furniture-web (Modal/Hunyuan3D-2, Fal.ai, etc.). **landing-web does not call it.** The only cross-app contract this repo has is the waitlist (→ Notion) and a link to the app with the email prefilled.

## Commands

```bash
npm run dev      # dev server on localhost:3000
npm run build    # production build — statically generates all blog pages
npm start        # serve the production build
npm run lint     # eslint (flat config via eslint-config-next)
npm test         # full Jest suite (currently the SEO test)

npx jest src/app/__tests__/seo.test.ts   # single test file
npx jest -t "keyword-led title"          # single test by name pattern
```

Stack: Next.js 16 (App Router) + React 19, TypeScript (strict). **CSS Modules** (`*.module.css`) + one global token file `src/app/globals.css`. No Tailwind, no CSS-in-JS, no Markdown/MDX library. Tests: Jest + ts-jest (node env). Env vars live in git-ignored `.env.local` (no `.env.example`).

## Architecture

**App Router, mostly Server Components.** `src/app/page.tsx` composes sections in order: `Nav → Hero → LogoStrip → HowItWorks → Demo → Why → Faq → FromBlog → Cta → Footer`. Only `Nav`, `Cta`, and `SmoothScroll` are `'use client'` — keep interactivity confined to those to avoid client-bundle bloat. Marketing routes: `/about`, `/contact`, and `/privacy` + `/terms` (both rendered through the shared `Legal` component).

**Blog is a hand-written TS array — not MDX, not Notion.** All posts live in `src/lib/blog.ts` as `posts: BlogPost[]` (`slug`, `title`, `description`, `date`, `readTime`, `tags`, optional `keyword`, optional `faqs[]`, and a Markdown `content` template-literal). Add a post by appending an object — nothing else wires it up (`getAllPosts()`/`getPostBySlug()` + `generateStaticParams` handle the rest). `src/app/blog/[slug]/page.tsx` renders content with a small in-file regex `md()` converter injected via `dangerouslySetInnerHTML`. It supports **only** h2/h3, bold, italic, ul, ol, links, and paragraphs — no images, tables, code blocks, or nested lists. Authored content must stay within that subset.

**Waitlist → Notion (the one server integration).** `src/app/api/waitlist/route.ts` validates the email and writes a row to a Notion DB via `@notionhq/client` (`NOTION_API_KEY`, `NOTION_DATABASE_ID`). `inferSource()` maps a referrer hostname to `utm_source`/`utm_medium`, falling back to `direct`/`unknown`. Notion property names (`Email` title, `Signed Up` date, `utm_*` + `Referrer` rich_text) are **hard-coded** and must exist with matching types in the target DB or writes fail. Client side: `src/components/Cta/Cta.tsx` reads UTMs from `window.location.search` + `document.referrer`, POSTs, then redirects to the app with the email prefilled.

**Animation = Lenis smooth scroll only.** `src/components/SmoothScroll/SmoothScroll.tsx` dynamically imports `lenis` + `gsap` + `gsap/ScrollTrigger` and syncs Lenis's RAF loop into the GSAP ticker. GSAP is a dependency (and `optimizePackageImports` targets it) purely for this ScrollTrigger sync — **no component uses GSAP scroll animations**; all other motion is pure CSS.

**SEO is the heavily-invested surface** and is largely code-generated:
- `layout.tsx` holds all site-wide metadata (keyword-led title + `%s | TARDIS` template, 30+ keywords, OG/Twitter, robots, canonical, `metadataBase`) and the Archivo variable font.
- `robots.ts` + `sitemap.ts` are generated; the sitemap enumerates static routes + every blog post (priority 0.8 with a `keyword`, else 0.7).
- OG images render at the **edge** via `next/og` (`opengraph-image.tsx` site-wide + a per-post variant reading from `blog.ts`); these routes are deliberately kept out of the index (robots disallow + `X-Robots-Tag: noindex` in `next.config.ts`).
- **JSON-LD** is inlined via `dangerouslySetInnerHTML`: home page emits a `@graph` (WebSite / SoftwareApplication / Organization / FAQPage built from `FAQS` exported by `Faq.tsx`); each blog post emits BlogPosting + BreadcrumbList + optional FAQPage.

## Gotchas

- **`src/app/__tests__/seo.test.ts` asserts exact strings** — metadata titles/descriptions/keyword membership, robots rules, sitemap priorities. Any SEO copy change breaks it; update the test in the same commit.
- **`FAQS` (exported from `Faq/Faq.tsx`)** feeds both the visible FAQ and the home-page FAQPage schema — keep them in sync.
- **No single URL constant.** `https://www.tardis-ai.com` is hard-coded across `layout.tsx`, `sitemap.ts`, `robots.ts`, JSON-LD, and per-post canonicals; the app URL uses `NEXT_PUBLIC_APP_URL` with a hard-coded `https://app.tardis-ai.com/` fallback repeated across ~12 files. Changing either domain means editing many files (or setting the env var).
- **`globals.css` carries "legacy alias" tokens** (`--paper`, `--terracotta`, `--sage`, …) mapping old names onto the current champagne-gold-on-warm-black palette. Older component modules still reference them — audit usages before deleting.
- **`README.md` is untouched create-next-app boilerplate** (mentions Geist). It does not reflect the real stack; ignore it.
