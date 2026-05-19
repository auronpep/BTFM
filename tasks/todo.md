# CDX Website Planning Todo

## Checklist

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
