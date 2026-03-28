import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import { readFile, fileExists, SKILL_DIR, UI_BRIEF_SECTIONS } from '../helpers/test-helpers';

// ============================================================
// Test Suite 12: UI Design Questions (references/ui_design_questions.md)
// ============================================================
test.describe('UI Design Questions', () => {
  let content: string;

  test.beforeAll(() => {
    content = readFile('references/ui_design_questions.md');
  });

  test('has Phase 5A section', () => {
    expect(content).toMatch(/Phase 5A/);
  });

  test('has Round 5A-1 (Platform & Style)', () => {
    expect(content).toContain('Round 5A-1');
    expect(content).toContain('Platform & Style');
  });

  test('has Round 5A-2 (Brand & Accessibility)', () => {
    expect(content).toContain('Round 5A-2');
    expect(content).toContain('Brand & Accessibility');
  });

  test('has Round 5A-3 (Existing Assets)', () => {
    expect(content).toContain('Round 5A-3');
    expect(content).toContain('Existing Assets');
  });

  test('questions are bilingual (Japanese + English)', () => {
    expect(content).toMatch(/ターゲットプラットフォーム/);
    expect(content).toMatch(/target platform/i);
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
// Test Suite 13: UI Design Brief Template (templates/ui_design_brief.md)
// ============================================================
test.describe('UI Design Brief Template', () => {
  let content: string;

  test.beforeAll(() => {
    content = readFile('templates/ui_design_brief.md');
  });

  for (const section of UI_BRIEF_SECTIONS) {
    test(`has section: ${section}`, () => {
      expect(content).toContain(section);
    });
  }

  test('has color table', () => {
    expect(content).toContain('Primary');
    expect(content).toContain('Secondary');
    expect(content).toContain('Accent');
    expect(content).toContain('Success');
    expect(content).toContain('Error');
  });

  test('has typography table', () => {
    expect(content).toContain('Display');
    expect(content).toContain('Body');
    expect(content).toContain('Caption');
  });

  test('has screen inventory table with SCR-001 format', () => {
    expect(content).toMatch(/SCR-001/);
  });

  test('has internal mapping notes', () => {
    expect(content).toContain('内部マッピング');
  });
});

// ============================================================
// Test Suite 14: UI Design Rubric (references/ui_design_rubric.md)
// ============================================================
test.describe('UI Design Rubric', () => {
  let content: string;

  test.beforeAll(() => {
    content = readFile('references/ui_design_rubric.md');
  });

  test('has 5 dimensions', () => {
    expect(content).toContain('Design System完全性');
    expect(content).toContain('画面カバレッジ');
    expect(content).toContain('ビジュアルヒエラルキー');
    expect(content).toContain('アクセシビリティ');
    expect(content).toContain('要件トレーサビリティ');
  });

  test('each dimension is 20 points', () => {
    const matches = content.match(/20点/g) || [];
    expect(matches.length).toBeGreaterThanOrEqual(5);
  });

  test('total is 100 points', () => {
    expect(content).toContain('100点満点');
  });

  test('has score guides for each dimension', () => {
    const scoreGuides = (content.match(/### スコアガイド/g) || []).length;
    expect(scoreGuides).toBe(5);
  });

  test('has check points for each dimension', () => {
    const checkPoints = (content.match(/### チェックポイント/g) || []).length;
    expect(checkPoints).toBe(5);
  });

  test('has ui-ux-pro-max check items', () => {
    expect(content).toContain('ui-ux-pro-max');
  });

  test('has WCAG contrast ratio reference', () => {
    expect(content).toContain('4.5:1');
    expect(content).toContain('3:1');
  });

  test('has improvement priority section', () => {
    expect(content).toContain('スコア改善の優先順位');
  });
});

// ============================================================
// Test Suite 15: Figma Code Patterns (references/figma_code_patterns.md)
// ============================================================
test.describe('Figma Code Patterns', () => {
  let content: string;

  test.beforeAll(() => {
    content = readFile('references/figma_code_patterns.md');
  });

  test('has page management patterns', () => {
    expect(content).toContain('figma.createPage');
  });

  test('has auto layout frame patterns', () => {
    expect(content).toContain('layoutMode');
    expect(content).toContain('VERTICAL');
    expect(content).toContain('HORIZONTAL');
  });

  test('has color variable patterns', () => {
    expect(content).toContain('figma.variables.createVariable');
    expect(content).toContain('createColorVariable');
  });

  test('has spacing variable patterns', () => {
    expect(content).toContain('spacingScale');
    expect(content).toContain('spacing/28');
  });

  test('has text style patterns', () => {
    expect(content).toContain('figma.createTextStyle');
    expect(content).toContain('figma.loadFontAsync');
  });

  test('has layout patterns (header/sidebar/content)', () => {
    expect(content).toContain('Sidebar');
    expect(content).toContain('Content');
  });

  test('has card grid pattern', () => {
    expect(content).toContain('Card Grid');
  });

  test('has form layout pattern', () => {
    expect(content).toContain('createFormField');
  });

  test('has wireframe patterns', () => {
    expect(content).toContain('WF_COLORS');
    expect(content).toContain('createPlaceholder');
  });

  test('has contrast ratio utility', () => {
    expect(content).toContain('getContrastRatio');
    expect(content).toContain('getRelativeLuminance');
  });

  test('has hex to RGB converter', () => {
    expect(content).toContain('hexToRgb');
  });
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

  test('mentions phases', () => {
    expect(content).toContain('Phase 0');
    expect(content).toContain('Phase 1');
    expect(content).toContain('Phase 5');
  });

  test('includes Phase 5 description', () => {
    expect(content).toContain('Phase 5: UIデザイン');
  });

  test('includes Phase 5 sub-phases', () => {
    expect(content).toContain('5A');
    expect(content).toContain('5B');
    expect(content).toContain('5C');
    expect(content).toContain('5D');
    expect(content).toContain('5E');
  });

  test('includes Figma MCP reference', () => {
    expect(content).toContain('Figma MCP');
    expect(content).toContain('デザインシステム');
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

  test('includes trigger words', () => {
    expect(content).toContain('UIデザイン');
    expect(content).toContain('既存プロダクト改善');
    expect(content).toContain('要件定義');
  });
});

// ============================================================
// Test Suite 17: Scaffold Script
// ============================================================
test.describe('Scaffold Script', () => {
  let content: string;

  test.beforeAll(() => {
    content = readFile('scripts/scaffold-requirements.sh');
  });

  test('script is executable bash', () => {
    expect(content).toMatch(/^#!\/usr\/bin\/env bash/);
  });

  test('supports --with-ul flag', () => {
    expect(content).toContain('--with-ul');
  });

  test('supports --with-ui flag', () => {
    expect(content).toContain('--with-ui');
  });

  test('--with-ui implies --with-ul', () => {
    expect(content).toMatch(/--with-ui\).*WITH_UL=true/s);
  });

  test('copies ui_design_brief.md when --with-ui is used', () => {
    expect(content).toContain('ui_design_brief.md');
  });

  test('preserves original template copies', () => {
    expect(content).toContain('README_charter.md');
    expect(content).toContain('functional_requirements.md');
    expect(content).toContain('non_functional_requirements.md');
    expect(content).toContain('user_stories.md');
  });
});

// ============================================================
// Test Suite 18: Scaffold Script Execution
// ============================================================
test.describe('Scaffold Script Execution', () => {
  const testDir = '/tmp/rd-test-' + Date.now();

  test.afterAll(() => {
    try {
      fs.rmSync(testDir, { recursive: true, force: true });
    } catch {}
  });

  test('creates designs/ without flags', () => {
    fs.mkdirSync(testDir, { recursive: true });
    const scriptPath = path.join(SKILL_DIR, 'scripts/scaffold-requirements.sh');
    execSync(`bash "${scriptPath}" "${testDir}"`, { encoding: 'utf-8' });

    expect(fs.existsSync(path.join(testDir, 'designs/workflow_config.md'))).toBe(true);
    expect(fs.existsSync(path.join(testDir, 'designs/README.md'))).toBe(true);
    expect(fs.existsSync(path.join(testDir, 'designs/functional_requirements.md'))).toBe(true);
    expect(fs.existsSync(path.join(testDir, 'designs/non_functional_requirements.md'))).toBe(true);
    expect(fs.existsSync(path.join(testDir, 'designs/user_stories.md'))).toBe(true);
    expect(fs.existsSync(path.join(testDir, 'designs/ubiquitous_language.md'))).toBe(false);
    expect(fs.existsSync(path.join(testDir, 'designs/ui_design_brief.md'))).toBe(false);
  });

  test('creates designs/ with --with-ul', () => {
    const testDirUl = testDir + '-ul';
    fs.mkdirSync(testDirUl, { recursive: true });
    const scriptPath = path.join(SKILL_DIR, 'scripts/scaffold-requirements.sh');
    execSync(`bash "${scriptPath}" "${testDirUl}" --with-ul`, { encoding: 'utf-8' });

    expect(fs.existsSync(path.join(testDirUl, 'designs/ubiquitous_language.md'))).toBe(true);
    expect(fs.existsSync(path.join(testDirUl, 'designs/ui_design_brief.md'))).toBe(false);

    fs.rmSync(testDirUl, { recursive: true, force: true });
  });

  test('creates designs/ with --with-ui (implies --with-ul)', () => {
    const testDir2 = testDir + '-ui';
    fs.mkdirSync(testDir2, { recursive: true });
    const scriptPath = path.join(SKILL_DIR, 'scripts/scaffold-requirements.sh');
    execSync(`bash "${scriptPath}" "${testDir2}" --with-ui`, { encoding: 'utf-8' });

    expect(fs.existsSync(path.join(testDir2, 'designs/README.md'))).toBe(true);
    expect(fs.existsSync(path.join(testDir2, 'designs/ubiquitous_language.md'))).toBe(true);
    expect(fs.existsSync(path.join(testDir2, 'designs/ui_design_brief.md'))).toBe(true);

    fs.rmSync(testDir2, { recursive: true, force: true });
  });

  test('skips if designs/ already exists', () => {
    const scriptPath = path.join(SKILL_DIR, 'scripts/scaffold-requirements.sh');
    const output = execSync(`bash "${scriptPath}" "${testDir}"`, { encoding: 'utf-8' });
    expect(output).toContain('already exists');
  });
});

// ============================================================
// Test Suite 31: Scaffold Script Light Flag
// ============================================================
test.describe('Scaffold Script Light Flag', () => {
  let content: string;

  test.beforeAll(() => {
    content = readFile('scripts/scaffold-requirements.sh');
  });

  test('supports --light flag', () => {
    expect(content).toContain('--light');
  });

  test('--light and --with-ui are mutually exclusive', () => {
    expect(content).toContain('mutually exclusive');
  });
});

// ============================================================
// Test Suite 35: Scaffold Script Enhance Flag
// ============================================================
test.describe('Scaffold Script Enhance Flag', () => {
  let content: string;

  test.beforeAll(() => {
    content = readFile('scripts/scaffold-requirements.sh');
  });

  test('supports --enhance flag', () => {
    expect(content).toContain('--enhance');
  });

  test('--enhance and --light are mutually exclusive', () => {
    expect(content).toContain('--enhance and --light are mutually exclusive');
  });

  test('--enhance and --with-ui are mutually exclusive', () => {
    expect(content).toContain('--enhance and --with-ui are mutually exclusive');
  });
});
