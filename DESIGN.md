# DESIGN.md

> **How to use this file**: This is the single source of truth for design decisions.
> AI agents MUST read this before generating any UI or Figma output.
> Structure: **WHY** (principles) → **WHAT** (tokens) → **HOW** (Figma Plugin API rules).
> Fill `[placeholder]` values per project before starting UI work.

---

## WHY: Design Principles

### 1. Ubiquitous Language Compliance
UI text follows the project's ubiquitous language definitions (`designs/ubiquitous_language.md`).
Use only team-agreed terms. Never expose raw technical terms in UI.
- System text (labels, buttons): use defined terms exactly
- User input (names, titles): show natural-expression samples

### 2. Auto-Layout Required, Absolute Positioning Forbidden
All containers use HUG/FILL for auto-sizing.
Japanese text is wider than English — fixed-width calculations always break.

### 3. Visual Hierarchy
Decide the single most important element per section. Equal-sized elements = failure.
One CTA button per screen. Use color and size to clarify primary vs secondary.

### 4. Screen ID Naming Convention
Screen IDs: `SC-XXX` format. Figma frame names: `SC-XXX Screen Name`.
Shared across wireframes, UI design, and prototypes.

### 5. Figma Canvas Layout
SC-number ascending, 5 screens per row (1280x800, 120px gap).
x: 0, 1400, 2800, 4200, 5600 / y: +920px per row.

### 6. Logo Handling
Never regenerate or modify existing logo assets without explicit approval.
Reference existing SVG/PNG from project assets. If no logo exists, design with these criteria:
- Simplicity: recognizable even when blurred
- Scalability: readable at 16px favicon size
- Versatility: works in dark mode, light mode, and monochrome

---

## WHAT: Design Tokens

> **Note**: `[placeholder]` values below are intentional — fill them when starting a new project.
> Until filled, AI should ask the user for brand colors/typography before generating UI.

