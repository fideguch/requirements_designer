import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const SKILL_DIR = path.resolve(__dirname, '..');

function readFile(relativePath: string): string {
  return fs.readFileSync(path.join(SKILL_DIR, relativePath), 'utf-8');
}

// ============================================================
// Test Suite: UX Trust Design Reference (references/ux_trust_design.md)
// ============================================================
test.describe('UX Trust Design Reference', () => {
  let content: string;

  test.beforeAll(() => {
    content = readFile('references/ux_trust_design.md');
  });

  test('file exists', () => {
    const filePath = path.join(SKILL_DIR, 'references/ux_trust_design.md');
    expect(fs.existsSync(filePath)).toBe(true);
  });

  // 12 sections
  const requiredSections = [
    '信頼方程式',
    '2層構造',
    'Tier 1',
    'Tier 2',
    'キャリブレーション',
    '質問カタログ',
    'FRパターン',
    'NFRパターン',
    'UI実装パターン',
    'エンタープライズルール',
    'bochi',
    'スコア調整',
  ];

  for (const section of requiredSections) {
    test(`has section: ${section}`, () => {
      expect(content).toContain(section);
    });
  }

  // All 13 pattern names exist
  const patternNames = [
    'P1: Visibility',
    'P2: User Control',
    'P3: Error Prevention & Recovery',
    'P4: Consistency',
    'P5: Appropriate Friction',
    'P6: Action Audit & Undo',
    'P7: Feedback Loop',
    'P8: Intent Preview',
    'P9: Autonomy Dial',
    'P10: Explainable Rationale',
    'P11: Confidence Signal',
    'P12: Escalation Pathway',
    'P13: Anti-Anthropomorphism',
  ];

  for (const pattern of patternNames) {
    test(`contains pattern: ${pattern}`, () => {
      expect(content).toContain(pattern);
    });
  }

  // Tier 1 patterns (P1-P7) marked as "all projects"
  test('Tier 1 patterns (P1-P7) are marked for all projects', () => {
    expect(content).toMatch(/Tier 1.*全プロジェクト/s);
  });

  // Tier 2 patterns (P8-P13) marked as AI
  test('Tier 2 patterns (P8-P13) are marked for AI', () => {
    expect(content).toMatch(/Tier 2.*AI/s);
  });

  test('contains trust equation from NNGroup', () => {
    expect(content).toContain('透明性');
    expect(content).toContain('制御');
    expect(content).toContain('一貫性');
    expect(content).toContain('障害時支援');
  });

  test('contains 4-stage trust calibration', () => {
    expect(content).toContain('Pre-interaction');
    expect(content).toContain('Early usage');
    expect(content).toContain('Ongoing');
    expect(content).toContain('Error recovery');
  });

  test('contains anti-anthropomorphism guidelines', () => {
    expect(content).toMatch(/理解する|考える/);
    expect(content).toMatch(/処理する|分析する/);
  });
});

// ============================================================
// Test Suite: SKILL.md Trust Design Integration
// ============================================================
test.describe('SKILL.md Trust Design Integration', () => {
  let content: string;

  test.beforeAll(() => {
    content = readFile('SKILL.md');
  });

  test('references ux_trust_design.md in Reference Files', () => {
    expect(content).toContain('ux_trust_design.md');
  });
});

// ============================================================
// Test Suite: Question Bank Trust Rounds
// ============================================================
test.describe('Question Bank Trust Rounds', () => {
  let content: string;

  test.beforeAll(() => {
    content = readFile('references/question_bank.md');
  });

  test('has Round 3D: trust design for all projects', () => {
    expect(content).toContain('Round 3D');
    expect(content).toMatch(/信頼設計/);
  });

  test('has Round 3E: AI trust', () => {
    expect(content).toContain('Round 3E');
    expect(content).toMatch(/AI.*信頼/s);
  });

  test('Round 3D has questions Q74-Q80', () => {
    for (let i = 74; i <= 80; i++) {
      expect(content).toMatch(new RegExp(`${i}\\.`));
    }
  });

  test('Round 3E has questions Q81-Q85', () => {
    for (let i = 81; i <= 85; i++) {
      expect(content).toMatch(new RegExp(`${i}\\.`));
    }
  });

  test('Round 3D is marked as all projects (全プロジェクト)', () => {
    expect(content).toMatch(/Round 3D.*全プロジェクト/s);
  });
});

