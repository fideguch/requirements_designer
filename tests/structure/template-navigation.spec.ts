import { test, expect } from '@playwright/test';
import { readFile, fileExists } from '../helpers/test-helpers';

const TEMPLATES = [
  'templates/README_charter.md',
  'templates/workflow_config.md',
  'templates/functional_requirements.md',
  'templates/non_functional_requirements.md',
  'templates/user_stories.md',
  'templates/ubiquitous_language.md',
  'templates/ui_design_brief.md',
] as const;

// ============================================================
// Test Suite: Template Navigation Headers
// ============================================================
test.describe('Template Navigation Headers', () => {
  for (const templatePath of TEMPLATES) {
    test.describe(templatePath, () => {
      let content: string;

      test.beforeAll(() => {
        content = readFile(templatePath);
      });

      test('has navigation header with ./README.md link', () => {
        expect(content).toContain('./README.md');
      });

      test('has functional_requirements.md referenced in navigation header', () => {
        // Current file shows as bold text (no link); other files show as links
        const hasFrLink = content.includes('./functional_requirements.md');
        const isFrFile = templatePath === 'templates/functional_requirements.md';
        if (isFrFile) {
          // The current file appears as bold text: **機能要件**
          expect(content).toMatch(/\*\*機能要件\*\*/);
        } else {
          expect(hasFrLink).toBe(true);
        }
      });

      test('has workflow_config.md referenced in navigation header', () => {
        // Current file shows as bold text (no link); other files show as links
        const hasWcLink = content.includes('./workflow_config.md');
        const isWcFile = templatePath === 'templates/workflow_config.md';
        if (isWcFile) {
          // The current file appears as bold text: **設定**
          expect(content).toMatch(/\*\*設定\*\*/);
        } else {
          expect(hasWcLink).toBe(true);
        }
      });

      test('has exactly one bold item in navigation header (current file indicator)', () => {
        // Find lines that look like navigation headers (blockquote with multiple links)
        const lines = content.split('\n');
        const navHeaderLines = lines.filter(
          (line) =>
            line.startsWith('>') &&
            line.includes('./README.md') &&
            line.includes('|')
        );
        expect(navHeaderLines.length).toBeGreaterThanOrEqual(1);

        // The first nav header line should have exactly one bold item
        const firstNavLine = navHeaderLines[0];
        const boldMatches = firstNavLine.match(/\*\*[^*]+\*\*/g) || [];
        expect(boldMatches.length).toBe(1);
      });
    });
  }
});

// ============================================================
// Test Suite: Template Navigation Footers
// ============================================================
test.describe('Template Navigation Footers', () => {
  for (const templatePath of TEMPLATES) {
    test.describe(templatePath, () => {
      let content: string;

      test.beforeAll(() => {
        content = readFile(templatePath);
      });

      test('has 📋 目次 link in footer section', () => {
        expect(content).toContain('📋 目次');
      });

      test('has directional indicator (→ or ←) in footer', () => {
        // Footer lines are non-blockquote lines containing navigation links
        const lines = content.split('\n');
        const footerNavLines = lines.filter(
          (line) =>
            !line.startsWith('>') &&
            line.includes('📋 目次') &&
            line.includes('](')
        );
        expect(footerNavLines.length).toBeGreaterThanOrEqual(1);

        const footerLine = footerNavLines[footerNavLines.length - 1];
        const hasDirectional = footerLine.includes('→') || footerLine.includes('←');
        expect(hasDirectional).toBe(true);
      });
    });
  }
});

// ============================================================
// Test Suite: Document Order Chain
// ============================================================
test.describe('Document Order Chain', () => {
  test('README_charter.md footer links forward to workflow_config.md', () => {
    const content = readFile('templates/README_charter.md');
    const lines = content.split('\n');
    const footerLine = lines
      .filter((l) => !l.startsWith('>') && l.includes('📋 目次') && l.includes(']('))
      .at(-1) ?? '';
    expect(footerLine).toContain('./workflow_config.md');
    expect(footerLine).toContain('→');
  });

  test('workflow_config.md footer links forward to functional_requirements.md', () => {
    const content = readFile('templates/workflow_config.md');
    const lines = content.split('\n');
    const footerLine = lines
      .filter((l) => !l.startsWith('>') && l.includes('📋 目次') && l.includes(']('))
      .at(-1) ?? '';
    expect(footerLine).toContain('./functional_requirements.md');
    expect(footerLine).toContain('→');
  });

  test('functional_requirements.md footer links forward to non_functional_requirements.md', () => {
    const content = readFile('templates/functional_requirements.md');
    const lines = content.split('\n');
    const footerLine = lines
      .filter((l) => !l.startsWith('>') && l.includes('📋 目次') && l.includes(']('))
      .at(-1) ?? '';
    expect(footerLine).toContain('./non_functional_requirements.md');
    expect(footerLine).toContain('→');
  });

  test('non_functional_requirements.md footer links forward to user_stories.md', () => {
    const content = readFile('templates/non_functional_requirements.md');
    const lines = content.split('\n');
    const footerLine = lines
      .filter((l) => !l.startsWith('>') && l.includes('📋 目次') && l.includes(']('))
      .at(-1) ?? '';
    expect(footerLine).toContain('./user_stories.md');
    expect(footerLine).toContain('→');
  });

  test('user_stories.md footer links forward to ubiquitous_language.md', () => {
    const content = readFile('templates/user_stories.md');
    const lines = content.split('\n');
    const footerLine = lines
      .filter((l) => !l.startsWith('>') && l.includes('📋 目次') && l.includes(']('))
      .at(-1) ?? '';
    expect(footerLine).toContain('./ubiquitous_language.md');
    expect(footerLine).toContain('→');
  });

  test('ubiquitous_language.md footer links forward to ui_design_brief.md', () => {
    const content = readFile('templates/ubiquitous_language.md');
    const lines = content.split('\n');
    const footerLine = lines
      .filter((l) => !l.startsWith('>') && l.includes('📋 目次') && l.includes(']('))
      .at(-1) ?? '';
    expect(footerLine).toContain('./ui_design_brief.md');
    expect(footerLine).toContain('→');
  });
});

// ============================================================
// Test Suite: Preview Script Exists
// ============================================================
test.describe('Preview Script', () => {
  test('scripts/preview-designs.sh exists', () => {
    expect(fileExists('scripts/preview-designs.sh')).toBe(true);
  });
});
