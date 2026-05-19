# Hostinger Deployment Plan

## Recommendation

Deploy as a static Astro site unless a specific server-side requirement is approved.

This project is mostly articles, scenarios, downloads, training CTAs, and links to external registration/contact paths. Static output is the lowest-risk Hostinger path and keeps the site fast, portable, and easy to maintain.

## Preferred Architecture

- Framework: Astro.
- Output: static.
- Build command: `npm run build`.
- Build output: `dist/`.
- Hosting target: Hostinger `public_html`.
- Source repo: private GitHub repo.
- Production files: generated from source, not manually edited on the server.

## Deployment Options

### Option 1: Manual Static Upload

Best for first staging/demo deployment.

Steps:

1. Run `npm run build`.
2. Confirm generated files in `dist/`.
3. In Hostinger hPanel, open the target site.
4. Open Files > File Manager.
5. Upload the contents of `dist/` into `public_html`.
6. Visit deep links directly, not just the homepage.
7. Use Hostinger no-cache preview or purge cache if old content appears.

Pros:

- Lowest setup complexity.
- Works broadly across hPanel plans.
- Good for first review link.

Cons:

- Manual.
- Easy to forget a file.
- Rollback requires a previous artifact.

### Option 2: Git Deploy Branch

Best if Hostinger Git deployment is available but does not reliably build source projects.

Pattern:

1. GitHub Actions builds the source branch.
2. The workflow publishes `dist/` contents to a dedicated branch such as `hostinger-dist`.
3. Hostinger deploys that branch to `public_html`.

Pros:

- Repeatable.
- Source stays clean.
- Hostinger only sees deploy-ready static files.

Cons:

- Requires GitHub Actions setup.
- Need to confirm Hostinger branch deployment behavior.

### Option 3: Hostinger Node.js Web App

Use only if the plan supports Node.js and the site needs server behavior.

Possible reasons:

- Custom form processing on the same app.
- Dynamic event registration.
- Authenticated user area.
- Server-side CMS rendering.
- API routes.

Requirements:

- Hostinger Business/Cloud or another plan with Node.js app support.
- Confirm Node version.
- Configure build command, start command, environment variables, and app route.
- If using Astro SSR, add the Astro Node adapter.
- If using Next.js SSR, configure according to Hostinger's Node app support.

Risks:

- More moving parts than static hosting.
- Environment variables and runtime behavior must be verified after each deploy.
- Server logs and restart behavior become part of operations.

### Option 4: VPS

Only choose VPS if the project needs full server control, Docker, background workers, advanced caching/reverse proxy rules, or custom system packages.

This is unnecessary for the current site concept.

## Forms and Webinar Registration

Static hosting cannot securely process private form submissions by itself.

Recommended launch options:

- Webinar registration: external registration link or embedded form from Zoom, Google Forms, Eventbrite, Calendly, HubSpot, or the firm's chosen CRM.
- In-person training inquiry: external form service, mailto fallback, or Hostinger/PHP endpoint if approved.
- Newsletter/download capture: optional only; do not block core downloads at launch unless the business requires it.

If a custom backend is needed later, add it as a separate approved phase.

## Downloads

Store initial downloads under `public/downloads/` in source and deploy them as static files.

Guidelines:

- Use descriptive filenames.
- Prefer PDF for public templates, with DOCX only where editing is expected.
- Keep files small.
- If downloads become large or numerous, move them to external object storage or a CDN.
- Verify direct download links after deployment.

## Routing and Cache Checks

Verify:

- Homepage.
- Direct article URL.
- Direct scenario URL.
- Direct download URL.
- Training page.
- 404 page.
- External `NPOlawyers.com` links.

After deploy:

- Use Hostinger no-cache preview if the site appears stale.
- Purge server-side cache with Cache Manager if needed.
- Flush CDN cache if Hostinger CDN is active.
- Test from a second browser or incognito window.

## Static Build Requirements

The build must produce:

- `index.html`.
- Clean URL routes for pages.
- `404.html`.
- `sitemap.xml`.
- `robots.txt`.
- RSS feed if article publishing cadence supports it.
- Optimized image assets.
- Download files in predictable URLs.

## Environment Variables

For static builds:

- Do not put secrets in client-side environment variables.
- Any variable used at build time may become visible in generated output if referenced by client code.
- External form URLs and analytics IDs are acceptable if intentionally public.

For Node app deployment:

- Store secrets in Hostinger environment variable settings.
- Confirm values persist after redeploy.
- Never commit private keys, API tokens, CRM secrets, or SMTP passwords.

## Rollback Plan

Minimum:

- Keep the last successful `dist/` artifact or `hostinger-dist` branch commit.
- If a deploy fails, restore the previous artifact to `public_html`.

Better:

- Tag launch candidates in git.
- Keep GitHub Actions artifacts for each production build.

## Deployment Definition of Done

- Production/staging URL loads.
- All four primary actions work.
- Deep links work after refresh.
- Downloads work.
- Forms or external registration links work.
- Cache has been purged or no-cache preview confirms current content.
- Mobile homepage and article page pass visual review.
- Lighthouse/accessibility smoke test has no major blockers.

## Sources

- Astro Hostinger deployment: `https://docs.astro.build/en/guides/deploy/hostinger/`
- Hostinger Git deployment: `https://www.hostinger.com/support/1583302-how-to-deploy-a-git-repository-in-hostinger/`
- Hostinger Node.js migration/deployment: `https://www.hostinger.com/support/how-to-migrate-a-node-js-application-to-hostinger/`
- Hostinger cache clearing: `https://www.hostinger.com/support/1583501-how-to-clear-cache-in-hostinger/`
