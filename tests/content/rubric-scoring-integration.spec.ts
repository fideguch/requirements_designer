import { test, expect } from '@playwright/test';
import { readFile, fileExists } from '../helpers/test-helpers';

// --- best_practices.md: Japan Legal Compliance ---
test.describe('Best Practices — Japan Legal Compliance', () => {
  let content: string;

  test.beforeAll(() => {
    content = readFile('references/best_practices.md');
  });

  test('has Japan legal compliance checklist section', () => {
    expect(content).toContain('日本市場向け法規制チェックリスト');
  });

  test('covers 特定商取引法', () => {
    expect(content).toContain('特定商取引法');
    expect(content).toContain('販売者情報');
  });

  test('covers 個人情報保護法 (APPI)', () => {
    expect(content).toContain('個人情報保護法');
    expect(content).toContain('APPI');
  });

  test('covers 景品表示法', () => {
    expect(content).toContain('景品表示法');
    expect(content).toContain('総額表示');
  });

  test('covers 資金決済法', () => {
    expect(content).toContain('資金決済法');
  });

  test('covers 電子契約法', () => {
    expect(content).toContain('電子契約法');
  });
});

// --- question_bank.md: Japan Legal Questions ---
test.describe('Question Bank — Japan Legal Compliance Questions', () => {
  let content: string;

  test.beforeAll(() => {
    content = readFile('references/question_bank.md');
  });

  test('has Japan legal compliance questions in Phase 3', () => {
    expect(content).toContain('日本市場法規制');
  });

  test('has payment/特定商取引法 question', () => {
    expect(content).toContain('決済機能');
    expect(content).toContain('特定商取引法');
  });

  test('has personal info/APPI question', () => {
    expect(content).toContain('個人情報');
    expect(content).toContain('APPI');
  });

  test('has pricing/景品表示法 question', () => {
    expect(content).toContain('価格表示');
    expect(content).toContain('景品表示法');
  });
});

// ============================================================
// Test Suite: Skill Orchestration & Project Scan (2026-03-28)
// ============================================================

test.describe('Skill Orchestration Reference', () => {
  let content: string;

  test.beforeAll(() => {
    content = readFile('references/skill_orchestration.md');
  });

  test('skill_orchestration.md exists', () => {
    expect(fileExists('references/skill_orchestration.md')).toBe(true);
  });

  test('has project scan section', () => {
    expect(content).toContain('プロジェクトスキャン');
  });

  test('has maturity level definitions (Lv.0-3)', () => {
    expect(content).toContain('Lv.0');
    expect(content).toContain('Lv.1');
    expect(content).toContain('Lv.2');
    expect(content).toContain('Lv.3');
  });

  test('has scan targets (package.json, src/, etc.)', () => {
    expect(content).toContain('package.json');
    expect(content).toContain('src/');
    expect(content).toContain('CLAUDE.md');
    expect(content).toContain('DESIGN.md');
    expect(content).toContain('migrations/');
  });

  test('has Phase 1-4 skill map', () => {
    expect(content).toContain('/brainstorming');
    expect(content).toContain('/pm-problem-statement');
    expect(content).toContain('/pm-jobs-to-be-done');
    expect(content).toContain('/pm-pestel-analysis');
    expect(content).toContain('/pm-user-story');
  });

  test('has Phase 5 skill map', () => {
    expect(content).toContain('/ui-ux-pro-max');
    expect(content).toContain('/frontend-design');
    expect(content).toContain('/web-design-guidelines');
    expect(content).toContain('/pm-customer-journey-map');
    expect(content).toContain('/cro-methodology');
  });

  test('has HEAL verification in Phase 5', () => {
    expect(content).toContain('HEAL');
    expect(content).toContain('get_screenshot');
  });

  test('has completion proposals (speckit-bridge, doc-coauthoring)', () => {
    expect(content).toContain('/speckit-bridge');
    expect(content).toContain('/doc-coauthoring');
  });

  test('has all 5 scenario flows (A-E)', () => {
    expect(content).toContain('新規');
    expect(content).toContain('構想中');
    expect(content).toContain('開発済み');
    expect(content).toContain('運用中');
  });

  test('has Current State Summary template', () => {
    expect(content).toContain('Current State Summary');
    expect(content).toContain('Tech Stack');
    expect(content).toContain('Maturity');
  });
});

