import { test, expect } from '@playwright/test';
import { readFile } from '../helpers/test-helpers';

// ============================================================
// Test Suite 21: Phase 0 Workflow Config in SKILL.md
// ============================================================
test.describe('SKILL.md Phase 0 Workflow Config', () => {
  let content: string;

  test.beforeAll(() => {
    content = readFile('SKILL.md');
  });

  test('Phase 0 section exists', () => {
    expect(content).toMatch(/## Phase 0:/);
  });

  test('Phase 0 mentions workflow configuration', () => {
    expect(content).toContain('ワークフロー設定');
  });

  test('Phase 0 lists mandatory phases', () => {
    expect(content).toContain('必須');
  });

  test('Phase 0 lists skippable phases', () => {
    expect(content).toContain('スキップ可能');
  });

  test('Phase 0 outputs workflow_config.md', () => {
    expect(content).toContain('workflow_config.md');
  });

  test('Phase 0 comes before Phase 1', () => {
    const phase0 = content.indexOf('## Phase 0:');
    const phase1 = content.indexOf('## Phase 1:');
    expect(phase0).toBeGreaterThan(-1);
    expect(phase0).toBeLessThan(phase1);
  });

  test('Phase 0 handles resume with existing config', () => {
    expect(content).toContain('この設定で続けますか');
  });

  test('Phase 0 offers Full Mode as default', () => {
    expect(content).toContain('フルモード');
    expect(content).toMatch(/デフォルト/);
  });
});

// ============================================================
// Test Suite 22: Workflow Config Template
// ============================================================
test.describe('Workflow Config Template', () => {
  let content: string;

  test.beforeAll(() => {
    content = readFile('templates/workflow_config.md');
  });

  test('has workflow configuration table', () => {
    expect(content).toContain('Phase Configuration');
  });

  test('marks Phase 1 and 2 as mandatory', () => {
    expect(content).toMatch(/Phase 1.*必須/);
    expect(content).toMatch(/Phase 2.*必須/);
  });

  test('marks Phase 3 as skippable by default', () => {
    const phase3Line = content
      .split('\n')
      .find((l) => l.includes('Phase 3') && l.includes('非機能要件'));
    expect(phase3Line).toBeTruthy();
    expect(phase3Line).not.toContain('必須');
  });

  test('marks Phase 4C as skippable by default', () => {
    const phase4cLine = content
      .split('\n')
      .find((l) => l.includes('Phase 4C') && l.includes('ユビキタス'));
    expect(phase4cLine).toBeTruthy();
    expect(phase4cLine).not.toContain('必須');
  });

  test('marks Phase 5 as skippable by default', () => {
    const phase5Line = content
      .split('\n')
      .find((l) => l.includes('Phase 5') && l.includes('UIデザイン'));
    expect(phase5Line).toBeTruthy();
    expect(phase5Line).not.toContain('必須');
  });

  test('has reason column', () => {
    expect(content).toContain('Reason');
  });
});

// ============================================================
// Test Suite 23: Ubiquitous Language Questions
// ============================================================
test.describe('Ubiquitous Language Questions', () => {
  let content: string;

  test.beforeAll(() => {
    content = readFile('references/ubiquitous_language_questions.md');
  });

  test('has Phase 4C section', () => {
    expect(content).toMatch(/Phase 4C/);
  });

  test('has Round 4C-1 (Term Extraction)', () => {
    expect(content).toContain('Round 4C-1');
  });

  test('has Round 4C-2 (User-Facing Refinement)', () => {
    expect(content).toContain('Round 4C-2');
  });

  test('has Round 4C-3 (Code Naming)', () => {
    expect(content).toContain('Round 4C-3');
  });

  test('questions are bilingual (Japanese + English)', () => {
    expect(content).toMatch(/ドメイン用語/);
    expect(content).toMatch(/domain terms/i);
  });

  test('has at least 15 questions', () => {
    const questionCount = (content.match(/^\d+\.\s+\*\*/gm) || []).length;
    expect(questionCount).toBeGreaterThanOrEqual(15);
  });

  test('has domain-specific supplements', () => {
    expect(content).toContain('ドメイン固有');
  });
});

// ============================================================
// Test Suite 24: Ubiquitous Language Template
// ============================================================
test.describe('Ubiquitous Language Template', () => {
  let content: string;

  test.beforeAll(() => {
    content = readFile('templates/ubiquitous_language.md');
  });

  test('has Bounded Contexts section', () => {
    expect(content).toContain('Bounded Contexts');
  });

  test('has Glossary section', () => {
    expect(content).toContain('Glossary');
    expect(content).toContain('用語集');
  });

  test('has UL-001 entry format', () => {
    expect(content).toContain('UL-001');
  });

  test('has Definition field', () => {
    expect(content).toContain('定義 / Definition');
  });

  test('has User-Facing Label field', () => {
    expect(content).toContain('ユーザー向けラベル / User-Facing Label');
  });

  test('has Code Representation fields', () => {
    expect(content).toContain('PascalCase');
    expect(content).toContain('camelCase');
    expect(content).toContain('snake_case');
    expect(content).toContain('kebab-case');
  });

  test('has Anti-Pattern Registry', () => {
    expect(content).toContain('Anti-Pattern Registry');
    expect(content).toContain('アンチパターン一覧');
  });

  test('has Naming Convention Rules', () => {
    expect(content).toContain('Naming Convention Rules');
    expect(content).toContain('命名規則');
  });

  test('has Traceability Matrix with UL-ID', () => {
    expect(content).toContain('UL-ID');
    expect(content).toContain('Traceability Matrix');
  });

  test('has source FR/NFR/US fields', () => {
    expect(content).toContain('Source FR');
    expect(content).toContain('Source NFR');
    expect(content).toContain('Source US');
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
