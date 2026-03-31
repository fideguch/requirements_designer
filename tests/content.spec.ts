import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const SKILL_DIR = path.resolve(__dirname, '..');

// Helper to read file content
function readFile(relativePath: string): string {
  return fs.readFileSync(path.join(SKILL_DIR, relativePath), 'utf-8');
}

// ============================================================
// Test Suite 2: SKILL.md — Frontmatter & Triggers
// ============================================================
test.describe('SKILL.md Frontmatter', () => {
  let content: string;

  test.beforeAll(() => {
    content = readFile('SKILL.md');
  });

  test('has valid YAML frontmatter', () => {
    expect(content).toMatch(/^---\n/);
    expect(content).toMatch(/\n---\n/);
  });

  test('name is requirements_designer', () => {
    expect(content).toMatch(/name:\s*requirements_designer/);
  });

  test('description mentions Figma MCP', () => {
    expect(content).toMatch(/Figma MCP/);
  });

  const originalTriggers = [
    '要件定義',
    'requirements definition',
    '機能要件',
    '非機能要件',
    'user stories',
    'ユーザーストーリー',
    'プロジェクト憲章',
    'project charter',
  ];

  for (const trigger of originalTriggers) {
    test(`contains original trigger: "${trigger}"`, () => {
      expect(content).toContain(trigger);
    });
  }

  const newTriggers = [
    'UIデザイン',
    'UI design',
    'Figmaデザイン',
    'ワイヤーフレーム',
    'wireframe',
    'モックアップ',
    'mockup',
    'デザインシステム',
    'design system',
  ];

  for (const trigger of newTriggers) {
    test(`contains new UI trigger: "${trigger}"`, () => {
      expect(content).toContain(trigger);
    });
  }
});

