# landing-web — B2B redesign (home + blog + designed mockups)

*Date: 2026-07-13 · Repo: `landing-web` · Branch: `feat/landing-b2b-redesign` · Status: approved, pre-plan*

## 1. Goal & scope

Turn `landing-web` from a residual **B2C** marketing site into a focused **B2B embeddable-AR** sales/SEO site for TARDIS. In scope:

1. **Full home-page redesign** — new section architecture, proof-led copy, restructured flow (not just a copy refresh).
2. **Designed product mockups** — polished, on-brand device/browser frames (not raw screenshots) showing the widget on a retailer PDP, the AR popup, and an admin glimpse.
3. **Blog** — keep 2–3 evergreen posts (repositioned to a retailer angle) + add ~6 new B2B posts.
4. **SEO** — shift keywords/titles/JSON-LD to B2B intent; update `seo.test.ts` in the same commits.

**Out of scope (non-goals):** no color/type rebrand (keep Archivo + warm-black + champagne-gold); no backend/product changes; no real product-screenshot capture (designed mockups chosen); no changes to the Notion waitlist contract or the `?email=` app hand-off; no new deps (no Tailwind/MDX/image pipeline).

## 2. Positioning (source of truth)

From `../furniture-web/B2B_DIRECTION.md`: a retailer drops one `<script>` on their PDP → a "View in your room" button → a popup shows the product in the shopper's space — **object** AR (furniture: generated 3D model + place-in-room) and **surface** AR (wall coverings: live in-camera retexture). The wedge vs. incumbents (Roomvo/Cylindo/Threekit): **we auto-generate the 3D/surface asset from a photo** (they do it by hand, per-SKU), and cover **both** object *and* surface in **one** embed. Two modes = capability + pricing tiers. Honest limits: web surface AR is "preview-grade," native-grade is the App Clip premium tier.

## 3. Proof points (cite as footnotes; keep honest — these are industry figures, not TARDIS's own metrics)

- **+94%** avg conversion for products with 3D/AR (Shopify, widely cited).
- **Wayfair "View in Room": +92% conversion, +28% AOV, −43% returns.**
- **IKEA Place: +189% conversion, −20% returns, 98% size accuracy.**
- **80%** of AR shoppers feel more confident; **66%** less likely to return (Snap/Publicis 2025, n=4,028).
- Up to **−40%** returns with AR/3D; AR-commerce market **$6.62B (2024) → $139B (2034)**.

Copy must attribute these to the industry/named brands (Wayfair/IKEA/Shopify/Snap), never imply they are TARDIS's own results. A small "figures from published industry studies" footnote sits under the proof band.

## 4. Design language

Keep the current identity: **Archivo**, `--black #0B0A08`, `--card #161310`, `--white #F3EEE5`, `--grey #ABA294`, `--gold #D2B07E`; CSS Modules + `globals.css` tokens; Server Components by default; Lenis smooth scroll; no Tailwind/CSS-in-JS. Elevate with: a proof/stat band, device-framed mockups, a vs-incumbents comparison, and restrained CSS motion (respect `prefers-reduced-motion`).

## 5. Home architecture (`src/app/page.tsx` order)

`Nav → Hero → ProofBand → Problem → HowItWorks → Modes → Why(vs incumbents) → ShowcaseMockups → ForYourStack → Faq → FromBlog → Cta → Footer`

Per-section intent + copy direction:

1. **Hero** — outcome headline + device mockup. *Eyebrow:* "Embeddable AR for product pages". *H1:* **"Shoppers buy what they can see in their room."** *Sub:* one script adds true-to-scale AR — furniture and wall/floor surfaces — to every product page; we auto-generate the 3D model from a photo; no app, no SDK, no per-SKU 3D bill. *CTAs:* Book a demo · See it live.
2. **ProofBand** — `+94% conversion · −40% returns · +28% AOV` with source footnote.
3. **Problem** — product photos lie → returns + lost conversion; the retailer pays for both.
4. **HowItWorks** — 3 steps: drop one script → point at your catalog → shoppers view in their room (reuse component, sharpen copy; new mockup imagery).
5. **Modes** — object AR (furniture) + surface AR (wall/floor), presented as capability/pricing tiers, with the honest "preview-grade on web / native on App Clip" note.
6. **Why / vs. incumbents** — auto-generated assets from a photo; both object + surface in one script; no app; positioned against Roomvo (surfaces only) / Cylindo / Threekit (manual per-SKU 3D).
7. **ShowcaseMockups** — the designed mockups (see §6).
8. **ForYourStack** — Shopify / Magento / custom: one `<script>`, canonical embed snippet shown.
9. **Faq** (B2B questions — feeds visible accordion **and** FAQPage JSON-LD via exported `FAQS`).
10. **FromBlog** — latest 3 posts.
11. **Cta** — "Book a demo" + waitlist form (unchanged Notion + `?email=` hand-off).

New components live one-per-folder with a colocated CSS Module, matching existing conventions. Existing `HowItWorks`/`Why` are refactored in place (copy + mockup imagery). The existing `Demo` component (live-demo iframe) is **retired**: its role is replaced by the designed `ShowcaseMockups`, and the "See it live" CTA links to the real demo (`furniture-web /demo` if it is truthfully live, otherwise it collapses to a single "Book a demo" CTA — decided at build time, defaulting to "Book a demo" to avoid pointing at a dead/unconfigured demo).

