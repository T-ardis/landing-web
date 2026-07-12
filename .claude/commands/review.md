---
description: Review the working-tree diff against this repo's Do NOT rules and known footguns
allowed-tools: Bash(git diff:*), Bash(git status:*), Read, Grep
---
Review the current changes for violations of this repo's conventions (see @CLAUDE.md).

Diff under review:
!`git diff HEAD`

Flag any of the following, with `file:line` references and a concrete fix for each:

- **Tailwind or CSS-in-JS** introduced. Styling must be CSS Modules (`*.module.css`) + `globals.css` custom properties only. Also flag hard-coded hex where a design token exists (`--black`, `--gold`, `--white`, `--grey`, `--card`).
- **axios** or a Markdown/MDX library added. Use native `fetch`; the blog stays a TS array with the in-file `md()` converter.
- New `'use client'` components beyond genuinely-needed browser APIs. Only `Nav`, `Cta`, and `SmoothScroll` should be client components — anything else bloats the client bundle.
- Calls to the tardis generation backend. landing-web's only backend contract is the Notion waitlist route.
- **SEO drift**: changes to metadata copy, keywords, routes, sitemap priorities, or the `FAQS` export in `src/components/Faq/Faq.tsx` WITHOUT a matching update to `src/app/__tests__/seo.test.ts` in the same change. `FAQS` feeds BOTH the visible FAQ accordion AND the home-page FAQPage JSON-LD — both must stay honest.
- Renamed Notion property names in `src/app/api/waitlist/route.ts`. They are hard-coded to the target DB schema (`Email`, `Signed Up`, `utm_source|utm_medium|utm_campaign|utm_term|utm_content`, `Referrer`) and must match exactly.
- New OG / edge routes that are not kept out of the index in BOTH `robots.ts` (disallow) AND the `next.config.ts` `X-Robots-Tag: noindex` header.
- Content in a blog `content` field using unsupported Markdown (`#` h1, blockquotes, images, tables, fenced code, nested lists) that the `md()` converter cannot render.
- New comments or docstrings added to code that wasn't otherwise changed.

Group findings by severity. If the diff is clean, say so plainly.
