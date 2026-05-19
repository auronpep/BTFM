# Parallel Worker Execution Plan

## V2 Reframe Before Kickoff

`docs/BT_Plan_v2.md` changes the build. The primary launch experience should no longer be a generic blog/resource library for beginners. It should be a boardroom field manual for working California nonprofit board members, especially directors of established organizations with staff, budgets, audits, insurance, Form 990 exposure, and real board risk.

The old worker split was too content-library oriented. Before implementation starts, change the worker model this way:

- Add a product/IA worker to own the new boardroom navigation and two-path site model.
- Split downloads into a broader tools/labs worker.
- Add a California rules and legal-escalation worker.
- Change the homepage worker from "latest articles" to "next meeting/problem picker."
- Change article/scenario work from traditional blog templates to meeting-ready field manual templates.
- Keep startup/founder content, but make "Serving on a Working Board" the more prominent launch path.

## Revised Product Model

Primary identity:

- `The Principles of Board Training`

Primary product concept:

- `The Boardroom Field Manual`

Primary launch persona:

- A working board member of an established California nonprofit, roughly the $2M-$3M+ organization range, who needs to prepare for meetings, budgets, audits, executive oversight, minutes, risk, and legal escalation.

Two site paths:

- `Serving on a Working Board`: primary launch path.
- `Starting a Nonprofit`: secondary path using existing founder/startup content.

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

## Recommended Branching

- `main`: stable, reviewable work only.
- `worker/foundation-schema`
- `worker/product-ia`
- `worker/design-system`
- `worker/home-next-meeting`
- `worker/field-manual-tools`
- `worker/articles-scenarios`
- `worker/california-rules`
- `worker/training-conversion`
- `worker/seo-a11y-qa`
- `worker/hostinger-deploy`

Use small PRs. Each PR should include:

- Summary.
- Files changed.
- Screenshots for visible UI.
- Build/lint result.
- Known gaps.
- Any legal/attorney-review flags introduced.

## Worker Ownership Map

### Worker 1: Foundation and Content Schema

Owns:

- `package.json`
- `astro.config.*`
- `tsconfig.json`
- `src/env.*`
- `src/content/config.*`
- project scripts
- shared route/content constants

Tasks:

- Scaffold Astro static site.
- Add MDX/content collections.
- Add build, lint, and format scripts.
- Add base routing.
- Define content collections for:
  - `articles`
  - `scenarios`
  - `tools`
  - `meetingPrep`
  - `packetGuides`
  - `questionBank`
  - `redFlags`
  - `californiaRules`
  - `trainingEvents`
- Add shared fields:
  - `audience`
  - `boardStage`
  - `jurisdiction`
  - `useBefore`
  - `documents`
  - `questionsToAsk`
  - `minutesShouldShow`
  - `redFlags`
  - `legalEscalation`
  - `relatedTools`
  - `attorneyReviewRequired`

Dependencies:

- Can start immediately.

Done when:

- `npm install`, `npm run build`, and `npm run dev` work.
- Content schema supports the field manual templates without ad hoc fields.

### Worker 2: Product IA and Routing

Owns:

- `src/data/navigation.*`
- `src/data/site-map.*`
- `src/data/cta-map.*`
- `src/pages/working-board.*`
- `src/pages/starting-a-nonprofit.*`
- IA documentation updates

Tasks:

- Convert the site architecture to the V2 boardroom navigation.
- Define the two-path model: working board first, startup/founder second.
- Map every route to one of the four primary actions:
  - prepare/read
  - understand training
  - webinar/in-person inquiry
  - visit `NPOlawyers.com`
- Define contextual NPO Lawyers referral prompts by issue type.
- Define launch routes:
  - `/next-meeting`
  - `/money-audit`
  - `/executive-oversight`
  - `/risk-safety`
  - `/minutes-records`
  - `/california-board-rules`
  - `/tools`
  - `/training`
  - `/starting-a-nonprofit`

Dependencies:

