# CDX Website Planning Todo

## Checklist

- [x] Worker 10: Record Hostinger deployment documentation plan.
- [x] Worker 10: Review current Astro build/deploy configuration.
- [x] Worker 10: Update Hostinger static deployment documentation.
- [x] Worker 10: Add concise deployment checklist.
- [x] Worker 10: Run build verification or document exact blocker.
- [x] Worker 10: Document deployment review results.
- [x] Worker 1: Record foundation/schema implementation plan.
- [x] Worker 1: Add Astro static package/config/TypeScript scaffold.
- [x] Worker 1: Define MDX/content collection schemas for boardroom field manual content.
- [x] Worker 1: Add shared site, navigation, and content constants.
- [x] Worker 1: Run available verification and document results.
- [x] Worker 3: Record design-system implementation plan.
- [x] Worker 3: Create V2 global CSS tokens and layout primitives.
- [x] Worker 3: Add `BaseLayout`, responsive header, and footer.
- [x] Worker 3: Add boardroom UI components under `src/components/ui`.
- [x] Worker 3: Run available verification and document results.
- [x] Worker 4: Record homepage and next-meeting implementation plan.
- [x] Worker 4: Create only owned `src/pages` and page-local component files.
- [x] Worker 4: Build homepage around the V2 boardroom promise.
- [x] Worker 4: Build `/next-meeting` boardroom problem picker.
- [x] Worker 4: Run available verification and document results.
- [x] Worker 2: Confirm ownership boundaries and existing implementation state.
- [x] Worker 2: Define V2 boardroom navigation with working-board path first and startup path second.
- [x] Worker 2: Map launch routes to the four primary actions.
- [x] Worker 2: Define contextual `NPOlawyers.com` referral prompts by issue type.
- [x] Worker 2: Add route shells for `/working-board` and `/starting-a-nonprofit`.
- [x] Worker 2: Verify changed files and document results.
- [x] Inspect workspace and repository state.
- [x] Read the three project documents in `docs/`.
- [x] Review `NPOlawyers.com`.
- [x] Review the board training brainstorming site.
- [x] Research nonprofit board training, governance, accessibility, and SEO references.
- [x] Initialize local git repository and private GitHub repository.
- [x] Add requested GitHub admin collaborators if GitHub accepts the accounts.
- [x] Record final setup results and any blockers.
- [x] Add competition-oriented planning docs.
- [x] Add Hostinger-specific deployment plan.
- [x] Add parallel-worker execution plan.
- [x] Add tooling recommendations for Codex, Claude Code, Google Stitch, Figma, and supporting tools.
- [x] Record lesson that AM is bypassed for this project.
- [x] Review `docs/BT_Plan_v2.md` and revise worker plan before implementation kickoff.
- [x] Worker 9: Record SEO/accessibility/QA implementation plan.
- [x] Worker 9: Inspect current metadata, routing, and static-site support.
- [x] Worker 9: Add scoped SEO helpers and static files for Astro hosting.
- [x] Worker 9: Add concise QA checklist artifact.
- [x] Worker 9: Run available verification and document results.

## Project Goal

Create a free public online resource and blog for nonprofit board training, published by the California Center for Nonprofit Law / NPO Lawyers. The site should help board members, chairs, presidents, founders, and executive directors understand how boards work, what duties board members owe, what common scenarios require board judgment, and what a well-run board and annual meeting look like.

The site has four primary actions:

1. Read blog posts or scenario articles.
2. Understand the board training program.
3. Sign up for a webinar or request in-person training.
4. Visit the law firm's main site at `https://NPOlawyers.com`.

## Source Inputs Reviewed

- `docs/Firm Book 200523.docx`
- `docs/Syllabus for Venice Conference.docx`
- `docs/Training for OC for one hour.docx`
- `https://NPOlawyers.com`
- `https://mediumslateblue-caterpillar-718620.hostingersite.com/`
- IRS, California Attorney General, BoardSource, National Council of Nonprofits, W3C/WCAG, and Google Search Central references.
- Google Stitch, Figma MCP, Claude Code plugins/subagents, Codex configuration, Astro Hostinger deployment, Hostinger Git deployment, and Hostinger cache references.
- `docs/BT_Plan_v2.md`, which reframes the site as a boardroom field manual for working California nonprofit board members.

