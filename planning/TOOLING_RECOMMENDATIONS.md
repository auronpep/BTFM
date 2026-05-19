# Tooling Recommendations

## Short Answer

Use Codex multi-agent work, Browser/Chrome visual QA, GitHub workflow, and optionally Google Stitch for fast visual concept exploration. Use Claude Code plugins if the Claude team wants repeatable local capabilities, especially custom agents/skills and MCP connectors, but do not make the build depend on Claude-specific plugin infrastructure. Keep the project source portable.

## Codex

Current useful capabilities:

- Multi-agent work: Codex supports multi-agent collaboration tools such as `spawn_agent`, `send_input`, `resume_agent`, `wait_agent`, and `close_agent`.
- Browser plugin: use for local visual verification, screenshots, link testing, and responsive checks.
- Chrome plugin: use only when authenticated browser sessions or existing profile state are required.
- GitHub CLI and GitHub connector: use for repo, PR, issue, and review workflow.
- Skills: use project skills for PDF/doc extraction, web research, frontend QA, and Windows operations as needed.

Recommended Codex setup for this project:

- Keep `AGENTS.md` as the shared worker instruction file.
- Use branches per worker area from `planning/PARALLEL_WORK_PLAN.md`.
- Use Browser for final screenshot verification after frontend changes.
- Use GitHub plugin/connector if available for PR review and issue capture. The `gh` CLI is already sufficient for basic repo work.

Potential Codex connectors/plugins to add if needed:

- Figma: useful if final design comps are moved into Figma.
- Google Drive: useful if source documents, drafts, or approvals move into Drive/Docs.
- Notion: useful only if the client wants the content backlog managed outside GitHub.
- Slack or Teams: useful only if review feedback lands there.
- OpenAI Developers: useful only if the site later uses OpenAI APIs.

Do not add:

- Supabase unless dynamic database-backed features are approved.
- Email/calendar plugins unless registration operations move into Gmail/Calendar workflows.

Sources:

- Codex config reference: `https://developers.openai.com/codex/config-reference`
- Codex remote connections: `https://developers.openai.com/codex/remote-connections`

## Claude Code

Claude Code plugins can package skills, agents, hooks, and MCP servers. They are useful for shared repeatable workflows, not required for this website.

Recommended Claude Code approach:

- Use `CLAUDE.md` and `AGENTS.md` for shared project rules.
- Use standalone `.claude/` configuration for project-specific experiments.
- Package a plugin only if the team wants to reuse the workflow across projects.
- Useful plugin shape for this project:
  - `content-editor` skill for nonprofit board article style.
  - `astro-worker` agent for page/component implementation.
  - `a11y-review` agent for accessibility checks.
  - `hostinger-deploy` command for deployment checklist.

Possible MCP connectors:

- GitHub MCP for PRs/issues.
- Figma MCP if final design is in Figma.
- Google Drive MCP if source docs live in Drive.
- Browser/Playwright MCP for visual QA.

Claude Code plugin install worth considering:

- `mcp-server-dev@claude-plugins-official` only if the team needs to build a custom MCP server. Not needed for this static website.

Risks:

- Plugins and MCP servers are trusted code/data bridges.
- Avoid sensitive client data unless the user explicitly approves the connector and destination.
- Large plugin/tool schemas can add context cost; keep enabled tools narrow.

Sources:

- Claude Code plugins: `https://code.claude.com/docs/en/plugins`
- Claude MCP docs: `https://code.claude.com/docs/en/mcp`
- Claude plugin marketplace: `https://code.claude.com/docs/en/discover-plugins`
- Claude subagents: `https://code.claude.com/docs/en/sub-agents`
- Claude plugins overview: `https://claude.com/docs/plugins/overview`

## Google Stitch

Stitch can help with ideation and visual differentiation. It should not be the source of truth for production code.

Best uses:

- Generate 3-5 distinct homepage directions quickly.
- Explore article page layouts and training page composition.
- Test visual balance between law-firm credibility and educational warmth.
- Export screenshots or HTML/CSS as reference for implementation.
- Generate variants programmatically through `@google/stitch-sdk` if an API key is available.
- Use Stitch MCP-style tooling only for design exploration; production should still be Astro components.

Risks:

- Generated code may not match the final Astro architecture.
- Iterative edits can drift from the approved design language.
- Accessibility and content hierarchy still need manual review.
- It may create attractive screens that do not map cleanly to the real content model.

