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

#### CJK Text Width Rules

- Full-width characters (日本語): ~1.0em per character
- Half-width (English/numbers in mixed text): ~0.5em per character
- Minimum button horizontal padding for Japanese: 16px (vs 12px for English)
- Line height for Japanese body text: 170-180% (vs 150% for English)
- Noto Sans JP Bold is ~5% wider than Regular — account for weight changes
- NEVER use `resize(fixedWidth, fixedHeight)` on frames containing Japanese text
- For multi-line Japanese: `textAutoResize = "HEIGHT"` + fixed container width
- For buttons/badges: `primaryAxisSizingMode = "AUTO"` (HUG) + min padding 16px

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

| Role            | Value           | Usage                     |
| --------------- | --------------- | ------------------------- |
| Primary         | [#HEX]          | Brand main color          |
| Primary Light   | [#HEX]          | Hover states, backgrounds |
| Primary Dark    | [#HEX]          | Active states, emphasis   |
| Success / Light | [#HEX] / [#HEX] | Positive feedback         |
| Error / Light   | [#HEX] / [#HEX] | Error states              |
| Warning / Light | [#HEX] / [#HEX] | Caution states            |
| Info / Light    | [#HEX] / [#HEX] | Informational             |
| BG Base         | [#HEX]          | Main background           |
| BG Surface      | [#HEX]          | Card/panel background     |
| Border / Light  | [#HEX] / [#HEX] | Dividers, outlines        |
| Sidebar         | [#HEX]          | Navigation background     |
| Text Primary    | [#HEX]          | Main text                 |
| Text Secondary  | [#HEX]          | Subheadings               |
| Text Muted      | [#HEX]          | Captions, hints           |

### Typography

| Role     | Font         | Weight  | Size     |
| -------- | ------------ | ------- | -------- |
| Title    | Noto Sans JP | Bold    | [SIZE]px |
| Subtitle | Noto Sans JP | Medium  | [SIZE]px |
| Body     | Noto Sans JP | Regular | [SIZE]px |
| Label    | Noto Sans JP | Medium  | [SIZE]px |
| KPI      | Inter        | Bold    | [SIZE]px |
| Button   | Noto Sans JP | Medium  | [SIZE]px |

- Japanese: Noto Sans JP — available weights: Black/Bold/DemiLight/Light/Medium/Regular/Thin (no SemiBold)
- Alphanumeric: Inter — available weights: Bold/Semi Bold/Medium/Regular ("Semi Bold" with space)

### Spacing (8pt grid)

| Token | px  | Usage                      |
| ----- | --- | -------------------------- |
| XS    | 4   | Minimum (exception to 8pt) |
| S     | 8   | Tight spacing              |
| M     | 16  | Default                    |
| L     | 24  | Section inner              |
| XL    | 32  | Section gap                |
| 2XL   | 48  | Major section gap          |

### Border Radius

Button: [N]px / Badge: [N]px / Card: [N]px / Modal: [N]px
Input: [N]px / Toggle: [N]px / Avatar: full circle

### Components

| Component         | Spec                                                      |
| ----------------- | --------------------------------------------------------- |
| Button            | padding [V]px [H]px, HUG, cornerRadius [N]                |
| Full-width Button | `primaryAxisSizingMode="FIXED"` + explicit width          |
| Badge             | padding [V]px [H]px, HUG, cornerRadius [N], Medium weight |
| Sidebar           | [WIDTH]px, logo area [H]px, nav items cornerRadius [N]    |
| Input             | [HEIGHT]px, cornerRadius [N], border [COLOR]              |
| Toggle            | [W]x[H], cornerRadius [R], ON/OFF colors                  |
| Icon              | fixed size (HUG forbidden), define per use case           |

### Component States

| Component | State    | Visual Change                           |
| --------- | -------- | --------------------------------------- |
| Button    | Default  | Standard fill + text colors             |
| Button    | Hover    | Primary Light background                |
| Button    | Active   | Primary Dark background                 |
| Button    | Disabled | opacity 0.4, cursor not-allowed         |
| Button    | Focus    | 2px offset ring, Primary color          |
| Input     | Default  | border [COLOR], background white        |
| Input     | Focus    | border Primary, 2px width               |
| Input     | Error    | border Error, error message below field |
| Input     | Disabled | background neutral-100, text muted      |
| Toggle    | OFF      | [OFF_COLOR] background, knob left       |
| Toggle    | ON       | [ON_COLOR] background, knob right       |

### Screen Patterns

| Type     | Layout                                                           |
| -------- | ---------------------------------------------------------------- |
| Login    | Left brand panel + right form, or centered card                  |
| List     | Sidebar + header + card list or table                            |
| Detail   | Sidebar + header (title + badge + CTA) + content cards           |
| Wizard   | Sidebar + stepper + content card + back/next                     |
| Settings | Sidebar + section-split cards + forms                            |
| Modal    | Translucent overlay + centered card + 2 CTA buttons              |
| LP Hero  | Full-width hero with CTA, feature sections, social proof, footer |

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
await figma.loadFontAsync({ family: 'Noto Sans JP', style: 'Regular' });
textNode.characters = 'テキスト'; // Without loadFontAsync → runtime exception
```

Load each weight variant you use. This is the #1 cause of Plugin API errors.

### Auto-Layout Construction Pattern

Background-with-text (badge, button) MUST use Frame auto-layout:

```javascript
const f = figma.createFrame();
f.layoutMode = 'HORIZONTAL';
f.primaryAxisSizingMode = 'AUTO'; // HUG
f.counterAxisSizingMode = 'AUTO';
f.paddingLeft = 10;
f.paddingRight = 10;
f.paddingTop = 4;
f.paddingBottom = 4;
f.cornerRadius = 12;
f.fills = [{ type: 'SOLID', color: bg }];
const t = figma.createText();
t.characters = 'Label';
f.appendChild(t);
```

**FORBIDDEN**: `rect()` + `txt()` sibling nodes with absolute positioning → Japanese width mismatch.

### Error Prevention

| Trap                               | Rule                                                         |
| ---------------------------------- | ------------------------------------------------------------ |
| `counterAxisAlignItems: "STRETCH"` | Invalid. Use MIN, MAX, CENTER, or BASELINE only              |
| `layoutSizingHorizontal = "FILL"`  | Only works when parent has auto-layout → `appendChild` first |
| Text search                        | `n.type === "TEXT" && n.characters === "exact match"`        |
| Japanese buttons                   | HUG required (fixed width forbidden, except full-width)      |
| Description text                   | `textAutoResize = "HEIGHT"`                                  |

### Design System Page Structure

One master frame with auto-layout (VERTICAL) containing all sections.
Scattered nodes at page root are **FORBIDDEN** (causes orphan nodes).

---

## HEAL: Self-Healing Loop (Post-Creation Verification)

Every `use_figma` call that creates or modifies nodes MUST follow this protocol.

### Defect Prevention Preamble (MANDATORY)

Every `use_figma` code block in Phase 5C-5E MUST begin with:

```javascript
// === PREAMBLE ===
await figma.setCurrentPageAsync(figma.currentPage);
// Load only the font variants actually used in this code block
await figma.loadFontAsync({ family: 'Noto Sans JP', style: 'Regular' });
await figma.loadFontAsync({ family: 'Noto Sans JP', style: 'Medium' });
await figma.loadFontAsync({ family: 'Noto Sans JP', style: 'Bold' });
await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
await figma.loadFontAsync({ family: 'Inter', style: 'Medium' });
await figma.loadFontAsync({ family: 'Inter', style: 'Bold' });
await figma.loadFontAsync({ family: 'Inter', style: 'Semi Bold' });
// Snapshot page children for error rollback
const _preChildIds = new Set(figma.currentPage.children.map((n) => n.id));
try {
  // ... creation code here ...
} catch (e) {
  // Rollback: remove nodes created during this block (not in pre-snapshot)
  for (const child of [...figma.currentPage.children]) {
    if (!_preChildIds.has(child.id)) child.remove();
  }
  return JSON.stringify({ success: false, error: e.message, rolledBack: true });
}
```

### Verification Suffix (MANDATORY)

Every `use_figma` code block MUST end with this verification:

```javascript
// === VERIFICATION ===
const _page = figma.currentPage;
const _allText = _page.findAll((n) => n.type === 'TEXT');
const _allFrames = _page.findAll((n) => n.type === 'FRAME');
const _validPrefixes = ['WF-', 'MK-', 'DS-', 'SC-'];
const _pageOrphans = _page.children.filter(
  (n) => !_validPrefixes.some((p) => n.name.startsWith(p))
);
const _v = {
  success: true,
  expectedPageChildren: 1, // Only the master frame
  actualPageChildren: _page.children.length,
  pageOrphans: _pageOrphans.map((n) => ({ name: n.name, type: n.type, id: n.id })),
  orphanCount: _pageOrphans.length,
  emptyTextNodes: _allText.filter((n) => n.characters.length === 0).map((n) => n.name),
  gridViolations: _allFrames
    .filter(
      (n) =>
        n.layoutMode !== 'NONE' &&
        ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight', 'itemSpacing'].some(
          (p) => n[p] % 4 !== 0 && n[p] !== 0
        )
    )
    .map((n) => n.name),
  fillWithoutAutoLayout: _allFrames
    .filter((n) => n.layoutSizingHorizontal === 'FILL' && n.parent?.layoutMode === 'NONE')
    .map((n) => n.name),
};
return JSON.stringify(_v);
```

### Verification Response Handling

| Field                   | Expected | Action if violated                                      |
| ----------------------- | -------- | ------------------------------------------------------- |
| `actualPageChildren`    | `1`      | Check `pageOrphans` for details, apply F-002            |
| `orphanCount`           | `0`      | Fix F-002: remove orphan nodes listed in `pageOrphans`  |
| `emptyTextNodes`        | `[]`     | Fix F-001: reload fonts + re-set characters             |
| `gridViolations`        | `[]`     | Fix F-004: snap to nearest 4px multiple                 |
| `fillWithoutAutoLayout` | `[]`     | Fix F-003: set parent layoutMode first                  |

### Post-Verification Screenshot

After every batch of `use_figma` calls, ALWAYS run `get_screenshot` and confirm:

- [ ] No "square" placeholder characters (font loading OK)
- [ ] No overlapping elements (auto-layout OK)
- [ ] Text not truncated (HUG sizing OK for Japanese)
- [ ] Colors match design brief (token application OK)
- [ ] Hero element is visually prominent (hierarchy OK)

### Self-Healing Rules

1. Parse verification JSON after every `use_figma` call
2. If any field violates expected values → apply targeted fix (see `references/figma_code_patterns.md` Section 11)
3. Re-run verification after fix
4. Max **2 auto-fix attempts** per defect — if still failing, report to user with screenshot
5. **Never full-regenerate** — surgical fixes on specific broken nodes only

### Defect Severity Classification

| Severity | Examples                                                | Action                        |
| -------- | ------------------------------------------------------- | ----------------------------- |
| P0       | Font load failure, page context lost, runtime exception | Block — fix before proceeding |
| P1       | Japanese text truncation, element overlap, wrong colors | Auto-heal, re-verify          |
| P2       | Orphan nodes, 8pt grid violation, naming convention     | Auto-heal in batch            |
| P3       | Corner radius inconsistency, shadow mismatch            | Log for user review           |

---

## SYNC: Token Drift Prevention

### Source of Truth Hierarchy

1. **DESIGN.md** token table (master definition)
2. **Figma variable collection** (derived from DESIGN.md)
3. **Code CSS variables** (derived from Figma export)

### Drift Detection Protocol

Before Phase 5D (Wireframes) and Phase 5E (Mockups):

1. Read DESIGN.md token values
2. Call `get_variable_defs` from Figma file
3. Compare: any mismatches → report and prompt user to choose source
4. Update the non-authoritative source

### Token Naming Convention

| DESIGN.md Role | Figma Variable Name | CSS Custom Property  |
| -------------- | ------------------- | -------------------- |
| Primary        | color/primary       | --color-primary      |
| BG Base        | color/bg/base       | --color-bg-base      |
| Text Primary   | color/text/primary  | --color-text-primary |
| spacing/M      | spacing/4           | --spacing-4          |

---

## Figma Skills & AI Reference

### Community Skills (as of 2026-03)

| Skill                     | Author          | Purpose                                        |
| ------------------------- | --------------- | ---------------------------------------------- |
| `/figma-generate-library` | Figma           | Create components from codebase                |
| `/figma-generate-design`  | Figma           | New designs with existing components/variables |
| `/apply-design-system`    | Edenspiekermann | Connect designs to system components           |
| `/sync-figma-token`       | Firebender      | Sync tokens + drift detection                  |
| `/create-voice`           | Uber            | Screen reader specs from UI                    |
| `/cc-figma-component`     | One North       | Components from structured JSON                |

### Write to Canvas (Beta, 2026-03-24~)

`use_figma` tool enables direct canvas writing: frames, components, variants, variables, Auto Layout.
**Limitations**: 20KB response limit, no image assets, no custom fonts, manual review recommended.

### AI Design Prompt Best Practices

- **Use markdown** — headers, bullets, quotes help AI parse structure
- **Ban vague words** — "modern" / "clean" are meaningless. Use "24px whitespace between components"
- **State user intent** — explain WHY, not just WHAT is on screen
- **Two-pass approach** — (1) generate rough draft of all screens → (2) review and refine per page
- **This file is the source of truth** — WHY → WHAT → HOW, always reference before generating
