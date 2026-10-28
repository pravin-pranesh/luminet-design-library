# Deploying the playground (Vercel)

The playground lives in a npm workspace with the design library at the repo root. Vercel must install and build from the **repository root**, not only `playground/`, because TypeScript resolves `@luminet/design-library` to `../src` and needs root `node_modules` (React, CVA, etc.).

## Vercel project settings

| Setting | Value |
|--------|--------|
| **Root Directory** | `playground` |
| **Framework Preset** | Vite |
| **Build Command** | *(use `playground/vercel.json`)* |
| **Output Directory** | `dist` |
| **Install Command** | *(use `playground/vercel.json`)* |

`playground/vercel.json` overrides install and build:

- **Install:** `cd .. && npm ci` — installs the workspace (library + playground).
- **Build:** `cd .. && npm run build && cd playground && npm run build` — bundles the library, then typechecks and builds the Vite app.

SPA routing uses a rewrite to `index.html` (React Router).

## Local check (same as Vercel)

With **Root Directory** `playground`, Vercel runs install/build with `playground` as the working directory:

```bash
cd playground
cd .. && npm ci
cd .. && npm run build && cd playground && npm run build
```

Or from the repo root in one shot:

```bash
npm ci
npm run build
npm run build --workspace=luminet-design-library-playground
```

## Monorepo / workspaces

Root `package.json` declares `"workspaces": ["playground"]`. Always run `npm ci` or `npm install` from the **repo root** so dependencies hoist correctly for library source under `src/`.