- Can start immediately using markdown/data placeholders.

Done when:

- The route map and navigation match the boardroom field manual concept.
- Page owners can implement without inventing their own IA.

### Worker 3: Design System and Boardroom Components

Owns:

- `src/styles/`
- `src/components/ui/`
- `src/layouts/BaseLayout.*`
- `src/components/Header.*`
- `src/components/Footer.*`
- shared field manual components

Tasks:

- Implement the V2 palette:
  - Boardroom Ink `#101827`
  - Warm Paper `#F7F1E6`
  - Slate Blue `#3F4D8F`
  - Deep Teal `#176C68`
  - Brass `#C29A4A`
  - Copper `#A5562D`
  - Burgundy `#6E2F3B`
  - Fog `#E7EAF0`
  - White `#FFFFFF`
- Implement typography:
  - serious editorial serif for headlines
  - readable sans-serif for body/UI
  - tabular/mono styling for data and checklists
- Build components:
  - `BoardroomRule`
  - `AskThis`
  - `DoNotDoThis`
  - `MinutesShouldShow`
  - `LegalEscalation`
  - `CaliforniaNote`
  - `RedFlag`
  - `DecisionTrail`
  - `AuthorityMap`
  - `BoardPacketModeButton`
  - `ToolCard`
  - `QuestionCard`
  - `ChecklistPanel`
- Add responsive mobile navigation.
- Add accessible focus states and contrast-safe variants.

Dependencies:

- Can start after foundation branch exists.

Done when:

- UI primitives support the field manual, not just article cards.
- Components have sample states with realistic boardroom content.

### Worker 4: Homepage and Next Meeting Experience

Owns:

- `src/pages/index.*`
- `src/pages/next-meeting.*`
- `src/components/home/`
- `src/components/next-meeting/`

Tasks:

- Build homepage around the V2 promise:
  - `Board service gets serious when the organization gets serious.`
  - Practical guidance for directors reviewing budgets, reports, executives, risk, and decisions.
- Replace generic blog-first layout with:
  - `Prepare for Your Next Board Meeting`
  - `$3M Board Member Guide`
  - problem picker
  - three jobs of the board: Strategy, Safety, Audit
  - featured tools
  - featured scenarios
  - training CTA
  - contextual NPO Lawyers CTA
- Build `/next-meeting` with agenda choices:
  - Budget approval
  - Audit or Form 990
  - Executive director report
  - Compensation
  - Conflict of interest
  - Insurance/safety
  - Bylaws or policy changes
  - Difficult board member issue
  - Annual meeting

Dependencies:

- Needs Worker 2 IA decisions and Worker 3 components.

Done when:

- Homepage no longer reads like a basic blog.
- Users can enter by boardroom problem before browsing articles.

### Worker 5: Field Manual Tools and Labs

Owns:

- `src/pages/tools/`
- `src/components/tools/`
- `src/content/tools/`
- `src/content/meetingPrep/`
- `src/content/packetGuides/`
- `src/content/questionBank/`
- `src/content/redFlags/`
- `public/downloads/`

Tasks:

- Build Tools landing page.
- Build `Board Packet Lab`.
- Build `Board Question Bank`.
- Build `Board Red Flags`.
- Build `Mature Board Self-Assessment`.
- Build launch tools:
  - `$3M Board Member Checklist`
  - `Board Packet Review Sheet`
  - `Budget Deviation Worksheet`
  - `Audit Committee Readiness Checklist`
  - `Minutes Quality Scorecard`
  - `Board Authority Map`
  - `Annual Governance Calendar`
- Create downloadable files or source templates.

Dependencies:

- Needs content schema and design system components.

Done when:

- Tools feel like first-class product features, not a PDF dump.
- At least 5 launch tools render and link to real downloadable assets or clearly marked draft assets.

### Worker 6: Meeting-Ready Articles and Scenarios

Owns:

- `src/pages/articles/`
- `src/pages/scenarios/`
- `src/components/articles/`
- `src/components/scenarios/`
- `src/content/articles/`
- `src/content/scenarios/`

