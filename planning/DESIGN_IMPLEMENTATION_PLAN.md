# CDX Design and Implementation Plan

## Executive Summary

Build a free nonprofit board training website that feels like a practical governance library backed by a serious nonprofit law firm. The winning version should not look like a generic law firm microsite or a simple blog. It should look like a structured training resource: articles, scenarios, downloadable templates, webinar registration, in-person training inquiry, and a clear path back to `NPOlawyers.com`.

Recommended build direction: Astro static site, MDX content collections, restrained editorial design, Hostinger static deployment, and a clear content architecture built around board duties, meetings, annual rhythms, risk, startup governance, and real scenarios.

Competition framing: this proposal should win by being the easiest to build, easiest to maintain, and clearest to present to the boss. The visual design should be polished, but the real advantage is that the content system and worker plan can become a production website quickly.

V2 direction: after reviewing `docs/BT_Plan_v2.md`, the primary launch concept should be sharper than a general resource library. Treat the site as `The Boardroom Field Manual` for working California nonprofit board members who already sit in board meetings and need help with budgets, audits, executive oversight, minutes, risk, and legal escalation.

## Primary Goals

1. Help nonprofit board members understand what a board actually does.
2. Turn the firm's existing training knowledge into a scalable article and download library.
3. Convert qualified readers into webinar attendees or in-person training leads.
4. Reinforce NPO Lawyers as the authoritative legal services destination.

## Audiences

- Primary launch persona: working board members of established California nonprofits, especially organizations with meaningful revenue, paid staff, public filings, insurance, budgets, audits, and board accountability.
- New nonprofit board members who do not know what their role requires.
- Founders building a board for a new charity.
- Board chairs trying to run cleaner meetings.
- Executive directors who need their board to govern better.
- Churches, schools, youth-serving nonprofits, museums, business leagues, and poverty relief organizations.
- Existing NPO Lawyers prospects who need education before engaging counsel.

## Reviewed Inputs

Local project documents:

- `docs/Firm Book 200523.docx`
- `docs/Syllabus for Venice Conference.docx`
- `docs/Training for OC for one hour.docx`

Websites:

- `https://NPOlawyers.com`
- `https://mediumslateblue-caterpillar-718620.hostingersite.com/`

Research anchors:

- IRS public charity lifecycle: `https://www.irs.gov/charities-non-profits/charitable-organizations/life-cycle-of-a-public-charity`
- IRS annual filing and forms: `https://www.irs.gov/charities-non-profits/annual-filing-and-forms`
- California Attorney General Guide for Charities: `https://oag.ca.gov/sites/all/files/agweb/pdfs/charities/publications/guide_for_charities.pdf`
- BoardSource board roles and responsibilities: `https://boardsource.org/fundamental-topics-of-nonprofit-board-service/roles-responsibilities/`
- National Council of Nonprofits board roles: `https://www.councilofnonprofits.org/running-nonprofit/governance-leadership/board-roles-and-responsibilities`
- WCAG 2.2: `https://www.w3.org/TR/WCAG22/`
- Google Search Central SEO starter guide: `https://developers.google.com/search/docs/fundamentals/seo-starter-guide`

## Site Review Findings

### NPOlawyers.com

Strengths to inherit:

- Serious, credible law-firm tone.
- Clear nonprofit sector positioning: "Providing Wisdom to the Nonprofit Sector."
- Existing practice-area breadth: charities, education, donor solicitation, political activity, museums, business leagues.
- Familiar slate/navy palette and clean service navigation.
- Contact and phone paths are visible.

Gaps the training site should solve:

- The firm site is service-oriented, not learning-path oriented.
- Blog/content discovery is secondary.
- It does not present board training as a standalone educational product.

### Hostinger Brainstorming Site

Strengths to retain:

- Strong concept: "Many boards are active. Few are effective."
- Memorable training voice around board clarity.
- Useful article seeds: 40-40-20 rule, chain of command, strategy/safety/audit, insurance, motions.
- Warm stone, navy, and gold direction has potential.

Gaps to correct:

- Too much critical text depends on decorative styling.
- Navigation is shallow.
- The article/resource structure is not yet built for a real content library.
- The homepage needs stronger four-action routing.
- The final site needs better accessibility, mobile discipline, and content hierarchy.

## Positioning

Recommended public positioning:

> A practical boardroom field manual for California nonprofit leaders who need to govern serious organizations without micromanaging them.

Supporting idea:

> Free articles, scenarios, and downloadable tools from nonprofit lawyers who work with boards before, during, and after governance problems appear.

Tone:

- Plainspoken.
- Calm.
- Legally literate.
- Practical enough for volunteers.
- Serious enough for executive directors and board chairs.

Avoid:

- "Inspirational nonprofit" fluff.
- Fear-based legal marketing.
- Dense legalese.
- Generic consulting language.

## Information Architecture

Primary navigation:

- `Next Meeting`
- `Money & Audit`
- `Executive Oversight`
- `Risk & Safety`
- `Minutes & Records`
- `California Board Rules`
- `Tools`
- `Training`
- `Visit NPOlawyers.com`

