# DESIGN.md

## WHY: Design Principles

### 1. Ubiquitous Language Compliance
UI text follows the project's ubiquitous language definitions.
Use only team-agreed terms. Never expose raw technical terms in UI.

### 2. System Text vs User Input
- System (labels, buttons): use defined terms exactly
- User input (names, titles): show natural-expression samples
  NG: raw technical term → OK: expression users actually type

### 3. Auto-Layout Required, Absolute Positioning Forbidden
Containers use HUG/FILL for auto-sizing.
Japanese text is wider than English — fixed-width calculations always break.

### 4. Visual Hierarchy
Decide the single most important element per section. Equal-sized elements = failure.
One CTA button per screen. Use color and size to clarify primary/secondary.

### 5. Screen ID Naming Convention
Screen IDs use SC-XXX format.
Figma frame names: "SC-XXX Screen Name". Shared across wireframes, UI design, and prototypes.

### 6. Figma Layout Grid
SC-number ascending order, 5 screens per row (1280x800, 120px gap).
  x: 0, 1400, 2800, 4200, 5600 / y: +920px per row

## WHAT: Design Tokens (define per project)

### Colors
Primary: [#HEX] / Light: [#HEX] / Dark: [#HEX]
Success: [#HEX]/[#HEX_LIGHT]  Error: [#HEX]/[#HEX_LIGHT]
Warning: [#HEX]/[#HEX_LIGHT]  Info: [#HEX]/[#HEX_LIGHT]
BG: [#BASE] [#SURFACE]  Border: [#HEX]/[#HEX_LIGHT]
Sidebar: [#HEX] / Hover: [#HEX] / Active: [#HEX]
Text: [#PRIMARY] [#SECONDARY] [#MUTED] [#SIDEBAR]

### Typography
Japanese: Noto Sans JP (Bold/Medium/Regular) — no SemiBold
Alphanumeric: Inter (Bold/Semi Bold/Medium/Regular) — "Semi Bold" with space
  Title: [SIZE]px Bold  Card: [SIZE]px Medium  Body: [SIZE]px Regular
  Label: [SIZE]px Medium  KPI: [SIZE]px Bold (Inter)  Button: [SIZE]px Medium

### Spacing (8pt grid)
XS:4 S:8 M:16 L:24 XL:32 2XL:48
Card inner: [SIZE]px  Section gap: [SIZE]px  Main margin: [SIZE]px

### Border Radius
Button: [N]  Badge: [N]  Card: [N]  Modal: [N]
Input field: [N]  Toggle: [N]  Avatar: full circle

### Components
Button: padding [V]px [H]px, HUG, cornerRadius [N]
  Primary: [BG]/[TEXT]  Secondary: [BG]/[TEXT]
  Success: [BG]/[TEXT]  Danger: [BG]/[TEXT]
  Ghost: [BG] border[COLOR]/[TEXT]
  Full-width button: primaryAxisSizingMode="FIXED" + explicit width

Badge: padding [V]px [H]px, HUG, cornerRadius [N], [SIZE]px Medium
  Define bg/text combos per status

Sidebar: [WIDTH]px, [BG_COLOR]
  Logo area: [HEIGHT]px tall
  Nav items: [SIZE]px Medium, cornerRadius [N], Active [COLOR]
  User info: bottom — avatar + name + org name

Input field: [HEIGHT]px tall, cornerRadius [N], border [COLOR]
Toggle switch: [W]x[H], cornerRadius [R], ON:[COLOR] OFF:[COLOR]
Icon: fixed size (no HUG), define size per use case

### Screen Patterns (reference)
Login: left brand panel + right form, or centered card
List: sidebar + header + card list or table
Detail: sidebar + header (title + badge + CTA) + content cards
Wizard: sidebar + stepper + content card + back/next
Settings: sidebar + section-split cards + forms
Modal: translucent overlay + centered card + 2 CTA buttons

## HOW: Figma Plugin API

### Page Operations (CRITICAL)
Before any operation: `await figma.setCurrentPageAsync(targetPage);`
Skipping this → children returns 0 → orphan nodes accumulate.
"Delete → create → verify" must complete in one code block. `get_screenshot` after creation is mandatory.

### Auto-Layout Construction Pattern
Background-with-text (badge, button) MUST use Frame auto-layout:
```javascript
const f = figma.createFrame();
f.layoutMode = "HORIZONTAL";
f.primaryAxisSizingMode = "AUTO"; // HUG
f.counterAxisSizingMode = "AUTO";
f.paddingLeft = 10; f.paddingRight = 10;
f.paddingTop = 4; f.paddingBottom = 4;
f.cornerRadius = 12;
f.fills = [{ type: 'SOLID', color: bg }];
const t = figma.createText();
t.characters = "Label";
f.appendChild(t);
```
FORBIDDEN: rect() + txt() sibling nodes with absolute positioning → Japanese width mismatch

### Error Prevention
- `counterAxisAlignItems`: "STRETCH" is invalid (use MIN/MAX/CENTER/BASELINE only)
- `layoutSizingHorizontal="FILL"`: only works when parent has auto-layout → appendChild first
- Text search: `n.type === "TEXT" && n.characters === "exact match"`

### Japanese Text Handling
- Buttons: HUG required (fixed width forbidden, except full-width)
- Descriptions: `textAutoResize = "HEIGHT"`
- Noto Sans JP weights: Black/Bold/DemiLight/Light/Medium/Regular/Thin

### Design System Page Structure
One master frame with auto-layout (VERTICAL) containing all sections.
Scattered nodes at page root are FORBIDDEN (causes orphan nodes).

## Figma Skills Reference

### Community Skills (as of 2026-03)
- `/figma-generate-library` — create Figma components from codebase (Figma official)
- `/figma-generate-design` — create new designs with existing components and variables (Figma official)
- `/apply-design-system` — connect existing designs to system components (Edenspiekermann)
- `/sync-figma-token` — sync tokens between code and Figma variables + drift detection (Firebender)
- `/create-voice` — generate screen reader specs from UI specs (Uber)
- `/cc-figma-component` — generate Figma components from structured JSON (One North)

### Write to Canvas (Beta, 2026-03-24~)
`use_figma` tool enables AI agents to write directly to Figma canvas.
Frames, components, variants, variables, Auto Layout — all creatable/editable while following existing design systems.
**Current limitations:** 20KB response limit, no image assets, no custom fonts, manual review recommended.

### AI Design Prompt Best Practices
- **Use markdown** — headers, bullets, quotes help AI parse structure
- **Ban vague words** — "modern" and "clean" are meaningless. Use "24px whitespace between components"
- **State user intent** — explain WHY, not just WHAT is on screen
- **Two-pass approach** — ① generate rough draft of all screens → ② review and refine per page
- **DESIGN.md as source of truth** — define design conventions in WHY → WHAT → HOW layers
