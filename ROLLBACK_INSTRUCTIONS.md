# Rollback Instructions

This repository is built and deployed as a static frontend application. If a deployment to the live site introduces critical errors or regressions, use the following steps to roll back to a stable version.

## Scenario 1: Reverting the Git Branch (Recommended)

Since the project uses a Git-based workflow, rolling back is as simple as reverting the codebase and running a new build:

1. **Revert the commit or checkout the stable branch:**
   To revert the most recent commit on the main deployment branch:
   ```bash
   git revert HEAD
   git push origin <branch-name>
   ```
   Or checkout a previously known-stable tag/commit:
   ```bash
   git checkout <stable-commit-hash>
   ```

2. **Rebuild the project:**
   ```bash
   npm run build
   ```

3. **Deploy the stable build:**
   Upload the freshly generated `dist/` folder contents to your Hostinger `public_html` directory (via File Manager or FTP), overwriting the broken files.

## Scenario 2: Manual Artifact Restoration (Fastest)

If you retain previous build artifacts before uploading new ones, you can instantly swap the files without needing to rebuild.

1. **Keep backups:** Always download or ZIP the contents of your `public_html` folder *before* uploading a new deployment.
2. **Restore:** If the new deployment breaks, simply delete the contents of `public_html` and extract your previous ZIP backup back into the directory.

## Post-Rollback Checks
- **Clear Cache:** Always use Hostinger's "Purge Cache" tool in hPanel and do a hard-refresh (`Ctrl + F5` or `Cmd + Shift + R`) in your browser to ensure you aren't viewing a stale cached version of the broken site.
- **Verify Primary Actions:** Double check that links, forms, and navigation routes resolve successfully after the rollback.

For more details on the deployment architecture, refer to `planning/HOSTINGER_DEPLOYMENT_PLAN.md`.