Page map:

- `/`
  Homepage with four primary actions, featured articles, beginner path, downloads, and training CTA.
- `/articles`
  Filterable article index.
- `/articles/[slug]`
  Long-form article template.
- `/boards-101`
  Guided learning path for new board members.
- `/scenarios`
  Scenario library organized by issue type.
- `/scenarios/[slug]`
  Scenario template with facts, board issue, recommended board behavior, related download, and training CTA.
- `/downloads`
  Template/checklist library.
- `/training`
  Training program overview.
- `/training/webinars`
  Webinar registration page.
- `/training/in-person`
  In-person training inquiry page.
- `/about`
  Project relationship to California Center for Nonprofit Law.
- `/contact`
  General training inquiry.

V2 route additions and replacements:

- `/next-meeting`
  Meeting-prep chooser for agenda items such as budget approval, audit/Form 990, executive report, compensation, conflicts, safety, bylaws, annual meeting, and difficult board issues.
- `/working-board`
  Primary learning path for established nonprofits with staff, revenue, audits, risk, public filings, and executive oversight.
- `/starting-a-nonprofit`
  Secondary path for founders, first boards, formation, first meetings, fiscal sponsorship, and tax exemption.
- `/money-audit`
  Budget, audit, finance, Form 990, internal controls, and audit committee material.
- `/executive-oversight`
  CEO/ED reports, delegation, board authority, executive evaluation, and trust-but-verify content.
- `/risk-safety`
  Insurance, safety, youth protection, personnel, compliance, donor restrictions, and risk review.
- `/minutes-records`
  Minutes, motions, board packets, records, bylaws, policies, and annual meetings.
- `/california-board-rules`
  California-specific rules and issue spotters, with source notes and attorney-review flags.
- `/tools`
  Board Packet Lab, Question Bank, Red Flag Library, Self-Assessment, and downloadable tools.

## Homepage Specification

First viewport:

- Program identity: `Board Training Principles` unless a final name is chosen.
- Firm relationship: `A free governance resource from California Center for Nonprofit Law`.
- Headline: `Practical training for nonprofit boards that need to govern well.`
- Copy: one short paragraph explaining free articles, scenarios, downloads, webinars, and in-person training.
- Four primary actions:
  - `Read Articles`
  - `Explore the Training Program`
  - `Register for a Webinar`
  - `Visit NPO Lawyers`
- Visual: real meeting table, agenda packet, board book, or calm institutional interior. The image should connect to board work, not just courts or columns.

Homepage sections:

1. Featured scenario.
2. "New to a board? Start here."
3. Three featured downloads.
4. Board training program summary.
5. Latest articles.
6. Firm trust footer with phone, disclaimer, and NPO Lawyers link.

V2 homepage override:

1. Lead with `Board service gets serious when the organization gets serious.`
2. Primary CTA: `Prepare for Your Next Board Meeting`.
3. Secondary CTA: `Open the $3M Board Member Guide`.
4. Keep training and NPO Lawyers actions visible.
5. Add a boardroom problem picker before generic article browsing.
6. Add the three jobs of the board: Strategy, Safety, Audit.
7. Feature tools before latest articles.
8. Feature mature-board scenarios before beginner education.

## Visual System

Color direction:

- Deep navy: `#1e2a43`
- Firm slate: `#364359`
- Warm paper: `#f4efe8`
- Soft stone: `#e7e1db`
- Muted gold: `#8a6a2f`
- Practical teal accent: `#376b5f`
- Muted berry accent: use sparingly for labels or alerts only.

Typography:

- Editorial serif for H1/H2 headings.
- Clean sans-serif for body, nav, cards, buttons, forms, and filters.
- Decorative script only as a subtle logo/accent, not for important UI or body copy.

Layout principles:

- Dense but readable.
- Article cards should show category, title, summary, reading time, and related download if available.
- Training CTAs should be direct and not overly salesy.
- Downloads should look like useful operating files.
- Avoid nested cards, decorative gradients, and over-stylized law imagery.

Accessibility requirements:

- Meet WCAG 2.2 AA contrast minimums for text.
- Use visible focus states and keyboard-friendly navigation.
- Do not render critical text as an image.
- Maintain readable line lengths for long articles.
- Use real headings, landmarks, labels, and descriptive link text.

## Content Model

Recommended content collections:

### Article

Fields:

- `title`
- `slug`
- `description`
- `category`
- `audience`
- `difficulty`
- `readingTime`
- `publishedDate`
- `updatedDate`
- `relatedDownloads`
- `relatedScenarios`
- `primaryCta`
- `seoTitle`
- `seoDescription`

### Scenario

Fields:

- `title`
- `slug`
- `issueType`
- `boardStage`
- `facts`
- `risk`
- `boardQuestion`
- `recommendedBoardAction`
- `relatedArticles`
- `relatedDownloads`
- `trainingTieIn`

### Download

Fields:

- `title`
- `slug`
- `fileType`
- `description`
- `category`
- `relatedArticles`
- `isGated`
- `filePath`

### Training Event

Fields:

