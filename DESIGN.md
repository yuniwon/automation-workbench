# Automation Workbench Design Contract

This is the repo-level design source for Automation Workbench. Future UI work
should read this file before changing app, landing-page, or portfolio visuals.

## Source Of Truth

- Primary handoff: `C:\Users\WON2\Downloads\Automation Workbench Design System-handoff.zip`
- Key files inside the handoff:
  - `project/README.md`
  - `project/SKILL.md`
  - `project/colors_and_type.css`
  - `project/ui_kits/automation-workbench/index.html`
  - `project/preview/*.html`
- The handoff deliberately follows a Linear-like dark product language. Use the
  handoff as the project-specific authority; use Linear only as a secondary
  reference when the handoff is silent.

## Visual Foundation

- Canvas: near-black `#08090a`.
- Page background: top-right indigo radial glow
  `rgba(113, 112, 255, 0.16)` over `#08090a`.
- App max width: `1440px`.
- Marketing and static landing max width: `1120px`.
- Surface style: translucent white panels, usually
  `rgba(255, 255, 255, 0.035)` with `1px solid rgba(255, 255, 255, 0.08)`.
- Depth: prefer subtle borders, white-alpha surfaces, and inset highlights.
  Avoid outer drop-shadow-heavy cards.
- Radius scale: `6px` for controls, `8px` for panels/cards, `22px` for phone
  mock shells, `999px` for chips.
- Accent: indigo `#7170ff` for active states and `#5e6ad2` for primary
  actions. Do not use the accent decoratively.

## Typography

- Font: Inter only, with system fallbacks.
- Load weights: `400`, `500`, `510`, `590`, `600`, `700`.
- OpenType features: `"cv01", "ss03"` globally.
- Weight `510` is the default UI emphasis weight.
- Weight `590` is for eyebrows, severity labels, and small strong labels.
- Keep `letter-spacing: 0` in this product, including large Korean headings.

## Copy

- Korean is the primary language. English mode should mirror the same product
  intent, but can be shorter and more direct.
- Voice: practical operator language, not marketing hype.
- Prefer concrete words such as `행`, `셀`, `열`, `CSV`, `XLSX`, `정리`,
  `비교`, `병합`, `정산`, `양식 변환`.
- Avoid exclamation marks, emoji, "magic", and broad claims that the product
  can automate everything.
- Do not describe the interface inside the interface. The UI should simply do
  the work.

## Components

- Use the existing app patterns before inventing a new component style:
  `tool-switcher`, `metric-panel`, `panel`, `file-drop`, `issue-item`,
  `summary-row`, `inquiry-panel`.
- Tables should remain dense but readable. Horizontal scrolling inside
  `.table-wrap` is acceptable on mobile; the page body itself should not create
  horizontal scroll.
- Static marketing pages should share the same background, Inter font, panel
  borders, and CTA styles as the app.

## Assets

- The handoff's `assets/mark.svg` and `assets/wordmark.svg` are reconstructed
  placeholders, not a final brand logo.
- Do not introduce a logo-bearing surface unless a real mark is created or the
  placeholder status is explicitly acceptable for that asset.
- The current product can use text branding: `Automation Workbench`.

## Visual QA

For UI changes, check:

```powershell
pnpm test
pnpm test:artifacts
pnpm build
```

Then visually verify the app at:

```text
http://127.0.0.1:5173/automation-workbench/
http://127.0.0.1:5173/automation-workbench/?lang=en
```

Use desktop and mobile widths. Confirm the page uses Inter, the near-black
canvas, the top-right indigo glow, 8px panels, and no body-level horizontal
overflow.
