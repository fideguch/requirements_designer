# Changelog

All notable changes to the `requirements_designer` skill are documented in this file.

## [Unreleased]

### Added

- Split monolithic test file into 6 focused spec files under `tests/structure/` and `tests/content/`
- Shared test helpers extracted to `tests/helpers/test-helpers.ts`
- Example output for SaaS Full Mode (`examples/saas-full-mode/`)
- Example output for MVP Light Mode (`examples/mvp-light-mode/`)

## 2026-03-28

### Added

- Enhance Mode for existing product requirements with delta definitions (`references/enhance_mode.md`)
- Drift prevention checks in Phase 2 and Phase 3
- Rejected Scope section in README charter template
- DESIGN.md Self-Healing Loop (HEAL section) with P0-P3 severity classification
- DESIGN.md CJK Text Width Rules for Japanese text
- DESIGN.md Component States (Button, Input)
- Figma Code Patterns: Error Prevention Wrappers (Section 9), Verification Utilities (Section 10), Self-Healing Fix Patterns (Section 11)
- Japan legal compliance checklist in `references/best_practices.md` (5 laws)
- Japan legal compliance questions in `references/question_bank.md`
- Skill Orchestration reference (`references/skill_orchestration.md`) with project maturity detection (Lv.0-3)
- Phase 5 skill auto-invocation (ui-ux-pro-max, frontend-design, web-design-guidelines, cro-methodology)
- 5 scenario flows (A-E) for project state detection

### Changed

- SKILL.md compressed to 461 lines with Progressive Disclosure

## 2026-03-27

### Added

- Light Mode for MVP/PoC quick requirements definition (3 dimensions, 60pt, 42/60 pass line)
- Light Mode support in Workflow Config Template, Quality Rubric, and Scaffold Script
- `--light` flag for scaffold script (mutually exclusive with `--with-ui`)

## 2026-03-26

### Fixed

- Replaced generic set-up-github-project templates with skill-specific ones

### Changed

- Extracted Phase 5 details to `references/phase5_ui_design.md` for Progressive Disclosure

## 2026-03-25

### Added

- Phase 0: Workflow Configuration with mode selection
- Phase 4C: Ubiquitous Language definition with UL-001 format
- Phase 5: UI Design with Figma MCP integration (5 sub-phases: 5A-5E)
- UI Design Questions (`references/ui_design_questions.md`)
- UI Design Rubric (`references/ui_design_rubric.md`) with 5 dimensions x 20pt
- Figma Code Patterns (`references/figma_code_patterns.md`)
- UI Design Brief template (`templates/ui_design_brief.md`)
- Ubiquitous Language template (`templates/ubiquitous_language.md`)
- Ubiquitous Language Questions (`references/ubiquitous_language_questions.md`)
- Scaffold script with `--with-ul` and `--with-ui` flags

### Added

- README.md with skill overview, usage guide, and file structure

## 2026-03-24

### Added

- Initial release of Requirements Designer skill
- 4-phase interactive Q&A workflow (Phase 1-4)
- Project charter, functional requirements, non-functional requirements, user stories templates
- Quality rubric with 5 dimensions x 20pt scoring
- Question bank for structured interviews
- Best practices reference

## Infrastructure

### 2026-03-27

- Code quality toolchain: ESLint + Prettier + Husky + lint-staged + TypeScript strict mode
- GitHub Projects V2 setup: templates, workflows, CI/CD
- CI compatibility improvements for lockfile and PROJECT_TOKEN handling
