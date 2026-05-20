# V2 UI Polish Sprint Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the first visible polish pass that moves the site away from generic card-grid landing-page patterns and toward a board-packet-native visual system.

**Architecture:** Keep the Astro static site architecture and existing content collections. Add small reusable board-packet UI components, tighten global typography tokens, then update the homepage hero as the first proof of the V2 design language.

**Tech Stack:** Astro 6, static HTML/CSS, existing content collections, browser QA through the in-app browser and system Chrome screenshots.

---

## File Structure

- Modify `src/styles/global.css`: font imports, type tokens, H1 page-role scale, topic accent tokens, button/card consistency.
- Modify `src/layouts/BaseLayout.astro`: add optional page body class support if needed for page-type typography.
- Modify `src/components/home/HomeHero.astro`: replace abstract guide-card hero with board-packet scene and fix mobile overflow.
- Modify `src/components/home/HomeProblemPicker.astro`: remove hardcoded prototype font stacks and use global tokens.
- Create `src/components/ui/AgendaPreview.astro`: reusable agenda/document preview component.
- Create `src/components/ui/AnnotatedPacket.astro`: reusable board-packet scene component.
- Modify `src/pages/index.astro`: pass any required homepage-specific props/classes if needed.
- Modify `tasks/todo.md`: track the sprint and verification results.

## Task 1: Visual Red Checks

- [ ] **Step 1: Reproduce homepage mobile overflow before edits**

Run a browser measurement at `375`, `390`, and `430` widths.
Record whether any mobile viewport reports `scrollWidth > clientWidth` before production edits.

- [ ] **Step 2: Reproduce typography inconsistency before edits**

Run:

```powershell
rg -n "Georgia|Times New Roman|ui-sans-serif|system-ui" src\components src\pages src\styles
```

Expected before the fix: homepage and supporting components contain hardcoded prototype font stacks.

## Task 2: Typography System

- [ ] **Step 1: Add intentional font loading and tokens**

Update `src/styles/global.css` so the site loads Newsreader, Source Sans 3, and IBM Plex Mono, and sets:

```css
--font-serif: "Newsreader", "Source Serif 4", Georgia, serif;
--font-sans: "Source Sans 3", "Inter", "Segoe UI", system-ui, sans-serif;
--font-mono: "IBM Plex Mono", "SFMono-Regular", Consolas, monospace;
```

- [ ] **Step 2: Add page-role H1 classes**

Add role classes such as `.display-title`, `.editorial-title`, and `.tool-title` so homepage, program, article, and tool pages do not all use the same huge headline scale.

- [ ] **Step 3: Replace prototype font declarations**

Replace hardcoded `Georgia`, `"Times New Roman"`, and `ui-sans-serif` stacks in the touched homepage components with the CSS tokens.

## Task 3: Topic Accent Tokens

- [ ] **Step 1: Fix duplicated teal token**

Update `--color-teal` so it differs from slate and can support Money & Audit / finance accents.

- [ ] **Step 2: Add semantic accent tokens**

Add tokens for risk, records, rules, tools, and training accents, and correct the duplicated teal token so the finance/audit surfaces can use it distinctly. Use them sparingly as borders and labels, not broad decorative fills.

## Task 4: Board Packet Components

- [ ] **Step 1: Create `AgendaPreview.astro`**

Build a semantic agenda preview with agenda rows, status labels, and optional minutes note. Use native HTML/CSS and no raster text.

- [ ] **Step 2: Create `AnnotatedPacket.astro`**

Compose a packet cover, agenda preview, margin questions, and document tabs into one responsive visual component.

- [ ] **Step 3: Verify components render standalone in homepage hero**

Use the component in `HomeHero.astro` first. Do not wire it into every page during this sprint.

## Task 5: Homepage Hero

- [ ] **Step 1: Rebuild hero around the board packet**

Keep existing core copy and CTAs, but make the first viewport visually communicate board packet / agenda / minutes work.

- [ ] **Step 2: Fix mobile overflow**

Use `min-width: 0`, responsive grids, bounded title width, and button wrapping to remove horizontal overflow at 375, 390, and 430px.

- [ ] **Step 3: Keep next-section hint**

At desktop and mobile, the first viewport should still hint that there is useful content below.

## Task 6: Verification and Deployment

- [ ] **Step 1: Run static checks**

Run:

```powershell
npm run check
npm run build
git diff --check
```

Expected: all pass with 0 Astro errors/warnings/hints.

- [ ] **Step 2: Run browser QA**

Check `/`, `/training/board-training-program/`, an article detail page, `/tools/`, and `/california-board-rules/`.

Required browser checks:

- correct URL/title
- meaningful DOM content
- no framework overlay
- no relevant console warnings/errors
- no horizontal overflow at desktop and mobile widths
- homepage mobile menu still opens

- [ ] **Step 3: Capture screenshots**

Capture desktop and mobile screenshots for homepage and the program page.

- [ ] **Step 4: Commit and deploy**

Commit the code/docs changes, push the branch, build, back up Hostinger `public_html`, upload the new `dist`, and smoke-test the deployed domain.
