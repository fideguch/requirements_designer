import { test, expect } from '@playwright/test';
import { readFile } from '../helpers/test-helpers';

const TEMPLATES = [
  'templates/README_charter.md',
  'templates/workflow_config.md',
  'templates/functional_requirements.md',
  'templates/non_functional_requirements.md',
  'templates/user_stories.md',
  'templates/ubiquitous_language.md',
  'templates/ui_design_brief.md',
] as const;

/**
 * Strip HTML comments (<!-- ... -->) from content before checking for
 * internal structure leakage. Internal mapping comments are intentionally
 * hidden and should not trigger privacy failures.
 */
function stripHtmlComments(content: string): string {
  return content.replace(/<!--[\s\S]*?-->/g, '');
}

// ============================================================
// Test Suite: Template Privacy — No Internal Structure Exposed
// ============================================================
test.describe('Template Privacy', () => {
  for (const templatePath of TEMPLATES) {
    test.describe(templatePath, () => {
      let visibleContent: string;

      test.beforeAll(() => {
        const raw = readFile(templatePath);
        visibleContent = stripHtmlComments(raw);
      });

      test('does not expose skill name "requirements_designer"', () => {
        expect(visibleContent).not.toContain('requirements_designer');
      });

      test('does not expose internal "references/" directory path', () => {
        expect(visibleContent).not.toContain('references/');
      });

      test('does not expose internal "templates/" directory path', () => {
        expect(visibleContent).not.toContain('templates/');
      });

      test('does not expose internal "scripts/" directory path', () => {
        expect(visibleContent).not.toContain('scripts/');
      });

      test('does not expose internal "tests/" directory path', () => {
        expect(visibleContent).not.toContain('tests/');
      });

      test('does not expose skill installation path "~/.claude/skills/"', () => {
        expect(visibleContent).not.toContain('~/.claude/skills/');
      });
    });
  }
});
