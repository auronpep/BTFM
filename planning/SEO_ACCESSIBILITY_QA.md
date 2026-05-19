# SEO, Accessibility, and QA Checklist

Worker: Worker 9
Date: 2026-05-19
Scope: global SEO/static-site support, metadata helpers, robots, sitemap, RSS, 404, and QA notes.

## Implemented SEO Support

- [x] Site URL configured in Astro.
- [x] Shared SEO helper added for titles, canonical URLs, Open Graph, Twitter cards, JSON-LD, and XML escaping.
- [x] Base layout emits description, canonical, Open Graph, Twitter card, and JSON-LD metadata.
- [x] Article and scenario pages pass article-style metadata dates when available.
- [x] California rules pages pass article-style structured data.
- [x] `robots.txt` endpoint emits the sitemap location.
- [x] `sitemap.xml` endpoint includes static routes and non-draft article, scenario, tool, and California rule entries.
- [x] `rss.xml` endpoint includes non-draft articles and scenarios.
- [x] Custom `404` page provides recovery links to the four primary action paths.

## Accessibility QA Checklist

- [x] Global skip link exists and points to `#main`.
- [x] Base document language is `en`.
- [x] Viewport meta tag is present.
- [x] Header uses named desktop and mobile navigation landmarks.
- [x] Primary buttons and nav links use visible text labels.
- [x] Focus-visible styling exists globally.
- [x] Header and footer CTA targets meet the 44px practical pointer-target baseline through `min-height: 2.75rem`.
- [x] Browser smoke pass completed against the live local server on `http://127.0.0.1:8120/`.
- [ ] Run contrast scan on final page set after visual/content workers finish.
- [x] Mobile navigation smoke check completed at 390px width; mobile menu opens and desktop nav hides.

## Four Primary Actions

- [x] Read field manual content: homepage links to next meeting, tools, articles, scenarios, and working-board paths.
- [x] Understand training: `/training/` exists and is linked in header/footer.
- [x] Register/request training: `/training/webinars/` and `/training/in-person/` exist.
- [x] Visit law firm site: `https://NPOlawyers.com` appears in header/footer and legal CTAs.

## Remaining Launch Notes

- Header and route map topic routes now exist: `/money-audit/`, `/executive-oversight/`, `/risk-safety/`, and `/minutes-records/`.
- Browser screenshot capture through the in-app browser timed out twice during QA, but DOM, console, HTTP, build, and internal-link verification passed.
- Open Graph image is a static SVG placeholder at `/og-default.svg`; replace with a final branded bitmap before launch if social-card compatibility is a priority.

## Verification Log

- `npm run check`: passed with 0 errors, 0 warnings, 0 hints.
- `npm run build`: passed; Astro generated 50 static pages, including `404.html`, `robots.txt`, `rss.xml`, and `sitemap.xml`.
- `git diff --check`: passed; only CRLF normalization warnings were reported for existing text files.
- Static output spot check: `dist/index.html` includes canonical, Open Graph, Twitter card, and JSON-LD metadata.
- Static output spot check: `dist/articles/budget-is-the-boards-permission-slip/index.html` includes `og:type="article"` and Article JSON-LD dates.
- Static output spot check: `dist/robots.txt`, `dist/sitemap.xml`, and `dist/rss.xml` contain expected generated content.
- `Invoke-WebRequest` live smoke checks passed on `http://127.0.0.1:8120/` for homepage, core topic pages, articles, scenarios, tools, California rules, training, contact, robots, sitemap, and RSS.
- Static internal-link check passed for 1,128 local `href` / `src` references across 50 generated HTML files.
