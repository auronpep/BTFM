# Hostinger Deployment Checklist

Use this checklist for each staging or production upload.

## Before Build

- [ ] Confirm the source branch or commit to deploy.
- [ ] Confirm no secrets are present in `.env`, docs, or committed config.
- [ ] Confirm webinar/form links are public links or approved embeds.
- [ ] Confirm `astro.config.mjs` still uses `output: 'static'`.

## Build

- [ ] Run `npm ci` if dependencies are missing or stale.
- [ ] Run `npm run build`.
- [ ] Confirm `dist/index.html` exists.
- [ ] Confirm expected static assets and downloads are present in `dist/`.

## Upload To Hostinger

- [ ] Back up current `public_html` or keep the last successful `dist/` artifact.
- [ ] Upload the contents of `dist/` into `public_html`.
- [ ] Do not upload the parent `dist` folder.
- [ ] Do not edit generated files in `public_html`.

## Post-Deploy Smoke Test

- [ ] Purge Hostinger cache if content appears stale.
- [ ] Purge CDN cache if Hostinger CDN is enabled.
- [ ] Open the site in an incognito/private browser window.
- [ ] Verify homepage loads.
- [ ] Verify direct deep links load after refresh.
- [ ] Verify the four primary actions are present:
  - [ ] Read articles, scenarios, or field-manual pages.
  - [ ] Understand the board training program.
  - [ ] Register for webinar or request in-person training when links are implemented.
  - [ ] Visit `https://NPOlawyers.com`.
- [ ] Verify downloads when download files exist.
- [ ] Verify mobile layout on a phone-sized viewport.

## Rollback If Needed

- [ ] Restore the previous `public_html` backup or previous `dist/` artifact.
- [ ] Purge Hostinger/CDN cache.
- [ ] Re-test homepage and direct deep links.
- [ ] Record the failed deploy cause in `tasks/todo.md` or the relevant PR.
