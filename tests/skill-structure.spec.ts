import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

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
    'references/question_bank.md',
    'references/quality_rubric.md',
    'references/best_practices.md',
    'references/ui_design_questions.md',
    'references/ui_design_rubric.md',
    'references/figma_code_patterns.md',
    'scripts/scaffold-requirements.sh',
  ];

  for (const file of requiredFiles) {
    test(`${file} exists`, () => {
      expect(fileExists(file)).toBe(true);
    });
  }
});

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
    expect(content).toMatch(/### 5A:/);
  });

  test('Phase 5B sub-phase exists', () => {
    expect(content).toMatch(/### 5B:/);
  });

  test('Phase 5C sub-phase exists', () => {
    expect(content).toMatch(/### 5C:/);
  });

  test('Phase 5D sub-phase exists', () => {
    expect(content).toMatch(/### 5D:/);
  });

  test('Phase 5E sub-phase exists', () => {
    expect(content).toMatch(/### 5E:/);
  });
});

// ============================================================
// Test Suite 4: SKILL.md — Figma MCP Tool References
// ============================================================
test.describe('SKILL.md Figma MCP Tool References', () => {
  let content: string;

  test.beforeAll(() => {
    content = readFile('SKILL.md');
  });

  const figmaTools = [
    'mcp__claude_ai_Figma__whoami',
    'mcp__claude_ai_Figma__create_new_file',
    'mcp__claude_ai_Figma__use_figma',
    'mcp__claude_ai_Figma__generate_diagram',
    'mcp__claude_ai_Figma__get_screenshot',
    'mcp__claude_ai_Figma__search_design_system',
    'mcp__claude_ai_Figma__create_design_system_rules',
    'mcp__claude_ai_Figma__get_metadata',
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
test.describe('SKILL.md Phase 4C Next Steps', () => {
  let content: string;

  test.beforeAll(() => {
    content = readFile('SKILL.md');
  });

  test('Phase 4C includes UI design option', () => {
    expect(content).toContain('UIデザインを作りたい');
  });

  test('Phase 4C preserves original options', () => {
    expect(content).toContain('PRD化');
    expect(content).toContain('brainstorming');
    expect(content).toContain('writing-plans');
    expect(content).toContain('品質をもっと上げたい');
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

  test('detects Phase 1 completion', () => {
    expect(content).toContain('README.md が存在 → Phase 1 完了');
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
// Test Suite 10: SKILL.md — Phase 5E Quality Scoring
// ============================================================
test.describe('SKILL.md Phase 5E Quality', () => {
  let content: string;

  test.beforeAll(() => {
    content = readFile('SKILL.md');
  });

  test('includes UI design quality score table', () => {
    expect(content).toContain('UIデザイン品質スコア');
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
      expect(content).toContain(dim);
    });
  }

  test('includes score thresholds', () => {
    expect(content).toContain('70点未満');
    expect(content).toContain('70〜79点');
    expect(content).toContain('80点以上');
  });
});

// ============================================================
// Test Suite 11: SKILL.md — Phase 5E Next Steps
// ============================================================
test.describe('SKILL.md Phase 5E Next Steps', () => {
  let content: string;

  test.beforeAll(() => {
    content = readFile('SKILL.md');
  });

  test('includes Code Connect option', () => {
    expect(content).toContain('Code Connect');
  });

  test('includes implementation plan option', () => {
    expect(content).toContain('writing-plans');
  });

  test('includes design audit option', () => {
    expect(content).toContain('デザイン監査');
  });
});

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
    expect(content).toContain('5つのフェーズ');
  });

  test('includes Phase 5 description', () => {
    expect(content).toContain('Phase 5: UIデザイン');
  });

  test('includes Phase 5 sub-phases', () => {
    expect(content).toContain('5A:');
    expect(content).toContain('5B:');
    expect(content).toContain('5C:');
    expect(content).toContain('5D:');
    expect(content).toContain('5E:');
  });

  test('includes Figma MCP tool table', () => {
    expect(content).toContain('create_new_file');
    expect(content).toContain('use_figma');
    expect(content).toContain('generate_diagram');
    expect(content).toContain('get_screenshot');
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
    expect(content).toContain('wireframe');
    expect(content).toContain('mockup');
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

  test('supports --with-ui flag', () => {
    expect(content).toContain('--with-ui');
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

  test('creates designs/ without --with-ui', () => {
    fs.mkdirSync(testDir, { recursive: true });
    const scriptPath = path.join(SKILL_DIR, 'scripts/scaffold-requirements.sh');
    execSync(`bash "${scriptPath}" "${testDir}"`, { encoding: 'utf-8' });

    expect(fs.existsSync(path.join(testDir, 'designs/README.md'))).toBe(true);
    expect(fs.existsSync(path.join(testDir, 'designs/functional_requirements.md'))).toBe(true);
    expect(fs.existsSync(path.join(testDir, 'designs/non_functional_requirements.md'))).toBe(true);
    expect(fs.existsSync(path.join(testDir, 'designs/user_stories.md'))).toBe(true);
    // ui_design_brief.md should NOT exist without --with-ui
    expect(fs.existsSync(path.join(testDir, 'designs/ui_design_brief.md'))).toBe(false);
  });

  test('creates designs/ with --with-ui', () => {
    const testDir2 = testDir + '-ui';
    fs.mkdirSync(testDir2, { recursive: true });
    const scriptPath = path.join(SKILL_DIR, 'scripts/scaffold-requirements.sh');
    execSync(`bash "${scriptPath}" "${testDir2}" --with-ui`, { encoding: 'utf-8' });

    expect(fs.existsSync(path.join(testDir2, 'designs/README.md'))).toBe(true);
    expect(fs.existsSync(path.join(testDir2, 'designs/ui_design_brief.md'))).toBe(true);

    // Cleanup
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
// Test Suite 19: Cross-Reference Integrity
// ============================================================
test.describe('Cross-Reference Integrity', () => {
  let skillContent: string;

  test.beforeAll(() => {
    skillContent = readFile('SKILL.md');
  });

  test('all referenced files in SKILL.md Reference Table exist', () => {
    const refPattern = /`(references\/[^`]+\.md|templates\/[^`]+\.md)`/g;
    const refs = [...skillContent.matchAll(refPattern)].map(m => m[1]);
    const uniqueRefs = [...new Set(refs)];

    for (const ref of uniqueRefs) {
      expect(fileExists(ref)).toBe(true);
    }
  });

  test('Phase order is correct (1 < 2 < 3 < 4 < 5)', () => {
    const phase1 = skillContent.indexOf('## Phase 1:');
    const phase2 = skillContent.indexOf('## Phase 2:');
    const phase3 = skillContent.indexOf('## Phase 3:');
    const phase4 = skillContent.indexOf('## Phase 4:');
    const phase5 = skillContent.indexOf('## Phase 5:');

    expect(phase1).toBeGreaterThan(-1);
    expect(phase2).toBeGreaterThan(phase1);
    expect(phase3).toBeGreaterThan(phase2);
    expect(phase4).toBeGreaterThan(phase3);
    expect(phase5).toBeGreaterThan(phase4);
  });

  test('Phase 5 sub-phase order is correct (5A < 5B < 5C < 5D < 5E)', () => {
    const a = skillContent.indexOf('### 5A:');
    const b = skillContent.indexOf('### 5B:');
    const c = skillContent.indexOf('### 5C:');
    const d = skillContent.indexOf('### 5D:');
    const e = skillContent.indexOf('### 5E:');

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
