# Hostinger Deployment Guide

## Deployment Decision

Deploy this Astro site as static files to Hostinger `public_html`.

The current app is content-first and `astro.config.mjs` sets `output: 'static'`. Do not switch to a Node.js deployment unless a future requirement needs server-rendered routes, API endpoints, authenticated areas, or first-party form processing.

## Build Settings

- Install command: `npm ci`
- Build command: `npm run build`
- Build output directory: `dist/`
- Hostinger target directory: `public_html`
- Preview command for local artifact checks: `npm run preview`

`npm run build` runs `astro check && astro build`, so a successful build verifies Astro/TypeScript checks before writing `dist/`.

## Manual Static Upload

Use this for first staging/demo deployment or when Hostinger Git deployment is not configured.

1. Run `npm ci` if dependencies are not already installed.
2. Run `npm run build`.
3. Confirm `dist/index.html` exists.
4. In Hostinger hPanel, open the site File Manager.
5. Back up or rename the current `public_html` contents before replacing them.
6. Upload the contents of `dist/` into `public_html`, not the `dist` folder itself.
7. Visit the homepage and at least one direct deep link after upload.

Do not edit generated production files directly in `public_html`; fix source files and redeploy.

## GitHub And Hostinger Deploy

Hostinger Git deployment may pull a repository branch into `public_html`, but plans differ on whether source builds run reliably. Confirm this behavior on the actual Hostinger plan before relying on it.

Preferred Git options:

- If Hostinger can run `npm ci` and `npm run build`, configure it with `dist/` as the publish output.
- If Hostinger only pulls files, deploy a built branch such as `hostinger-dist` that contains the contents of `dist/`.
- Do not add a GitHub Actions workflow until Hostinger branch behavior is confirmed and manual deploy becomes a bottleneck.

If a build-output branch is later needed, keep it generated-only and never use it for source edits.

## Environment And Secrets

Static Astro output has no private server runtime.

- Do not commit secrets, private keys, CRM tokens, SMTP passwords, or form service secrets.
- Values referenced by client-side code or rendered at build time can become public in `dist/`.
- Public values such as external webinar URLs, public form URLs, analytics IDs, and `NPOlawyers.com` links may be committed when intentional.
- If first-party form processing is approved later, use a separate Hostinger PHP endpoint, form provider, or Node deployment with secrets stored in Hostinger environment settings.

## Cache Purge And Smoke Check

After each deploy:

1. Open Hostinger no-cache preview if available.
2. Purge Hostinger cache from hPanel Cache Manager if stale pages appear.
3. Purge Hostinger CDN cache if CDN is enabled.
4. Test in an incognito/private browser window.
5. Verify:
   - `/`
   - `/next-meeting`
   - `/working-board`
   - `/starting-a-nonprofit`
   - `/training` when implemented
   - one direct download URL when downloads exist
   - one external `https://NPOlawyers.com` link

## Rollback

Minimum rollback:

1. Keep the previous successful `dist/` artifact or a zip of the previous `public_html` contents.
2. If the new deploy fails, replace `public_html` with the previous artifact.
3. Purge Hostinger/CDN cache.
4. Re-test the homepage and direct deep links.

Preferred rollback once releases stabilize:

- Tag source releases in git.
- Keep the last successful deploy artifact.
- If using a `hostinger-dist` branch later, roll that branch back to the previous known-good commit and redeploy.

## Launch Gaps To Resolve

- Confirm the final Hostinger plan supports the chosen deploy workflow.
- Confirm final domain or subdomain.
- Add `site` to `astro.config.mjs` once the production URL is known so canonical URLs and sitemap generation can be exact.
- Confirm form/webinar provider before launch; static hosting alone should not receive private form submissions.
