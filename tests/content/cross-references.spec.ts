import { test, expect } from '@playwright/test';
import { readFile, readSkillWithPhase5, fileExists } from '../helpers/test-helpers';

// ============================================================
// Test Suite 19: Cross-Reference Integrity
// ============================================================
test.describe('Cross-Reference Integrity', () => {
  let skillContent: string;

  test.beforeAll(() => {
    skillContent = readFile('SKILL.md');
  });

  test('all referenced files in SKILL.md Reference Table exist', () => {
    const refPattern = /`(references\/[^`]+\.md|templates\/[^`]+\.md)`/g;
    const refs = [...skillContent.matchAll(refPattern)].map((m) => m[1]);
    const uniqueRefs = [...new Set(refs)];

    for (const ref of uniqueRefs) {
      expect(fileExists(ref)).toBe(true);
    }
  });

  test('Phase order is correct (0 < 1 < 2 < 3 < 4 < 5)', () => {
    const phase0 = skillContent.indexOf('## Phase 0:');
    const phase1 = skillContent.indexOf('## Phase 1:');
    const phase2 = skillContent.indexOf('## Phase 2:');
    const phase3 = skillContent.indexOf('## Phase 3:');
    const phase4 = skillContent.indexOf('## Phase 4:');
    const phase5 = skillContent.indexOf('## Phase 5:');

    expect(phase0).toBeGreaterThan(-1);
    expect(phase1).toBeGreaterThan(phase0);
    expect(phase2).toBeGreaterThan(phase1);
    expect(phase3).toBeGreaterThan(phase2);
    expect(phase4).toBeGreaterThan(phase3);
    expect(phase5).toBeGreaterThan(phase4);
  });

  test('Phase 5 sub-phase order is correct (5A < 5B < 5C < 5D < 5E)', () => {
    const combined = readSkillWithPhase5();
    const a = combined.indexOf('## 5A:');
    const b = combined.indexOf('## 5B:');
    const c = combined.indexOf('## 5C:');
    const d = combined.indexOf('## 5D:');
    const e = combined.indexOf('## 5E:');

    expect(a).toBeGreaterThan(-1);
    expect(b).toBeGreaterThan(a);
    expect(c).toBeGreaterThan(b);
    expect(d).toBeGreaterThan(c);
    expect(e).toBeGreaterThan(d);
  });

  test('Phase 5 comes before Language Support section', () => {
    const phase5 = skillContent.indexOf('## Phase 5:');
    const langSupport = skillContent.indexOf('## Language Support');
    expect(phase5).toBeLessThan(langSupport);
  });

  test('Language Support comes before Resuming Existing Work', () => {
    const langSupport = skillContent.indexOf('## Language Support');
    const resuming = skillContent.indexOf('## Resuming Existing Work');
    expect(langSupport).toBeLessThan(resuming);
  });
});

// ============================================================
// Test Suite 20: Quality Rubric Structural Consistency
// ============================================================
test.describe('Quality Rubric Consistency', () => {
  test('requirements rubric and UI rubric have same structure', () => {
    const reqRubric = readFile('references/quality_rubric.md');
    const uiRubric = readFile('references/ui_design_rubric.md');

    const reqDimensions = (reqRubric.match(/^## \d+\./gm) || []).length;
    const uiDimensions = (uiRubric.match(/^## \d+\./gm) || []).length;
    expect(reqDimensions).toBe(5);
    expect(uiDimensions).toBe(5);

    expect(reqRubric).toContain('100点満点');
    expect(uiRubric).toContain('100点満点');

    expect(reqRubric).toContain('スコア改善の優先順位');
    expect(uiRubric).toContain('スコア改善の優先順位');
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
