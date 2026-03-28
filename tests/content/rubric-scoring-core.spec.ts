import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import { readFile, fileExists, DESIGN_MD_PATH } from '../helpers/test-helpers';

// ============================================================
// Test Suite 36: Enhance Mode Reference File
// ============================================================
test.describe('Enhance Mode Reference File', () => {
  test('references/enhance_mode.md exists', () => {
    expect(fileExists('references/enhance_mode.md')).toBe(true);
  });

  let content: string;

  test.beforeAll(() => {
    content = readFile('references/enhance_mode.md');
  });

  test('contains interactive research procedure', () => {
    expect(content).toContain('対話型リサーチ');
  });

  test('contains safety rules', () => {
    expect(content).toContain('安全ルール');
  });

  test('contains change hearing questions', () => {
    expect(content).toContain('変更ヒアリング');
  });

  test('contains delta FR format', () => {
    expect(content).toContain('Change Type');
    expect(content).toContain('Current Behavior');
    expect(content).toContain('Target Behavior');
  });

  test('contains trust classification', () => {
    expect(content).toContain('確認済み');
    expect(content).toContain('要確認');
  });

  test('contains quality scoring adjustments', () => {
    expect(content).toContain('品質スコアリング調整');
  });
});

// ============================================================
// Test Suite 37: Drift Prevention & Rejected Scope
// ============================================================
test.describe('Drift Prevention', () => {
  test('SKILL.md Phase 2 has drift prevention check', () => {
    const content = readFile('SKILL.md');
    const phase2 = content.indexOf('## Phase 2:');
    const phase3 = content.indexOf('## Phase 3:');
    const section = content.slice(phase2, phase3);
    expect(section).toContain('ドリフト防止');
  });

  test('SKILL.md Phase 2 reads full README.md', () => {
    const content = readFile('SKILL.md');
    const phase2 = content.indexOf('## Phase 2:');
    const phase3 = content.indexOf('## Phase 3:');
    const section = content.slice(phase2, phase3);
    expect(section).toContain('全セクション');
  });

  test('SKILL.md Phase 3 reads full README.md', () => {
    const content = readFile('SKILL.md');
    const phase3 = content.indexOf('## Phase 3:');
    const phase4 = content.indexOf('## Phase 4:');
    const section = content.slice(phase3, phase4);
    expect(section).toContain('全セクション');
  });

  test('README charter template has Rejected Scope section', () => {
    const content = readFile('templates/README_charter.md');
    expect(content).toContain('却下されたスコープ');
    expect(content).toContain('Rejected Scope');
  });

  test('Rejected Scope has reason column', () => {
    const content = readFile('templates/README_charter.md');
    expect(content).toContain('却下理由');
  });
});

// ============================================================
// Test Suite: Phase 1 World-Class Enhancement (2026-03-28)
// ============================================================

// --- DESIGN.md: Self-Healing Loop ---
test.describe('DESIGN.md Self-Healing Loop', () => {
  let content: string;

  test.beforeAll(() => {
    content = fs.readFileSync(DESIGN_MD_PATH, 'utf-8');
  });

  test('has HEAL section', () => {
    expect(content).toContain('## HEAL: Self-Healing Loop');
  });

  test('has Defect Prevention Preamble', () => {
    expect(content).toContain('Defect Prevention Preamble');
    expect(content).toContain('setCurrentPageAsync');
    expect(content).toContain('loadFontAsync');
  });

  test('has Verification Suffix', () => {
    expect(content).toContain('Verification Suffix');
    expect(content).toContain('emptyTextNodes');
    expect(content).toContain('orphanCount');
    expect(content).toContain('gridViolations');
  });

  test('has Self-Healing Rules with max 2 attempts', () => {
    expect(content).toContain('Self-Healing Rules');
    expect(content).toMatch(/[Mm]ax.*2/);
  });

  test('has Defect Severity Classification (P0-P3)', () => {
    expect(content).toContain('P0');
    expect(content).toContain('P1');
    expect(content).toContain('P2');
    expect(content).toContain('P3');
  });

  test('has Token Drift Prevention (SYNC section)', () => {
    expect(content).toContain('## SYNC: Token Drift Prevention');
    expect(content).toContain('Source of Truth Hierarchy');
    expect(content).toContain('get_variable_defs');
  });
});

// --- DESIGN.md: CJK Text Width Rules ---
test.describe('DESIGN.md CJK Text Width Rules', () => {
  let content: string;

  test.beforeAll(() => {
    content = fs.readFileSync(DESIGN_MD_PATH, 'utf-8');
  });

  test('has CJK Text Width Rules section', () => {
    expect(content).toContain('CJK Text Width Rules');
  });

  test('specifies Japanese character width (~1.0em)', () => {
    expect(content).toContain('1.0em');
  });

  test('specifies minimum button padding for Japanese (16px)', () => {
    expect(content).toContain('16px');
  });

  test('specifies Japanese line height (170-180%)', () => {
    expect(content).toContain('170-180%');
  });

  test('forbids fixed resize on Japanese text frames', () => {
    expect(content).toContain('resize(fixedWidth, fixedHeight)');
  });
});

// --- DESIGN.md: Component States ---
test.describe('DESIGN.md Component States', () => {
  let content: string;

  test.beforeAll(() => {
    content = fs.readFileSync(DESIGN_MD_PATH, 'utf-8');
  });

  test('has Component States section', () => {
    expect(content).toContain('Component States');
  });

  test('defines Button states (Hover/Active/Disabled/Focus)', () => {
    expect(content).toContain('Hover');
    expect(content).toContain('Active');
    expect(content).toContain('Disabled');
    expect(content).toContain('Focus');
  });

  test('defines Input states (Focus/Error/Disabled)', () => {
    expect(content).toContain('Input');
    expect(content).toContain('Error');
  });
});

// --- figma_code_patterns.md: Error Prevention Wrappers ---
test.describe('Figma Code Patterns — Error Prevention Wrappers', () => {
  let content: string;

  test.beforeAll(() => {
    content = readFile('references/figma_code_patterns.md');
  });

  test('has Section 9: Error Prevention Wrappers', () => {
    expect(content).toContain('## 9.');
    expect(content).toContain('safeCreateText');
  });

  test('has safeSetFill with parent auto-layout check', () => {
    expect(content).toContain('safeSetFill');
    expect(content).toContain('layoutMode');
  });

  test('has safeSetPage helper', () => {
    expect(content).toContain('safeSetPage');
  });

  test('has Section 10: Verification Utilities', () => {
    expect(content).toContain('## 10.');
    expect(content).toContain('verifyNodeTree');
  });

  test('has contrast verification', () => {
    expect(content).toContain('verifyContrast');
  });

  test('has naming verification', () => {
    expect(content).toContain('verifyNaming');
  });

  test('has Section 11: Self-Healing Fix Patterns', () => {
    expect(content).toContain('## 11.');
    expect(content).toContain('F-001');
    expect(content).toContain('F-002');
    expect(content).toContain('F-003');
    expect(content).toContain('F-004');
    expect(content).toContain('F-005');
  });

  test('Fix F-005 handles Japanese text HUG', () => {
    expect(content).toContain('fixJapaneseTextSizing');
    expect(content).toContain('\\u3000-\\u9FFF');
  });
});