## V2 Implementation Override

Use `planning/PARALLEL_WORK_PLAN.md` and `planning/BT_PLAN_V2_WORKER_CHANGES.md` for implementation kickoff. Older sections in this task file remain useful background, but the build should now prioritize:

- Boardroom field manual positioning.
- Working-board persona before beginner/founder persona.
- Situational navigation: Next Meeting, Money & Audit, Executive Oversight, Risk & Safety, Minutes & Records, California Board Rules, Tools, Training.
- Board Packet Lab, Question Bank, Red Flag Library, Mature Board Self-Assessment, and meeting-ready article templates.
- California-specific content with source checks and attorney-review flags.

## Content Strategy

The strongest curriculum shape is "practical board clarity for real decisions." The local documents repeatedly return to a few durable themes:

- The board has ultimate authority, but individual directors do not act alone.
- Officers and executives carry out delegated authority between meetings.
- Good boards do not merely attend meetings; they prepare, ask questions, review reports, document decisions, and sustain the mission.
- Fiduciary duties should be taught through actual board behavior: care, loyalty, obedience, conflicts, compensation, financial controls, safety, and records.
- New nonprofits need early structure: self-assessment, fiscal sponsorship analysis, board recruitment, business planning, first meeting, bylaws, officer election, bank authority, state registration, tax exemption, and annual compliance.
- Mature boards need recurring rhythms: strategy, safety, audit, budget, CEO/CFO reports, annual meeting, policies, committees, board development, and review of Form 990/governance documents.

Recommended content pillars:

1. `Boards 101`
   Introductory articles for people who just joined a board or are being asked to serve.
2. `Board Meetings`
   Agendas, minutes, motions, annual meetings, executive sessions, reports, and the 40-40-20 meeting rule.
3. `Duties and Risk`
   Fiduciary duties, conflicts, compensation, insurance, safety, internal controls, whistleblower policies, records, and D&O exposure.
4. `Starting Strong`
   Founder self-assessment, fiscal sponsorship, five unrelated directors, business plan, first board meeting, articles, bylaws, Form 1023, state filings.
5. `Scenarios`
   Narrative board problems: conflicted compensation vote, board member acting alone, weak minutes, embezzlement warning signs, budget variance, unsafe youth program, staff classification, restricted gift, annual meeting failure.
6. `Training Program`
   Webinar and in-person training offer, curriculum modules, audience fit, sample agenda, outcomes, and inquiry form.
7. `Downloads`
   Practical files: board meeting agenda template, minutes template, annual board calendar, first meeting checklist, board member self-assessment, conflict disclosure form, policy book starter index, budget review worksheet, safety review checklist.

## Site Architecture

Primary navigation:

- `Articles`
- `Boards 101`
- `Scenarios`
- `Downloads`
- `Training`
- `NPO Lawyers`

Recommended page map:

- `/`
  Focused editorial homepage with a strong article/training split. It should not feel like a law firm landing page clone.
- `/articles`
  Searchable/filterable article index with category filters and featured scenarios.
- `/articles/[slug]`
  Long-form reading template with table of contents, plain-language disclaimer, related downloads, related scenarios, and CTA rail.
- `/boards-101`
  Guided beginner path: what boards do, duties, chain of command, meeting basics, financial oversight.
- `/scenarios`
  Scenario library organized by issue type and board maturity.
- `/downloads`
  Resource library with gated-optional or ungated downloads. Start ungated unless email capture becomes a defined business requirement.
- `/training`
  Program page for free webinars and paid in-person training.
- `/training/webinars`
  Webinar listing/registration landing page.
- `/training/in-person`
  In-person training inquiry and outline.
- `/about`
  About the training project and its relationship to California Center for Nonprofit Law.
- `/contact`
  Training inquiry/contact form.
- External link: `https://NPOlawyers.com`

## Homepage Direction

The brainstorming site has a strong concept: "Many boards are active. Few are effective." Keep that clarity, but make the final homepage more functional and less purely atmospheric.

Recommended first viewport:

- Brand signal: `Board Training Principles` or final program name, published by California Center for Nonprofit Law.
- Headline direction: `Practical training for nonprofit boards that need to govern well.`
- Supporting copy: one concise paragraph explaining free articles, scenarios, templates, and training.
- Four action buttons:
  - `Read Articles`
  - `Explore Board Training`
  - `Register for a Webinar`
  - `Visit NPO Lawyers`