// ============================================================
// Test Suite: Quality Rubric Trust Adjustment
// ============================================================
test.describe('Quality Rubric Trust Adjustment', () => {
  let content: string;

  test.beforeAll(() => {
    content = readFile('references/quality_rubric.md');
  });

  test('has trust design score adjustment section', () => {
    expect(content).toMatch(/信頼設計スコア調整/);
  });

  test('has ±2 point adjustment', () => {
    expect(content).toMatch(/\+2/);
    expect(content).toMatch(/-2/);
  });
});

// ============================================================
// Test Suite: UI Design Brief Trust Section
// ============================================================
test.describe('UI Design Brief Trust Section', () => {
  let content: string;

  test.beforeAll(() => {
    content = readFile('templates/ui_design_brief.md');
  });

  test('has Section 3.5 Trust Design Principles', () => {
    expect(content).toMatch(/3\.5/);
    expect(content).toMatch(/Trust Design|信頼設計/);
  });

  test('has Tier 1 table', () => {
    expect(content).toContain('Tier 1');
    expect(content).toContain('Visibility');
  });

  test('has Tier 2 table', () => {
    expect(content).toContain('Tier 2');
    expect(content).toContain('Intent Preview');
  });
});

// ============================================================
// Test Suite: Skill Orchestration Trust Integration
// ============================================================
test.describe('Skill Orchestration Trust Integration', () => {
  let content: string;

  test.beforeAll(() => {
    content = readFile('references/skill_orchestration.md');
  });

  test('includes /pm-user-story-mapping', () => {
    expect(content).toContain('/pm-user-story-mapping');
  });
});

// ============================================================
// Test Suite: Phase 5 Trust Design Integration
// ============================================================
test.describe('Phase 5 Trust Design Integration', () => {
  let content: string;
  let skillContent: string;

  test.beforeAll(() => {
    content = readFile('references/phase5_ui_design.md');
    skillContent = readFile('SKILL.md');
  });

  test('references trust design patterns', () => {
    expect(content).toMatch(/信頼設計|trust design/i);
  });

  test('SKILL.md has HARD-GATE requiring Read of ux_trust_design.md before Phase 5', () => {
    expect(skillContent).toMatch(/HARD-GATE.*Phase 5.*信頼設計/s);
    expect(skillContent).toMatch(/ux_trust_design\.md.*必ず Read/s);
  });

  test('phase5_ui_design.md has prerequisite HARD-GATE for ux_trust_design.md', () => {
    expect(content).toMatch(/前提条件.*HARD-GATE/);
    expect(content).toMatch(/ux_trust_design\.md.*全文/);
  });

  test('5A instructs populating Section 3.5 from ux_trust_design.md', () => {
    expect(content).toMatch(/ux_trust_design\.md.*Section 3\.5.*具体化/s);
    expect(content).toMatch(/Tier 1.*P1-P7.*設計メモ/s);
  });

  test('5E has separate Tier 1 (unconditional) and Tier 2 (AI conditional) trust checks', () => {
    expect(content).toMatch(/信頼設計チェック（全プロジェクト）/);
    expect(content).toMatch(/信頼設計チェック（AI機能時）/);
  });
});

// ============================================================
// Test Suite: Light Mode Trust Design Guarantee
// ============================================================
test.describe('Light Mode Trust Design', () => {
  test('SKILL.md guarantees Q74-Q76 in Light mode', () => {
    const skillContent = readFile('SKILL.md');
    expect(skillContent).toMatch(/ライトモード.*信頼設計.*Q74.*Q76/s);
  });
});
