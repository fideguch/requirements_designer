# Figma Plugin API Code Patterns / Figma コードパターン集

`use_figma` ツールで使用する再利用可能なJavaScriptパターン集。
Phase 5C-5Eで参照し、コードの品質と一貫性を確保する。

---

## 1. ページ管理

### ページ作成

```javascript
// 新規ページを作成して移動
const page = figma.createPage();
page.name = 'Design System';
figma.currentPage = page;
```

### 既存ページの取得

```javascript
const page = figma.root.children.find((p) => p.name === 'Design System');
if (page) {
  figma.currentPage = page;
}
```

### 複数ページの一括作成

```javascript
const pageNames = ['Design System', 'Wireframes', 'Mockups'];
for (const name of pageNames) {
  const existing = figma.root.children.find((p) => p.name === name);
  if (!existing) {
    const page = figma.createPage();
    page.name = name;
  }
}
// デフォルトの "Page 1" を削除（オプション）
const defaultPage = figma.root.children.find((p) => p.name === 'Page 1');
if (defaultPage && figma.root.children.length > 1) {
  defaultPage.remove();
}
```

---

## 2. フレーム作成（Auto Layout）

### 基本フレーム

```javascript
const frame = figma.createFrame();
frame.name = 'WF-US001 — Dashboard';
frame.resize(1440, 900);
frame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
```

### Auto Layoutフレーム（垂直）

```javascript
const container = figma.createFrame();
container.name = 'Content';
container.layoutMode = 'VERTICAL';
container.primaryAxisAlignItems = 'MIN';
container.counterAxisAlignItems = 'CENTER';
container.paddingTop = 32;
container.paddingBottom = 32;
container.paddingLeft = 24;
container.paddingRight = 24;
container.itemSpacing = 16;
container.primaryAxisSizingMode = 'AUTO';
container.counterAxisSizingMode = 'FIXED';
container.resize(1440, container.height);
```

### Auto Layoutフレーム（水平）

```javascript
const row = figma.createFrame();
row.name = 'Row';
row.layoutMode = 'HORIZONTAL';
row.primaryAxisAlignItems = 'MIN';
row.counterAxisAlignItems = 'CENTER';
row.itemSpacing = 24;
row.primaryAxisSizingMode = 'FIXED';
row.counterAxisSizingMode = 'AUTO';
row.fills = [];
```

---

## 3. カラー変数

### 変数コレクションとカラー変数の作成

```javascript
// コレクション作成
const collection = figma.variables.createVariableCollection('Design Tokens');

// カラー変数作成ヘルパー
function createColorVariable(collection, name, hexColor) {
  const variable = figma.variables.createVariable(name, collection, 'COLOR');
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;
  variable.setValueForMode(collection.modes[0].modeId, { r, g, b, a: 1 });
  return variable;
}

// 使用例
const primary = createColorVariable(collection, 'color/primary', '#2563EB');
const secondary = createColorVariable(collection, 'color/secondary', '#7C3AED');
const accent = createColorVariable(collection, 'color/accent', '#F59E0B');
const neutral50 = createColorVariable(collection, 'color/neutral/50', '#F9FAFB');
const neutral900 = createColorVariable(collection, 'color/neutral/900', '#111827');
const success = createColorVariable(collection, 'color/semantic/success', '#10B981');
const warning = createColorVariable(collection, 'color/semantic/warning', '#F59E0B');
const error = createColorVariable(collection, 'color/semantic/error', '#EF4444');
const info = createColorVariable(collection, 'color/semantic/info', '#3B82F6');
```

### 変数をフレームに適用

```javascript
// カラー変数をfillにバインド
const fills = figma.util.solidPaint('#000000');
frame.fills = [fills];
frame.setBoundVariable('fills', 0, 'color', variable);
```

---

## 4. スペーシング変数

### スペーシングスケールの作成

```javascript
const spacingCollection = figma.variables.createVariableCollection('Spacing');

const spacingScale = {
  'spacing/1': 4,
  'spacing/2': 8,
  'spacing/3': 12,
  'spacing/4': 16,
  'spacing/6': 24,
  'spacing/8': 32,
  'spacing/12': 48,
  'spacing/16': 64,
  'spacing/24': 96,
  'spacing/28': 112,
  'spacing/32': 128,
};

for (const [name, value] of Object.entries(spacingScale)) {
  const variable = figma.variables.createVariable(name, spacingCollection, 'FLOAT');
  variable.setValueForMode(spacingCollection.modes[0].modeId, value);
}
```