- Visual: real boardroom, meeting table, annotated agenda, or legal/governance document imagery. Avoid vague courthouse-only imagery if the site is about daily nonprofit board work.

Below first viewport:

- Featured article/scenario grid.
- Beginner path block: `New to a board? Start here.`
- Download strip with 3 high-value templates.
- Training program overview.
- Firm trust footer with phone, disclaimer, and link to NPOlawyers.com.

## Visual Design Direction

Use the brainstorming palette as a starting point, but tighten it for readability and trust.

Recommended tokens:

- Deep navy: `#1e2a43` or `#22314f`
- Firm slate: `#364359`
- Warm paper: `#f4efe8`
- Soft stone: `#e7e1db`
- Muted gold: `#8a6a2f`
- Practical accent: `#2f6f73` or `#376b5f`
- Alert/accent only: muted berry derived from the brainstorming pink, used sparingly.

Typography:

- Use a serious readable serif for editorial headings, not a script for core UI text.
- Use a clean sans-serif for body, navigation, filters, forms, and downloads.
- Preserve script/calligraphic styling only as a subtle brand accent if desired; it should not carry critical text.

UI style:

- Editorial, warm, and institutional.
- Article cards should be compact, with clear category labels and reading time.
- Forms should be direct and restrained.
- Downloads should look like practical files, not marketing lead magnets.
- Avoid oversized decorative cards, heavy gradients, and ornamental legal imagery that makes the site feel distant from real nonprofit operations.

## Conversion Model

Every major page should offer one primary next step and one secondary step:

- Article pages: primary `Download related template`; secondary `Ask about training`.
- Scenario pages: primary `Read the board lesson`; secondary `Book training for this issue`.
- Training page: primary `Register for webinar`; secondary `Request in-person training`.
- Download pages: primary `Download file`; secondary `Read related guide`.
- Footer/global: `Visit NPO Lawyers` for legal services.

The site must include a clear disclaimer: content is educational information, not legal advice, and using the site does not create an attorney-client relationship. Keep the disclaimer visible in footer and on article templates without disrupting reading.

## Implementation Plan

Recommended stack for build phase:

- Static-first site with a CMS-friendly content model.
- Use Astro static output unless a server-side requirement is proven. Astro is the best fit for a Hostinger-hosted, content-heavy resource library because it is fast, simple, Markdown/MDX-friendly, and can deploy generated `dist/` files to `public_html`.
- Use Next.js only if React app patterns are a hard requirement. If hosted statically, it must use static export and accept static-export limits. If SSR/API routes/auth/server actions are required, use Hostinger Node.js hosting or VPS as a separate decision.
- Store articles, scenarios, and downloads as MDX/content collections.
- Generate RSS, sitemap, metadata, OpenGraph images, and schema markup for articles.
- Add client-side search only if needed after the first content batch; start with category/tag filters and server-rendered indexes.

Phases:

1. Foundation
   - Choose final program name.
   - Choose stack and hosting target.
   - Define content schema for articles, scenarios, downloads, and training events.
   - Add global disclaimer and privacy/contact assumptions.
2. Design System
   - Build tokens, typography, header, footer, button variants, card patterns, article template, CTA rail, and form controls.
   - Verify contrast, focus states, mobile navigation, and text scaling.
3. Core Pages
   - Homepage.
   - Article index and article template.
   - Boards 101 path page.
   - Scenario index and scenario template.
   - Downloads library.
   - Training overview, webinar signup, in-person inquiry.
4. Content Migration
   - Convert the three project documents into a structured editorial backlog.
   - Draft the first 12-20 cornerstone articles.
   - Create first 5-8 downloadable files.
   - Add related-content links between articles, scenarios, downloads, and training.
5. Integrations
   - Contact/training inquiry form.
   - Webinar registration integration.
   - Analytics with privacy-respecting event tracking.
   - Newsletter/email capture only if desired.
6. QA and Launch
   - Accessibility review against WCAG 2.2 AA.
   - Mobile and desktop visual checks.
   - Broken link check.
   - Metadata/schema validation.
   - Form submission test.
   - Legal disclaimer review.
   - Redirect and cross-link review with `NPOlawyers.com`.

