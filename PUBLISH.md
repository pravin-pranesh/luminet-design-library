# Publishing `@luminet/design-library` to npm

This document covers manual and CI publishing. The **playground** app (`playground/`) is a local demo only and is **not** included in the npm tarball (`files` in root `package.json` limits the package to `dist/`, `theme.css`, and `README.md`).

## Prerequisites

1. npm account with access to publish **`@luminet`** scoped packages (org membership or scope ownership).
2. One-time login on your machine:

   ```bash
   npm login
   ```

3. From the repository root, install dependencies and confirm the build:

   ```bash
   npm install
   npm run build
   npm pack --dry-run
   ```

   `prepublishOnly` runs `npm run build` automatically before `npm publish`.

## First-time manual publish

1. Choose a semver version in root `package.json` (initial release is `0.1.0` unless you bump).
2. Commit the version bump if you changed it.
3. Publish with public scope access:

   ```bash
   npm publish --access public
   ```

   With `publishConfig.access: "public"` in `package.json`, `npm publish` alone is enough once config is present.

4. Tag the release in git (recommended):

   ```bash
   git tag v0.1.0
   git push origin v0.1.0
   ```

## Version bumps for later releases

Use semver (`patch` / `minor` / `major`):

```bash
npm version patch   # or minor | major
git push origin main --follow-tags
npm publish --access public
```

Or bump `version` in `package.json` manually, commit, tag, push, then publish.

## CI publish (optional)

Workflow: [`.github/workflows/publish.yml`](./.github/workflows/publish.yml)

- Triggers on push of tags matching `v*` (e.g. `v0.1.0`).
- Requires a repository secret **`NPM_TOKEN`**: an npm automation token with publish rights for `@luminet/design-library`.

If `NPM_TOKEN` is not configured in GitHub, use manual publish steps above; the workflow will fail until the secret exists.

## What gets published

Built output from `tsup` under `dist/` (ESM, CJS, types, source maps), plus `theme.css` and `README.md`. Entry points: `main`, `module`, `types`, and `exports` in `package.json`.