---

## 5. テキストスタイル

### テキストスタイルの作成

```javascript
async function createTextStyle(name, fontFamily, fontSize, fontWeight, lineHeight) {
  const style = figma.createTextStyle();
  style.name = name;
  await figma.loadFontAsync({ family: fontFamily, style: fontWeight });
  style.fontName = { family: fontFamily, style: fontWeight };
  style.fontSize = fontSize;
  if (lineHeight) {
    style.lineHeight = { value: lineHeight, unit: 'PERCENT' };
  }
  return style;
}

// 使用例（非同期関数内で実行）
await createTextStyle('Heading/H1', 'Inter', 48, 'Bold', 120);
await createTextStyle('Heading/H2', 'Inter', 36, 'SemiBold', 130);
await createTextStyle('Heading/H3', 'Inter', 24, 'SemiBold', 140);
await createTextStyle('Body/Regular', 'Inter', 16, 'Regular', 150);
await createTextStyle('Body/Caption', 'Inter', 14, 'Regular', 150);
await createTextStyle('Body/Overline', 'Inter', 12, 'Medium', 150);
```

### テキストノード作成

```javascript
async function createText(text, fontFamily, fontSize, fontWeight, color) {
  const textNode = figma.createText();
  await figma.loadFontAsync({ family: fontFamily, style: fontWeight || 'Regular' });
  textNode.fontName = { family: fontFamily, style: fontWeight || 'Regular' };
  textNode.fontSize = fontSize;
  textNode.characters = text;
  if (color) {
    textNode.fills = [{ type: 'SOLID', color }];
  }
  return textNode;
}
```

---

## 6. 共通レイアウトパターン

### ヘッダー + サイドバー + コンテンツ

```javascript
// メインレイアウト
const main = figma.createFrame();
main.name = 'Layout';
main.layoutMode = 'HORIZONTAL';
main.resize(1440, 900);
main.fills = [{ type: 'SOLID', color: { r: 0.976, g: 0.976, b: 0.98 } }];

// サイドバー
const sidebar = figma.createFrame();
sidebar.name = 'Sidebar';
sidebar.layoutMode = 'VERTICAL';
sidebar.resize(240, 900);
sidebar.paddingTop = 24;
sidebar.paddingLeft = 16;
sidebar.paddingRight = 16;
sidebar.itemSpacing = 8;
sidebar.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
sidebar.layoutSizingVertical = 'FILL';

// コンテンツエリア
const content = figma.createFrame();
content.name = 'Content';
content.layoutMode = 'VERTICAL';
content.paddingTop = 32;
content.paddingLeft = 32;
content.paddingRight = 32;
content.paddingBottom = 32;
content.itemSpacing = 24;
content.fills = [];
content.layoutSizingHorizontal = 'FILL';
content.layoutSizingVertical = 'FILL';

main.appendChild(sidebar);
main.appendChild(content);
```

### カードグリッド（2x2）

```javascript
const grid = figma.createFrame();
grid.name = 'Card Grid';
grid.layoutMode = 'VERTICAL';
grid.itemSpacing = 24;
grid.fills = [];

for (let row = 0; row < 2; row++) {
  const rowFrame = figma.createFrame();
  rowFrame.name = `Row ${row + 1}`;
  rowFrame.layoutMode = 'HORIZONTAL';
  rowFrame.itemSpacing = 24;
  rowFrame.fills = [];
  rowFrame.layoutSizingHorizontal = 'FILL';

  for (let col = 0; col < 2; col++) {
    const card = figma.createFrame();
    card.name = `Card ${row * 2 + col + 1}`;
    card.layoutMode = 'VERTICAL';
    card.resize(320, 200);
    card.cornerRadius = 12;
    card.paddingTop = 24;
    card.paddingBottom = 24;
    card.paddingLeft = 24;
    card.paddingRight = 24;
    card.itemSpacing = 12;
    card.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    card.effects = [
      {
        type: 'DROP_SHADOW',
        color: { r: 0, g: 0, b: 0, a: 0.08 },
        offset: { x: 0, y: 2 },
        radius: 8,
        visible: true,
        blendMode: 'NORMAL',
      },
    ];
    card.layoutSizingHorizontal = 'FILL';
    rowFrame.appendChild(card);
  }
  grid.appendChild(rowFrame);
}
```

