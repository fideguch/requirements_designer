import { test, expect } from '@playwright/test';
import { readFile } from '../helpers/test-helpers';

// ============================================================
// Test Suite 28: Light Mode in SKILL.md
// ============================================================
test.describe('SKILL.md Light Mode', () => {
  let content: string;

  test.beforeAll(() => {
    content = readFile('SKILL.md');
  });

  test('Phase 0 offers Full and Light mode selection', () => {
    expect(content).toContain('フルモード');
    expect(content).toContain('ライトモード');
  });

  test('Light Mode parameter table exists', () => {
    expect(content).toContain('モード別設定値');
  });

  test('Light Mode skips Phase 3, 4C, 5', () => {
    expect(content).toContain('Phase 3, 4C, 5を自動スキップ');
  });

  test('Light Mode quality is 3 dimensions x 60pt', () => {
    expect(content).toContain('3次元 60pt');
  });

  test('Light Mode pass line is 42/60', () => {
    expect(content).toContain('42/60');
  });

  test('Light Mode FR uses 5 essential fields', () => {
    expect(content).toContain('必須5項目');
  });

  test('Help section mentions Light Mode', () => {
    const helpStart = content.indexOf('## Help Command');
    const helpEnd = content.indexOf('## Workflow Overview');
    const helpSection = content.slice(helpStart, helpEnd);
    expect(helpSection).toContain('ライトモード');
  });

  test('Progress display shows mode indicator', () => {
    expect(content).toContain('[ライトモード]');
  });

  test('Phase 4A references Light Mode scoring', () => {
    const phase4a = content.indexOf('### 4A:');
    const phase4b = content.indexOf('### 4B:');
    const section = content.slice(phase4a, phase4b);
    expect(section).toContain('ライトモード');
    expect(section).toContain('42/60');
  });

  test('FR recording mentions Full and Light mode variants', () => {
    expect(content).toContain('フルモード');
    expect(content).toContain('ライトモード');
    expect(content).toMatch(/必須5項目/);
  });

  test('Resume section supports mode switching', () => {
    expect(content).toContain('モード変更');
  });
});

// ============================================================
// Test Suite 29: Light Mode in Workflow Config Template
// ============================================================
test.describe('Workflow Config Template Light Mode', () => {
  let content: string;

  test.beforeAll(() => {
    content = readFile('templates/workflow_config.md');
  });

  test('has Mode field', () => {
    expect(content).toContain('**Mode**');
  });

  test('has Mode section with Full/Light parameter table', () => {
    expect(content).toContain('## Mode / 実行モード');
    expect(content).toContain('Full (デフォルト)');
    expect(content).toContain('Light (MVP/PoC)');
  });

  test('Light Mode FR lists 5 essential fields', () => {
    expect(content).toContain('ライトモード FR 必須5項目');
    expect(content).toContain('説明・アクター・主フロー・例外フロー・優先度');
  });

  test('Light Mode quality dimensions listed', () => {
    expect(content).toContain('ライトモード品質3次元');
    expect(content).toContain('Completeness');
    expect(content).toContain('Specificity');
    expect(content).toContain('Testability');
  });
});

// ============================================================
// Test Suite 30: Light Mode in Quality Rubric
// ============================================================
test.describe('Quality Rubric Light Mode', () => {
  let content: string;

  test.beforeAll(() => {
    content = readFile('references/quality_rubric.md');
  });

  test('has Light Mode evaluation section', () => {
    expect(content).toContain('ライトモード評価');
  });

  test('Light Mode is 60pt total', () => {
    expect(content).toContain('60点満点');
  });

  test('Light Mode pass line is 42', () => {
    expect(content).toContain('42点未満');
  });

  test('Light Mode uses 3 dimensions', () => {
    expect(content).toContain('Completeness');
    expect(content).toContain('Specificity');
    expect(content).toContain('Testability');
  });
});

