# The Boardroom Field Manual

Nonprofit board training website and resource library, published in connection with the
California Center for Nonprofit Law / NPO Lawyers.

The site serves four primary actions:

1. Read articles and scenarios.
2. Understand the board training program.
3. Register for a webinar or request in-person training.
4. Visit the main law firm site at <https://NPOlawyers.com>.

## Getting started

Requires Node.js 20.19+ or 22.12+ (Vite 8).

```bash
npm install     # install dependencies
npm run dev     # Vite dev server with HMR
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Vite dev server with hot module replacement. |
| `npm run build` | Type-checks with `tsc -b`, then builds to `dist/`. |
| `npm run preview` | Serves the built `dist/` with Vite's preview server. |
| `npm start` | Serves the built `dist/` with `server.js` (plain Node, no dependencies). Run `npm run build` first. Honours `PORT`, default 3000. |
| `npm run lint` | ESLint across the repo. |

## Stack

- **React 19** with TypeScript.
- **Vite 8** for dev server and build.
- **Tailwind CSS 4**, loaded through `@tailwindcss/vite`. Design tokens live in the
  `@theme` block in `src/index.css`; there is no `tailwind.config.js`.
- **lucide-react** for icons.

No framework router is used. `src/components/Router.tsx` is a small hash-based router
(`#/tools/self-assessment`), which is what allows the built output to be dropped onto
static hosting without server rewrites. `src/App.tsx` maps each route to a view.

## Layout

| Path | Contents |
| --- | --- |
| `src/views/` | One component per route. |
| `src/components/` | Layout, router, and shared UI. |
| `src/data/` | Article, scenario, and rules content as typed modules. |
| `server.js` | Dependency-free static file server for the built `dist/`. |
| `planning/` | Design, deployment, and audit documents. |
| `docs/` | Source curriculum material. |
| `tasks/` | Task tracking and lessons. |

## Deployment

`npm run build` emits a fully static `dist/`. It can be uploaded to Hostinger
`public_html` as-is, or served by any static host. `npm start` exists for hosts that run
Node directly; it needs no dependencies beyond Node itself.

## Planning documents

- `planning/DESIGN_IMPLEMENTATION_PLAN.md` - design, content, UX, and implementation plan.
- `planning/PARALLEL_WORK_PLAN.md` - worker split, branch ownership, merge order, definition of done.
- `planning/BT_PLAN_V2_WORKER_CHANGES.md` - review of the updated BT plan and worker changes.
- `planning/HOSTINGER_DEPLOYMENT_PLAN.md` - static-first Hostinger deployment plan.
- `planning/TOOLING_RECOMMENDATIONS.md` - Codex, Claude Code, Google Stitch, Figma, and Copilot recommendations.
- `planning/STITCH_PROMPTS.md` - prompts for generating concept screens in Google Stitch.
- `planning/COMPETITION_REVIEW_PACKAGE.md` - scorecard and pitch notes.
- `planning/GO_LIVE_AUDIT_CHECKLIST.md` - pre-launch checklist.
- `tasks/todo.md` - task tracking and setup notes.

Contributor guidance lives in `AGENTS.md`.

## Maintainers

- auronpep (owner)
