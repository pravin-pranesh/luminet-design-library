# Luminet Design Library

Publishable React component library (`@luminet/design-library`) with Tailwind CSS v4 design tokens, CVA variants, and TypeScript.

## Install (local / future npm)

```bash
npm install @luminet/design-library
```

Peer dependencies: `react` and `react-dom` 18+.

## Theme & Tailwind v4

Import the shared theme in your app CSS:

```css
@import "tailwindcss";
@import "@luminet/design-library/theme.css";

/* Scan compiled package classes (after install from npm) */
@source "../node_modules/@luminet/design-library/dist/**/*.js";

/* Or scan source when linking locally */
@source "../node_modules/@luminet/design-library/src/**/*.{ts,tsx}";
```

## Usage

```tsx
import { Button, TextInput } from "@luminet/design-library";

export function Example() {
  return (
    <>
      <Button size="md" variant="solid">
        Save
      </Button>
      <TextInput size="sm" borderVariant="default" placeholder="Email" />
    </>
  );
}
```

## Development

```bash
npm install
npm run build          # library → dist/ (ESM + CJS + .d.ts)
npm run dev            # Vite playground at http://localhost:5173
```

Playground lives in `playground/` and aliases the library `src/` for fast iteration.

## Taxonomy

Sizes: `xs` | `sm` | `md` | `lg`. Button variants: `solid`, `outline`, `ghost`, `link`, `destructive`. Shared `borderVariant` for inputs and bordered controls. See project design taxonomy docs for the full matrix.

## License

MIT
