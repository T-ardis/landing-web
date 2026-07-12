---
description: Scaffold a new SEO blog post in src/lib/blog.ts the repo's way
argument-hint: <topic or primary keyword>
allowed-tools: Read, Edit, Bash(npm test:*), Bash(npx jest:*)
---
Add a new blog post about: $ARGUMENTS

The blog is a hand-written TypeScript array — there is no MDX, Notion, or CMS. Follow @src/lib/blog.ts and @CLAUDE.md exactly:

- Append a new object to `posts: BlogPost[]` in @src/lib/blog.ts. Do NOT add a Markdown/MDX library or move content out of this file.
- Required fields: `slug` (kebab-case, unique — check existing slugs first), `title`, `description`, `date` (`YYYY-MM-DD`), `readTime` (e.g. `"6 min read"`), `tags: string[]`, and a Markdown `content` template literal.
- Add `keyword` (the primary target keyword) and 2–4 `faqs[]` (`{ question, answer }`). A post with a `keyword` earns sitemap priority 0.8 and, with `faqs`, a FAQPage schema — this is the SEO whole point of the repo, so prefer keyword-targeted posts.
- The `content` is rendered by an in-file regex `md()` converter in `src/app/blog/[slug]/page.tsx` that supports ONLY: `##` h2, `###` h3, bold, italic, unordered lists, ordered lists, links, and paragraphs. Do NOT use `#` h1, `>` blockquotes, images, tables, fenced code blocks, or nested/indented lists — they render as raw or malformed HTML.
- No other wiring is needed: `getAllPosts()` / `getPostBySlug()` / `generateStaticParams` and the `FromBlog` component pick the post up automatically.

Write genuinely useful, on-brand content (TARDIS = an AR furniture visualizer; voice is warm, expert, concise). When done, run `npm test` — `seo.test.ts` asserts post counts and keyword-targeted posts, so confirm it stays green.
