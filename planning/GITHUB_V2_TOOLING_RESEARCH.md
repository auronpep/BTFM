# GitHub Tooling Research for Enhanced Website V2

## Current CDX Baseline

- Repository: `erewhonsgroup/CDX`
- Default branch: `main`
- Visibility: private
- Current branch: `codex/live-prototype-8120`
- GitHub auth: `gh` is authenticated with `repo` and `workflow` scope.
- Open GitHub issues: none found.
- Open GitHub pull requests: none found.
- `.github/` directory: not present.
- Site stack: Astro static output with MDX content collections.
- Current deployment: Hostinger static upload to `public_html`.

The existing site already has a strong V2 foundation: field-manual navigation, articles, scenarios, tools, California rules, training pages, SEO endpoints, downloads, and Hostinger deployment notes. The next useful GitHub investment is not a new framework. It is stronger coordination, review, CI, and release discipline around the existing Astro static workflow.

## Recommended GitHub Tools

### 1. GitHub Issues and Issue Forms

Use GitHub Issues as the durable backlog for V2 enhancements, not `tasks/todo.md` alone.

Recommended issue forms:

- `feature-v2.yml`: new page, tool, scenario, or training conversion feature.
- `content-request.yml`: article, California rule page, source-check, attorney-review task, or downloadable template.
- `bug-report.yml`: broken route, layout issue, accessibility defect, deployment regression, or stale content.
- `legal-review.yml`: attorney-review queue for public legal claims, California rules, compensation, audit, conflict, solicitation, or safety content.

Recommended labels:

- `area:content`
- `area:design`
- `area:astro`
- `area:seo-a11y`
- `area:training`
- `area:deployment`
- `area:legal-review`
- `type:bug`
- `type:enhancement`
- `type:research`
- `priority:p0`, `priority:p1`, `priority:p2`

Why this matters for V2: the site will expand through many small content and UX improvements. Issues keep source checks, legal-review flags, and future enhancements from getting buried in local task notes.

Source: GitHub issue forms syntax: https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-issue-forms

### 2. GitHub Projects

Use one GitHub Project board for the V2 roadmap.

Recommended views:

- `Roadmap`: grouped by phase, such as Foundation, Content Expansion, Conversion, QA, Launch.
- `Worker Board`: grouped by owner or work area.
- `Legal Review`: filtered to `area:legal-review`.
- `Launch Blockers`: filtered to high priority open bugs or review blockers.

Recommended custom fields:

- `Area`
- `Priority`
- `Phase`
- `Status`
- `Reviewer`
- `Attorney review required`
- `Launch blocker`

Why this matters for V2: the project already has worker ownership rules and parallel work docs. GitHub Projects makes those visible and ties them directly to issues and PRs.

Source: GitHub Projects overview: https://docs.github.com/issues/planning-and-tracking-with-projects/learning-about-projects/about-projects/

### 3. Pull Request Templates and CODEOWNERS

Add a pull request template that forces each V2 change to say:

- What changed.
- Which primary action it supports.
- Build/check result.
- Screenshots or visual QA notes for UI work.
- Accessibility notes.
- Legal-source or attorney-review notes.
- Deployment impact.

Add `CODEOWNERS` once reviewer ownership is clear:

- Content and legal-sensitive pages: attorney/content reviewer.
- Design system and layout: frontend/design reviewer.
- Deployment and workflows: technical reviewer.

Why this matters for V2: the biggest quality risk is not TypeScript. It is unsourced legal copy, weak accessibility review, and visually unverified page changes.

### 4. GitHub Actions CI

Add a small CI workflow before adding any deployment automation.

Recommended first workflow:

- Trigger on `pull_request`, `push` to `main`, and `workflow_dispatch`.
- Use Node.js, `npm ci`, `npm run check`, and `npm run build`.
- Upload the `dist/` folder as a workflow artifact for review.
- Cache npm dependencies through `actions/setup-node`.

Optional later workflow:

- Broken-link check against built `dist/`.
- HTML validation or accessibility scan.
- Lighthouse/Playwright screenshots for major routes.

Why this matters for V2: the current build is static and low-risk. CI should prove every PR still builds and preserve a reviewable artifact before any Hostinger deployment flow is automated.

Sources:

- GitHub Actions documentation: https://docs.github.com/actions
- Deploying with GitHub Actions: https://docs.github.com/actions/tutorials/deploying-with-github-actions
- Dependency caching: https://docs.github.com/actions/concepts/workflows-and-actions/dependency-caching

### 5. Branch Protection or Rulesets

Protect `main` once CI exists.

Minimum recommended rules:

- Require pull request before merge.
- Require one approving review.
- Require CI build to pass.
- Dismiss stale approvals after new commits if more than one reviewer is active.
- Block force pushes and branch deletion.

If the GitHub plan supports repository rulesets, prefer a ruleset for clearer, layered enforcement. Branch protection is still enough for a small private repo.

Why this matters for V2: the project is deployed publicly from source-controlled static output. `main` should represent reviewable, build-passing work only.

Sources:

- Branch protection: https://docs.github.com/articles/configuring-protected-branches
- Rulesets: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets

### 6. Dependabot

Add `.github/dependabot.yml` for npm packages and GitHub Actions.

Recommended cadence:

- npm: weekly.
- GitHub Actions: weekly.
- Group minor and patch updates where possible.
- Route major dependency upgrades to a manual review issue.

Why this matters for V2: this Astro site is currently small, but the package set will likely grow if search, images, forms, or visual QA tooling are added.

Source: Dependabot version updates: https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/about-dependabot-version-updates

### 7. Code Scanning and Secret Scanning

