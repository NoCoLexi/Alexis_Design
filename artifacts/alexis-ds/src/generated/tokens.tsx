/* GENERATED FROM tokens.json -- DO NOT EDIT. Run scripts/build-tokens.mjs. */
// Portable design tokens (colors as hex). Web consumes the theme via
// src/index.css; mobile (Expo) and any other platform import this object so the
// whole product shares one source of truth.
export const tokens = {
  "color": {
    "light": {
      "background": "#FFFFFF",
      "foreground": "#000000",
      "border": "#E5E5E5",
      "card": "#FFFFFF",
      "cardForeground": "#000000",
      "popover": "#FFFFFF",
      "popoverForeground": "#000000",
      "primary": "#000000",
      "primaryForeground": "#FFFFFF",
      "secondary": "#F5F3F1",
      "secondaryForeground": "#3F3B36",
      "muted": "#F5F3F1",
      "mutedForeground": "#777169",
      "accent": "#E5E5E5",
      "accentForeground": "#000000",
      "destructive": "#000000",
      "destructiveForeground": "#FFFFFF",
      "input": "#E5E5E5",
      "ring": "#FF4704",
      "chart1": "#000000",
      "chart2": "#3F3B36",
      "chart3": "#777169",
      "chart4": "#A59F97",
      "chart5": "#E5E5E5",
      "sidebar": "#F5F3F1",
      "sidebarForeground": "#3F3B36",
      "sidebarBorder": "#E5E5E5",
      "sidebarPrimary": "#000000",
      "sidebarPrimaryForeground": "#FFFFFF",
      "sidebarAccent": "#E5E5E5",
      "sidebarAccentForeground": "#000000",
      "sidebarRing": "#FF4704"
    },
    "dark": {
      "background": "#0A0A09",
      "foreground": "#F5F3F1",
      "border": "#2A2825",
      "card": "#0A0A09",
      "cardForeground": "#F5F3F1",
      "popover": "#0A0A09",
      "popoverForeground": "#F5F3F1",
      "primary": "#F5F3F1",
      "primaryForeground": "#0A0A09",
      "secondary": "#1A1917",
      "secondaryForeground": "#F5F3F1",
      "muted": "#1A1917",
      "mutedForeground": "#A59F97",
      "accent": "#2A2825",
      "accentForeground": "#F5F3F1",
      "destructive": "#F5F3F1",
      "destructiveForeground": "#0A0A09",
      "input": "#2A2825",
      "ring": "#FF4704",
      "chart1": "#F5F3F1",
      "chart2": "#E5E5E5",
      "chart3": "#A59F97",
      "chart4": "#777169",
      "chart5": "#3F3B36",
      "sidebar": "#0F0E0D",
      "sidebarForeground": "#F5F3F1",
      "sidebarBorder": "#2A2825",
      "sidebarPrimary": "#F5F3F1",
      "sidebarPrimaryForeground": "#0A0A09",
      "sidebarAccent": "#1A1917",
      "sidebarAccentForeground": "#F5F3F1",
      "sidebarRing": "#FF4704"
    }
  },
  "fontFamily": {
    "sans": [
      "Inter",
      "sans-serif"
    ],
    "serif": [
      "Cormorant Garamond",
      "Georgia",
      "serif"
    ],
    "mono": [
      "Geist Mono",
      "Menlo",
      "monospace"
    ]
  },
  "radius": "0rem",
  "spacing": "0.25rem"
} as const;

export type Tokens = typeof tokens;
export default tokens;