## Initial Content Backlog

Cornerstone articles:

- What does a nonprofit board actually do?
- The chain of command: members, board, officers, staff, volunteers.
- The duties of care, loyalty, and obedience in plain English.
- Why individual board members do not have individual authority.
- How to prepare for a board meeting.
- What good minutes should record, and what they should not.
- The 40-40-20 rule for better board meetings.
- Strategy, safety, audit: a simple annual board framework.
- How boards should review a budget.
- How to handle conflicts of interest.
- Why compensation decisions require disinterested approval.
- What belongs in a policy book.
- What every board should know about Form 990 governance questions.
- Starting a nonprofit: should you start one, use a fiscal sponsor, or join an existing charity?
- Recruiting five unrelated directors.
- The first board meeting checklist.
- Bylaws without overcomplicating them.
- Internal controls for small nonprofits.
- Insurance and D&O coverage questions every board should ask.
- Annual meeting agenda for a well-run nonprofit.

Scenario articles:

- The founder wants the board to approve her salary.
- A board member starts directing staff between meetings.
- The treasurer gives vague financial reports.
- The board discovers missing receipts.
- A donor restricts a gift after the money is spent.
- The board never reviews the bylaws.
- A youth program has weak screening and training.
- The annual meeting is approaching and no one knows who is on the board.

Downloads:

- Board meeting agenda template.
- Board minutes template.
- Annual board calendar.
- First board meeting checklist.
- Conflict of interest annual disclosure.
- Board member onboarding checklist.
- Budget review worksheet.
- Safety/risk review checklist.
- Policy book starter table of contents.
- Form 990 governance review checklist.

## Verification Plan

Before calling the implementation done:

- Run the framework's build and lint checks.
- Verify all four primary actions from the homepage.
- Verify all forms submit to the intended destination or show a controlled fallback.
- Check article pages on mobile, tablet, and desktop.
- Run an accessibility scan and manually verify keyboard navigation/focus states.
- Check color contrast for text on image overlays and muted gold buttons.
- Check SEO basics: titles, descriptions, canonical URLs, sitemap, robots, OpenGraph, schema.
- Check all external links to `NPOlawyers.com`.
- Confirm legal disclaimer appears in footer and article template.

## Review Notes

### Worker 1 Foundation and Content Schema Review

- Added the Astro 6 static scaffold with MDX support, strict TypeScript configuration, package scripts, and a lockfile for reproducible installs.
- Defined content collections for `articles`, `scenarios`, `tools`, `meetingPrep`, `packetGuides`, `questionBank`, `redFlags`, `californiaRules`, and `trainingEvents` in `src/content.config.ts`, using shared field-manual fields for audience, board stage, jurisdiction, meeting use, documents, board questions, minutes evidence, red flags, legal escalation, related tools, and attorney-review flags.
- Added shared site/navigation/content constants for the Boardroom Field Manual concept and kept compatibility with Worker 2 route/CTA files by exporting `PrimaryAction`, `primaryNavigation`, `sitePaths`, and `pathNavigation`.
- Verification note: `npm install`, `npm run check`, and `npm run build` passed. `npm run dev -- --host 127.0.0.1 --port 4321` started successfully at `http://127.0.0.1:4321/`. Astro reports expected empty-collection warnings until content workers add MDX files. `npm install` reports five moderate audit findings in third-party dependencies; no forced audit fix was applied.

### Worker 4 Homepage and Next Meeting Review

- Rebuilt the homepage around `Board service gets serious when the organization gets serious`, the `$3M Board Member Guide`, next-meeting entry, Strategy/Safety/Audit jobs, featured tools, featured scenarios, training CTA, and contextual `NPOlawyers.com` CTA.
- Built `/next-meeting` as an anchor-based boardroom problem picker covering budget approval, audit/Form 990, executive director report, compensation, conflict of interest, insurance/safety, bylaws or policy changes, difficult board member issues, and annual meeting prep.
- Kept implementation static and local to Worker 4 paths while importing the shared `BaseLayout`, header, and footer once they became available.
- Verification note: `npm run build` passed. Astro built `/`, `/next-meeting`, `/working-board`, and `/starting-a-nonprofit`; expected empty-content warnings appeared for placeholder content collections. `git diff --check` passed with only CRLF warnings on task files. Static `dist/` checks confirmed the homepage promise, problem picker, next-meeting agenda choices, difficult board member issue, and `NPOlawyers.com` CTA render. In-app Browser QA was attempted on `127.0.0.1:4322` and `localhost:4322`, but both were blocked by `net::ERR_BLOCKED_BY_CLIENT`.