## 6. Designed mockups (§5.7 + Hero)

Built as **in-page CSS/HTML device + browser frames** (responsive, on-brand, subtle motion; no image files, so they stay sharp and themeable). Three mockups, content modeled on the real HAVEN demo so they're honest:

- **A — Retailer PDP + widget:** a browser-chrome frame showing a product page with the on-brand "View in your room" button in the buy box.
- **B — AR popup:** a phone frame showing the popup / 3D viewer open over the PDP (object mode), with a surface-mode variant (pattern on a wall).
- **C — Admin glimpse:** a dashboard frame showing the product→model catalog + an analytics tile + the one-line install snippet.

Each is a self-contained component (`Mockup*/`) with no external assets. The old `public/screens/app-*.png` consumer images are removed from use (kept in `public/` only if still referenced elsewhere; otherwise deleted). OG image (`opengraph-image.tsx`) updated to a B2B card.

## 7. Blog changes (`src/lib/blog.ts`)

Constraint: the blog `md()` converter supports only h2/h3, bold, italic, ul, ol, links, paragraphs — **no inline images**; posts stay text. `FromBlog` + index read `getAllPosts()`; sitemap prioritizes `keyword` posts at 0.8.

- **Keep (2–3), repositioned to a retailer angle:** `ar-vs-photos-why-seeing-furniture-in-your-room-changes-everything` and `virtual-furniture-try-before-you-buy-guide` (retitle/reframe intros toward retailers + returns economics). Remove the rest of the pure-consumer posts (room scanning, AI interior design apps, small-space, color psychology, best-scanner-app, renovate-without-designer).
- **Add ~6 B2B posts** (each: title, description, date, readTime, tags, `keyword`, `faqs[]`, markdown body with real proof stats):
  1. *How AR Cuts Furniture Returns by Up to 40%* — kw: "reduce furniture returns AR".
  2. *The ROI of 3D/AR on a Product Page (the real math)* — kw: "AR product visualization ROI".
  3. *How to Add "View in Your Room" AR to Your Shopify Product Page* — kw: "add AR to Shopify product page".
  4. *Roomvo Alternative: Object + Surface AR in One Embed* — kw: "Roomvo alternative".
  5. *Object vs. Surface AR, Explained (for Retailers)* — kw: "object vs surface AR".
  6. *Auto-Generated 3D Models From a Single Photo* — kw: "generate 3D model from photo ecommerce".

## 8. SEO

- `layout.tsx`: retarget `title.default`, `description`, and the ~34 `keywords` from consumer terms ("AR furniture app", "room scanner") to B2B terms ("embeddable AR", "AR for product pages", "3D product visualization platform", "Roomvo alternative", "AR ecommerce widget", …), keeping `keywords.length >= 20`.
- `page.tsx` JSON-LD `@graph`: `SoftwareApplication` → describe the B2B embed; keep WebSite/Organization; FAQPage rebuilt from the new B2B `FAQS`.
- `sitemap.ts` / `robots.ts`: enumerate the new post set; keep OG routes `noindex`.
- **`src/app/__tests__/seo.test.ts` MUST be updated in the same commit** as any string/keyword/route/post-count change (it asserts exact title/description, keyword membership, `keywords.length >= 20`, `>= 6` posts with `>= 1` keyword-targeted, sitemap URLs/priorities). Update it to the new B2B assertions; keep `>= 20` keywords and `>= 6` keyword-targeted posts satisfiable.

## 9. Constraints & footguns (from CLAUDE.md)

- No single URL constant — `https://www.tardis-ai.com` is hard-coded ~51× and `NEXT_PUBLIC_APP_URL` fallback ~7×. Editing sitewide copy must not break those; do **not** introduce a refactor beyond what the redesign needs.
- `FAQS` exported from `Faq.tsx` drives both the accordion and JSON-LD — edit once, keep honest.
- `globals.css` has a legacy-alias block; audit before deleting any alias a module still uses.
- Keep only 3 client components (`Nav`, `Cta`, `SmoothScroll`) unless a new interaction genuinely needs the client; new mockups should be pure CSS where possible.
- Respect `prefers-reduced-motion` for any new motion.

## 10. Verification

- `npm run build` (statically generates all posts + OG), `npm run lint` (0 errors), `npm test` (updated `seo.test.ts` green).
- Visual review: run the dev/preview build and capture home + `/blog` + a post + mobile widths via the browser-capture path, and review screenshots (light on brand, legible proof band, mockups render, no layout shift, reduced-motion respected).
- Honesty check: every stat attributed to its industry source; no fabricated TARDIS metrics; surface AR labeled preview-grade; Stripe/Mattercraft/App-Clip not claimed as shipped beyond `B2B_DIRECTION` honesty.

## 11. Delivery & deploy

Implement on `feat/landing-b2b-redesign` in small commits (copy/SEO, components, mockups, blog each landable). After green gates + visual review, land to `main` (fast-forward/PR per user), then deploy: `vercel --prod` from the linked dir (or wire Vercel Git auto-deploy) — user chooses at the end. Nothing is auto-deployed without the user's go.
