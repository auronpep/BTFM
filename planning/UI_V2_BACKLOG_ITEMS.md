# UI-Based V2 Backlog Items

These are issue-ready UI items derived from `planning/UI_ANTI_AI_SLOP_RESEARCH.md`. They intentionally avoid backend, GitHub workflow, deployment, and general content-strategy work. The goal is to make the site feel authored, specific, and boardroom-native.

## P0: Immediate Polish Defects

### 1. Fix Mobile Horizontal Overflow on Homepage

Priority: P0

User impact: Mobile users can get a subtle sideways scroll, which makes the page feel unfinished.

Scope:

- Audit `/` at 375px, 390px, and 430px.
- Identify whether overflow comes from hero buttons, header brand, hero H1 width, or section padding.
- Patch the smallest layout rule that removes overflow.

Likely files:

- `src/components/home/HomeHero.astro`
- `src/components/Header.astro`
- `src/styles/global.css`

Acceptance criteria:

- No horizontal overflow at 375px, 390px, or 430px.
- Homepage hero text and CTAs remain readable.
- Mobile menu still opens and fits in viewport.

### 2. Establish Page-Type H1 Scale Rules

Priority: P0

User impact: Giant serif headlines on every major route make the site feel template-generated instead of intentionally editorial.

Scope:

- Keep the expressive homepage H1.
- Reduce H1 scale for article, tool, rule, and topic pages.
- Make program page H1 expressive but less dominant than homepage.
- Add a documented type role scale in CSS.

Likely files:

- `src/styles/global.css`
- `src/components/home/HomeHero.astro`
- `src/components/articles/ArticleTemplate.astro`
- `src/components/tools/ToolHero.astro`
- `src/components/topic/TopicLanding.astro`
- `src/pages/california-board-rules/index.astro`
- `src/pages/training/board-training-program.astro`

Acceptance criteria:

- Homepage remains the only near-display-scale H1.
- Article/rule/tool H1 maxes at a calmer editorial size.
- Desktop screenshots show distinct hierarchy between page types.

### 3. Make Font Strategy Intentional

Priority: P0

User impact: Current CSS names premium fonts, but key surfaces appear to rely on fallback Georgia/system fonts. That can look accidental.

Scope:

- Decide between self-hosted/imported brand fonts or a fully intentional system-font direction.
- Remove hardcoded `Georgia` / `ui-sans-serif` overrides where they fight global tokens.
- Ensure headings, body, nav, labels, and buttons use consistent type tokens.

Likely files:

- `src/styles/global.css`
- `src/components/home/HomeHero.astro`
- `src/components/home/HomeProblemPicker.astro`
- `src/components/home/HomeBoardJobs.astro`
- `src/components/home/HomeResourceSections.astro`
- `src/components/next-meeting/MeetingProblemPicker.astro`
- `src/pages/training/board-training-program.astro`

Acceptance criteria:

- Computed fonts match the documented design system.
- No page-specific font stack looks like a forgotten prototype override.
- Build passes.

## P1: Core Anti-Slop Visual System

### 4. Create Board Packet Visual Components

Priority: P1

User impact: The site needs domain-specific UI, not generic cards. Board-packet components make the site feel made for real board work.

Scope:

- Add reusable packet/document UI components:
  - `AnnotatedPacket`
  - `AgendaPreview`
  - `BudgetVarianceTable`
  - `MinutesEvidenceBlock`
  - `DecisionTrailRail`
  - `BoardQuestionMargin`
- Keep these native HTML/CSS, not flat screenshots.

Likely files:

- `src/components/ui/AnnotatedPacket.astro`
- `src/components/ui/AgendaPreview.astro`
- `src/components/ui/BudgetVarianceTable.astro`
- `src/components/ui/MinutesEvidenceBlock.astro`
- `src/components/ui/DecisionTrailRail.astro`
- `src/components/ui/BoardQuestionMargin.astro`
- `src/styles/global.css`

Acceptance criteria:

- Components render realistic agenda, packet, minutes, and decision examples.
- Components are responsive and accessible.
- Components can replace at least one generic card section.

### 5. Replace Homepage Abstract Hero With Board-Packet Scene

Priority: P1

User impact: The homepage currently relies on typography and a small guide box. A board-packet scene would make the subject matter immediately visible.

Scope:

