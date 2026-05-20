# UI Anti-AI-Slop Research

## Research Question

How should V2 polish change the Board Training Principles website so it feels authored, credible, and specific instead of looking like a generic AI-generated landing page?

## Current UI Audit

Routes inspected on the deployed Hostinger build:

- `/`
- `/training/board-training-program/`
- `/articles/board-is-supreme-you-are-not/`
- `/tools/`
- `/california-board-rules/`

Browser findings:

- The deployed pages load with no console warnings or errors in the in-app browser.
- Homepage mobile at a 390px-class viewport showed slight horizontal overflow: `scrollWidth` 380 vs `clientWidth` 375.
- Audited key routes reported `img` / `picture` count of `0`. The site is visually competent, but it has almost no real visual assets.
- Major route H1s are consistently around `76px` on desktop. This creates a strong brand voice, but the repeated giant serif treatment can start to feel templated.
- The UI leans heavily on the same ingredients across pages: beige paper, brown display serif, navy header, uppercase mono labels, card grids, subtle shadows, and border-left callouts.
- The training program page has the strongest anti-generic direction because it includes a board-packet-style graphic and more page-specific composition.

Source/code observations:

- `src/components/home/HomeHero.astro` hardcodes a very large Georgia hero: `clamp(3rem, 7vw, 6.6rem)` with `line-height: 0.94`.
- `src/styles/global.css` defines `Source Serif 4`, `Libre Baskerville`, `Inter`, and `Source Sans 3`, but there is no visible font import or self-hosted font setup in the inspected source. The actual rendered visual relies on fallback fonts in key places.
- Shared `.boardroom-card` appears across many components and page templates. It is useful, but overuse makes the site feel assembled from one AI-friendly pattern.
- `--color-teal` is currently the same value as `--color-slate`, reducing topic differentiation.

## What Makes This Kind of Site Feel Like AI Slop

For this project, "AI slop" does not mean ugly. It means the design looks plausible from a distance but generic under inspection.

Common signals:

- One dominant palette used everywhere with little semantic variation.
- Huge headline type on every route, regardless of page purpose.
- Repeated card grids where a table, annotated document, checklist, timeline, or decision path would better match the content.
- Abstract gradients or paper backgrounds standing in for domain-specific visual evidence.
- Generic labels such as "Program Level", "Boardroom Field Manual", and repeated uppercase eyebrow text used as decoration rather than information.
- No authored artifacts: no document examples, diagrams, annotated packets, source snapshots, presenter identity, revision history, or visual proof that a real expert shaped the material.
- Over-polished consistency with too little contextual irregularity.

## Research Takeaways

### Trust Needs Authorship, Not More Polish

AI has made polished layouts cheap. Current UX discussion is shifting toward evidence of human authorship and accountability as a trust cue. The practical takeaway is not to make a legal training site messy. It is to add visible signs that the site was made from real board work: annotated packets, source-backed rules, named review processes, dated revisions, and lawyer-edited guidance.

Reference: Nielsen Norman Group's 2026 "handmade design" trust-signal discussion, surfaced via industry summaries and NN/g source links.

### Visual Hierarchy Should Vary by Job

NN/g's visual design principles emphasize scale, hierarchy, balance, contrast, and Gestalt grouping. The CDX site currently uses scale very aggressively but not enough variation by page type. Homepage and program pages can carry display type. Article pages, rule pages, and tool pages should shift toward editorial reading, evidence, and task completion.

Reference: NN/g visual design principles.

### Trustworthy Public-Service UI Starts With User Need

USWDS frames strong public-service design around real user needs, trust, accessibility, and continuity. That maps well to this site: directors do not need decoration first; they need to know what to ask, what document to review, what decision to record, and when to call counsel.

Reference: U.S. Web Design System design principles and design tokens guidance.

### Accessibility Is Part of Polish

Visual polish that clips, overflows, hides focus, or relies on low-contrast accents will read as careless. WCAG 2.2 adds newer focus, target-size, and predictable-interaction concerns beyond basic text contrast. The current site already has visible focus styles, but mobile overflow and cramped navigation should be treated as polish defects.

Reference: W3C WCAG 2.2 and WAI "What's New in WCAG 2.2".

## Recommended V2 UI Direction

### 1. Make the Visual Metaphor Concrete: The Board Packet

The strongest visual system for this site is not "law firm beige" or "generic educational cards." It is the board packet:

- Agenda.
- Budget page.
- Audit excerpt.
- Minutes excerpt.
- Conflict disclosure.
- Insurance schedule.
- Decision trail.
- Board question margin notes.

Implement this with reusable native UI patterns:

- `AnnotatedPacket`
- `AgendaPreview`
- `BudgetVarianceTable`
- `MinutesEvidenceBlock`
- `DecisionTrailRail`
- `SourceCheckedRule`
- `BoardQuestionMargin`

This would make the site feel specific to nonprofit board governance instead of generically professional.

### 2. Add Real or Highly Specific Visual Assets

The current key pages have zero `<img>` / `<picture>` elements. Add a small, curated visual asset set:

- Homepage: real or generated board packet / annotated agenda scene, not a vague courthouse or abstract gradient.
- Article pages: small editorial diagrams, sample document snippets, or a "boardroom evidence" module.
- Tools pages: document previews for each downloadable worksheet.
- Training page: keep the board-packet graphic direction, but replace repeated abstract cards with session materials and facilitator/process cues.

Rules:

- Use original, project-specific assets.
- Avoid stock photos of smiling boards, gavels, columns, or random conference rooms.
- Give images descriptive alt text and captions when they carry information.
- Do not render critical UI text only inside images.