- `title`
- `type`
- `date`
- `duration`
- `audience`
- `registrationUrl`
- `status`
- `description`

## Initial Content Backlog

Cornerstone articles:

- What does a nonprofit board actually do?
- The chain of command: members, board, officers, staff, volunteers.
- The duties of care, loyalty, and obedience in plain English.
- Why individual board members do not have individual authority.
- How to prepare for a board meeting.
- What good minutes should record.
- What good minutes should not record.
- The 40-40-20 rule for better board meetings.
- Strategy, safety, audit: a simple annual board framework.
- How boards should review a budget.
- How to handle conflicts of interest.
- Why compensation decisions require disinterested approval.
- What belongs in a policy book.
- What every board should know about Form 990 governance questions.
- Starting a nonprofit: start one, use a fiscal sponsor, or join an existing organization?
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

## Conversion Design

Every page gets a next step:

- Article page: related download plus training CTA.
- Scenario page: related article plus "Train your board on this issue."
- Downloads page: download file plus related guide.
- Training page: webinar registration plus in-person inquiry.
- Footer: NPO Lawyers link and contact information.

Do not over-gate downloads at launch. The site's credibility depends on being genuinely useful. If email capture is desired, make it optional or reserve it for webinar registration.

## Legal and Disclaimer Requirements

Global footer disclaimer:

> This site provides general educational information for nonprofit boards. It is not legal advice and does not create an attorney-client relationship. For legal advice about a specific organization or situation, contact qualified counsel.

Article template should include a shorter version near the end, especially on tax, employment, conflict, compensation, youth safety, and fundraising topics.

## Technical Recommendation

Use Astro static output.

Why:

- Content-heavy site.
- Fast pages and low JavaScript.
- MDX works well for articles and scenarios.
- Static output deploys cleanly to Hostinger `public_html`.
- Easier for parallel workers to own content, components, and templates independently.

Avoid server rendering unless:

- Hostinger plan definitely supports Node.js app deployment.
- The site needs authenticated users, dynamic search, custom form processing, or live event management.

Recommended package direction:

- Astro.
- MDX integration.
- TypeScript.
- `pagefind` or simple generated indexes for search if needed.
- `sharp` or Astro image tools for local image optimization.
- Minimal analytics with privacy-respecting events.

## Hostinger Deployment Plan

Default path:

1. Build static site locally or in GitHub Actions.
2. Upload `dist/` contents to Hostinger `public_html`, or configure Hostinger Git deployment against a deploy branch containing built files.
3. Keep source on GitHub private.
4. Keep generated production files out of main source unless Hostinger Git deployment requires a dedicated deploy branch.
5. After deploy, use Hostinger no-cache preview and purge server/CDN cache if stale content appears.

Alternative path if using Node app hosting:

1. Add Astro Node adapter.
2. Connect GitHub repo in Hostinger hPanel.
3. Configure build command, output/start command, Node version, and environment variables.
4. Treat this as higher risk than static deployment.

Do not choose Node.js deployment just because it is available. Use it only when the approved feature set requires server behavior such as secure form processing, authenticated pages, API routes, or live CMS rendering.

Detailed deployment checklist: `planning/HOSTINGER_DEPLOYMENT_PLAN.md`.

## Implementation Phases

### Phase 1: Prototype

- Scaffold Astro.
- Implement visual tokens, header, footer, article card, CTA blocks.
- Build homepage, article index, article template, training page.
- Add 3 sample articles, 2 scenarios, 2 downloads.

### Phase 2: Content System

- Add full content collections.
- Add category/tag filtering.
- Add download library.
- Add scenario template.
- Add SEO metadata and sitemap.

### Phase 3: Conversion

- Add webinar page and in-person training inquiry.
- Add form or external registration integration.
- Add event tracking for the four primary actions.
- Add NPO Lawyers cross-links.

### Phase 4: Polish and Launch

- Complete initial content set.
- Verify mobile and desktop layouts.
- Run accessibility and SEO checks.
- Deploy to Hostinger staging or temporary domain.
- Prepare boss review package with screenshots and URL.

## Definition of Done

- The four primary user actions are visible from the homepage.
- Article, scenario, download, and training templates are implemented.
- Site builds without errors.
- Mobile and desktop screenshots pass visual review.
- Keyboard navigation and focus states are usable.
- Legal disclaimer appears globally.
- `NPOlawyers.com` links are accurate.
- Hostinger deployment path is documented and tested.

## Parallel Build Strategy

The build should be split across worker-owned branches:

- Foundation and Astro scaffold.
- Design system.
- Homepage.
- Articles and scenarios.
- Downloads.
- Training/conversion forms.
- SEO/accessibility QA.
- Hostinger deployment.

Full worker ownership and merge sequencing are documented in `planning/PARALLEL_WORK_PLAN.md`.

## Competition Review

Use `planning/COMPETITION_REVIEW_PACKAGE.md` when comparing this proposal against Gemini, Claude, and Kimi outputs. The scorecard weights strategy fit, content architecture, visual credibility, conversion clarity, implementation realism, parallel execution, and accessibility/SEO readiness.
