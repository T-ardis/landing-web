# landing-web B2B Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rework `landing-web` into a focused B2B embeddable-AR site — proof-led full home redesign, designed on-brand CSS device/browser mockups, a B2B blog, and B2B-retargeted SEO.

**Architecture:** Next.js 16 App Router, mostly Server Components. New/refactored section components under `src/components/*` (one folder + colocated CSS Module each), assembled by `src/app/page.tsx`. Mockups are pure-CSS device/browser frames (no image assets). Blog stays a hand-written TS array (`src/lib/blog.ts`). SEO lives in `layout.tsx` + `page.tsx` JSON-LD + `sitemap.ts`/`robots.ts`, pinned by `src/app/__tests__/seo.test.ts` — which is updated in the same commit as any string/keyword/route/post change.

**Tech Stack:** Next.js 16.1.6, React 19, TypeScript strict, CSS Modules + `globals.css` tokens, Archivo font, Jest (node env, SEO assertions only), Lenis smooth scroll. **No Tailwind, no CSS-in-JS, no MDX, no new deps.**

## Global Constraints

- Brand tokens only (no rebrand): `--black #0B0A08`, `--card #161310`, `--white #F3EEE5`, `--grey #ABA294`, `--gold #D2B07E`; Archivo; consume vars, never hard-code hex.
- Server Components by default; only `Nav`, `Cta`, `SmoothScroll` may be `'use client'` — add a new client component only if a browser API is genuinely required, and justify it.
- `FAQS` is exported from `Faq.tsx` and feeds BOTH the visible accordion AND the home FAQPage JSON-LD — edit once, keep honest.
- `seo.test.ts` asserts exact title/description, individual keyword membership, `keywords.length >= 20`, `>= 6` posts with `>= 1` keyword-targeted (0.8), and sitemap URLs/priorities. It MUST be updated in the SAME commit as any change it covers.
- Proof stats are attributed to industry sources (Wayfair/IKEA/Shopify/Snap) — NEVER presented as TARDIS's own metrics. Surface AR is labeled "preview-grade" on web. No Stripe/Mattercraft/App-Clip "shipped" claims beyond `B2B_DIRECTION` honesty.
- Respect `prefers-reduced-motion` for any new motion. No layout shift (reserve mockup dimensions).
- The blog `md()` converter supports only h2/h3, bold, italic, ul, ol, links, paragraphs — **no inline images** in post `content`.
- `https://www.tardis-ai.com` is hard-coded ~51× and `NEXT_PUBLIC_APP_URL` ~7× — do not introduce a URL-constant refactor beyond what a task needs.
- Every task ends: `npm run lint` (0 errors) + `npm run build` green; SEO/blog tasks also `npm test` green. Small commits with trailer `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`.

---

## File structure

- `src/app/layout.tsx` — MODIFY: B2B title/description/keywords, metadataBase unchanged.
- `src/app/page.tsx` — MODIFY: new section order + B2B JSON-LD `@graph`.
- `src/lib/blog.ts` — MODIFY: prune consumer posts, reposition 2 evergreen, add 6 B2B posts.
- `src/app/__tests__/seo.test.ts` — MODIFY: B2B assertions, post-count/keyword updates.
- `src/app/globals.css` — MODIFY: add utility classes/tokens for proof band + frames (no alias deletion).
- `src/components/Hero/*` — MODIFY: outcome headline + hero mockup slot.
- `src/components/ProofBand/*` — CREATE: stat band (+94% / −40% / +28%) + source footnote.
- `src/components/Problem/*` — CREATE: photos-lie → returns/lost-conversion.
- `src/components/HowItWorks/*` — MODIFY: sharpen 3-step copy + mockup imagery.
- `src/components/Modes/*` — CREATE: object + surface tiers (honest preview-grade note).
- `src/components/Why/*` — MODIFY: vs-incumbents (Roomvo/Cylindo/Threekit) differentiation.
- `src/components/Showcase/*` — CREATE: hosts the 3 mockups.
- `src/components/ForYourStack/*` — CREATE: Shopify/Magento/custom + canonical `<script>` snippet.
- `src/components/mockups/{MockupPDP,MockupAR,MockupAdmin}/*` — CREATE: pure-CSS frames.
- `src/components/Faq/Faq.tsx` — MODIFY: B2B `FAQS` (drives JSON-LD).
- `src/components/Demo/*` — REMOVE (role replaced by Showcase); update `page.tsx` import.
- `src/app/opengraph-image.tsx` — MODIFY: B2B OG card.
- `public/screens/app-*.png` — DELETE once unreferenced.