Tasks:

- Build article index by boardroom topic, not generic chronology.
- Build scenario index.
- Build field manual article template with sections:
  - `Use this when`
  - `The boardroom problem`
  - `The rule`
  - `What the board should ask`
  - `What not to do`
  - `What documents matter`
  - `What the minutes should show`
  - `Red flags`
  - `When this becomes legal`
  - `Download`
  - `Training CTA`
  - `Disclaimer`
- Build launch article series:
  - `Your Board Is Not a Startup Board Anymore`
  - `The Budget Is the Board's Permission Slip`
  - `Trust the Executive Director. Verify the System.`
  - `Stop Using Board Meetings to Listen to Reports`
  - `Minutes Are Evidence, Not Storytelling`
  - `The Board Is Supreme. You Are Not.`
  - `Safety Is a Board Issue`
- Build launch scenarios:
  - `The Board Packet Arrived Too Late`
  - `The Finance Committee Says Everything Is Fine`
  - `The Executive Director Wants a Raise`
  - `The Minutes Are Long, But No One Knows What Passed`
  - `A Director Keeps Contacting Staff`
  - `The Board Has Not Reviewed Insurance in Years`

Dependencies:

- Needs content schema and design system components.
- Needs Worker 7 for California/legal-sensitive topics.

Done when:

- Articles sound like boardroom judgment support, not generic education copy.
- At least 5 articles and 3 scenarios render with related tools and training CTAs.

### Worker 7: California Rules and Legal Escalation

Owns:

- `src/pages/california-board-rules/`
- `src/components/legal/`
- `src/content/californiaRules/`
- legal source notes
- attorney-review flag inventory

Tasks:

- Build California Board Rules landing page.
- Draft rule pages with careful disclaimers and source citations:
  - `$2M Audit Threshold`
  - `Audit Committee Basics`
  - `Form 990 and Public Disclosure`
  - `Attorney General Registry`
  - `Statement of Information`
  - `Conflicts of Interest`
  - `Compensation Approval`
  - `Minutes and Corporate Records`
  - `Charitable Solicitation`
- Maintain issue-specific `When to call counsel` triggers.
- Verify current source language from official sources before claims enter public copy.
- Mark content as `attorneyReviewRequired` where needed.

Dependencies:

- Needs content schema and legal/disclaimer components.

Done when:

- California-specific content is useful but not overclaiming.
- Legal claims are sourced and flagged for attorney review.

Primary official sources to prefer:

- California Attorney General charity laws and FAQs.
- California Attorney General audit requirements.
- IRS Form 990 instructions.
- IRS annual filing guidance.

### Worker 8: Training and Conversion

Owns:

- `src/pages/training/`
- `src/pages/contact.*`
- `src/components/forms/`
- contextual CTA components if not owned by Worker 3

Tasks:

- Build training overview around the Strategy, Safety, Audit framework.
- Build webinars page.
- Build in-person training inquiry page.
- Build contextual legal-help CTAs that route to `NPOlawyers.com`.
- Add issue-specific CTA variants:
  - audit structure
  - compensation
  - bylaws mismatch
  - conflict of interest
  - governance dispute
  - safety/youth protection
- Decide initial form strategy:
  - external registration link
  - embedded form
  - mailto fallback
  - Hostinger/PHP endpoint if approved
- Add conversion event names.

Dependencies:

- Needs IA, design system, and legal escalation guidance.

Done when:

- Free resource value remains primary.
- Training and legal referral paths are clear, contextual, and not heavy-handed.

### Worker 9: SEO, Accessibility, and QA

Owns:

- `src/utils/seo.*`
- sitemap/robots/rss files
- QA scripts
- accessibility notes
- screenshot checklist

Tasks:

- Add title/description/canonical/OpenGraph defaults.
- Add article/schema metadata where practical.
- Add sitemap and robots.
- Confirm navigation labels map to search intent:
  - California nonprofit board training
  - nonprofit board audit committee
  - nonprofit board meeting minutes
  - nonprofit board budget approval
  - nonprofit board executive oversight