### Worker 3 Design System and Boardroom Components Review

- Added the V2 palette, typography tokens, focus states, layout utilities, buttons, boardroom cards, and checklist/data primitives in `src/styles/global.css`.
- Added `src/layouts/BaseLayout.astro`, `src/components/Header.astro`, and `src/components/Footer.astro` with responsive navigation, page metadata defaults, skip link, and the global educational disclaimer.
- Added `BoardroomRule`, `AskThis`, `DoNotDoThis`, `MinutesShouldShow`, `LegalEscalation`, `CaliforniaNote`, `RedFlag`, `DecisionTrail`, `AuthorityMap`, `BoardPacketModeButton`, `ToolCard`, `QuestionCard`, and `ChecklistPanel` under `src/components/ui`.
- Verification note: `git diff --check` passed. `npm run build` could not start because dependencies are not installed locally and `astro` is not available in `node_modules/.bin`. Temporary `astro check` via `npm exec` ran, but current non-Worker-3 scaffold/page/data files have type errors in `src/data/cta-map.ts`, `src/data/site-map.ts`, `src/pages/starting-a-nonprofit.astro`, and `src/pages/working-board.astro`.

### Worker 2 Product IA and Routing Review

- Created the V2 boardroom navigation contract around `Next Meeting`, `Money & Audit`, `Executive Oversight`, `Risk & Safety`, `Minutes & Records`, `California Board Rules`, `Tools`, `Training`, and `Visit NPOlawyers.com`.
- Defined the two-path model with `/working-board` as the primary field-manual path and `/starting-a-nonprofit` as the secondary founder path.
- Mapped launch routes to the four primary actions: prepare/read, understand training, webinar/in-person inquiry, and visit `NPOlawyers.com`.
- Added contextual `NPOlawyers.com` referral prompts for audit, compensation, records, safety, governance disputes, formation, California rules, and general legal help.
- Added semantic route shells for `/working-board` and `/starting-a-nonprofit` without shared component or style edits.
- Verification note: `npm run build` passed after the Astro scaffold and local dependencies were available. Astro built `/`, `/next-meeting`, `/working-board`, and `/starting-a-nonprofit`; expected empty-content warnings appeared for placeholder content collections. `git diff --check` passed with only CRLF warnings on task files, and every route `ctaKeys` entry resolves to a `ctaMap` key.

### Worker 9 SEO, Accessibility, and QA Review

- Added shared SEO helpers, canonical URL normalization, Open Graph/Twitter card metadata, and JSON-LD defaults through `BaseLayout`.
- Added Astro static endpoints for `robots.txt`, `sitemap.xml`, and `rss.xml`, plus a custom `404` recovery page.
- Added `planning/SEO_ACCESSIBILITY_QA.md` with implemented SEO support, accessibility checklist items, four-primary-action review, known cross-worker route gaps, and verification notes.
- Verification note: `npm run check` passed with 0 errors, 0 warnings, and 0 hints. `npm run build` passed and generated 46 static pages, including `404.html`, `robots.txt`, `rss.xml`, and `sitemap.xml`. `git diff --check` passed with only CRLF normalization warnings on existing text files.
- Integrated follow-up: `/money-audit`, `/executive-oversight`, `/risk-safety`, and `/minutes-records` now have topic landing pages, and the sitemap includes them.

### Worker 10 Hostinger Deployment Review