### フォームレイアウト

```javascript
async function createFormField(label, placeholder, width) {
  const field = figma.createFrame();
  field.name = `Field — ${label}`;
  field.layoutMode = 'VERTICAL';
  field.itemSpacing = 6;
  field.fills = [];
  field.layoutSizingHorizontal = 'FILL';

  // ラベル
  const labelText = await createText(label, 'Inter', 14, 'Medium', { r: 0.27, g: 0.27, b: 0.33 });
  field.appendChild(labelText);

  // 入力フィールド
  const input = figma.createFrame();
  input.name = 'Input';
  input.layoutMode = 'HORIZONTAL';
  input.resize(width || 320, 44);
  input.cornerRadius = 8;
  input.paddingLeft = 12;
  input.paddingRight = 12;
  input.counterAxisAlignItems = 'CENTER';
  input.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  input.strokes = [{ type: 'SOLID', color: { r: 0.82, g: 0.82, b: 0.85 } }];
  input.strokeWeight = 1;
  input.layoutSizingHorizontal = 'FILL';

  const placeholderText = await createText(placeholder, 'Inter', 16, 'Regular', {
    r: 0.63,
    g: 0.63,
    b: 0.67,
  });
  input.appendChild(placeholderText);
  field.appendChild(input);

  return field;
}
```

---

## 7. ワイヤーフレームパターン

### プレースホルダー矩形（画像/コンテンツ用）

```javascript
function createPlaceholder(name, width, height, label) {
  const rect = figma.createFrame();
  rect.name = name;
  rect.resize(width, height);
  rect.cornerRadius = 8;
  rect.fills = [{ type: 'SOLID', color: { r: 0.9, g: 0.9, b: 0.92 } }];

  // 対角線（X印）でプレースホルダーを示す
  const line1 = figma.createLine();
  line1.resize(Math.min(width, height) * 0.3, 0);
  line1.rotation = -45;
  line1.x = width / 2 - 20;
  line1.y = height / 2 - 20;
  line1.strokes = [{ type: 'SOLID', color: { r: 0.75, g: 0.75, b: 0.78 } }];
  rect.appendChild(line1);

  return rect;
}
```

### ワイヤーフレームカラーパレット（グレースケール）

```javascript
const WF_COLORS = {
  background: { r: 1, g: 1, b: 1 },
  surface: { r: 0.96, g: 0.96, b: 0.98 },
  placeholder: { r: 0.9, g: 0.9, b: 0.92 },
  border: { r: 0.82, g: 0.82, b: 0.85 },
  textPrimary: { r: 0.13, g: 0.13, b: 0.15 },
  textSecondary: { r: 0.45, g: 0.45, b: 0.48 },
  textPlaceholder: { r: 0.63, g: 0.63, b: 0.67 },
  accent: { r: 0.4, g: 0.4, b: 0.43 },
};
```

---

## 8. ユーティリティ

### HEXからRGBへの変換

```javascript
function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.substring(0, 2), 16) / 255,
    g: parseInt(h.substring(2, 4), 16) / 255,
    b: parseInt(h.substring(4, 6), 16) / 255,
  };
}
```

### ノードの検索

```javascript
// 名前でノードを検索（現在のページ内）
function findByName(name) {
  return figma.currentPage.findOne((n) => n.name === name);
}

// タイプと名前で検索
function findFrameByName(name) {
  return figma.currentPage.findOne((n) => n.type === 'FRAME' && n.name === name);
}
```

### コントラスト比の計算

```javascript
function getRelativeLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map((c) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  );
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrastRatio(color1, color2) {
  const l1 = getRelativeLuminance(color1.r, color1.g, color1.b);
  const l2 = getRelativeLuminance(color2.r, color2.g, color2.b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// WCAG 2.1 AA: 通常テキスト >= 4.5, 大テキスト >= 3.0
// WCAG 2.1 AAA: 通常テキスト >= 7.0, 大テキスト >= 4.5
```

---

## 9. エラー防止ラッパー / Error Prevention Wrappers

### 安全なテキスト作成（フォントロード保証 + 日本語自動HUG）

