import { test, expect } from '@playwright/test';
import {
  readFile,
  readSkillWithPhase5,
  ORIGINAL_TRIGGERS,
  NEW_UI_TRIGGERS,
  FIGMA_TOOLS,
  REFERENCE_ENTRIES,
  SCORE_DIMENSIONS,
} from '../helpers/test-helpers';

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

  for (const trigger of ORIGINAL_TRIGGERS) {
    test(`contains original trigger: "${trigger}"`, () => {
      expect(content).toContain(trigger);
    });
  }

  for (const trigger of NEW_UI_TRIGGERS) {
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
    const combined = readSkillWithPhase5();
    expect(combined).toMatch(/#{2,3} 5A:/);
  });

  test('Phase 5B sub-phase exists', () => {
    const combined = readSkillWithPhase5();
    expect(combined).toMatch(/#{2,3} 5B:/);
  });

  test('Phase 5C sub-phase exists', () => {
    const combined = readSkillWithPhase5();
    expect(combined).toMatch(/#{2,3} 5C:/);
  });

  test('Phase 5D sub-phase exists', () => {
    const combined = readSkillWithPhase5();
    expect(combined).toMatch(/#{2,3} 5D:/);
  });

  test('Phase 5E sub-phase exists', () => {
    const combined = readSkillWithPhase5();
    expect(combined).toMatch(/#{2,3} 5E:/);
  });
});

// ============================================================
// Test Suite 4: SKILL.md — Figma MCP Tool References
// ============================================================
test.describe('SKILL.md Figma MCP Tool References', () => {
  let combined: string;

  test.beforeAll(() => {
    combined = readSkillWithPhase5();
  });

  for (const tool of FIGMA_TOOLS) {
    test(`references Figma tool: ${tool.split('__').pop()}`, () => {
      expect(combined).toContain(tool);
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
test.describe('SKILL.md Phase 4C Ubiquitous Language', () => {
  let content: string;

  test.beforeAll(() => {
    content = readFile('SKILL.md');
  });

  test('Phase 4C includes ubiquitous language definition', () => {
    expect(content).toMatch(/### 4C:.*ユビキタス言語/);
  });

  test('Phase 4C includes UL-001 format', () => {
    expect(content).toContain('UL-001');
  });

  test('Phase 4C includes term extraction logic', () => {
    expect(content).toContain('用語を自動抽出');
  });

  test('Phase 4C includes anti-pattern rules', () => {
    expect(content).toContain('アンチパターン');
  });

  test('Phase 4C includes user-facing label concept', () => {
    expect(content).toContain('ユーザー向けラベル');
  });

  test('Phase 4C includes code naming reference', () => {
    expect(content).toContain('コード命名');
  });
});

test.describe('SKILL.md Phase 4D Next Steps', () => {
  let content: string;

  test.beforeAll(() => {
    content = readFile('SKILL.md');
  });

  test('Phase 4D includes UI design option', () => {
    expect(content).toContain('UIデザイン');
    expect(content).toContain('Phase 5');
  });

  test('Phase 4D preserves original options', () => {
    expect(content).toContain('PRD化');
    expect(content).toContain('brainstorming');
    expect(content).toContain('writing-plans');
    expect(content).toContain('品質改善');
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

  test('detects Phase 0 completion', () => {
    expect(content).toContain('workflow_config.md が存在 → Phase 0 完了');
  });

  test('detects Phase 1 completion', () => {
    expect(content).toContain('README.md が存在 → Phase 1 完了');
  });

  test('detects Phase 4C completion', () => {
    expect(content).toContain('ubiquitous_language.md');
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

  for (const ref of REFERENCE_ENTRIES) {
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
    content = readSkillWithPhase5();
  });

  test('includes UI design quality score table', () => {
    expect(content).toContain('UIデザイン品質スコア');
  });

  for (const dim of SCORE_DIMENSIONS) {
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
    content = readSkillWithPhase5();
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