- Run accessibility scans.
- Run keyboard checks.
- Verify WCAG contrast and target sizes.
- Run mobile/desktop screenshot review.
- Verify all four primary actions from homepage and relevant landing pages.

Dependencies:

- Starts after core pages exist, but can define SEO utility early.

Done when:

- QA report is added and launch blockers are documented.

### Worker 10: Hostinger Deployment

Owns:

- `.github/workflows/`
- deployment docs
- Hostinger-specific config notes

Tasks:

- Choose deployment path with the actual Hostinger plan.
- For static deployment, document manual upload and Git deploy branch options.
- If Hostinger Git deployment does not build source, add GitHub Actions deploy-branch workflow.
- For Node deployment, document adapter/start command/env requirements, but do not choose Node unless required.
- Add a repeatable deployment checklist.
- Add cache purge/no-cache preview steps.

Dependencies:

- Needs build output path from Worker 1.

Done when:

- A reviewer can deploy without guessing.

## Parallel Schedule

### Day 1

- Worker 1 scaffolds Astro and schema.
- Worker 2 locks V2 IA and route map.
- Worker 3 starts design tokens and components.
- Worker 7 verifies California/IRS source boundaries.

### Day 2

- Worker 4 builds homepage and `/next-meeting`.
- Worker 5 builds tools/labs shell.
- Worker 6 builds article/scenario templates.
- Worker 8 builds training/conversion shell.

### Day 3

- Add first content batch:
  - 5 working-board articles.
  - 3 scenarios.
  - 5 tools.
  - 3 California rules pages.
- Integrate contextual CTAs.
- Add SEO metadata.

### Day 4

- QA desktop/mobile.
- Accessibility fixes.
- Legal-review flag pass.
- Deployment rehearsal.
- Prepare screenshots.

### Day 5

- Final polish.
- Hostinger staging deployment.
- Boss review package.

## Merge Strategy

1. Merge `foundation-schema`.
2. Merge `product-ia`.
3. Merge `design-system`.
4. Merge `home-next-meeting`.
5. Merge `field-manual-tools` and `articles-scenarios`.
6. Merge `california-rules` after source checks and attorney-review flags are in place.
7. Merge `training-conversion`.
8. Merge `seo-a11y-qa`.
9. Merge `hostinger-deploy`.

## Conflict Avoidance

- Workers must not edit `src/styles/` unless assigned to design system.
- Workers must not change content schema without coordinating with Worker 1.
- Workers must not change navigation/route names without coordinating with Worker 2.
- Legal-sensitive public copy goes through Worker 7.
- Page owners may create local components only under their page-specific component folder.
- Shared UI changes go through Worker 3.
- Shared data shape changes go through Worker 1.

## Review Checklist

For every PR:

- Does it support the boardroom field manual concept?
- Does it support one of the four primary actions?
- Does it respect the working-board persona?
- Does it preserve the disclaimer?
- Does it build?
- Does it work on mobile?
- Are legal claims sourced or flagged for review?
- Are links real or clearly marked as placeholders?
- Are headings semantic?
- Is text readable against its background?
- Are file paths and ownership boundaries respected?

## Boss Review Package

Prepare:

- Live staging URL.
- 6 screenshots:
  - homepage desktop
  - homepage mobile
  - next meeting page
  - article page
  - tools page
  - training page
- Short positioning statement.
- Feature checklist.
- Known future enhancements.
- Implementation/deployment notes.

## Elegant Solution Check

Before finalizing:

- Does this feel like a boardroom field manual rather than a blog?
- Can any dynamic feature be replaced with simpler static content?
- Can any custom JavaScript be removed?
- Does every CTA serve one of the four primary actions?
- Does every article page offer a practical next step?
- Is the training offer clear without making the free resource feel like bait?
- Are legal-sensitive claims carefully limited and flagged?
