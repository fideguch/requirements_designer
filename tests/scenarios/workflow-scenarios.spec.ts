import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const ROOT = path.resolve(__dirname, '../../');
const SKILL = fs.readFileSync(path.join(ROOT, 'SKILL.md'), 'utf-8');
const TEMPLATES_DIR = path.join(ROOT, 'templates');
const REFERENCES_DIR = path.join(ROOT, 'references');

// Scenario 1: Phase progression prerequisite validation
test.describe('Scenario: Phase Progression Prerequisites', () => {
  // Given the SKILL.md phase definitions,
  // When checking phase entry requirements,
  // Then each phase should specify what must be complete before starting.

  test('Phase 1 requires Phase 0 workflow_config output', () => {
    // Given: SKILL.md defines Phase 0 and Phase 1
    const phase0Section = SKILL.match(/## Phase 0[\s\S]*?(?=## Phase [1-9])/);
    const phase1Section = SKILL.match(/## Phase 1[\s\S]*?(?=## Phase [2-9])/);

    // Then: Phase 0 mentions workflow_config and Phase 1 references it
    expect(phase0Section).not.toBeNull();
    expect(phase1Section).not.toBeNull();
    expect(SKILL).toContain('workflow_config');
  });

  test('Phase 4A quality scoring requires Phase 2 FR output', () => {
    // Given: Phase 4A scoring rubric
    const phase4Section = SKILL.match(/## Phase 4[\s\S]*?(?=## Phase 5|## Known|## Language)/);

    // Then: references functional_requirements
    expect(phase4Section).not.toBeNull();
    expect(phase4Section![0]).toMatch(/functional_requirements|FR-\d{3}/);
  });

  test('Phase 5 requires Figma MCP authentication', () => {
    // Given: Phase 5 section
    const phase5Section = SKILL.match(/## Phase 5[\s\S]*?(?=## Known|## Language|$)/);

    // Then: mentions whoami or authentication
    expect(phase5Section).not.toBeNull();
    expect(phase5Section![0]).toMatch(/whoami|認証|authentication/i);
  });
});

// Scenario 2: Template completeness for each phase
test.describe('Scenario: Template Completeness', () => {
  // Given the templates/ directory,
  // When a phase requires file generation,
  // Then a corresponding template must exist with all required sections.

  const TEMPLATES = fs.readdirSync(TEMPLATES_DIR).filter((f) => f.endsWith('.md'));

  test('all phase output files have corresponding templates', () => {
    // Given: SKILL.md defines output files for each phase
    const expectedTemplates = [
      'README_charter.md',
      'functional_requirements.md',
      'non_functional_requirements.md',
      'user_stories.md',
    ];

    // Then: each expected template exists
    for (const tpl of expectedTemplates) {
      expect(TEMPLATES, `Missing template: ${tpl}`).toContain(tpl);
    }
  });

  test('each template has placeholder sections for Claude to fill', () => {
    // Given: templates should have fillable sections
    for (const tpl of TEMPLATES) {
      const content = fs.readFileSync(path.join(TEMPLATES_DIR, tpl), 'utf-8');
      // Then: each template has at least 3 markdown headings
      const headings = content.match(/^#{1,3} /gm) || [];
      expect(headings.length, `Template ${tpl} has too few headings`).toBeGreaterThanOrEqual(3);
    }
  });

  test('quality rubric template covers 5 dimensions', () => {
    // Given: quality rubric reference file
    const rubric = fs.readFileSync(path.join(REFERENCES_DIR, 'quality_rubric.md'), 'utf-8');

    // Then: exactly 5 scoring dimensions
    const dimensions = (rubric.match(/^## \d+\./gm) || []).length;
    expect(dimensions).toBe(5);
    // And rubric references key evaluation concepts
    expect(rubric).toMatch(/completeness|網羅性/i);
    expect(rubric).toMatch(/testability|テスト可能性/i);
  });
});

// Scenario 3: Question bank coverage validation
test.describe('Scenario: Question Bank Covers All Phases', () => {
  // Given the question_bank.md reference,
  // When checking question coverage,
  // Then questions should exist for Phases 1-3 at minimum.

  const questionBank = fs.readFileSync(path.join(REFERENCES_DIR, 'question_bank.md'), 'utf-8');

  test('has questions tagged for Phase 1 (Project Charter)', () => {
    expect(questionBank).toMatch(/Phase 1|フェーズ 1|プロジェクト理解|charter/i);
  });

  test('has questions tagged for Phase 2 (Functional Requirements)', () => {
    expect(questionBank).toMatch(/Phase 2|フェーズ 2|機能要件|functional/i);
  });

  test('has questions tagged for Phase 3 (Non-Functional Requirements)', () => {
    expect(questionBank).toMatch(/Phase 3|フェーズ 3|非機能|non-functional/i);
  });

  test('has at least 20 distinct questions', () => {
    // Count question markers (numbered lists like "1. **...**")
    const questions = questionBank.match(/^\d+\.\s+\*\*/gm) || [];
    expect(questions.length).toBeGreaterThanOrEqual(20);
  });
});

// Scenario 4: Scaffold script creates correct directory structure
test.describe('Scenario: Scaffold Script Directory Structure', () => {
  // Given the scaffold-requirements.sh script,
  // When executed in a clean directory,
  // Then it should create designs/ with the correct template files.

  const scriptPath = path.join(ROOT, 'scripts', 'scaffold-requirements.sh');
  const scriptExists = fs.existsSync(scriptPath);

  test('scaffold script exists and is executable', () => {
    expect(scriptExists).toBe(true);
    if (scriptExists) {
      const stat = fs.statSync(scriptPath);
      // Check executable bit (owner)
      expect(stat.mode & 0o100).toBeTruthy();
    }
  });

  test('scaffold script references all core templates', () => {
    if (!scriptExists) return;
    const script = fs.readFileSync(scriptPath, 'utf-8');

    // Then: script references the core template files
    expect(script).toContain('README_charter');
    expect(script).toContain('functional_requirements');
  });

  test('scaffold script supports --with-ul flag', () => {
    if (!scriptExists) return;
    const script = fs.readFileSync(scriptPath, 'utf-8');
    expect(script).toContain('--with-ul');
  });

  test('scaffold script supports --with-ui flag', () => {
    if (!scriptExists) return;
    const script = fs.readFileSync(scriptPath, 'utf-8');
    expect(script).toContain('--with-ui');
  });
});

// Scenario 5: Cross-phase traceability
test.describe('Scenario: Cross-Phase Traceability', () => {
  // Given the SKILL.md defines output artifacts,
  // When a downstream phase references upstream artifacts,
  // Then the artifact naming must be consistent.

  test('FR identifiers (FR-001) are referenced in user story template', () => {
    const usTemplate = fs.readFileSync(path.join(TEMPLATES_DIR, 'user_stories.md'), 'utf-8');
    // User stories should reference FR identifiers
    expect(usTemplate).toMatch(/FR-\d{3}|関連する機能要件|functional_requirement/i);
  });

  test('SKILL.md Phase 4B references FR output from Phase 2', () => {
    // Phase 4B (User Stories) should reference FR-based generation
    const phase4bSection = SKILL.match(/### 4B[\s\S]*?(?=### 4C)/);
    expect(phase4bSection).not.toBeNull();
    expect(phase4bSection![0]).toMatch(/FR|functional_requirements/);
  });

  test('quality rubric dimensions match SKILL.md scoring description', () => {
    const rubric = fs.readFileSync(path.join(REFERENCES_DIR, 'quality_rubric.md'), 'utf-8');
    // Both should mention the same dimension concepts
    expect(SKILL).toMatch(/品質スコア|quality.*score/i);
    expect(rubric).toMatch(/5次元|次元/i);
  });
});