For a private repo, availability depends on the GitHub plan and code-security settings.

Recommended:

- Enable secret scanning if available.
- Keep deploy keys and Hostinger credentials out of git.
- Add CodeQL/code scanning only if available for this private repo or if the repo later becomes public.
- Do not rely on code scanning to validate legal, accessibility, or content quality.

Why this matters for V2: deployment keys, form providers, analytics IDs, and possible future registration integrations increase secret-handling risk.

Sources:

- Secret scanning: https://docs.github.com/en/code-security/secret-scanning/introduction/about-secret-scanning
- Code scanning: https://docs.github.com/en/code-security/code-scanning/introduction-to-code-scanning/about-code-scanning

### 8. Releases and Deployment Artifacts

Use GitHub Releases or tags for review-ready website snapshots.

Recommended release flow:

- Tag major review builds, such as `v2-review-1`, `v2-review-2`, and `v2-launch`.
- Attach or link the built artifact generated by CI.
- Record Hostinger deployment URL and smoke-check results in the release notes.

Why this matters for V2: the boss/client review process needs a stable point-in-time artifact and URL, not just a moving branch.

### 9. GitHub Pages as Optional Preview Hosting

GitHub Pages can host static sites and can be published through Actions, but it should not replace the current Hostinger deployment unless the stakeholder wants GitHub-hosted previews.

Best use here:

- Optional internal preview for PRs or review branches.
- Backup static preview if Hostinger staging is inconvenient.

Avoid:

- Making GitHub Pages the canonical production host unless the domain/deployment strategy changes.

Sources:

- GitHub Pages overview: https://docs.github.com/en/pages
- GitHub Pages custom domains: https://docs.github.com/articles/about-custom-domains-for-github-pages-sites

### 10. GitHub Copilot Coding Agent

Useful only if the account/organization has the right Copilot plan and the team wants background PR generation from issues.

Good fit:

- Small scoped content/template tasks.
- Test coverage additions.
- Documentation cleanup.
- Repetitive component variants.

Poor fit:

- Legal-sensitive content strategy.
- Final architecture decisions.
- Unreviewed deployment changes.

Why this matters for V2: Copilot coding agent can create PRs from issues, but its output should still pass the same PR, CI, content, and legal-review gates as human work.

Source: GitHub Copilot coding agent: https://docs.github.com/en/copilot/using-github-copilot/coding-agent/about-assigning-tasks-to-copilot

## GitHub Skills Worth Learning

Highest priority:

1. Review pull requests.
2. Test with Actions.
3. Introduction to Repository Management.
4. Secure your repository supply chain.
5. Introduction to secret scanning.
6. Introduction to CodeQL, if code scanning is available.

Helpful but lower priority:

- GitHub Pages, only if using GitHub-hosted previews.
- Resolve merge conflicts, if multiple contributors work in parallel.
- Reusable workflows, if CDX becomes one of several related sites.
- Expand your team with Copilot coding agent, if Copilot agent work is approved.

Source: GitHub Skills catalog: https://skills.github.com/

## Codex/GitHub Tools Available in This Environment

Current local tools:

- `git` for branch, diff, staging, and history.
- `gh` CLI authenticated as `erewhonsgroup`.
- GitHub MCP tools for repositories, branches, files, issues, labels, pull requests, and PR creation.
- GitHub plugin tools for workflow runs, workflow jobs, logs, reruns, artifacts, labels, and PR metadata.

Relevant Codex skills:

- `github:github`: repository, PR, issue, and triage workflow.
- `github:gh-address-comments`: resolve actionable PR review feedback.
- `github:gh-fix-ci`: inspect and fix failing GitHub Actions checks.
- `github:yeet`: publish local changes, push branches, and open draft PRs.
- `coderabbit:code-review`: request AI code review when a second pass is useful.

## Recommended Minimum Setup for Enhanced V2

Do these first:

1. Add `.github/ISSUE_TEMPLATE/` forms for feature, content, bug, and legal-review intake.
2. Add `.github/pull_request_template.md`.
3. Add `.github/workflows/ci.yml` for `npm ci`, `npm run check`, `npm run build`, and `dist` artifact upload.
4. Add `.github/dependabot.yml`.
5. Add labels for area, type, priority, and legal-review status.
6. Create a GitHub Project board for the V2 roadmap.
7. Protect `main` after CI exists.

Defer these until needed:

- Automated Hostinger deploy workflow.
- GitHub Pages preview.
- CodeQL if private-repo availability is not enabled.
- Copilot coding agent unless the team will actively review its PRs.

## V2 Enhancement Backlog Candidates

These should become GitHub issues rather than staying only in local notes:

- Add CI build workflow and artifact upload.
- Add PR template with accessibility, screenshot, and legal-source checks.
- Add issue forms for V2 feature/content/bug/legal-review intake.
- Add Dependabot for npm and GitHub Actions.
- Add labels and a GitHub Project board.
- Add branch protection or ruleset for `main`.
- Add optional preview-hosting decision: Hostinger staging only vs. GitHub Pages preview.
- Add attorney-review queue for California rules and legal escalation pages.

## Verification Notes

- Read current project plan, worker plan, tooling recommendations, Hostinger deployment guide, package scripts, and route map.
- Confirmed `C:\CDX` is a Git repository with remote `https://github.com/erewhonsgroup/CDX.git`.
- Confirmed `gh auth status` is active for `erewhonsgroup`.
- Confirmed no open issues and no open PRs through `gh issue list` and `gh pr list`.
- Confirmed no existing `.github/` directory or workflow/template setup.
- Researched current GitHub Docs and GitHub Skills pages on May 19, 2026.