- Add a specific visual: annotated agenda, packet checklist, minutes excerpt, or board book spread.
- Keep text code-native.
- Preserve the primary CTAs.
- Reduce abstract gradient reliance.

Likely files:

- `src/components/home/HomeHero.astro`
- `src/components/ui/AnnotatedPacket.astro`
- `src/styles/global.css`

Acceptance criteria:

- First viewport communicates "board meeting / board packet" without reading every word.
- No stock-looking courthouse, gavel, or generic conference image.
- Mobile first viewport remains readable with next-section hint.

### 6. Redesign Tools Index Around Document Previews

Priority: P1

User impact: Tools should feel like practical files, not just another card library.

Scope:

- Replace or supplement the launch tool grid with document-preview rows/cards.
- Show file type, meeting moment, what the board does with it, and related route.
- Add visual previews for checklist, worksheet, calendar, authority map, and scorecard.

Likely files:

- `src/pages/tools/index.astro`
- `src/components/tools/ToolGrid.astro`
- `src/components/tools/ToolPreviewRow.astro`
- `src/content/tools/*`

Acceptance criteria:

- Users can scan tools by meeting use, not just title.
- At least five launch tools have preview-style UI.
- Download CTAs stay visible.

### 7. Redesign Article Template With Evidence Rail

Priority: P1

User impact: Article pages should feel like field-manual guidance with proof and boardroom artifacts, not a generic legal blog.

Scope:

- Reduce article H1 scale.
- Add an evidence/provenance rail with last updated, review status, source notes, related packet item, and legal escalation.
- Add optional board-packet snippet or minutes example near the top.

Likely files:

- `src/components/articles/ArticleTemplate.astro`
- `src/components/legal/AttorneyReviewFlag.astro`
- `src/components/legal/SourceList.astro`
- `src/components/ui/MinutesEvidenceBlock.astro`

Acceptance criteria:

- Article first viewport shows guidance plus review/source context.
- Legal-sensitive pages clearly show review status.
- Reading layout improves instead of becoming more decorative.

### 8. Redesign California Rules Pages As Source-Checked Rule UI

Priority: P1

User impact: California rules are a credibility differentiator. They need to look sourced, conservative, and reviewed.

Scope:

- Add a rule-page component pattern with source, rule summary, boardroom issue, when to call counsel, and attorney-review state.
- Visually distinguish official-source notes from ordinary cards.
- Add last reviewed / attorney review required metadata UI.

Likely files:

- `src/pages/california-board-rules/index.astro`
- `src/pages/california-board-rules/[slug].astro`
- `src/components/legal/SourceList.astro`
- `src/components/legal/AttorneyReviewFlag.astro`
- `src/components/ui/SourceCheckedRule.astro`

Acceptance criteria:

- Rule pages no longer feel like generic article cards.
- Source and review status are visible without overwhelming the page.
- CTAs to training and NPO Lawyers remain clear.

### 9. Convert Repeated Card Grids Into Boardroom Structures

Priority: P1

User impact: Repeated cards are the clearest "AI-generated" layout signal.

Scope:

- Audit card grids on homepage, topic pages, tools, training, and California rules.
- Replace at least three generic grids with:
  - agenda rows
  - before/during/after flows
  - decision trails
  - source-backed rule modules
  - document preview lists

Likely files:

- `src/components/home/HomeProblemPicker.astro`
- `src/components/home/HomeResourceSections.astro`
- `src/components/topic/TopicLanding.astro`
- `src/pages/tools/index.astro`
- `src/pages/training/board-training-program.astro`

Acceptance criteria:

- No key route feels like a repeated card wall.
- Replacements match the user's boardroom task.
- Mobile layout remains simple and readable.

### 10. Add Semantic Topic Accent System

Priority: P1

User impact: Users need topic orientation. Current palette is mostly one brown/beige family, and `--color-teal` duplicates slate.

Scope:

- Fix `--color-teal`.
- Add topic accent tokens for Money & Audit, Executive Oversight, Risk & Safety, Minutes & Records, California Rules, Tools, and Training.
- Apply accents to navigational and content cues, not every surface.

Likely files:

- `src/styles/global.css`
- `src/data/navigation.ts`
- `src/data/topic-pages.ts`
- `src/components/topic/TopicLanding.astro`
- `src/components/Header.astro`

