import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const SKILL_DIR = path.resolve(__dirname, '..');

// Helper to read file content
function readFile(relativePath: string): string {
  return fs.readFileSync(path.join(SKILL_DIR, relativePath), 'utf-8');
}

// ============================================================
// Test Suite 4: SKILL.md — Figma MCP Tool References
// ============================================================
test.describe('SKILL.md Figma MCP Tool References', () => {
  let content: string;

  test.beforeAll(() => {
    content = readFile('SKILL.md');
  });

  const figmaTools = [
    'whoami',
    'create_new_file',
    'use_figma',
    'generate_diagram',
    'get_screenshot',
    'search_design_system',
    'get_metadata',
  ];

  for (const tool of figmaTools) {
    test(`references Figma tool: ${tool.split('__').pop()}`, () => {
      expect(content).toContain(tool);
    });
  }
});

// ============================================================
// Test Suite 5: SKILL.md — UI Skills Integration
// ============================================================
test.describe('SKILL.md UI Skills Integration', () => {
  let content: string;

  test.beforeAll(() => {
    content = readFile('SKILL.md');
  });

  test('references ui-ux-pro-max', () => {
    expect(content).toContain('ui-ux-pro-max');
  });

  test('references frontend-design', () => {
    expect(content).toContain('frontend-design');
  });

  test('references web-design-guidelines', () => {
    expect(content).toContain('web-design-guidelines');
  });
});