```javascript
async function safeCreateText(text, fontFamily, fontSize, fontWeight, color) {
  const weight = fontWeight || 'Regular';
  await figma.loadFontAsync({ family: fontFamily, style: weight });
  const textNode = figma.createText();
  textNode.fontName = { family: fontFamily, style: weight };
  textNode.fontSize = fontSize;
  textNode.characters = text;
  if (color) {
    textNode.fills = [{ type: 'SOLID', color }];
  }
  // Japanese text: always HUG, never fixed width
  if (/[\u3000-\u9FFF\u30A0-\u30FF\u3040-\u309F]/.test(text)) {
    textNode.textAutoResize = 'WIDTH_AND_HEIGHT';
  }
  return textNode;
}
```

### 安全なFILL設定（親Auto-Layout確認付き）

```javascript
function safeSetFill(node, parent) {
  if (parent && parent.layoutMode && parent.layoutMode !== 'NONE') {
    node.layoutSizingHorizontal = 'FILL';
  } else {
    // Fallback: set fixed width instead of crashing
    node.resize(parent ? parent.width : 400, node.height);
  }
}
```

### 安全なページ操作（コンテキスト保証付き）

```javascript
async function safeSetPage(pageName) {
  let page = figma.root.children.find((p) => p.name === pageName);
  if (!page) {
    page = figma.createPage();
    page.name = pageName;
  }
  await figma.setCurrentPageAsync(page);
  return page;
}
```

### try/catch ラッパー

```javascript
async function safeFigmaOp(description, operation) {
  try {
    const result = await operation();
    return { success: true, description, result };
  } catch (e) {
    return { success: false, description, error: e.message };
  }
}
// Usage:
const result = await safeFigmaOp('Create dashboard wireframe', async () => {
  // ... creation code ...
  return { nodesCreated: 5 };
});
```

---

## 10. 検証ユーティリティ / Verification Utilities

### ノードツリー検証

```javascript
function verifyNodeTree(page, expectedRootPrefixes) {
  const issues = [];

  // Check orphans
  const orphans = page.children.filter(
    (n) => !expectedRootPrefixes.some((prefix) => n.name.startsWith(prefix))
  );
  if (orphans.length > 0) {
    issues.push({
      type: 'ORPHAN_NODES',
      severity: 'P2',
      count: orphans.length,
      nodes: orphans.map((n) => ({ id: n.id, name: n.name })),
    });
  }

  // Check empty text nodes (font loading failure)
  const emptyTexts = page.findAll((n) => n.type === 'TEXT' && n.characters.length === 0);
  if (emptyTexts.length > 0) {
    issues.push({
      type: 'EMPTY_TEXT',
      severity: 'P0',
      count: emptyTexts.length,
      nodes: emptyTexts.map((n) => ({ id: n.id, name: n.name })),
    });
  }

  // Check FILL without parent auto-layout
  const frames = page.findAll((n) => n.type === 'FRAME');
  for (const f of frames) {
    if (f.layoutSizingHorizontal === 'FILL' && f.parent?.layoutMode === 'NONE') {
      issues.push({
        type: 'FILL_NO_PARENT_AL',
        severity: 'P1',
        node: { id: f.id, name: f.name, parent: f.parent?.name },
      });
    }
  }

  // Check 8pt grid violations
  for (const f of frames) {
    if (f.layoutMode === 'NONE') continue;
    for (const prop of [
      'paddingTop',
      'paddingBottom',
      'paddingLeft',
      'paddingRight',
      'itemSpacing',
    ]) {
      if (f[prop] % 4 !== 0 && f[prop] !== 0) {
        issues.push({
          type: 'GRID_VIOLATION',
          severity: 'P2',
          node: f.name,
          property: prop,
          value: f[prop],
          fix: Math.round(f[prop] / 4) * 4,
        });
      }
    }
  }

  return issues;
}
// Usage: const issues = verifyNodeTree(figma.currentPage, ['WF-', 'MK-', 'DS-', 'SC-']);
```

### コントラスト比自動チェック

```javascript
function verifyContrast(page) {
  const issues = [];
  const textNodes = page.findAll((n) => n.type === 'TEXT');
  for (const t of textNodes) {
    if (!t.fills || t.fills.length === 0) continue;
    const textColor = t.fills[0]?.color;
    if (!textColor) continue;
    let parent = t.parent;
    let bgColor = null;
    while (parent) {
      if (parent.fills && parent.fills.length > 0 && parent.fills[0]?.color) {
        bgColor = parent.fills[0].color;
        break;
      }
      parent = parent.parent;
    }
    if (!bgColor) continue;
    const ratio = getContrastRatio(textColor, bgColor);
    const isLarge = t.fontSize >= 18 || (t.fontSize >= 14 && t.fontName?.style?.includes('Bold'));
    const threshold = isLarge ? 3.0 : 4.5;
    if (ratio < threshold) {
      issues.push({
        type: 'CONTRAST_FAIL',
        severity: 'P2',
        node: t.name,
        text: t.characters.substring(0, 30),
        ratio: ratio.toFixed(2),
        required: threshold,
      });
    }
  }
  return issues;
}
```

