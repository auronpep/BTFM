# CDX Agent Instructions

This repository is the planning and build workspace for the nonprofit board training website published in connection with California Center for Nonprofit Law / NPO Lawyers.

## Mission

Win the website selection process by delivering the clearest, most practical, most buildable proposal and implementation. The site must serve four primary actions:

1. Read articles and scenarios.
2. Understand the board training program.
3. Register for a webinar or request in-person training.
4. Visit the main law firm site at `https://NPOlawyers.com`.

## Working Standard

- Keep the site educational first and conversion-aware second.
- Use the local Word documents as primary curriculum source material.
- Use `NPOlawyers.com` as the trust and firm-relationship source.
- Use the Hostinger brainstorming site only as a visual and voice starting point, not as final truth.
- Favor simple, static-first implementation unless a server requirement is proven.
- Treat accessibility, readable typography, legal disclaimers, and mobile layout as first-class requirements.

## Preferred Stack

- Astro static site with MDX/content collections.
- TypeScript where useful, but avoid unnecessary client JavaScript.
- Static output for Hostinger `public_html` deployment unless the hosting plan is confirmed to support Node.js app deployment and server rendering is needed.
- Forms should start as external embeds or a small hosting-compatible endpoint decided during implementation.

## Parallel Work Rules

- One worker owns one file area at a time.
- Do not refactor unrelated areas while completing a worker task.
- Keep PRs small enough to review visually.
- Use branches named `worker/<area>-<short-task>`.
- Before merging, run build/lint checks and verify the four primary actions still exist.

## Documentation Map

- `planning/DESIGN_IMPLEMENTATION_PLAN.md`: boss-ready design and implementation plan.
- `planning/PARALLEL_WORK_PLAN.md`: worker split, branch plan, merge plan, and definition of done.
- `planning/TOOLING_RECOMMENDATIONS.md`: Codex, Claude Code, Google Stitch, Hostinger, and supporting tools.
- `planning/STITCH_PROMPTS.md`: prompts for generating visual concepts in Google Stitch.
- `tasks/todo.md`: active task tracking and setup notes.

## Content Guardrails

- Include a clear educational-information disclaimer. The site must not imply legal advice or an attorney-client relationship.
- Avoid overpromising compliance outcomes.
- When writing articles, turn legal concepts into board behavior and scenarios.
- Prefer examples, checklists, and decision paths over abstract explanation.

## Verification Before Done

- Run the project build when implementation exists.
- Check desktop and mobile layouts.
- Verify keyboard focus, contrast, headings, link text, and form states.
- Verify all download links, external NPO Lawyers links, and training CTAs.
- Document checks in `tasks/todo.md` or the relevant PR.
