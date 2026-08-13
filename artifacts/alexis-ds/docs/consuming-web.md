# Consuming Alexis Brochu Design System in web apps

Read `artifacts/alexis-ds/docs/AGENTS.md` first for brand rules and the token
map. This guide covers React/Vite and other shadcn/Tailwind web consumers.

## Theme

Import this package's theme once from the app's main CSS:

```css
@import "@workspace/alexis-ds/styles.css";
```

`styles.css` already imports Tailwind, its plugins, and this package's token
theme. It also registers this package's component sources. Do not add a separate
Tailwind import or a `node_modules` source path in a Tailwind v4 consumer.

## Components and helpers

Import every provided primitive, `cn`, and toast API directly from this package:

```tsx
import { Button } from "@workspace/alexis-ds/components/ui/button";
import { cn } from "@workspace/alexis-ds/lib/utils";
import {
  toast,
  useToast,
} from "@workspace/alexis-ds/hooks/use-toast";
```

## Fonts

The brand fonts are not bundled with this package. Load them from Google Fonts
in the consuming app's `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" media="print" onload="this.media='all'"
      href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Inter:wght@400;500;600;700&family=Geist+Mono:wght@400&display=swap">
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Inter:wght@400;500;600;700&family=Geist+Mono:wght@400&display=swap"></noscript>
```

## Verify

After wiring the workspace dependency, import and render
`@workspace/alexis-ds/components/ui/button`. Run the app's typecheck and dev
server. The import must resolve and the Button must use this package's theme
(no rounding, white background, Ember primary) before broader UI work begins.

## Ongoing rules

- Keep one source of theme variables.
- Import package-provided primitives and helpers from the package path.
- Apply brand copy rules throughout: no em dashes, sentence case, middot
  separators, no hype language. See `AGENTS.md` for the full list.
- Use Ember (`#FF4704`) only as a dot or a short bold lead-in. Never as a fill
  or a border color.