### 3. Reduce Giant Serif Repetition

Keep the big serif as a signature homepage move, but stop using near-hero display scale everywhere.

Recommended type roles:

- Homepage H1: expressive display, max around current scale if the layout is repaired.
- Program page H1: expressive but slightly smaller.
- Article/rule/tool H1: editorial scale, roughly `3rem-4rem` desktop max, with stronger body hierarchy.
- Card titles: sans-serif or smaller serif, not every card trying to sound like a headline.

Also decide whether to self-host/import the intended fonts or intentionally use system fonts. The current fallback-heavy setup can look accidental.

### 4. Expand the Palette Without Losing Trust

The current palette reads as a single brown/beige family plus navy. Keep the serious foundation, but assign semantic accents:

- Money & Audit: deep teal or blue-green.
- Executive Oversight: slate/navy.
- Risk & Safety: burgundy used sparingly.
- Minutes & Records: brass/gold.
- California Rules: cool gray-blue plus source-note treatment.
- Training: navy with warm paper.

Fix `--color-teal` so it is not identical to `--color-slate`. Use accents to orient users by topic, not to decorate every card.

### 5. Replace Some Card Grids With Domain-Specific Structures

Do not remove cards entirely. Use fewer cards and more native boardroom structures:

- Instead of six equal cards: use an agenda list with vote/read/ask/record columns.
- Instead of generic topic cards: use a "Before the meeting / In the room / Minutes should show" sequence.
- Instead of a tool grid only: show document-preview rows with file type, use case, and related meeting moment.
- Instead of repeated callouts: use margin notes, source notes, and version/date metadata.

This will make the UI feel designed around the content rather than generated around a layout pattern.

### 6. Add Provenance and Human Review Cues

The site's credibility comes from legal literacy. Make that visible:

- "Reviewed by counsel" / "Attorney review required" states.
- Last updated dates on articles/rule pages.
- Source lists in a consistent, compact visual style.
- "Why this matters in the boardroom" notes.
- Named publisher relationship to California Center for Nonprofit Law / NPO Lawyers.

This is the right version of "handmade" for a legal education site: accountability, not faux sketchiness.

### 7. Simplify the Top Navigation

The desktop header is crowded at standard widths and the brand wraps. Consider:

- Keep `Next Meeting`, `Tools`, `Training`, and `Visit NPOlawyers.com` as top-level actions.
- Group the four topic areas under `Topics` or a static topic landing page.
- Keep California rules visible if it is a differentiator, but do not make every topic compete equally in the header.

This reduces template-like nav density and gives the first viewport more authority.

### 8. Add a Design QA Gate

Before declaring V2 polish done, require:

- Desktop and mobile screenshots for homepage, article, tools, training, and California rules.
- No horizontal overflow at 375px, 390px, and 430px.
- H1 scale check by page type.
- Card repetition audit: each page must justify why it uses cards instead of lists/tables/doc previews.
- Image/provenance audit: important pages need at least one concrete domain visual or source/review cue.
- Contrast and focus checks for primary/secondary/legal buttons.

## Priority Implementation Plan

### Phase 1: Stop the Most Obvious Slop Signals

- Fix mobile horizontal overflow.
- Reduce article/tool/rule H1 max sizes.
- Fix the font strategy: self-host/import selected fonts or simplify to an intentional system pair.
- Fix `--color-teal` and define semantic topic accents.
- Reduce repeated uppercase eyebrow labels where they do not add meaning.

### Phase 2: Add Domain-Specific Visual Language

- Create one board-packet visual system and reuse it across homepage, tools, article templates, and training.
- Add document preview components for downloads.
- Add annotated agenda / minutes / budget examples.
- Make training page visuals the standard for the rest of the site.

### Phase 3: Replace Generic Layout Patterns

- Convert repeated grids into agenda rows, decision trails, tables, before/during/after flows, and source-backed rule modules.
- Add route-specific composition so homepage, article, tool, training, and rule pages do not all feel like the same template.
- Add provenance/review metadata to public legal-sensitive content.

### Phase 4: Visual QA and Stakeholder Review

- Run rendered browser QA across key routes.
- Capture desktop/mobile screenshots.
- Compare before/after for perceived specificity, not only correctness.
- Keep a small "anti-slop checklist" in PRs for future UI changes.

## Research Sources

- Nielsen Norman Group / industry summaries on handmade design as a trust signal in the AI era:
  - https://www.nngroup.com/articles/handmade-designs/
  - https://www.krosoft.nl/digest/digest-ai-discourse-2026-04-11/
  - https://mondo.com/insights/handmade-designs-the-new-trust-signal-in-the-age-of-ai/
- Nielsen Norman Group visual design principles:
  - https://media.nngroup.com/media/articles/attachments/Principles_Visual_Design-A4.pdf
  - https://www.nngroup.com/articles/principles-visual-design/
- U.S. Web Design System:
  - https://designsystem.digital.gov/design-principles/
  - https://designsystem.digital.gov/design-tokens/
  - https://designsystem.digital.gov/design-tokens/spacing-units/
- W3C / WAI accessibility references:
  - https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/
  - https://www.w3.org/TR/WCAG22/

## Verification Notes

- Browser plugin path used through the in-app browser.
- Homepage, training, article, tools, and California rules routes loaded successfully.
- No relevant console warnings/errors appeared on inspected pages.
- Mobile homepage showed slight horizontal overflow and should be treated as a UI polish defect.
- No production code was changed; this is a research and design-direction artifact.