- Updated `planning/HOSTINGER_DEPLOYMENT_PLAN.md` from a broad deployment plan into a concise operational Hostinger deployment guide for the current Astro static build.
- Added `planning/HOSTINGER_DEPLOYMENT_CHECKLIST.md` for staging/production uploads, including pre-build checks, build checks, `public_html` upload rules, cache purge, smoke tests, four-primary-action verification, and rollback.
- Deployment decision: use Astro static output for Hostinger. Current settings are `output: 'static'`, build command `npm run build`, output directory `dist/`, and Hostinger target `public_html`. Do not choose Node.js hosting unless future server-side behavior is approved.
- GitHub/Hostinger note: do not add heavyweight CI yet. Confirm whether the actual Hostinger plan can build source or only pull static files; if it only pulls files, use a generated `hostinger-dist` branch later.
- Environment note: static builds have no private runtime. Public form/webinar URLs are acceptable when intentional, but secrets must not be committed or referenced in client-rendered output.
- Rollback note: keep the previous successful `dist/` artifact or `public_html` backup, restore it on failed deploy, purge Hostinger/CDN cache, and retest homepage plus direct deep links.
- Verification note: the integrated `npm run build` now passes with `astro check` reporting 0 errors, 0 warnings, and 0 hints across 79 files, and Astro generates 50 static pages into `C:\CDX\dist`. The earlier SEO type issue and JSON-LD inline-script hint were fixed during integration. `git diff --check -- planning/HOSTINGER_DEPLOYMENT_PLAN.md planning/HOSTINGER_DEPLOYMENT_CHECKLIST.md tasks/todo.md` passed with only CRLF normalization warnings during Worker 10 review.
- AM check-in note: the working and review status commands failed because no AM session matched `C:\CDX`.

- The NPO Lawyers site uses a clean white/slate law-firm presentation with the central message "Providing Wisdom to the Nonprofit Sector." The training site should inherit trust, phone/contact access, and disclaimer discipline, but it should feel more like a practical learning library than a service brochure.
- The brainstorming site has a memorable voice and useful article concepts, especially the clarity/governance framing. Its top visual treatment is elegant, but the final site needs stronger content navigation, clearer CTAs, more accessible typography, and less reliance on stylized text for important meaning.
- The strongest differentiator is not generic nonprofit advice; it is legally literate, scenario-based board training grounded in real governance failure patterns.

## Setup Results

- Local git repository initialized at `C:\CDX`.
- Private GitHub repository created and pushed: `https://github.com/erewhonsgroup/CDX`.
- Admin collaborator invitations were created for `VoteWood`, `auronpep`, and `JWoodMedia`.
- AM status check-in failed because AM had no session matched to `C:\CDX`. The user later clarified that AM can be bypassed for this project, so no further AM check-ins are required unless explicitly requested.

## Added Planning Documents

- `planning/DESIGN_IMPLEMENTATION_PLAN.md`
- `planning/PARALLEL_WORK_PLAN.md`
- `planning/HOSTINGER_DEPLOYMENT_PLAN.md`
- `planning/TOOLING_RECOMMENDATIONS.md`
- `planning/STITCH_PROMPTS.md`
- `planning/COMPETITION_REVIEW_PACKAGE.md`
- `planning/BT_PLAN_V2_WORKER_CHANGES.md`

## Open Decisions

- Final program/domain name.
- Whether webinar registration is handled by embedded form, Calendly-style scheduling, Zoom registration, CRM form, or manual email.
- Whether downloads are fully free or require optional email capture.
- CMS preference. Default recommendation is MDX content collections in Astro; use a CMS only if non-developers need direct publishing access.
- Whether the training site should live on a subdomain of `NPOlawyers.com` or a separate branded domain.

## Palette Match And Deployment Access Plan

- [x] Inspect the temporary Hostinger reference site and extract its actual CSS palette.
- [x] Protect local SSH/deployment keys from git in `.gitignore`.
- [x] Generate a dedicated deployment SSH key and provide only the public key.
- [x] After approval, remap the Astro design tokens to the reference palette.
- [x] Verify the changed theme with `npm run build`, live route checks, and browser smoke testing.
- [x] Commit and push the palette update branch.

### Palette Match Results

- Reference palette applied from the temporary Hostinger site: `#E7E1DB`, `#1E2A43`, `#374157`, `#5F4B27`, `#7A6544`, and `#87721F`.
- Header and footer now render navy, body background renders beige, primary CTA renders navy, and muted/secondary accents use brown and gold.
- Browser computed-style smoke check on `http://127.0.0.1:8120/` confirmed the live tokens and no console warnings/errors.
- Mobile browser smoke check at 390px confirmed the mobile menu opens, desktop nav hides, and the palette is applied.
- In-app browser screenshot capture still timed out in the browser backend, so visual evidence is via rendered computed styles and live browser state rather than a saved screenshot.

