import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const SKILL_DIR = path.resolve(__dirname, '..');

// Helper to read file content
function readFile(relativePath: string): string {
  return fs.readFileSync(path.join(SKILL_DIR, relativePath), 'utf-8');
}

// Helper to check file exists
function fileExists(relativePath: string): boolean {
  return fs.existsSync(path.join(SKILL_DIR, relativePath));
}

// ============================================================
// Test Suite 1: File Structure Validation
// ============================================================
test.describe('File Structure', () => {
  const requiredFiles = [
    'SKILL.md',
    'README.md',
    'templates/README_charter.md',
    'templates/functional_requirements.md',
    'templates/non_functional_requirements.md',
    'templates/user_stories.md',
    'templates/ui_design_brief.md',
    'templates/workflow_config.md',
    'templates/ubiquitous_language.md',
    'references/question_bank.md',
    'references/quality_rubric.md',
    'references/best_practices.md',
    'references/ui_design_questions.md',
    'references/ui_design_rubric.md',
    'references/figma_code_patterns.md',
    'references/ubiquitous_language_questions.md',
    'scripts/scaffold-requirements.sh',
  ];

  for (const file of requiredFiles) {
    test(`${file} exists`, () => {
      expect(fileExists(file)).toBe(true);
    });
  }
});

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
    const a = skillContent.indexOf('**5A**');
    const b = skillContent.indexOf('**5B**');
    const c = skillContent.indexOf('**5C**');
    const d = skillContent.indexOf('**5D**');
    const e = skillContent.indexOf('**5E**');

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
