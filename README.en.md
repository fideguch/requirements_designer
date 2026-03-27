# Requirements Designer

**261 tests passing** | **Anthropic 500-line compliant** | **Figma MCP integrated**

A Claude Code skill for interactive Q&A-based requirements definition.
Simply say "I want to define requirements for X" and it will progressively generate a project charter, functional requirements, non-functional requirements, and user stories, presenting quality scores with improvement suggestions. With Figma MCP integration, you can generate design systems, wireframes, and mockups end-to-end from requirements.

---

## Quick Start

```bash
# 1. Clone
cd ~/.claude/skills && git clone git@github.com:fideguch/requirements_designer.git

# 2. Install & verify
cd requirements_designer && npm install && npm test

# 3. Use
# In Claude Code, simply type "I want to define requirements"
```

**Prerequisites**: Node.js 20+ / Claude Code CLI

---

## Features

- **3 Modes** — Full (production, 40-60 min) / Light (MVP, 15-20 min) / Enhance (existing product improvement, 30-45 min)
- **7 Auto-Generated Artifacts** — Charter, FR, NFR, User Stories, Ubiquitous Language, Workflow Config, UI Design Brief
- **5-Dimension Quality Scoring** — Completeness, Specificity, Testability, Consistency, Traceability (100-point scale)
- **Figma MCP Integration** — Generate design systems, wireframes, and mockups directly in Figma from requirements
- **Ubiquitous Language (DDD)** — Automatic domain term extraction + unified UI/code naming conventions
- **Drift Prevention** — Automatic detection of goal/scope contradictions in Phase 2, with rejected scope items recorded with rationale
- **261 Regression Tests** — Playwright + TypeScript, full CI/CD

---

## Modes

|                  | Full               | Light                  | Enhance                            |
| ---------------- | ------------------ | ---------------------- | ---------------------------------- |
| **Target**       | Production project | MVP / PoC              | Existing product improvement       |
| **Duration**     | 40-60 min          | 15-20 min              | 30-45 min                          |
| **Evaluation**   | 5-dim 100pt        | 3-dim 60pt             | 5-dim 100pt (delta-adjusted)       |
| **Pass Score**   | 70/100             | 42/60                  | 70/100                             |
| **Phase 5 (UI)** | Executed           | Skipped                | Skipped                            |
| **Highlights**   | All phases         | Reduced Q&A and FR items | Web research + change interviews |

> Note: Duration estimates vary significantly depending on project scale, domain complexity, and user response speed. Complex projects may take 1.5-2x the listed times.

---

## How It Works

### Phase 0: Workflow Configuration

Select mode (Full / Light / Enhance) and skip settings, recorded in `designs/workflow_config.md`.

### Phase 1: Project Understanding (1-2 rounds)

Create the project charter. Organize background, objectives, actors, scope, and success criteria.
In Enhance mode, internet research and interviews run concurrently.

### Phase 2: Functional Requirements Extraction (2-5 rounds)

Deep-dive into features per actor, recorded in `FR-001` format. Includes drift prevention checks.
In Enhance mode, each FR is tagged with Change Type (Add / Modify / Remove).

### Phase 3: Non-Functional Requirements Extraction (2-3 rounds)

Extract across 10 categories. For unclear items, web search suggests domain best practices.

### Phase 4: Quality Evaluation & Finalization

- **4A**: Quality Scoring (5 dimensions x 20pt = 100pt)
- **4B**: Auto-generated User Stories (with Given-When-Then acceptance criteria)
- **4C**: Ubiquitous Language Definition (domain terms + code naming conventions)
- **4D**: Next Steps Proposal (PRD, implementation plan, UI design, quality improvement)

### Phase 5: UI Design (3-5 rounds) — Figma MCP Integration

5A Design Brief → 5B IA & User Flows → 5C Design System → 5D Wireframes → 5E Mockups & Quality Evaluation

> **Figma MCP Scope**: Used only in Phase 5. Requires a Figma MCP server connection. Enables direct generation of design systems, wireframes, and mockups onto the Figma canvas. Not a replacement for manual design workflows — the primary purpose is initial prototype generation from requirements. See [DESIGN.md](DESIGN.md) for details.

---

## Generated Documents

```
designs/
├── workflow_config.md             … Workflow configuration (Phase 0)
├── README.md                      … Project charter
├── functional_requirements.md     … Functional requirements (FR-001~)
├── non_functional_requirements.md … Non-functional requirements (NFR-001~)
├── user_stories.md                … User stories (US-001~)
├── ubiquitous_language.md         … Ubiquitous language definitions (UL-001~)
└── ui_design_brief.md             … UI design brief (Phase 5)
```

