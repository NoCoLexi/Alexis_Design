> **MOVED 2026-08-06.** This file is superseded. The canonical brand reference now lives in the UpStart-Labs OS repo:
> `C:\UpStartHQ\03 Business\Branding\Upstart-Labs, LLC branding\Upstart-Labs-Website\upstart-labs-site\frameworks\brand-assets\visual-identity.md`
>
> That version also corrects the visual system: it uses Newsreader, DM Sans, and orange `#F45122`/`#C8380E`, pulled from the actual UpStart-Labs website builds, not the Cormorant Garamond/Inter/Ember system below, which is Alexis's personal resume brand, not the company's. Kept here only so old links don't break. Do not build from this version.

---

# UpStart-Labs Brand Guidelines (superseded, see notice above)

**Owner:** Alexis Brochu
**Status:** Canonical. This is the single source of truth for color, type, and voice across UpStart-Labs and Alexis Brochu deliverables: client documents, proposals, resumes, body of work, presentations, and anything else that goes external.
**Confirmed:** 2026-08-05

Reference this file directly instead of digging through CareerOS. If you're building something branded and this file doesn't cover it, extend it here rather than starting over somewhere else.

---

## Color

| Role | Hex | Usage |
|---|---|---|
| Obsidian (primary text) | `#000000` | Headings, section labels, bold lead-ins |
| Body text | `#3F3B36` | Paragraph and bullet copy |
| Gravel (secondary) | `#777169` | Contact lines, dates, secondary paragraphs, footer |
| Slate (tertiary) | `#A59F97` | Metadata suffixes, footer secondary text |
| Chalk (border) | `#E5E5E5` | Hairline rules and table borders |
| Powder (surface) | `#F5F3F1` | Callout fills, input/response cell fills |
| Card white | `#FFFFFF` | Base background |
| Ember (accent) | `#FF4704` | The only saturated color. A small dot, or a short bold lead-in phrase. |

**Ember rule:** never as a fill, never as a border, never on more than a few words. One dot in a header, or a two-to-three word bold lead-in. That's it.

---

## Typography

| Family | Weights | Role |
|---|---|---|
| Cormorant Garamond | 300, 400 | Display: name/masthead (300), entry and document titles (400) |
| Inter | 400, 500, 600, 700 | All body copy, UI, labels, bullets |
| Geist Mono | 400 | Small technical labels only (eyebrows, rail labels) |

Google Fonts import:
`https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Inter:wght@400;500;600;700&family=Geist+Mono:wght@400&display=swap`

In tools without web font support (Excel, PDF form fields), set the font name anyway for intent; substitute Georgia or Times for Cormorant Garamond and Calibri or Arial for Inter if the real fonts aren't installed.

| Element | Family | Size | Weight | Color |
|---|---|---|---|---|
| Name / masthead | Cormorant Garamond | 76px | 300 | `#000` |
| Eyebrow (small mono label) | Geist Mono | 10px | 400, uppercase, tracked | `#777169` |
| Contact / metadata line | Inter | 12.5px | 400 | `#777169` |
| Section label | Inter | 11px | 700, uppercase, tracked | `#000` |
| Document / entry title | Cormorant Garamond | 22-26px | 400 | `#000` |
| Body / bullets | Inter | 14-15px | 400 | `#3F3B36` |
| Lead-in / callout phrase | Inter | 12.5px | 600 | `#FF4704` |
| Running footer | Inter | 10px | 400/600, uppercase, tracked | `#A59F97` / `#000` |

---

## Copy rules

- Never use em dashes. Use commas, colons, semicolons, or "to" for ranges.
- Sentence case for headlines. ALL CAPS with letter-spacing is reserved for small section labels only.
- Declarative and restrained. No exclamation points, no emoji, no hype language ("passionate about," "proven track record," "dynamic," "innovative").
- Use the middot (`·`) between metadata items: role, location, arrangement, contact details.

---

## Logo / mark

There is no logo file. The mark is a small Ember-colored dot, styled inline, paired with the wordmark set in Cormorant Garamond. If a real logo gets designed later, add the asset here and update this section with its file path and usage rules.

---

## Masthead / contact block (external documents)

- **Site:** www.upstart-labs.com (confirmed 2026-08-05; your saved profile also lists www.alexisdesign.com, so double-check which one applies before it goes out if the two are ever in conflict on a given deliverable)
- **Email:** alexis.brochu@gmail.com
- **Location:** North Conway, NH · Remote

---

## Spacing and structure notes (for documents, not just resumes)

- Hairline rules use Chalk `#E5E5E5`, 1px. The one exception is a 1px black rule reserved for header emphasis (e.g., under a masthead).
- No boxes or filled containers around content blocks. Powder `#F5F3F1` is fine as a subtle fill for callouts or form response cells, not for full section bands.
- Keep layouts single-column where the document may need to parse cleanly outside a design tool (ATS, plain text export, etc.).

---

## Where this applies

- Resumes, body of work, case studies (CareerOS)
- Client-facing deliverables built in Project Forms (SOWs, intake forms, proposals, reports)
- Any future UpStart-Labs collateral: invoices, presentations, site

## Known conflicts to reconcile

- `CareerOS/CLAUDE.md`'s Formatting Reference section still lists Montserrat and navy `#0F4761` as the resume standard. That's stale as of 2026-08-05: it's contradicted by the finalized resume design spec (`CareerOS/resumes/.../design_handoff_resume_template/README.md`) and by what `body-of-work/build_bodyofwork.py` actually builds. Worth updating that file directly next time you're in CareerOS.
- Website URL: upstart-labs.com vs. alexisdesign.com. Confirmed upstart-labs.com for now (2026-08-05); update this file if that changes.

## Change log

- **2026-08-05:** File created. Consolidated from the resume design handoff doc and body-of-work build script, confirmed with Alexis. First applied to the GovTech client-facing intake form.
