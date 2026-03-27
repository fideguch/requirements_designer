# CLAUDE.md

## Purpose
Maintain and extend the `requirements_designer` Claude Code skill.
Interactive Q&A that generates project charters, functional/non-functional requirements,
user stories, ubiquitous language, and UI designs via Figma MCP.

## Language Rules
- Documentation, UI, communication: auto-detect user language (default Japanese)
- Code (variables, comments, commits, PR): English
- Requirement IDs always English: `FR-001`, `NFR-001`, `US-001`, `SC-001`

## Project Structure

### This repository (`requirements_designer/`)
- `CLAUDE.md` — project instructions (this file)
- `DESIGN.md` — Figma conventions, design tokens, Plugin API rules
- `HANDOFF.md` — session handoff notes
- `README.md` — project overview
- `designs/` — generated requirements documents (output of the skill)

### Skill source (`~/.claude/skills/requirements_designer/`)
- `SKILL.md` — main skill definition (469 lines, Anthropic 500行準拠)
- `templates/` — 7 document templates
- `references/` — 10 reference files (including enhance_mode.md, skill_orchestration.md)
- `scripts/scaffold-requirements.sh` — designs/ scaffolding (`--with-ul`, `--with-ui`, `--light`, `--enhance`)
- `tests/skill-structure.spec.ts` — full regression suite (322 tests)

## Tech Stack
- Skill definition: Markdown
- Tests: Playwright + TypeScript (strict mode)
- Code quality: ESLint + Prettier + Husky + lint-staged
- CI: GitHub Actions (`lint`, `typecheck`, `format:check`)
- Integration: Figma MCP (14 tools), Notion MCP

## External Tool Integration

### Figma MCP
- Figma URL → `get_design_context` first, then implement
- `create_new_file` requires planKey — confirm with user if multiple plans exist
- Design conventions and Plugin API patterns: see @DESIGN.md

### Notion MCP
- Before page creation/update → check `notion://docs/enhanced-markdown-spec`
- Prioritize readability: tables, callouts, heading hierarchy

## Pipeline Stage Gates

requirements_designer output flowing to downstream skills must pass these gates:

| Gate | From → To | Criteria |
|------|-----------|----------|
| G1 | Requirements → Spec | Quality score ≥70, user_stories.md generated, Must-priority FRs have AC |
| G2 | Requirements → UI Design (Phase 5) | G1 passed + ubiquitous_language.md defined OR skip justified |
| G3 | Requirements → PRD | Quality score ≥80 |
| G4 | UI Design → Frontend | UI quality score ≥70, DESIGN.md tokens synced with Figma variables |

### Downstream Skill Contracts

| Downstream Skill | Required Input | Optional |
|-----------------|----------------|----------|
| /writing-plans | designs/README.md, functional_requirements.md, user_stories.md | non_functional_requirements.md |
| /speckit-bridge | All designs/*.md | — |
| /doc-coauthoring | All designs/*.md | ui_design_brief.md |
| /frontend-design | designs/ui_design_brief.md | DESIGN.md tokens |

## Four-File Update Rule (CRITICAL)

When adding phases or files to the skill, always update simultaneously:

1. **SKILL.md** — frontmatter triggers, help section, progress detection, new phase, Reference Files table
2. **README.md** — overview, document list, phase descriptions, file structure, skill integrations
3. **scripts/scaffold-requirements.sh** — template copies, flag support
4. **tests/skill-structure.spec.ts** — file existence, content, cross-reference tests

Verify before commit:
```bash
cd ~/.claude/skills/requirements_designer && npx playwright test
```

## Key Commands
```bash
/requirements_designer                    # Launch the skill
cd ~/.claude/skills/requirements_designer
npm test                                  # Run regression tests (261)
npm run quality                           # lint + typecheck + format:check
scripts/scaffold-requirements.sh . --with-ui  # Scaffold designs/ with UI phase
scripts/scaffold-requirements.sh . --light    # Scaffold designs/ in Light Mode
scripts/scaffold-requirements.sh . --enhance  # Scaffold designs/ in Enhance Mode
```

## GitHub
- Remote: `git@github.com:fideguch/requirements_designer.git`
- Default account: fideguch