---

## Quality Scoring

| Dimension                | Points | Evaluation Criteria                              |
| ------------------------ | ------ | ------------------------------------------------ |
| Completeness             | 20     | All actors covered, CRUD operations, edge cases  |
| Specificity              | 20     | Quantitative values, concrete data formats       |
| Testability              | 20     | Clear pass/fail criteria, acceptance criteria     |
| Consistency              | 20     | Unified terminology, no contradictions, ID refs   |
| Traceability             | 20     | Linkage: Goals → FR → NFR → US                   |

- **Below 70**: Additional Q&A rounds recommended
- **70-79**: Can proceed to implementation planning, but room for improvement
- **80+**: Recommended to proceed to PRD or implementation planning

---

## Usage

### Command Examples

| Input                                                   | Action                                     |
| ------------------------------------------------------- | ------------------------------------------ |
| `I want to define requirements for a Slack bot`         | Start from Phase 1                         |
| `I want to define improvement requirements for an existing product` | Start in Enhance mode         |
| `Load existing designs/ and continue`                   | Detect progress and resume from that phase |
| `Generate quality score`                                | Run Phase 4A quality scoring               |
| `Generate user stories`                                 | Run Phase 4B user story generation         |
| `Help`                                                  | Show quick guide                           |

### Trigger Words

`要件定義` / `requirements definition` / `機能要件` / `非機能要件` / `要件を整理` / `user stories` / `ユーザーストーリー` / `プロジェクト憲章` / `project charter` / `UIデザイン` / `Figmaデザイン` / `ワイヤーフレーム` / `モックアップ` / `デザインシステム` / `既存プロダクト改善` / `機能改善`

---

## Integration with Other Skills

| Skill                    | Purpose                                                          |
| ------------------------ | ---------------------------------------------------------------- |
| `/brainstorming`         | Diverge and converge when ideas are not yet solidified           |
| `/speckit-bridge`        | Convert designs/ to spec-kit format (spec.md + constitution.md)  |
| `/doc-coauthoring`       | Refine requirements into a formal PRD                            |
| `/writing-plans`         | Create implementation plans and task breakdowns from requirements |
| `/ui-ux-pro-max`         | Premium UI/UX design principles (auto-applied in Phase 5)        |
| `/frontend-design`       | High-quality frontend design principles (auto-applied in Phase 5)|
| `/web-design-guidelines` | UI guideline compliance checks (used in Phase 5E)                |

---

## File Structure

```
requirements_designer/
├── SKILL.md                           # Skill definition (461 lines)
├── README.md                          # Japanese documentation
├── README.en.md                       # This file
├── templates/                         # Templates copied to designs/ (7 files)
│   ├── README_charter.md              #   Project charter
│   ├── functional_requirements.md     #   Functional requirements
│   ├── non_functional_requirements.md #   Non-functional requirements
│   ├── user_stories.md                #   User stories
│   ├── workflow_config.md             #   Workflow configuration
│   ├── ubiquitous_language.md         #   Ubiquitous language definitions
│   └── ui_design_brief.md            #   UI design brief
├── references/                        # Reference files used during skill execution (9 files)
│   ├── question_bank.md               #   Phase 1-3 question catalog (73 questions)
│   ├── quality_rubric.md              #   Quality evaluation rubric (Full/Light/Enhance)
│   ├── enhance_mode.md                #   Enhance mode detailed procedure
│   ├── best_practices.md              #   NFR suggestion best practices
│   ├── ubiquitous_language_questions.md #  UL question catalog
│   ├── phase5_ui_design.md            #   Phase 5 detailed procedure reference
│   ├── ui_design_questions.md         #   UI design question catalog
│   ├── ui_design_rubric.md            #   UI design quality rubric
│   └── figma_code_patterns.md         #   Figma Plugin API pattern collection
├── scripts/
│   └── scaffold-requirements.sh       #   designs/ initial setup
└── tests/
    └── skill-structure.spec.ts        #   Regression tests (261 tests)
```

---

## Language Support

- Automatically detects user input language and matches output language
- Requirement IDs (`FR-001`, `NFR-001`, `US-001`) and section headers are standardized in English
- Supports both Japanese and English

## License

Private skill. All rights reserved.