## Hostinger Temporary Domain Deployment

- [x] Update static site URL/canonical config to `https://powderblue-bat-208812.hostingersite.com/`.
- [x] Run a fresh local production build.
- [x] Verify SSH key access to `u211961595@191.96.56.130:65002` without printing secrets.
- [x] Inspect the remote Hostinger directory layout and locate the correct `public_html`.
- [x] Back up any existing remote `public_html` contents before upload.
- [x] Upload the Astro `dist/` contents to the temporary domain.
- [x] Verify deployed homepage, deep links, downloads, sitemap, robots, and RSS over HTTPS.
- [x] Commit and push the deployment configuration/docs changes.

### Hostinger Temporary Domain Deployment Notes

- Fresh production build passed on 2026-05-19 with 0 Astro check errors, 0 warnings, and 50 static pages generated into `C:\CDX\dist`.
- Key-only SSH now works with the dedicated deploy key at `C:\CDX\.ssh\cdx_hostinger_deploy_ed25519`; the original key was accepted by the server but could not complete non-interactive signing.
- Remote web root confirmed as `/home/u211961595/domains/powderblue-bat-208812.hostingersite.com/public_html`.
- Pre-existing WordPress files were backed up before replacement at `/home/u211961595/cdx-backups/powderblue-bat-208812.hostingersite.com/public_html-20260519-132357.tgz`.
- Static Astro files were uploaded and extracted into the confirmed temporary-domain `public_html`.
- Added `public/.htaccess` so Hostinger/Apache serves `404.html` for unknown static paths.
- HTTPS smoke checks passed for `/`, `/next-meeting/`, `/articles/`, `/articles/board-is-supreme-you-are-not/`, `/tools/`, `/downloads/board-red-flags.md`, `/training/`, `/training/webinars/`, `/training/in-person/`, `/sitemap.xml`, `/robots.txt`, `/rss.xml`, and a custom 404 path.

### Integrated Local Live Prototype Review

- Ran all 10 worker roles as subagents in waves, then integrated build blockers and missing navigation routes in the main workspace.
- Local live server is running at `http://127.0.0.1:8120/`.
- Final `npm run build` passed with 0 errors, 0 warnings, and 0 hints; Astro generated 50 static pages.
- Live smoke checks returned 200 for homepage, next meeting, four topic pages, articles, scenarios, tools, California rules, training, contact, robots, sitemap, and RSS.
- Static internal-link check passed for 1,128 local `href` / `src` references across 50 HTML files.
- Browser DOM/console smoke check passed for the homepage and `/money-audit`; mobile nav opened at 390px width with no console warnings/errors. In-app screenshot capture timed out twice, so screenshot evidence was not captured.

## CGI Clone Structure Adaptation

- [x] Inspect `website-clones/cgi-governance-building-blocks` reference structure, screenshots, and React/CSS source.
- [x] Add a standalone Astro training-program page that follows the clone's section order using CDX copy and palette.
- [x] Add the minimum route discovery link from the existing training page.
- [x] Run production build verification.
- [x] Run live/local route smoke checks for the new standalone page.
- [x] Review and document results.

### CGI Clone Structure Adaptation Review

- Added `/training/board-training-program/` as a standalone Astro page inside the existing `BaseLayout`, so it uses the current header, footer, SEO pipeline, global tokens, `.button`, `.eyebrow`, and `TrainingInquiryForm`.
- Adapted the clone's section structure into CDX content: notice bar, course-style hero, facts strip, value cards, free-resource promise panel, tabbed curriculum, legal-help callout, working-board callout, scenarios, publisher/about section, related resources, inquiry form, and mobile sticky CTA.
- Added a discovery CTA/card on `/training/` and added the route to `staticSiteRoutes` for sitemap output.
- Excluded `website-clones/**` from TypeScript/Astro checking and git tracking so clone reference artifacts do not create third-party build warnings or accidental commits.
- Verification note: `npm run build` passed with 0 errors, 0 warnings, and 0 hints across 80 checked files; Astro generated 51 static pages. Local route smoke checks returned 200 for `/training/board-training-program/` and `/training/`; `/training/` contains the new program link; `dist/sitemap.xml` contains `/training/board-training-program/`.
- Visual QA note: Browser plugin was not exposed and project Playwright is not installed, so screenshots were captured with temporary Playwright CLI using the system Chrome channel. Desktop 1440px and mobile 390px screenshots were reviewed; mobile clipping found in the first Chrome-headless pass was fixed by tightening hero copy, using deterministic headline line groups, and adding mobile wrapping rules.

