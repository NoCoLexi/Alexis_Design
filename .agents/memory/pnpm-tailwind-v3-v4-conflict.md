---
name: pnpm Tailwind v3/v4 hoisting conflict
description: When Tailwind v3 is hoisted to the workspace root by one artifact, @tailwindcss/vite (v4 Vite plugin) in another artifact resolves tailwindcss to the v3 package at runtime, causing CSS processing failures.
---

# pnpm workspace: Tailwind v3/v4 conflict via hoisting

## The rule
If ANY artifact in the monorepo uses Tailwind v3 (e.g. `artifacts/portfolio`), do NOT use `@tailwindcss/vite` (the v4 Vite plugin) in another artifact — the workspace root ends up with `tailwindcss@3.x` hoisted, and `@tailwindcss/vite` silently resolves to it at runtime, causing:
> `@layer base is used but no matching @tailwind base directive is present`

**Why:** pnpm hoists the v3 package to `/workspace/node_modules/tailwindcss`. When `@tailwindcss/vite` runs inside the Vite dev server (which has the workspace root on the module search path), it picks up v3 via Node's resolution, not the artifact's isolated v4.

## How to apply
- If you need to migrate an artifact from Tailwind v3 → v4 and another artifact still uses v3: keep the new artifact on v3 too. Define the design tokens directly in the artifact's own `tailwind.config.ts` and `src/index.css` (`@tailwind base/components/utilities` + `:root { --color-*: ... }`).
- Do NOT import raw source CSS from a v4 design system package (e.g. `@workspace/alexis-ds/styles.css`) into a v3 consumer — the raw v4 CSS uses `@import "tailwindcss"` and `@layer base` which v3 PostCSS can't process.
- Safe alternative: define tokens locally (inline) matching the DS palette. All the editorial inline styles in personal-portfolio components use hardcoded hex values from `tokens.json` — this is intentional and avoids the import issue.

## Confirmed
personal-portfolio uses Tailwind v3 + PostCSS with an Alexis Brochu light-palette `tailwind.config.ts`. Works cleanly alongside the v4 DS artifacts in the same workspace.