Recommended workflow:

1. Use `planning/STITCH_PROMPTS.md` to generate concepts.
2. Pick one direction and document what to keep.
3. Rebuild production UI in Astro using project components.
4. Verify contrast, mobile layout, and real content density.
5. If the boss wants a more formal design review, move the selected direction into Figma and treat code as the implementation source of truth after build starts.

Source:

- Google Stitch announcement: `https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-ai-ui-design/`
- Stitch SDK: `https://github.com/google-labs-code/stitch-sdk`

## Figma

Use Figma only if stakeholder review needs a design artifact outside the browser.

Best uses:

- Convert the selected Stitch direction into stakeholder-reviewable frames.
- Use Figma MCP to bring design context into Codex or Claude Code.
- Keep components and spacing decisions visible for review.

Risks:

- Adds another source of truth.
- Requires clear ownership: once implementation starts, production code should be authoritative unless a design revision is explicitly accepted.
- Desktop Figma MCP may require specific seat/plan access; remote MCP is the preferred setup when available.

Source:

- Figma MCP guide: `https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Figma-MCP-server`

## GitHub Copilot

Copilot can help with quick component boilerplate and content transformation, but it is not the coordinator. Use it inside worker branches for narrow local tasks:

- Generate Astro component variants.
- Draft type definitions.
- Convert checklist content into Markdown.
- Suggest unit/smoke test structure.

Do not let Copilot define architecture or content strategy.

## Hostinger

Recommended deployment path:

- Astro static output.
- Build to `dist/`.
- Deploy `dist/` contents to `public_html` through File Manager, FTP, or a Git/deploy branch flow.
- If Hostinger Git deployment does not build the app, use GitHub Actions to publish built output to a deploy branch.
- After deploy, use no-cache preview and Cache Manager/CDN flush if stale content appears.

Why static:

- Hostinger static deployment is supported broadly through hPanel.
- The site is mostly content, downloads, and outbound registration.
- Static output avoids Node runtime fragility.
- It is fast, cheap, and easy to cache.

Use Node.js deployment only if:

- The Hostinger plan supports Node.js apps.
- We need server-rendered features, authenticated areas, or custom backend logic.

Detailed plan:

- `planning/HOSTINGER_DEPLOYMENT_PLAN.md`

Sources:

- Astro Hostinger deployment guide: `https://docs.astro.build/en/guides/deploy/hostinger/`
- Hostinger Git deployment docs: `https://www.hostinger.com/support/1583302-how-to-deploy-a-git-repository-in-hostinger/`
- Hostinger Node.js app migration/deployment: `https://www.hostinger.com/support/how-to-migrate-a-node-js-application-to-hostinger/`
- Hostinger cache clearing: `https://www.hostinger.com/support/1583501-how-to-clear-cache-in-hostinger/`

## Security Rules for AI Tools and Connectors

- Do not send donor data, private board member data, unpublished finances, client legal facts, credentials, tokens, or privileged communications into external AI tools without explicit approval.
- Document every connector/MCP with owner, purpose, scope, and removal plan.
- Prefer read-only connector scopes unless write access is necessary.
- Remove experimental connectors after the proposal phase if they are no longer needed.
- Treat generated legal content as draft educational material requiring attorney review.

## Tooling Decision Matrix

| Need | Best tool | Notes |
| --- | --- | --- |
| Visual concepts | Google Stitch | Use for inspiration and screenshots, not production source. |
| Production build | Codex workers | Use parallel branch ownership. |
| Alternate implementation competitor | Claude Code | Use plugins/agents if the Claude team wants repeatability. |
| Content extraction | Codex/Python doc extraction | Already works with local DOCX files. |
| Design handoff | Figma connector | Add only if Figma becomes the review surface. |
| Deployment | Hostinger static + Git/FTP | Prefer static Astro output. |
| QA | Browser plugin + Lighthouse/axe | Screenshot desktop/mobile before final review. |
| Project tracking | GitHub issues/PRs | Good for worker coordination. |

## Recommendation

Do not slow the project down by building custom plugins now. The best competitive advantage is disciplined parallel execution:

1. Use Codex multi-agent planning and implementation.
2. Use Google Stitch for fast design exploration.
3. Build production in Astro.
4. Keep source portable for Hostinger.
5. Add Figma/Drive/GitHub connectors only when they directly support the review workflow.