## Board Training Program Cross-Platform Debugging Pass

- [x] Confirm the local live route loads through the browser QA workflow.
- [x] Check desktop, tablet, and mobile screenshots for clipping, overlap, unreadable text, sticky CTA conflicts, and palette drift.
- [x] Exercise the primary actions: read resources, program details, inquiry anchor, and NPO Lawyers referral.
- [x] Exercise the tabbed curriculum control and verify visible state changes.
- [x] Patch only issues reproduced by rendered QA or static audit.
- [x] Run a fresh production build and route checks.
- [x] Document results and push any code changes.

### Board Training Program Cross-Platform Debugging Review

- Added a direct `/articles/` path to the standalone program page so all four requested actions are visible from this page: article library, program overview, webinar/in-person inquiry, and `NPOlawyers.com`.
- Fixed low-contrast dark-section buttons by adding page-scoped curriculum button colors and a footer-scoped secondary button override.
- Improved curriculum control semantics by changing the visual tabs into a named radio fieldset with `aria-controls`, panel IDs, and region labels.
- Fixed mobile sticky CTA overlap by adding safe-area-aware sticky padding and footer bottom breathing room.
- Verification note: Browser QA loaded `/training/board-training-program/`, confirmed title/URL, no console warnings/errors, no horizontal overflow, article/webinar/in-person/inquiry/`NPOlawyers.com` links, curriculum tab state changes, footer secondary contrast, and mobile footer clearance. Contrast spot checks were 11.03:1 for light text on navy, 5.75:1 for the selected tab, 8.38:1 for the packet label, and 7.35:1 for tab kicker text. `npm run check`, `git diff --check`, and `npm run build` passed; Astro generated 51 static pages. Live route checks returned 200 for `/training/board-training-program/`, `/training/`, `/articles/`, `/training/webinars`, and `/training/in-person`; built HTML contains the four primary action links and sitemap includes `/training/board-training-program/`.

## Hostinger Deployment - Board Training Program QA Build

- [x] Build the current static site locally.
- [x] Confirm SSH key access and the Hostinger temporary-domain webroot.
- [x] Back up the current remote `public_html`.
- [x] Upload and extract a staged build archive.
- [x] Replace the remote webroot from the staged build.
- [x] Verify live HTTPS routes, including `/training/board-training-program/`.
- [x] Document deployment results.

### Hostinger Deployment - Board Training Program QA Build Review

- Deployed the current Astro static build to `https://powderblue-bat-208812.hostingersite.com/`.
- Fresh local `npm run build` passed with 0 errors, 0 warnings, and 0 hints; Astro generated 51 static pages.
- Confirmed SSH key access and webroot `/home/u211961595/domains/powderblue-bat-208812.hostingersite.com/public_html`.
- Backed up the previous remote webroot to `/home/u211961595/cdx-backups/powderblue-bat-208812.hostingersite.com/public_html-20260519-094536.tgz`.
- Uploaded the build archive to `/home/u211961595/cdx-deploys/20260519-094536`, extracted it, verified `index.html`, `.htaccess`, and `training/board-training-program/index.html`, then replaced the confirmed webroot after a resolved-path guard.
- HTTPS smoke checks returned 200 for `/`, `/training/board-training-program/`, `/training/`, `/articles/`, trailing-slash webinar and in-person routes, `/sitemap.xml`, `/robots.txt`, and `/rss.xml`; a missing route returned 404.
- Remote HTML checks confirmed `Read the Article Library`, `panel-meetings`, `aria-controls="panel-meetings"`, and sitemap inclusion for `/training/board-training-program/`.
- In-app browser live check confirmed the deployed program page title, inquiry anchor, curriculum panel, article CTA, no horizontal overflow, and no console warnings/errors.