---

## Task 1: Retarget site SEO metadata + keywords (TDD via seo.test.ts)

**Files:** Modify `src/app/__tests__/seo.test.ts`, `src/app/layout.tsx`.
**Interfaces:** Produces the B2B `metadata` object other tasks assume (title default, description, keywords[]).

- [ ] **Step 1:** In `seo.test.ts`, rewrite the metadata assertions to the B2B strings: `title.default` contains "Embeddable AR" and "product pages"; `description` mentions "one script"/"AR"/"returns"; assert membership of new B2B keywords (`'embeddable AR'`, `'AR for product pages'`, `'3D product visualization'`, `'AR ecommerce widget'`, `'Roomvo alternative'`) and keep `keywords.length >= 20`.
- [ ] **Step 2:** Run `npx jest src/app/__tests__/seo.test.ts` → Expected: FAIL (old strings/keywords).
- [ ] **Step 3:** Edit `layout.tsx`: new `title.default`, `description`, and ~34-item `keywords` array retargeted to B2B (retain `>= 20`).
- [ ] **Step 4:** Run `npx jest src/app/__tests__/seo.test.ts` → PASS. Then `npm run build` → green.
- [ ] **Step 5:** Commit `feat(seo): retarget site metadata + keywords to B2B`.

## Task 2: Rework the blog to B2B (TDD via seo.test.ts)

**Files:** Modify `src/lib/blog.ts`, `src/app/__tests__/seo.test.ts`.
**Interfaces:** Produces `posts: BlogPost[]` (existing shape: slug/title/description/date/readTime/tags/content/keyword/faqs). `FromBlog`, `/blog`, sitemap, `generateStaticParams` consume it unchanged.

- [ ] **Step 1:** Update `seo.test.ts` blog assertions: still `>= 6` posts with `>= 1` keyword-targeted; assert the 6 new B2B slugs exist and at least the sitemap includes them at priority 0.8; drop asserts on removed consumer slugs.
- [ ] **Step 2:** Run jest → FAIL.
- [ ] **Step 3:** In `blog.ts`: remove the 7 pure-consumer posts; reposition the 2 kept evergreen (`ar-vs-photos-*`, `virtual-furniture-try-before-you-buy-guide`) — retitle/reframe intros toward retailers + returns economics, keep slugs (preserve any inbound links) or add redirects note. Append 6 B2B posts (each: `keyword`, 2–3 `faqs`, markdown body with attributed proof stats), slugs: `ar-reduces-furniture-returns`, `roi-of-ar-on-product-pages`, `add-view-in-your-room-to-shopify-pdp`, `roomvo-alternative-object-and-surface-ar`, `object-vs-surface-ar-explained`, `generate-3d-models-from-a-photo`.
- [ ] **Step 4:** Run jest → PASS; `npm run build` (static-generates all posts) → green.
- [ ] **Step 5:** Commit `feat(blog): rework to B2B (keep 2 evergreen + add 6)`.

## Task 3: Design-system additions (globals.css)

**Files:** Modify `src/app/globals.css`.
**Interfaces:** Produces utility classes the sections/mockups consume: `.statfig`/`.statlabel`, `.frame`/`.frame-browser`/`.frame-phase`, `.chrome-dots`, `.reduce-motion`-safe transitions.

- [ ] **Step 1:** Add scoped utility classes + any new spacing tokens for the proof band and device frames using existing color vars; wrap all new keyframe motion in `@media (prefers-reduced-motion: no-preference)`.
- [ ] **Step 2:** `npm run build` + `npm run lint` → green (no visual regression to existing pages).
- [ ] **Step 3:** Commit `feat(styles): add proof-band + device-frame utilities`.