### Colors
| Role | Value | Usage |
|------|-------|-------|
| Primary | [#HEX] | Brand main color |
| Primary Light | [#HEX] | Hover states, backgrounds |
| Primary Dark | [#HEX] | Active states, emphasis |
| Success / Light | [#HEX] / [#HEX] | Positive feedback |
| Error / Light | [#HEX] / [#HEX] | Error states |
| Warning / Light | [#HEX] / [#HEX] | Caution states |
| Info / Light | [#HEX] / [#HEX] | Informational |
| BG Base | [#HEX] | Main background |
| BG Surface | [#HEX] | Card/panel background |
| Border / Light | [#HEX] / [#HEX] | Dividers, outlines |
| Sidebar | [#HEX] | Navigation background |
| Text Primary | [#HEX] | Main text |
| Text Secondary | [#HEX] | Subheadings |
| Text Muted | [#HEX] | Captions, hints |

### Typography
| Role | Font | Weight | Size |
|------|------|--------|------|
| Title | Noto Sans JP | Bold | [SIZE]px |
| Subtitle | Noto Sans JP | Medium | [SIZE]px |
| Body | Noto Sans JP | Regular | [SIZE]px |
| Label | Noto Sans JP | Medium | [SIZE]px |
| KPI | Inter | Bold | [SIZE]px |
| Button | Noto Sans JP | Medium | [SIZE]px |

- Japanese: Noto Sans JP — available weights: Black/Bold/DemiLight/Light/Medium/Regular/Thin (no SemiBold)
- Alphanumeric: Inter — available weights: Bold/Semi Bold/Medium/Regular ("Semi Bold" with space)

### Spacing (8pt grid)
| Token | px | Usage |
|-------|-----|-------|
| XS | 4 | Minimum (exception to 8pt) |
| S | 8 | Tight spacing |
| M | 16 | Default |
| L | 24 | Section inner |
| XL | 32 | Section gap |
| 2XL | 48 | Major section gap |

### Border Radius
Button: [N]px / Badge: [N]px / Card: [N]px / Modal: [N]px
Input: [N]px / Toggle: [N]px / Avatar: full circle

### Components
| Component | Spec |
|-----------|------|
| Button | padding [V]px [H]px, HUG, cornerRadius [N] |
| Full-width Button | `primaryAxisSizingMode="FIXED"` + explicit width |
| Badge | padding [V]px [H]px, HUG, cornerRadius [N], Medium weight |
| Sidebar | [WIDTH]px, logo area [H]px, nav items cornerRadius [N] |
| Input | [HEIGHT]px, cornerRadius [N], border [COLOR] |
| Toggle | [W]x[H], cornerRadius [R], ON/OFF colors |
| Icon | fixed size (HUG forbidden), define per use case |

### Screen Patterns
| Type | Layout |
|------|--------|
| Login | Left brand panel + right form, or centered card |
| List | Sidebar + header + card list or table |
| Detail | Sidebar + header (title + badge + CTA) + content cards |
| Wizard | Sidebar + stepper + content card + back/next |
| Settings | Sidebar + section-split cards + forms |
| Modal | Translucent overlay + centered card + 2 CTA buttons |
| LP Hero | Full-width hero with CTA, feature sections, social proof, footer |

---

## HOW: Figma Plugin API

### Page Operations (CRITICAL)
Before any operation:
```javascript
await figma.setCurrentPageAsync(targetPage);
```
Skipping this → `children` returns 0 → orphan nodes accumulate.
"Delete → create → verify" must complete in one code block.
`get_screenshot` after creation is **mandatory**.

### Font Loading (CRITICAL)
Before setting text content, always load the font:
```javascript
await figma.loadFontAsync({ family: "Noto Sans JP", style: "Regular" });
textNode.characters = "テキスト"; // Without loadFontAsync → runtime exception
```
Load each weight variant you use. This is the #1 cause of Plugin API errors.

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
**FORBIDDEN**: `rect()` + `txt()` sibling nodes with absolute positioning → Japanese width mismatch.

### Error Prevention
| Trap | Rule |
|------|------|
| `counterAxisAlignItems: "STRETCH"` | Invalid. Use MIN, MAX, CENTER, or BASELINE only |
| `layoutSizingHorizontal = "FILL"` | Only works when parent has auto-layout → `appendChild` first |
| Text search | `n.type === "TEXT" && n.characters === "exact match"` |
| Japanese buttons | HUG required (fixed width forbidden, except full-width) |
| Description text | `textAutoResize = "HEIGHT"` |

### Design System Page Structure
One master frame with auto-layout (VERTICAL) containing all sections.
Scattered nodes at page root are **FORBIDDEN** (causes orphan nodes).

---

## Figma Skills & AI Reference

### Community Skills (as of 2026-03)
| Skill | Author | Purpose |
|-------|--------|---------|
| `/figma-generate-library` | Figma | Create components from codebase |
| `/figma-generate-design` | Figma | New designs with existing components/variables |
| `/apply-design-system` | Edenspiekermann | Connect designs to system components |
| `/sync-figma-token` | Firebender | Sync tokens + drift detection |
| `/create-voice` | Uber | Screen reader specs from UI |
| `/cc-figma-component` | One North | Components from structured JSON |

### Write to Canvas (Beta, 2026-03-24~)
`use_figma` tool enables direct canvas writing: frames, components, variants, variables, Auto Layout.
**Limitations**: 20KB response limit, no image assets, no custom fonts, manual review recommended.

### AI Design Prompt Best Practices
- **Use markdown** — headers, bullets, quotes help AI parse structure
- **Ban vague words** — "modern" / "clean" are meaningless. Use "24px whitespace between components"
- **State user intent** — explain WHY, not just WHAT is on screen
- **Two-pass approach** — (1) generate rough draft of all screens → (2) review and refine per page
- **This file is the source of truth** — WHY → WHAT → HOW, always reference before generating
