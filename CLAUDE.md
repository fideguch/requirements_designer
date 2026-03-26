# Requirements Designer — Project Instructions

## Purpose
対話式Q&Aで要件定義を行う Claude Code スキルの作業ディレクトリ。
スキル本体は `~/.agents/skills/requirements_designer/` にあり、`~/.claude/skills/requirements_designer` からシンボリックリンクで参照される。

## Stack
- Skill definition: Markdown (SKILL.md)
- Tests: Playwright + TypeScript
- Integration: Figma MCP, Notion MCP

## Key Commands
```bash
# スキルを起動
/requirements_designer

# テスト実行（スキル本体ディレクトリで）
cd ~/.agents/skills/requirements_designer && npx playwright test

# designs/ のスキャフォールド
~/.agents/skills/requirements_designer/scripts/scaffold-requirements.sh .
```

## Conventions
- 新フェーズ追加時は SKILL.md / README.md / scaffold script / tests の4箇所を必ず同時更新
- 要件ID は英語統一: `FR-001`, `NFR-001`, `US-001`
- ユーザー入力言語を自動検出して出力言語を合わせる
