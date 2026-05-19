# Parallel Worker Execution Plan

## Goal

Structure the project so multiple AI workers or human developers can build independently, merge cleanly, and produce a polished Hostinger-ready website quickly.

## Recommended Branching

- `main`: stable, reviewable work only.
- `worker/foundation-astro`
- `worker/design-system`
- `worker/content-model`
- `worker/homepage`
- `worker/articles-scenarios`
- `worker/downloads`
- `worker/training-forms`
- `worker/seo-a11y-qa`
- `worker/hostinger-deploy`

Use small PRs. Each PR should include:

- Summary.
- Files changed.
- Screenshots for visible UI.
- Build/lint result.
- Known gaps.

## Worker Ownership Map

### Worker 1: Foundation

Owns:

- `package.json`
- `astro.config.*`
- `tsconfig.json`
- `src/env.*`
- `src/content/config.*`
- project scripts

Tasks:

- Scaffold Astro static site.
- Add MDX/content collections.
- Add build, lint, format scripts.
- Add base routing.
- Add initial sample content.

Dependencies:

- Can start immediately.

Done when:

- `npm install`, `npm run build`, and `npm run dev` work.

### Worker 2: Design System

Owns:

- `src/styles/`
- `src/components/ui/`
- `src/layouts/BaseLayout.*`
- `src/components/Header.*`
- `src/components/Footer.*`

Tasks:

- Implement color tokens.
- Implement typography and spacing scale.
- Build header, footer, buttons, cards, badges, CTA strips, form fields.
- Add responsive mobile navigation.
- Add accessible focus states.

Dependencies:

- Can start once foundation branch exists.

Done when:

- UI primitives are reusable and documented with sample usage.

### Worker 3: Homepage and Core UX

Owns:

- `src/pages/index.*`
- homepage-only components under `src/components/home/`

Tasks:

- Build first viewport with four primary actions.
- Add featured scenario, beginner path, downloads strip, training summary, latest articles.
- Ensure mobile layout is polished.

Dependencies:

- Needs design system components or can use placeholders.

Done when:

- The homepage routes users to articles, program info, webinar/in-person CTA, and NPO Lawyers.

### Worker 4: Articles and Scenarios

Owns:

- `src/pages/articles/`
- `src/pages/scenarios/`
- `src/components/articles/`
- `src/components/scenarios/`
- `src/content/articles/`
- `src/content/scenarios/`

Tasks:

- Build article index.
- Build article detail template.
- Build scenario index.
- Build scenario detail template.
- Add table of contents, related downloads, related articles, and CTA rail.
- Draft first content from local project docs.

Dependencies:

- Needs content config from Worker 1.

Done when:

- At least 5 articles and 3 scenarios render with metadata and related links.

### Worker 5: Downloads Library

Owns:

- `src/pages/downloads/`
- `src/components/downloads/`
- `src/content/downloads/`
- `public/downloads/`

Tasks:

- Build downloads index.
- Build download card pattern.
- Create initial downloadable PDFs or DOCX/Markdown source files.
- Add related article links.

Dependencies:

- Needs content config from Worker 1.

Done when:

- At least 5 downloads appear and file links work.

### Worker 6: Training and Conversion

Owns:

- `src/pages/training/`
- `src/pages/contact.*`
- `src/components/forms/`
- conversion CTA components, if not already in UI ownership

Tasks:

- Build training overview page.
- Build webinars page.
- Build in-person training inquiry page.
- Decide initial form strategy: external embed, mailto fallback, Hostinger/PHP endpoint, or future CRM integration.
- Add conversion events naming.

Dependencies:

- Needs design system components.

Done when:

- Webinar and in-person flows are visible and have working fallback actions.

### Worker 7: SEO, Accessibility, and QA

Owns:

- `src/utils/seo.*`
- sitemap/robots/rss files
- QA scripts
- accessibility notes

Tasks:

- Add title/description/canonical/OpenGraph defaults.
- Add article schema where practical.
- Add sitemap and robots.
- Run accessibility scans.
- Run keyboard checks.
- Run mobile/desktop screenshot review.

Dependencies:

- Starts after core pages exist, but can define SEO utility early.

Done when:

- QA report is added and launch blockers are documented.

### Worker 8: Hostinger Deployment

Owns:

- `.github/workflows/`
- deployment docs
- Hostinger-specific config notes

Tasks:

- Choose deployment path with the actual Hostinger plan.
- For static deployment, document manual upload and Git deploy branch options.
- For Node deployment, document adapter/start command/env requirements.
- Add a repeatable deployment checklist.

Dependencies:

- Needs build output path from Worker 1.

Done when:

- A reviewer can deploy without guessing.

## Parallel Schedule

### Day 1

- Foundation scaffolds Astro.
- Design system starts tokens/components.
- Content worker extracts article outlines from Word docs.
- Tooling worker runs Stitch concepts if available.

### Day 2

- Homepage worker builds first complete homepage.
- Articles/scenarios worker builds content templates.
- Downloads worker builds library and first templates.
- Training worker builds conversion pages.

### Day 3

- Integrate design system into all pages.
- Add first 10 content items.
- Add form/registration fallback.
- Add SEO metadata.

### Day 4

- QA pass on desktop/mobile.
- Accessibility fixes.
- Build and deployment rehearsal.
- Prepare review screenshots.

### Day 5

- Final polish.
- Hostinger staging deployment.
- Boss review package.

## Merge Strategy

1. Merge `foundation-astro` first.
2. Merge `design-system` second.
3. Rebase page/content branches onto design system.
4. Merge content-heavy branches next.
5. Merge conversion and SEO/QA after core pages.
6. Merge deployment docs last.

## Conflict Avoidance

- Workers must not edit `src/styles/` unless assigned to design system.
- Workers must not change content schema without coordinating with foundation/content model owner.
- Page owners may create local components only under their page-specific component folder.
- Shared UI changes go through the design-system branch.
- Shared data shape changes go through the content-model/foundation branch.

## Review Checklist

For every PR:

- Does it support one of the four primary actions?
- Does it preserve the disclaimer?
- Does it build?
- Does it work on mobile?
- Are links real or clearly marked as placeholders?
- Are headings semantic?
- Is text readable against its background?
- Are file paths and ownership boundaries respected?

## Boss Review Package

Prepare:

- Live staging URL.
- 5 screenshots: homepage desktop, homepage mobile, article page, downloads page, training page.
- Short positioning statement.
- Feature checklist.
- Known future enhancements.
- Implementation/deployment notes.

## Elegant Solution Check

Before finalizing:

- Can any dynamic feature be replaced with simpler static content?
- Can any custom JavaScript be removed?
- Does every CTA serve one of the four primary actions?
- Does every article page offer a practical next step?
- Is the training offer clear without making the free resource feel like bait?