## Task 4: Mockup components (pure CSS)

**Files:** Create `src/components/mockups/MockupPDP/*`, `MockupAR/*`, `MockupAdmin/*` (component + module.css each).
**Interfaces:** Produces `<MockupPDP/>`, `<MockupAR/>`, `<MockupAdmin/>` (Server Components, no props required; optional `variant` for MockupAR object|surface). Consumed by Hero, HowItWorks, Showcase.

- [ ] **Step 1:** Build `MockupPDP` — browser-chrome frame (dots + URL bar `haven-home.example`) containing a product page with the on-brand "View in your room" button in a buy box.
- [ ] **Step 2:** Build `MockupAR` — phone frame with the popup / 3D-viewer open (object variant = sofa card + AR CTA; surface variant = pattern-on-wall). Content modeled on the real HAVEN demo; honest.
- [ ] **Step 3:** Build `MockupAdmin` — dashboard frame: product→model catalog rows + one analytics tile + the one-line install `<script>` snippet.
- [ ] **Step 4:** Temporarily render all three on a scratch route or the home to eyeball; `npm run build` + `npm run lint` green.
- [ ] **Step 5:** Commit `feat(mockups): on-brand CSS device/browser frames`.

## Task 5: Hero redesign

**Files:** Modify `src/components/Hero/Hero.tsx` + `Hero.module.css`.
**Interfaces:** Consumes `<MockupAR/>` (or `MockupPDP`). Produces the redesigned hero.

- [ ] **Step 1:** Replace copy with the approved outcome headline ("Shoppers buy what they can see in their room.") + sub + CTAs (Book a demo / See it live — the latter resolves per spec §5 to the real demo or collapses to Book a demo); swap the consumer `<Image>` for `<MockupAR/>`. Remove `/screens/app-*` refs here.
- [ ] **Step 2:** `npm run build` + `npm run lint` green.
- [ ] **Step 3:** Commit `feat(hero): outcome-led B2B hero + mockup`.

## Task 6: ProofBand + Problem sections

**Files:** Create `src/components/ProofBand/*`, `src/components/Problem/*`.
**Interfaces:** Produces `<ProofBand/>`, `<Problem/>`. Consumed by `page.tsx`.

- [ ] **Step 1:** `ProofBand`: `+94% conversion · −40% returns · +28% AOV` stat figures + a "figures from published industry studies (Shopify, Wayfair, IKEA, Snap)" footnote.
- [ ] **Step 2:** `Problem`: "product photos lie → returns + lost conversion, and the retailer pays for both" narrative.
- [ ] **Step 3:** `npm run build` + `npm run lint` green.
- [ ] **Step 4:** Commit `feat(sections): proof band + problem`.

## Task 7: HowItWorks + Modes

**Files:** Modify `src/components/HowItWorks/*`; create `src/components/Modes/*`.
**Interfaces:** `HowItWorks` consumes `MockupPDP`/`MockupAR`; produces `<HowItWorks/>`, `<Modes/>`.

- [ ] **Step 1:** Sharpen HowItWorks 3-step copy (drop one script → point at your catalog → shoppers view in their room) + swap consumer screens for mockups.
- [ ] **Step 2:** Build `Modes` — object (furniture) + surface (wall/floor) as capability/pricing tiers, with the honest "preview-grade on web, native via App Clip" note.
- [ ] **Step 3:** `npm run build` + `npm run lint` green.
- [ ] **Step 4:** Commit `feat(sections): how-it-works + modes`.

## Task 8: Why (vs incumbents) + Showcase + ForYourStack

**Files:** Modify `src/components/Why/*`; create `src/components/Showcase/*`, `src/components/ForYourStack/*`.
**Interfaces:** `Showcase` consumes the 3 mockups. Produces `<Why/>`, `<Showcase/>`, `<ForYourStack/>`.