### 命名規則検証

```javascript
function verifyNaming(page, phase) {
  const prefix = phase === 'wireframe' ? 'WF-' : 'MK-';
  const issues = [];
  for (const f of page.children) {
    if (f.type === 'FRAME' && !f.name.startsWith(prefix) && !f.name.startsWith('DS-')) {
      issues.push({
        type: 'NAMING',
        severity: 'P3',
        node: f.name,
        expected: `${prefix}[US-XXX] — [Screen Name]`,
      });
    }
  }
  return issues;
}
```

---

## 11. 自己修復パターン / Self-Healing Fix Patterns

See DESIGN.md "HEAL" section for when to apply these patterns.

### F-001: フォント再ロード + テキスト再設定

```javascript
async function fixFontLoading(page) {
  const textNodes = page.findAll((n) => n.type === 'TEXT');
  let fixed = 0;
  for (const t of textNodes) {
    if (t.fontName && t.characters.length === 0) {
      await figma.loadFontAsync(t.fontName);
      // If characters were lost, they need to be re-set from the caller
      fixed++;
    }
  }
  return { pattern: 'F-001', fixed };
}
```

### F-002: オーファンノード除去

```javascript
function fixOrphans(page, validPrefixes) {
  const orphans = page.children.filter((n) => !validPrefixes.some((p) => n.name.startsWith(p)));
  let removed = 0;
  for (const orphan of orphans) {
    orphan.remove();
    removed++;
  }
  return { pattern: 'F-002', removed };
}
// Usage: fixOrphans(figma.currentPage, ['WF-', 'MK-', 'DS-', 'SC-', 'Design System']);
```

### F-003: Auto-Layout 修復

```javascript
function fixAutoLayout(page) {
  const frames = page.findAll((n) => n.type === 'FRAME');
  let fixed = 0;
  for (const f of frames) {
    if (f.layoutSizingHorizontal === 'FILL' && f.parent?.layoutMode === 'NONE') {
      f.parent.layoutMode = 'VERTICAL';
      f.parent.primaryAxisSizingMode = 'AUTO';
      fixed++;
    }
    if (f.counterAxisAlignItems === 'STRETCH') {
      f.counterAxisAlignItems = 'MIN';
      fixed++;
    }
  }
  return { pattern: 'F-003', fixed };
}
```

### F-004: 8pt グリッドスナップ

```javascript
function fixGridSnap(page) {
  const frames = page.findAll((n) => n.type === 'FRAME' && n.layoutMode !== 'NONE');
  let fixed = 0;
  for (const f of frames) {
    for (const prop of [
      'paddingTop',
      'paddingBottom',
      'paddingLeft',
      'paddingRight',
      'itemSpacing',
    ]) {
      if (f[prop] % 4 !== 0 && f[prop] !== 0) {
        f[prop] = Math.round(f[prop] / 4) * 4;
        fixed++;
      }
    }
  }
  return { pattern: 'F-004', fixed };
}
```

### F-005: 日本語テキスト HUG 強制

```javascript
async function fixJapaneseTextSizing(page) {
  const textNodes = page.findAll((n) => n.type === 'TEXT');
  let fixed = 0;
  for (const t of textNodes) {
    if (/[\u3000-\u9FFF\u30A0-\u30FF\u3040-\u309F]/.test(t.characters)) {
      if (t.parent?.type === 'FRAME' && t.parent.layoutMode !== 'NONE') {
        if (t.parent.primaryAxisSizingMode !== 'AUTO') {
          t.parent.primaryAxisSizingMode = 'AUTO'; // HUG
          fixed++;
        }
      }
      if (t.textAutoResize !== 'WIDTH_AND_HEIGHT' && t.textAutoResize !== 'HEIGHT') {
        t.textAutoResize = 'HEIGHT';
        fixed++;
      }
    }
  }
  return { pattern: 'F-005', fixed };
}
```