// ============================================================
// Test Suite 6: SKILL.md — Phase 4C UI Design Option
// ============================================================
test.describe('SKILL.md Phase 4C Ubiquitous Language', () => {
  let content: string;

  test.beforeAll(() => {
    content = readFile('SKILL.md');
  });

  test('Phase 4C includes ubiquitous language definition', () => {
    expect(content).toMatch(/### 4C:.*ユビキタス言語/);
  });

  test('Phase 4C includes UL-001 format', () => {
    expect(content).toContain('UL-001');
  });

  test('Phase 4C includes term extraction logic', () => {
    expect(content).toContain('ドメイン用語');
  });

  test('Phase 4C includes anti-pattern rules', () => {
    expect(content).toContain('アンチパターン');
  });

  test('Phase 4C includes user-facing label concept', () => {
    expect(content).toContain('ユーザー向けラベル');
  });

  test('Phase 4C includes code representation', () => {
    expect(content).toContain('コード命名');
  });
});

test.describe('SKILL.md Phase 4D Next Steps', () => {
  let content: string;

  test.beforeAll(() => {
    content = readFile('SKILL.md');
  });

  test('Phase 4D includes UI design option', () => {
    expect(content).toContain('UIデザイン');
  });

  test('Phase 4D preserves original options', () => {
    expect(content).toContain('PRD化');
    expect(content).toContain('brainstorming');
    expect(content).toContain('writing-plans');
    expect(content).toContain('品質改善');
  });
});

// ============================================================
// Test Suite 7: SKILL.md — Progress Detection
// ============================================================
test.describe('SKILL.md Progress Detection', () => {
  let content: string;

  test.beforeAll(() => {
    content = readFile('SKILL.md');
  });

  test('detects Phase 0 completion', () => {
    expect(content).toContain('workflow_config.md が存在 → Phase 0 完了');
  });

  test('detects Phase 1 completion', () => {
    expect(content).toContain('README.md が存在 → Phase 1 完了');
  });

  test('detects Phase 4C completion', () => {
    expect(content).toContain('ubiquitous_language.md');
  });

  test('detects Phase 5A completion', () => {
    expect(content).toContain('ui_design_brief.md が存在 → Phase 5A 完了');
  });

  test('detects Phase 5B completion', () => {
    expect(content).toContain('FigJam URL 記載あり → Phase 5B 完了');
  });

  test('detects Phase 5C+ progress', () => {
    expect(content).toContain('Design File URL 記載あり → Phase 5C+ 進行中');
  });
});

// ============================================================
// Test Suite 10: SKILL.md — Phase 5E Quality Scoring
// ============================================================
test.describe('SKILL.md Phase 5E Quality', () => {
  let phase5Ref: string;
  let uiRubric: string;

  test.beforeAll(() => {
    phase5Ref = readFile('references/phase5_ui_design.md');
    uiRubric = readFile('references/ui_design_rubric.md');
  });

  test('includes UI design quality score table', () => {
    expect(phase5Ref).toContain('UIデザイン品質スコア');
  });

  const scoreDimensions = [
    'DS完全性',
    '画面カバレッジ',
    'ビジュアルヒエラルキー',
    'アクセシビリティ',
    '要件トレーサビリティ',
  ];

  for (const dim of scoreDimensions) {
    test(`quality score includes dimension: ${dim}`, () => {
      const combined = phase5Ref + uiRubric;
      expect(combined).toContain(dim);
    });
  }

  test('includes score thresholds', () => {
    expect(phase5Ref).toContain('70点未満');
    expect(phase5Ref).toContain('70〜79点');
    expect(phase5Ref).toContain('80点以上');
  });
});

// ============================================================
// Test Suite 11: SKILL.md — Phase 5E Next Steps
// ============================================================
test.describe('SKILL.md Phase 5E Next Steps', () => {
  let phase5Ref: string;
  let skillContent: string;

  test.beforeAll(() => {
    phase5Ref = readFile('references/phase5_ui_design.md');
    skillContent = readFile('SKILL.md');
  });

  test('includes Code Connect option', () => {
    expect(phase5Ref).toContain('Code Connect');
  });

  test('includes implementation plan option', () => {
    expect(skillContent).toContain('writing-plans');
  });

  test('includes design audit option', () => {
    expect(phase5Ref).toContain('デザイン監査');
  });
});

// ============================================================
// Test Suite 25: Phase 4C UL Integration with Phase 5
// ============================================================
test.describe('Phase 4C UL Integration with Phase 5', () => {
  let content: string;

  test.beforeAll(() => {
    content = readFile('SKILL.md');
  });

  test('Phase 5 references ubiquitous_language.md', () => {
    const phase5Start = content.indexOf('## Phase 5:');
    const phase5Content = content.substring(phase5Start);
    expect(phase5Content).toContain('ubiquitous_language.md');
  });

  test('Phase 5 mentions user-facing labels from UL', () => {
    const phase5Start = content.indexOf('## Phase 5:');
    const phase5Content = content.substring(phase5Start);
    expect(phase5Content).toContain('ユーザー向けラベル');
  });

  test('Phase 4 heading includes ubiquitous language', () => {
    expect(content).toMatch(/## Phase 4:.*ユビキタス言語/);
  });
});

// ============================================================
// Test Suite 26: Quality Rubric UL Integration
// ============================================================
test.describe('Quality Rubric UL Integration', () => {
  let content: string;

  test.beforeAll(() => {
    content = readFile('references/quality_rubric.md');
  });

  test('consistency dimension references UL', () => {
    expect(content).toContain('ubiquitous_language.md');
  });

  test('score improvement references UL', () => {
    expect(content).toContain('ユビキタス言語定義');
  });
});

// ============================================================
// Test Suite 27: Phase 4 Sub-phase Order
// ============================================================
test.describe('Phase 4 Sub-phase Order', () => {
  let content: string;

  test.beforeAll(() => {
    content = readFile('SKILL.md');
  });

  test('Phase 4 sub-phase order is correct (4A < 4B < 4C < 4D)', () => {
    const a = content.indexOf('### 4A:');
    const b = content.indexOf('### 4B:');
    const c = content.indexOf('### 4C:');
    const d = content.indexOf('### 4D:');

    expect(a).toBeGreaterThan(-1);
    expect(b).toBeGreaterThan(a);
    expect(c).toBeGreaterThan(b);
    expect(d).toBeGreaterThan(c);
  });

  test('Phase 4C comes before Phase 4D', () => {
    const c = content.indexOf('### 4C:');
    const d = content.indexOf('### 4D:');
    expect(c).toBeLessThan(d);
  });
});
