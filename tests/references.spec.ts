import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

const SKILL_DIR = path.resolve(__dirname, '..');

// Helper to read file content
function readFile(relativePath: string): string {
  return fs.readFileSync(path.join(SKILL_DIR, relativePath), 'utf-8');
}

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
    // Check at least first question has both languages
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

  const requiredSections = [
    'Platform & Responsive Strategy',
    'Brand Identity',
    'Design Style',
    'Accessibility',
    'Existing Design System',
    'Figma Files',
    'Screen Inventory',
  ];

  for (const section of requiredSections) {
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
    // When --with-ui is set, WITH_UL should also be true
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
    // Cleanup
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
    // optional files should NOT exist without flags
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
    // designs/ already created by first test
    const scriptPath = path.join(SKILL_DIR, 'scripts/scaffold-requirements.sh');
    const output = execSync(`bash "${scriptPath}" "${testDir}"`, { encoding: 'utf-8' });
    expect(output).toContain('already exists');
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