- [ ] **Step 1:** `Why`: differentiation vs Roomvo (surfaces only) / Cylindo / Threekit (manual per-SKU 3D) — auto-generated assets from a photo, object+surface in one script, no app.
- [ ] **Step 2:** `Showcase`: section presenting `MockupPDP` + `MockupAR` + `MockupAdmin` with captions.
- [ ] **Step 3:** `ForYourStack`: Shopify/Magento/custom + the canonical embed `<script>` snippet (from design §4 / the real embed contract).
- [ ] **Step 4:** `npm run build` + `npm run lint` green.
- [ ] **Step 5:** Commit `feat(sections): why-vs-incumbents + showcase + for-your-stack`.

## Task 9: B2B FAQ + JSON-LD (TDD-touching)

**Files:** Modify `src/components/Faq/Faq.tsx`, `src/app/page.tsx` (JSON-LD `@graph`), `src/app/__tests__/seo.test.ts` if it asserts FAQ/JSON-LD.
**Interfaces:** Produces the B2B `FAQS` export (drives accordion + FAQPage schema).

- [ ] **Step 1:** If seo.test asserts FAQ/SoftwareApplication strings, update those assertions to B2B first → jest FAIL.
- [ ] **Step 2:** Rewrite `FAQS` to retailer questions (pricing tiers, install effort, which platforms, asset generation, surface fidelity, data/privacy); update `page.tsx` `SoftwareApplication` description to the B2B embed.
- [ ] **Step 3:** `npx jest` → PASS; `npm run build` green.
- [ ] **Step 4:** Commit `feat(faq): B2B FAQ + JSON-LD`.

## Task 10: Assemble home + OG + cleanup

**Files:** Modify `src/app/page.tsx`, `src/app/opengraph-image.tsx`; delete `src/components/Demo/*` and unreferenced `public/screens/app-*.png`.
**Interfaces:** Final home composition per spec §5 order.

- [ ] **Step 1:** Update `page.tsx` section order: `Nav → Hero → ProofBand → Problem → HowItWorks → Modes → Why → Showcase → ForYourStack → Faq → FromBlog → Cta → Footer`; remove `Demo` import.
- [ ] **Step 2:** Update `opengraph-image.tsx` to a B2B card; `grep -r "/screens/app-" src` → ensure 0 refs, then `git rm` the unused PNGs and delete `Demo/`.
- [ ] **Step 3:** `npm run build` + `npm run lint` + `npx jest` all green.
- [ ] **Step 4:** Commit `feat(home): assemble B2B home + B2B OG + remove consumer demo/screens`.

## Task 11: Visual review + verification pass

**Files:** none (verification only).

- [ ] **Step 1:** `npm run build && npm start` (or dev); capture screenshots of `/`, `/blog`, one post, and mobile (375px) home via the browser-capture path.
- [ ] **Step 2:** Review: proof band legible + attributed; mockups render crisply with no layout shift; sections read as retailer-facing; reduced-motion respected; no consumer copy/images remain (`grep -ri "scan your room\|interior design\|/screens/app-" src` → only intended blog evergreen).
- [ ] **Step 3:** Fix any issues found (small commits), re-run build/lint/jest.
- [ ] **Step 4:** Final commit if needed; branch ready for review → land to `main` + deploy decision (user).

---

## Self-review (against spec)

- Spec §5 home architecture → Tasks 5–10 (every section has a task). ✓
- Spec §6 mockups → Task 4 (+ consumed in 5/7/8). ✓
- Spec §7 blog → Task 2. ✓
- Spec §8 SEO → Tasks 1, 2, 9 (+ seo.test updated in lockstep each). ✓
- Spec §4 design language / §9 constraints → Global Constraints + Task 3. ✓
- Spec §10 verification → Task 11. ✓
- Spec §11 deploy → Task 11 Step 4 (user decides). ✓
- No placeholders: copy direction + exact slugs/keywords/section order given; component code is authored at implementation time and verified by build/lint/visual (this repo has no component unit tests). Type consistency: mockup component names (`MockupPDP/MockupAR/MockupAdmin`), `FAQS` export, `BlogPost` shape are used consistently across tasks.