Acceptance criteria:

- Each major topic has a subtle but recognizable UI accent.
- Palette still feels serious and nonprofit-law appropriate.
- Contrast passes for text and controls.

## P2: Distinctiveness and Review Quality

### 11. Simplify Desktop Navigation

Priority: P2

User impact: The current header is dense and wraps the brand, making the top of the site feel cramped.

Scope:

- Test grouping topic routes under `Topics`.
- Keep top-level access to `Next Meeting`, `Tools`, `Training`, and `Visit NPOlawyers.com`.
- Preserve California Rules visibility if it remains a key differentiator.

Likely files:

- `src/components/Header.astro`
- `src/data/navigation.ts`

Acceptance criteria:

- Header feels calmer at laptop width.
- All existing routes remain discoverable.
- Mobile nav remains straightforward.

### 12. Add UI Icons Only Where They Clarify Tasks

Priority: P2

User impact: Carefully chosen icons can help scanning. Generic icon rows would add more slop.

Scope:

- Add a small icon vocabulary for read, ask, vote, record, source, warning, training, download, and legal escalation.
- Use icons in buttons/tool rows/status states where they clarify action.
- Avoid decorative icon grids.

Likely files:

- `src/components/ui/Icon.astro`
- `src/components/tools/ToolPreviewRow.astro`
- `src/components/legal/AttorneyReviewFlag.astro`
- `src/components/conversion/*`

Acceptance criteria:

- Icons have consistent stroke/fill style.
- Icons improve scanning of task states.
- No decorative icon clutter.

### 13. Add Provenance and Review Metadata UI

Priority: P2

User impact: Human review cues make the site feel accountable and reduce AI-generated distrust.

Scope:

- Show updated date, review state, source status, and attorney-review requirement on legal-sensitive pages.
- Add compact metadata components to articles, scenarios, tools, and rule pages.
- Keep wording conservative.

Likely files:

- `src/components/legal/AttorneyReviewFlag.astro`
- `src/components/legal/SourceList.astro`
- `src/components/articles/ArticleTemplate.astro`
- `src/components/scenarios/ScenarioTemplate.astro`
- `src/pages/california-board-rules/[slug].astro`

Acceptance criteria:

- Review/source status is visible near the top of relevant pages.
- Metadata does not interrupt reading.
- Legal disclaimer remains present.

### 14. Create Visual Asset Pack for V2

Priority: P2

User impact: The site needs specific visual evidence, not stock imagery or pure CSS decoration.

Scope:

- Create a small set of reusable visual assets:
  - annotated agenda
  - budget variance sheet
  - minutes excerpt
  - annual calendar preview
  - board packet cover
- Use generated or hand-built assets, but keep real UI text code-native where possible.

Likely files:

- `public/images/`
- `src/components/ui/AnnotatedPacket.astro`
- `src/components/tools/*`

Acceptance criteria:

- Key routes include domain-specific visuals.
- Assets are optimized and responsive.
- Alt text is descriptive where images convey meaning.

### 15. Add UI Design QA Checklist to PR Reviews

Priority: P2

User impact: Prevents future visual drift back into generic generated patterns.

Scope:

- Create a UI checklist for screenshots, overflow, typography scale, card repetition, visual assets, source/provenance cues, contrast, and focus.
- Reference it from future PR templates if/when `.github/` setup is added.

Likely files:

- `planning/UI_DESIGN_QA_CHECKLIST.md`
- later: `.github/pull_request_template.md`

Acceptance criteria:

- Checklist is short enough to use on every UI PR.
- Requires desktop and mobile screenshots for visible changes.
- Includes an "anti-slop" card/grid repetition check.

## Suggested First Sprint

Do these first because they produce the highest visible improvement with the least architecture risk:

1. Fix homepage mobile overflow.
2. Establish page-type H1 scale rules.
3. Make font strategy intentional.
4. Fix semantic topic accents, including `--color-teal`.
5. Add a first native `AnnotatedPacket` / `AgendaPreview` component.
6. Use that component in the homepage hero.

## Non-UI Items Explicitly Excluded

- GitHub Actions.
- Dependabot.
- Hostinger deployment automation.
- New backend form processing.
- General content backlog expansion.
- Legal copy rewriting except where needed for metadata labels or UI placement.