// ============================================================
// Test Suite 32: Enhance Mode in SKILL.md
// ============================================================
test.describe('SKILL.md Enhance Mode', () => {
  let content: string;

  test.beforeAll(() => {
    content = readFile('SKILL.md');
  });

  test('Phase 0 offers Enhance mode selection', () => {
    expect(content).toContain('エンハンスモード');
  });

  test('Enhance mode parameter table exists', () => {
    expect(content).toContain('モード別設定値');
    expect(content).toMatch(/Enhance/);
  });

  test('Enhance mode auto-skips Phase 5', () => {
    expect(content).toContain('Phase 5を自動スキップ');
  });

  test('Enhance mode mentions WebSearch', () => {
    expect(content).toContain('WebSearch');
  });

  test('Enhance mode mentions WebFetch', () => {
    expect(content).toContain('WebFetch');
  });

  test('Enhance mode mentions trust classification', () => {
    expect(content).toContain('確認済み');
    expect(content).toContain('要確認');
    expect(content).toContain('不明');
  });

  test('Phase 1 references Enhance mode', () => {
    const phase1 = content.indexOf('## Phase 1:');
    const phase2 = content.indexOf('## Phase 2:');
    const section = content.slice(phase1, phase2);
    expect(section).toContain('エンハンスモード');
  });

  test('Phase 2 references change hearing', () => {
    const phase2 = content.indexOf('## Phase 2:');
    const phase3 = content.indexOf('## Phase 3:');
    const section = content.slice(phase2, phase3);
    expect(section).toContain('変更ヒアリング');
  });

  test('Phase 4A references Enhance mode scoring', () => {
    const phase4a = content.indexOf('### 4A:');
    const phase4b = content.indexOf('### 4B:');
    const section = content.slice(phase4a, phase4b);
    expect(section).toContain('エンハンスモード');
  });

  test('Help section mentions Enhance mode', () => {
    const helpStart = content.indexOf('## Help Command');
    const helpEnd = content.indexOf('## Workflow Overview');
    const helpSection = content.slice(helpStart, helpEnd);
    expect(helpSection).toContain('エンハンスモード');
  });

  test('Progress display shows Enhance mode indicator', () => {
    expect(content).toContain('[エンハンスモード]');
  });

  test('Resume section supports mode switching including Enhance', () => {
    expect(content).toContain('エンハンス');
    expect(content).toContain('モード変更');
  });

  test('Reference Files table includes enhance_mode.md', () => {
    expect(content).toContain('references/enhance_mode.md');
  });

  test('Enhance mode references enhance_mode.md for details', () => {
    expect(content).toContain('references/enhance_mode.md');
  });
});

// ============================================================
// Test Suite 33: Enhance Mode in Workflow Config Template
// ============================================================
test.describe('Workflow Config Template Enhance Mode', () => {
  let content: string;

  test.beforeAll(() => {
    content = readFile('templates/workflow_config.md');
  });

  test('Mode field includes Enhance', () => {
    expect(content).toContain('Enhance');
  });

  test('has Enhance column in parameter table', () => {
    expect(content).toContain('Enhance (既存改善)');
  });

  test('Enhance mode settings section exists', () => {
    expect(content).toContain('エンハンスモード設定');
  });

  test('Enhance auto-skips Phase 5', () => {
    expect(content).toContain('エンハンスモード');
    expect(content).toContain('自動スキップ');
  });

  test('Enhance mode duration is 30-45 min', () => {
    expect(content).toContain('30-45分');
  });

  test('Enhance mode mentions Change Type', () => {
    expect(content).toContain('Change Type');
  });
});

// ============================================================
// Test Suite 34: Enhance Mode in Quality Rubric
// ============================================================
test.describe('Quality Rubric Enhance Mode', () => {
  let content: string;

  test.beforeAll(() => {
    content = readFile('references/quality_rubric.md');
  });

  test('has Enhance mode evaluation section', () => {
    expect(content).toContain('エンハンスモード評価');
  });

  test('Enhance mode mentions delta requirements', () => {
    expect(content).toContain('デルタ要件');
  });

  test('Enhance mode mentions regression test criteria', () => {
    expect(content).toContain('リグレッション');
  });

  test('Enhance mode uses same 100pt total as Full', () => {
    expect(content).toContain('70/100');
  });
});
