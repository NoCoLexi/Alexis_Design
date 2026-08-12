/* GENERATED FROM tokens.json -- DO NOT EDIT. Run scripts/build-tokens.mjs. */
// Portable design tokens (colors as hex). Web consumes the theme via
// src/index.css; mobile (Expo) and any other platform import this object so the
// whole product shares one source of truth.
export const tokens = {
  "color": {
    "light": {
      "background": "#F7F6F2",
      "foreground": "#191918",
      "border": "#D2CFC6",
      "card": "#FFFFFF",
      "cardForeground": "#191918",
      "popover": "#FFFFFF",
      "popoverForeground": "#191918",
      "primary": "#C8380E",
      "primaryForeground": "#FFFFFF",
      "secondary": "#ECE9E1",
      "secondaryForeground": "#191918",
      "muted": "#E3E0D8",
      "mutedForeground": "#5F5D57",
      "accent": "#F45122",
      "accentForeground": "#FFFFFF",
      "destructive": "#C8380E",
      "destructiveForeground": "#FFFFFF",
      "input": "#D2CFC6",
      "ring": "#C8380E",
      "chart1": "#F45122",
      "chart2": "#5F5D57",
      "chart3": "#A09890",
      "chart4": "#C8380E",
      "chart5": "#656359",
      "sidebar": "#ECE9E1",
      "sidebarForeground": "#191918",
      "sidebarBorder": "#D2CFC6",
      "sidebarPrimary": "#C8380E",
      "sidebarPrimaryForeground": "#FFFFFF",
      "sidebarAccent": "#E3E0D8",
      "sidebarAccentForeground": "#191918",
      "sidebarRing": "#C8380E"
    },
    "dark": {
      "background": "#191918",
      "foreground": "#F7F6F2",
      "border": "#3A3936",
      "card": "#252523",
      "cardForeground": "#F7F6F2",
      "popover": "#252523",
      "popoverForeground": "#F7F6F2",
      "primary": "#F45122",
      "primaryForeground": "#FFFFFF",
      "secondary": "#2E2D2B",
      "secondaryForeground": "#ECE9E1",
      "muted": "#333230",
      "mutedForeground": "#A8A59F",
      "accent": "#F45122",
      "accentForeground": "#FFFFFF",
      "destructive": "#F45122",
      "destructiveForeground": "#FFFFFF",
      "input": "#3A3936",
      "ring": "#F45122",
      "chart1": "#F45122",
      "chart2": "#A8A59F",
      "chart3": "#D2CFC6",
      "chart4": "#C8380E",
      "chart5": "#7A7873",
      "sidebar": "#141410",
      "sidebarForeground": "#F7F6F2",
      "sidebarBorder": "#3A3936",
      "sidebarPrimary": "#F45122",
      "sidebarPrimaryForeground": "#FFFFFF",
      "sidebarAccent": "#2E2D2B",
      "sidebarAccentForeground": "#F7F6F2",
      "sidebarRing": "#F45122"
    }
  },
  "fontFamily": {
    "sans": [
      "DM Sans",
      "Arial",
      "sans-serif"
    ],
    "serif": [
      "Newsreader",
      "Georgia",
      "serif"
    ],
    "mono": [
      "DM Mono",
      "monospace"
    ]
  },
  "radius": "0.25rem",
  "spacing": "0.25rem"
} as const;

export type Tokens = typeof tokens;
export default tokens;