// --- SKILL.md: Project Scan & Orchestration ---
test.describe('SKILL.md Project Scan Integration', () => {
  let content: string;

  test.beforeAll(() => {
    content = readFile('SKILL.md');
  });

  test('has project scan in workflow overview', () => {
    expect(content).toContain('プロジェクトスキャン');
    expect(content).toContain('成熟度');
  });

  test('references skill_orchestration.md in Reference Files', () => {
    expect(content).toContain('skill_orchestration.md');
  });

  test('Phase 5 skills are marked as auto-invoked', () => {
    expect(content).toContain('自動起動');
    expect(content).toContain('/ui-ux-pro-max');
    expect(content).toContain('/frontend-design');
    expect(content).toContain('/web-design-guidelines');
  });

  test('Phase 5 common rules include HEAL verification', () => {
    expect(content).toContain('HEAL');
    expect(content).toContain('get_screenshot');
  });
});

// --- phase5_ui_design.md: Skill Auto-Invocation ---
test.describe('Phase 5 UI Design — Skill Auto-Invocation', () => {
  let content: string;

  test.beforeAll(() => {
    content = readFile('references/phase5_ui_design.md');
  });

  test('5A has ui-ux-pro-max auto-invocation', () => {
    expect(content).toContain('スキル自動起動（5A）');
    expect(content).toContain('/ui-ux-pro-max');
    expect(content).toContain('/frontend-design');
  });

  test('5B has customer-journey-map auto-invocation', () => {
    expect(content).toContain('スキル自動起動（5B）');
    expect(content).toContain('/pm-customer-journey-map');
  });

  test('5C has HEAL verification', () => {
    expect(content).toContain('スキル自動起動（5C）');
    expect(content).toContain('HEAL');
  });

  test('5D has web-design-guidelines auto-invocation', () => {
    expect(content).toContain('スキル自動起動（5D');
    expect(content).toContain('/web-design-guidelines');
  });

  test('5E has full skill chain (ui-ux + web-guidelines + frontend-design)', () => {
    expect(content).toContain('スキル自動起動（5E');
    expect(content).toContain('/ui-ux-pro-max');
    expect(content).toContain('/web-design-guidelines');
    expect(content).toContain('/frontend-design');
  });

  test('5E has cro-methodology for LP/EC', () => {
    expect(content).toContain('/cro-methodology');
    expect(content).toContain('LP/EC');
  });
});

// --- Scenario Tests: Project State Detection ---
test.describe('Scenario Coverage', () => {
  let orchestration: string;
  let skillMd: string;

  test.beforeAll(() => {
    orchestration = readFile('references/skill_orchestration.md');
    skillMd = readFile('SKILL.md');
  });

  test('Scenario A: new project triggers Full mode recommendation', () => {
    expect(orchestration).toContain('Lv.0 新規');
    expect(orchestration).toMatch(/Lv\.0.*Full/);
  });

  test('Scenario B: partial designs/ triggers resume from interrupted phase', () => {
    expect(orchestration).toContain('Lv.1 構想中');
    expect(orchestration).toContain('中断フェーズから再開');
  });

  test('Scenario C: existing code without designs/ triggers Enhance mode', () => {
    expect(orchestration).toContain('Lv.2 開発済み');
    expect(orchestration).toMatch(/Lv\.2.*Enhance/);
  });

  test('Scenario C: scan results auto-recorded in Current State Summary', () => {
    expect(orchestration).toContain('Current State Summary');
    expect(orchestration).toContain('auto-detected');
  });

  test('Scenario D: design in progress resumes from Phase 5 sub-phase', () => {
    expect(orchestration).toContain('デザイン途中');
  });

  test('Scenario E: production product triggers Enhance with full scan', () => {
    expect(orchestration).toContain('Lv.3 運用中');
    expect(orchestration).toMatch(/Lv\.3.*Enhance/);
  });

  test('Scenario E: includes CI/CD and test detection', () => {
    expect(orchestration).toContain('CI/CD');
    expect(orchestration).toContain('tests/');
  });

  test('all scan categories are defined', () => {
    expect(orchestration).toContain('package.json');
    expect(orchestration).toContain('Cargo.toml');
    expect(orchestration).toContain('go.mod');
    expect(orchestration).toContain('prisma/');
    expect(orchestration).toContain('.github/workflows/');
    expect(orchestration).toContain('vercel.json');
  });

  test('SKILL.md workflow handles Lv.2/Lv.3 scan injection', () => {
    expect(skillMd).toContain('Lv.2');
    expect(skillMd).toContain('Lv.3');
    expect(skillMd).toContain('Section 10');
  });
});
