# UpStart-Labs Visual Identity

**Status:** Populated 2026-08-06, confirmed with Alexis.
**Source:** Extracted from the three most recent website builds (`Upstart-Labs-Website/Claude Opus 5 medium/`, `Gemini Flash 3.5 medium/`, `Grok 43/`), which independently converge on identical tokens despite being separate AI-model implementations of the same brief. That convergence is the signal this is the real spec, not one of the earlier exploratory landing page drafts (`01_Upstart-Labs_Landing.html` through `016_...`), which used a looser, evolving palette.

Use this file for any UpStart-Labs client deliverable: proposals, intake forms, reports, presentations, the site itself. For Alexis Brochu's personal career materials (resume, body of work, case studies), the separate CareerOS visual system applies instead: Cormorant Garamond + Inter + Ember `#FF4704`. The two are intentionally different, one is the company, one is the person.

---

## Color

| Role | Hex | Usage |
|---|---|---|
| Paper (background) | `#F7F6F2` | Page background |
| Sand | `#ECE9E1` | Secondary surface |
| Soft | `#E3E0D8` | Tertiary surface, subtle fills |
| Ink (primary text) | `#191918` | Headings, primary body text |
| Muted (secondary text) | `#5F5D57` | Secondary copy, captions |
| Light muted | `#656359` | Tertiary text, metadata |
| Line (border) | `#D2CFC6` | Hairline rules, dividers, table borders |
| Orange (accent) | `#F45122` | Accent color: highlights, icons, small emphasis |
| Orange CTA / text | `#C8380E` | Buttons, links, bold emphasis phrases |
| White | `#FFFFFF` | Cards, input fields, contrast surfaces |

Orange is the brand's signature color. Use it deliberately: CTAs, one or two emphasis words, small accent marks. Not as a large fill or background.

## Typography

| Family | Role | Fallback |
|---|---|---|
| Newsreader | Display / serif: headlines, titles | Georgia, serif |
| DM Sans | Body, UI, labels | Arial, sans-serif |
| DM Mono | Small technical labels, eyebrows, metadata | monospace |

Google Fonts import:
`https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=Newsreader:opsz,wght@6..72,300;6..72,400;6..72,500&display=swap`

In tools without web font support (Excel, PDF form fields), set the font name anyway for intent; substitute Georgia for Newsreader and Calibri or Arial for DM Sans if the real fonts aren't installed.

### Font files (added 2026-08-06)

The static TTFs live in `fonts/` beside this file, with the SIL Open Font License text for each family. Use these for anything generated locally (PDF, docx, pptx) so output does not depend on what a given machine has installed.

| Family | Files |
|---|---|
| Newsreader | `Newsreader_24pt-Regular.ttf`, `Newsreader_24pt-Medium.ttf` |
| DM Sans | `DMSans-Regular.ttf`, `DMSans-Medium.ttf`, `DMSans-Bold.ttf` |
| DM Mono | `DMMono-Regular.ttf`, `DMMono-Medium.ttf` |

Also installed per-user on Alexis's machine (22 cuts, including italics) so they appear in Word and Excel.

**Newsreader is an optical-size family.** Only the **24pt** cut is stocked here, which is the display size the brand uses (headlines, wordmarks, titles roughly 18pt to 30pt). If a deliverable needs Newsreader at body size or at poster size, pull the matching 9pt or 60pt cut from the Google Fonts release rather than scaling the 24pt one.

Use the static cuts, not the variable fonts. Most local generation tools (ReportLab among them) do not instance variable axes and will silently render the default position instead.

## Logo

No logo file exists yet anywhere in the Branding folder. Current mark is text-only: "UpStart-Labs" set in Newsreader. Add the asset here and update this section once one is designed.

## Voice and copy rules

Full rules live in `standards/writing-style-guide.md` in this repo. Load that file directly rather than duplicating it here; it's the source of truth and gets edited on its own. Highlights relevant to anything visual or branded:

- No em dashes.
- No AI-sounding language: "delve," "leverage" (as a verb), "utilize," "synergy," "unlock," "transformative."
- Active voice by default.
- Numerals for 10 and above, spell out one through nine.

## Business identity

**Business name:** UpStart-Labs
**Positioning:** Product strategy and AI adoption consulting for organizations building human-centered products.
**Tagline:** We design the human layer of product and systems of adoption.
**Email:** alexis.brochu@gmail.com

## Change log

- **2026-08-06:** File created. Tokens extracted from the three converging website builds, confirmed with Alexis. First applied to the GovTech client-facing intake form.
- **2026-08-06:** Newsreader, DM Sans, and DM Mono added as static TTFs in `fonts/`, with licenses. Installed per-user on Alexis's machine. Applied to the UpStart-Labs invoice PDF spec and generator.
