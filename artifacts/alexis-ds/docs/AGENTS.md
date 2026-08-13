# Alexis Brochu Design System

This package defines the personal visual language for Alexis Brochu. Use it
whenever you build or restyle UI for her personal portfolio, resume, or any
personal collateral. It is a real workspace package (`@workspace/alexis-ds`):
other artifacts depend on it and import its theme and components directly.

This system is intentionally distinct from `@workspace/upstart-labs-ds` (the
company brand). Do not mix tokens or components between them.

## What's here

- `tokens.json` — the single source of truth (DTCG format): colors (full light
  and dark sets), typography, spacing, and radius.
- `scripts/build-tokens.mjs` — generates the outputs below from `tokens.json`.
- `src/index.css` — GENERATED token theme (web), exported as `./styles.css`.
- `src/generated/tokens.tsx` — GENERATED hex token object, the package's `.` and
  `./tokens` entry.
- `src/components/ui/` — the shadcn scaffold themed to the personal brand,
  exported as `./components/*`. All components use `rounded-none`; no rounding
  anywhere, including Avatar, Card, Switch, Slider, and Progress.
- `src/lib/` (`cn`) and `src/hooks/` — exported as `./lib/*` and `./hooks/*`.
- `src/App.tsx` — the entry point for the living style guide.
- `src/preview/DesignSystemBrowser.tsx` — the persistent grouped navigation,
  branded header, search, deep links, and active page shell.
- `src/preview/registry.tsx` — preview metadata (`DESIGN_SYSTEM` title,
  description) and ordered navigation.
- `src/preview/foundations.tsx` — token-driven Overview, Colors, Fonts, and
  Layout pages with named brand swatches (Obsidian, Gravel, Ember, etc.) and
  the full type scale from the brand guidelines.
- `docs/AGENTS.md` — this file.
- `docs/consuming-web.md` — React/Vite import instructions.

## Brand palette (quick reference)

| Name | Hex | Role |
|---|---|---|
| Obsidian | `#000000` | Headings, section labels, bold lead-ins |
| Body | `#3F3B36` | Paragraph and bullet copy |
| Gravel | `#777169` | Contact lines, dates, secondary paragraphs |
| Slate | `#A59F97` | Metadata suffixes, footer secondary text |
| Chalk | `#E5E5E5` | Hairline rules and table borders |
| Powder | `#F5F3F1` | Callout fills, input/response cell fills |
| Card white | `#FFFFFF` | Base background |
| Ember | `#FF4704` | **The only saturated color.** Focus ring (`ring` token), a small decorative dot, or a 2-3 word bold lead-in. Never as a background fill or border. |

## Typography

| Role | Family | Size | Weight |
|---|---|---|---|
| Name / masthead | Cormorant Garamond | 76px | 300 |
| Document / entry title | Cormorant Garamond | 22-26px | 400 |
| Section label | Inter | 11px | 700, uppercase, tracked |
| Body / bullets | Inter | 14-15px | 400 |
| Contact / metadata | Inter | 12.5px | 400 |
| Lead-in / callout | Inter | 12.5px | 600, Ember |
| Eyebrow label | Geist Mono | 10px | 400, uppercase, tracked |

Google Fonts URL:
`https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Inter:wght@400;500;600;700&family=Geist+Mono:wght@400&display=swap`

## Semantic token mapping (critical rules)

| Token | Value | Notes |
|---|---|---|
| `primary` | Obsidian `#000000` | Button and link fills. NOT Ember. |
| `accent` | Chalk `#E5E5E5` | Neutral hover/focus surface (menus, dropdowns, calendar hover). Never Ember. |
| `ring` | Ember `#FF4704` | Focus ring only. The ONLY place Ember appears as a colored accent. |
| `destructive` | Obsidian `#000000` | Error states use typography weight, not color. Editorial convention. |
| `muted` | Powder `#F5F3F1` | Muted fills and callout backgrounds. |

No token maps Ember to a background fill. Any `bg-accent` usage in components renders Chalk (neutral), not Ember.

## Radius rule

Radius is `0rem` throughout — no exceptions. Every component in this package
has been updated to use `rounded-none`. Do not add rounding in a consuming app.
The brand is document-grade and editorial; rounded corners contradict it.

## Copy rules (always apply)

- No em dashes. Use commas, colons, semicolons, or "to" for ranges.
- Sentence case for headlines. ALL CAPS with letter-spacing is reserved for
  small section labels only.
- Declarative and restrained. No exclamation points, no emoji, no hype language
  ("passionate about," "proven track record," "dynamic," "innovative").
- Use the middot (·) between metadata items.

## What this package exports

```jsonc
".":              "./src/generated/tokens.tsx",
"./tokens":       "./src/generated/tokens.tsx",
"./styles.css":   "./src/index.css",
"./components/*": "./src/components/*.tsx",
"./lib/*":        "./src/lib/*.tsx",
"./hooks/*":      "./src/hooks/*.tsx"
```

Components import each other with relative paths internally. Never use a `@/`
alias inside this package. Use `#components/*`, `#lib/*`, `#hooks/*` for
internal imports; those are consumer-safe because they resolve against this
package.

## Editing and maintaining the design system

Edit `tokens.json` only, then run `pnpm tokens`; the dev server also regenerates
on change. Never hand-edit `src/index.css` or `src/generated/tokens.tsx`.

Keep `DESIGN_SYSTEM.title` and `DESIGN_SYSTEM.description` in
`src/preview/registry.tsx` accurate.

## Keep it template-ready

Keep this package self-contained: use concrete dependency versions (never
`catalog:`), keep `tsconfig.json` standalone (never `extends` a
workspace-relative base), and never import from a sibling artifact or a shared
`@workspace/*` lib.

## Consuming this package

Never copy token values, component source, hooks, or these docs into a consuming
artifact. Add `@workspace/alexis-ds` as a `workspace:*` dependency,
run `pnpm install`, and import directly from this package.

Read `artifacts/alexis-ds/docs/consuming-web.md` before authoring UI.

## Universal rules

- Match exact token values. Do not invent colors, fonts, spacing, or radii.
- Radius is always 0 — do not add any rounding in consuming apps.
- Keep product data, navigation, and application state in the app. Visual
  primitives belong here.
- Read these docs in place. Do not copy them into another artifact.
