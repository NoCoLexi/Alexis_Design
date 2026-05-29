# UPSTART-Labs — add a fingerprint watermark behind "Labs"

**Do not change the wordmark or its glow.** They already exist on the site and
stay exactly as they are. This task only *adds* a watermark behind the letters.

## What to do

1. Find the word **Labs** in the hero wordmark.
2. Wrap it in a positioned span, and put the SVG (below) **before** the letters.
3. Add the three CSS rules below.

### HTML — structure for the "Labs" word

```html
<span class="labs">
  <!-- fingerprint watermark: paste this SVG BEFORE the letters -->
  <svg class="fp-watermark" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <!-- ridges: white, low opacity -->
    <g fill="none" stroke="#ffffff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" opacity="0.105">
      <path d="M 47.60 53.00 A 6.00 9.00 0 1 1 52.40 53.00"></path>
      <path d="M 46.65 57.60 A 10.40 13.60 0 1 1 53.35 57.60"></path>
      <path d="M 45.70 62.20 A 14.80 18.20 0 1 1 54.30 62.20"></path>
      <path d="M 44.75 66.80 A 19.20 22.80 0 1 1 55.25 66.80"></path>
      <path d="M 43.80 71.40 A 23.60 27.40 0 1 1 56.20 71.40"></path>
      <path d="M 42.85 76.00 A 28.00 32.00 0 1 1 57.15 76.00"></path>
      <path d="M 41.90 80.60 A 32.40 36.60 0 1 1 58.10 80.60"></path>
      <path d="M 40.95 85.20 A 36.80 41.20 0 1 1 59.05 85.20"></path>
    </g>
    <!-- the human figure held in the negative space: blue -->
    <g fill="#5FC5F8" opacity="0.26">
      <path d="M 47.60 53.00 L 46.65 57.60 L 45.70 62.20 L 44.75 66.80 L 43.80 71.40 L 42.85 76.00 L 41.90 80.60 L 40.95 85.20 L 59.05 85.20 L 58.10 80.60 L 57.15 76.00 L 56.20 71.40 L 55.25 66.80 L 54.30 62.20 L 53.35 57.60 L 52.40 53.00 Z"></path>
      <circle cx="50" cy="39" r="2.6"></circle>
    </g>
  </svg>
  <!-- the visible letters stay on top -->
  <span class="fp-label">Labs</span>
</span>
```

### CSS — the only rules to add

```css
.labs { position: relative; display: inline-block; }

.labs .fp-watermark {
  position: absolute;
  z-index: 0;                      /* behind the text */
  top: 50%;
  left: 90%;                       /* slide toward the final "s" */
  width: 1.9em;                    /* ~1.9x the wordmark font-size */
  height: 1.9em;
  transform: translate(-50%, -40%);
  pointer-events: none;
}

.labs .fp-label { position: relative; z-index: 1; }  /* letters on top */
```

## Notes

- The SVG scales with the wordmark because its size is in `em`. No fixed pixels.
- To reposition: adjust `left` (horizontal) and the `-40%` in `translate` (vertical).
- To make it more/less visible: change the `opacity` values on the two `<g>` groups
  (ridges `0.105`, figure `0.26`).
- The watermark adds no background and no glow — it inherits the dark hero behind it.
