import * as fs from 'fs';
import * as path from 'path';

export const SKILL_DIR = path.resolve(__dirname, '../..');

/** Read file content relative to SKILL_DIR */
export function readFile(relativePath: string): string {
  return fs.readFileSync(path.join(SKILL_DIR, relativePath), 'utf-8');
}

/** Read SKILL.md + Phase 5 reference combined */
export function readSkillWithPhase5(): string {
  const skill = readFile('SKILL.md');
  const phase5Ref = fileExists('references/phase5_ui_design.md')
    ? readFile('references/phase5_ui_design.md')
    : '';
  return skill + '\n' + phase5Ref;
}

/** Check file exists relative to SKILL_DIR */
export function fileExists(relativePath: string): boolean {
  return fs.existsSync(path.join(SKILL_DIR, relativePath));
}

/** Required files for file structure validation */
export const REQUIRED_FILES = [
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
  'references/phase5_ui_design.md',
  'scripts/scaffold-requirements.sh',
] as const;

/** Original trigger words expected in SKILL.md */
export const ORIGINAL_TRIGGERS = [
  '要件定義',
  'requirements definition',
  '機能要件',
  '非機能要件',
  'user stories',
  'ユーザーストーリー',
  'プロジェクト憲章',
  'project charter',
] as const;

/** New UI trigger words expected in SKILL.md */
export const NEW_UI_TRIGGERS = [
  'UIデザイン',
  'UI design',
  'Figmaデザイン',
  'ワイヤーフレーム',
  'wireframe',
  'モックアップ',
  'mockup',
  'デザインシステム',
  'design system',
] as const;

/** Figma MCP tool names expected in SKILL.md or phase5 reference */
export const FIGMA_TOOLS = [
  'mcp__claude_ai_Figma__whoami',
  'mcp__claude_ai_Figma__create_new_file',
  'mcp__claude_ai_Figma__use_figma',
  'mcp__claude_ai_Figma__generate_diagram',
  'mcp__claude_ai_Figma__get_screenshot',
  'mcp__claude_ai_Figma__search_design_system',
  'mcp__claude_ai_Figma__create_design_system_rules',
  'mcp__claude_ai_Figma__get_metadata',
] as const;

/** Reference entries expected in SKILL.md reference table */
export const REFERENCE_ENTRIES = [
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
] as const;

/** Phase 5E quality score dimensions */
export const SCORE_DIMENSIONS = [
  'DS完全性',
  '画面カバレッジ',
  'ビジュアルヒエラルキー',
  'アクセシビリティ',
  '要件トレーサビリティ',
] as const;

/** UI Design Brief required sections */
export const UI_BRIEF_SECTIONS = [
  'Platform & Responsive Strategy',
  'Brand Identity',
  'Design Style',
  'Accessibility',
  'Existing Design System',
  'Figma Files',
  'Screen Inventory',
] as const;

/** DESIGN.md path (used by several test suites) */
export const DESIGN_MD_PATH = path.join(
  process.env.HOME || '/Users/fumito_ideguchi',
  'requirements_designer',
  'DESIGN.md'
);
