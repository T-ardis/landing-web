---
description: Run the full quality gate — lint, typecheck, and the Jest SEO suite — then fix any failures
allowed-tools: Bash(npm run lint:*), Bash(npm test:*), Bash(npx jest:*), Bash(npx tsc --noEmit:*), Read, Edit
---
Run this repo's pre-commit gate and report a concise pass/fail summary.

1. `npm run lint` (eslint, flat config via eslint-config-next)
2. `npx tsc --noEmit` (TypeScript is strict — treat any type error as a failure)
3. `npm test` (the Jest suite, currently `src/app/__tests__/seo.test.ts`)

If a step fails, diagnose and fix the root cause, then re-run only that step until green.

Important footgun: `src/app/__tests__/seo.test.ts` asserts EXACT SEO strings — the metadata title/description, individual keyword membership (`keywords.length >= 20`), robots rules, sitemap URLs/priorities, and that there are `>= 6` blog posts with `>= 1` keyword-targeted (priority 0.8) post. If a test fails because of an *intended* SEO / route / FAQ change, update the test to match in the same change — do NOT weaken assertions just to make them pass.