// ============================================================
// Test Suite 3: SKILL.md — Phase Structure
// ============================================================
test.describe('SKILL.md Phase Structure', () => {
  let content: string;

  test.beforeAll(() => {
    content = readFile('SKILL.md');
  });

  test('Phase 1 section exists', () => {
    expect(content).toMatch(/## Phase 1:/);
  });

  test('Phase 2 section exists', () => {
    expect(content).toMatch(/## Phase 2:/);
  });

  test('Phase 3 section exists', () => {
    expect(content).toMatch(/## Phase 3:/);
  });

  test('Phase 4 section exists', () => {
    expect(content).toMatch(/## Phase 4:/);
  });

  test('Phase 5 section exists', () => {
    expect(content).toMatch(/## Phase 5:/);
  });

  test('Phase 5A sub-phase exists', () => {
    expect(content).toContain('**5A**');
  });

  test('Phase 5B sub-phase exists', () => {
    expect(content).toContain('**5B**');
  });

  test('Phase 5C sub-phase exists', () => {
    expect(content).toContain('**5C**');
  });

  test('Phase 5D sub-phase exists', () => {
    expect(content).toContain('**5D**');
  });

  test('Phase 5E sub-phase exists', () => {
    expect(content).toContain('**5E**');
  });
});

// ============================================================
// Test Suite 8: SKILL.md — Help Command
// ============================================================
test.describe('SKILL.md Help Command', () => {
  let content: string;

  test.beforeAll(() => {
    content = readFile('SKILL.md');
  });

  test('help shows 5 phases', () => {
    expect(content).toContain('5つのフェーズ');
  });

  test('help includes Phase 5 description', () => {
    expect(content).toMatch(/Phase 5:.*UIデザイン/);
  });

  test('help includes workflow_config.md in document list', () => {
    expect(content).toContain('workflow_config.md');
  });

  test('help includes ubiquitous_language.md in document list', () => {
    expect(content).toContain('ubiquitous_language.md');
  });

  test('help includes ui_design_brief.md in document list', () => {
    expect(content).toContain('ui_design_brief.md');
  });

  test('help includes new connected skills', () => {
    expect(content).toContain('/ui-ux-pro-max');
    expect(content).toContain('/frontend-design');
    expect(content).toContain('/web-design-guidelines');
  });
});

// ============================================================
// Test Suite 9: SKILL.md — Reference Files Table
// ============================================================
test.describe('SKILL.md Reference Files Table', () => {
  let content: string;

  test.beforeAll(() => {
    content = readFile('SKILL.md');
  });

  const referenceEntries = [
    'references/question_bank.md',
    'references/quality_rubric.md',
    'references/best_practices.md',
    'templates/workflow_config.md',
    'references/ubiquitous_language_questions.md',
    'templates/ubiquitous_language.md',
    'references/ui_design_questions.md',
    'references/ui_design_rubric.md',
    'references/figma_code_patterns.md',
    'templates/ui_design_brief.md',
  ];

  for (const ref of referenceEntries) {
    test(`reference table includes ${ref}`, () => {
      expect(content).toContain(ref);
    });
  }
});

// ============================================================
// Test Suite 16: README.md Updates
// ============================================================
test.describe('README.md', () => {
  let content: string;

  test.beforeAll(() => {
    content = readFile('README.md');
  });

  test('mentions Figma MCP in overview', () => {
    expect(content).toContain('Figma MCP');
  });

  test('mentions 5 phases', () => {
    expect(content).toContain('Phase 0');
    expect(content).toContain('Phase 5');
  });

  test('includes Phase 5 description', () => {
    expect(content).toContain('Phase 5: UIデザイン');
  });

  test('includes Phase 5 sub-phases', () => {
    expect(content).toContain('**5A**');
    expect(content).toContain('**5B**');
    expect(content).toContain('**5C**');
    expect(content).toContain('**5D**');
    expect(content).toContain('**5E**');
  });

  test('includes Figma MCP tool table', () => {
    expect(content).toContain('Figma MCP');
  });

  test('includes workflow_config.md in file structure', () => {
    expect(content).toContain('workflow_config.md');
  });

  test('includes ubiquitous_language.md in file structure', () => {
    expect(content).toContain('ubiquitous_language.md');
  });

  test('includes ui_design_brief.md in file structure', () => {
    expect(content).toContain('ui_design_brief.md');
  });

  test('includes new reference files in structure', () => {
    expect(content).toContain('ui_design_questions.md');
    expect(content).toContain('ui_design_rubric.md');
    expect(content).toContain('figma_code_patterns.md');
  });

  test('includes UI skill integrations', () => {
    expect(content).toContain('ui-ux-pro-max');
    expect(content).toContain('frontend-design');
    expect(content).toContain('web-design-guidelines');
  });

  test('includes new trigger words', () => {
    expect(content).toContain('UIデザイン');
    expect(content).toContain('ワイヤーフレーム');
    expect(content).toContain('モックアップ');
  });
});

// ============================================================
// Test Suite 20: Quality Rubric Structural Consistency
// ============================================================
test.describe('Quality Rubric Consistency', () => {
  test('requirements rubric and UI rubric have same structure', () => {
    const reqRubric = readFile('references/quality_rubric.md');
    const uiRubric = readFile('references/ui_design_rubric.md');

    // Both have 5 dimensions
    const reqDimensions = (reqRubric.match(/^## \d+\./gm) || []).length;
    const uiDimensions = (uiRubric.match(/^## \d+\./gm) || []).length;
    expect(reqDimensions).toBe(5);
    expect(uiDimensions).toBe(5);

    // Both mention 100 points
    expect(reqRubric).toContain('100点満点');
    expect(uiRubric).toContain('100点満点');

    // Both have score improvement section
    expect(reqRubric).toContain('スコア改善の優先順位');
    expect(uiRubric).toContain('スコア改善の優先順位');
  });
});

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

  test('Phase 0 default is all phases enabled', () => {
    expect(content).toContain('全フェーズ実行');
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
    // Phase 3 row has "実行" as default (not 必須)
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
