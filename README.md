# Requirements Designer

対話式Q&Aで要件定義を行う Claude Code スキル。
プロジェクト憲章・機能要件・非機能要件・ユーザーストーリーを段階的に生成し、品質スコアで改善点を提示する。

## Overview

PMやエンジニアが最小限の入力で、構造化された要件ドキュメント一式を生成できる。
「○○の要件定義をしたい」と伝えるだけで、対話形式の質問に答えていくことで要件が整理される。

### 生成されるドキュメント

```
designs/
├── README.md                      … プロジェクト憲章
├── functional_requirements.md     … 機能要件 (FR-001〜)
├── non_functional_requirements.md … 非機能要件 (NFR-001〜)
└── user_stories.md                … ユーザーストーリー (US-001〜)
```

## How It Works

4つのフェーズで段階的に要件を構築する。

### Phase 1: プロジェクト理解 (1-2 ラウンド)

プロジェクト憲章 (`designs/README.md`) を作成する。背景・目的・アクター・スコープ・成功基準を整理。テンプレートの必須セクションをベースに、不足情報を質問で補完する。

### Phase 2: 機能要件の抽出 (3-5 ラウンド)

アクターごとに機能を深掘りし、`FR-001` 形式で `designs/functional_requirements.md` に記録する。コア機能 → エッジケース → 補完の順で段階的に質問。各FRには説明・アクター・事前条件・主フロー・例外フロー・優先度 (MoSCoW) を含む。

### Phase 3: 非機能要件の抽出 (2-3 ラウンド)

10カテゴリ（パフォーマンス、可用性、セキュリティ、スケーラビリティ、ユーザビリティ、保守性、互換性、法規制、データ、運用）について `designs/non_functional_requirements.md` に記録する。「わからない」と答えた項目にはWeb検索でドメインのベストプラクティスを調査し提案する。

### Phase 4: 品質評価・ユーザーストーリー・次のステップ

- **4A: 品質スコアリング** — 5次元 x 20点 = 100点満点で要件の品質を評価
- **4B: ユーザーストーリー生成** — FRから Given-When-Then 形式の受け入れ基準付きUSを自動生成
- **4C: 次のステップ提案** — スコアに応じてPRD化・実装計画・追加改善を提案

## Quality Scoring

| 次元 | 配点 | 評価内容 |
|------|------|---------|
| 網羅性 (Completeness) | 20 | 全アクター網羅、CRUD操作、エッジケース |
| 具体性 (Specificity) | 20 | 定量的な値、具体的データ形式 |
| テスト可能性 (Testability) | 20 | 明確なpass/fail基準、受け入れ基準 |
| 一貫性 (Consistency) | 20 | 用語統一、矛盾なし、ID参照の整合性 |
| 追跡可能性 (Traceability) | 20 | 目標→FR→NFR→USの紐付け |

- **70点未満**: 追加Q&Aラウンドを推奨
- **70〜79点**: 実装計画に進めるが改善余地あり
- **80点以上**: PRD化・実装計画への移行を推奨

## Installation

`~/.claude/skills/` 配下にこのリポジトリを配置する。

```bash
cd ~/.claude/skills
git clone <repository-url> requirements_designer
```

## Usage

### 起動

Claude Code で以下のいずれかを入力:

```
/requirements_designer
要件定義をしたい
○○の要件定義をしたい
```

### トリガーワード

`要件定義` / `requirements definition` / `機能要件` / `非機能要件` / `要件を整理` / `要件をまとめて` / `user stories` / `ユーザーストーリー` / `プロジェクト憲章` / `project charter` / `要件定義したい`

### 途中再開

`designs/` ディレクトリが既に存在する場合、既存ファイルを読み込んで進捗を自動判定し、該当フェーズから再開する。

### コマンド例

| 入力 | 動作 |
|------|------|
| `Slackボットの要件定義をしたい` | Phase 1 から開始 |
| `既存のdesigns/を読み込んで続きをやりたい` | 進捗判定して途中から再開 |
| `品質スコアを出して` | Phase 4A の品質スコアリングを実行 |
| `ユーザーストーリーを生成して` | Phase 4B のUS生成を実行 |
| `ヘルプ` | クイックガイドを表示 |

## File Structure

```
requirements_designer/
├── SKILL.md                           # スキル定義（メインロジック）
├── README.md                          # このファイル
├── templates/                         # designs/ にコピーされるテンプレート
│   ├── README_charter.md              #   プロジェクト憲章テンプレート
│   ├── functional_requirements.md     #   機能要件テンプレート
│   ├── non_functional_requirements.md #   非機能要件テンプレート
│   └── user_stories.md                #   ユーザーストーリーテンプレート
├── references/                        # スキル実行中に参照するリファレンス
│   ├── question_bank.md               #   Phase 1-3 の質問カタログ（55問）
│   ├── quality_rubric.md              #   Phase 4A の品質評価ルブリック
│   └── best_practices.md              #   NFR提案用のベストプラクティス集
└── scripts/
    └── scaffold-requirements.sh       # designs/ ディレクトリの初期セットアップ
```

## Integration with Other Skills

Requirements Designer で生成した要件は、以下のスキルと連携できる。

| スキル | 用途 |
|--------|------|
| `/brainstorming` | アイデアが固まらない段階で発散・収束 |
| `/doc-coauthoring` | 要件をフォーマルなPRDに仕上げる |
| `/writing-plans` | 要件から実装計画・タスク分解を作成 |

## Language Support

- ユーザーの入力言語を自動検出し、出力をその言語に合わせる
- 要件ID (`FR-001`, `NFR-001`, `US-001`) とセクションヘッダは英語で統一（国際的可読性のため）
- 日本語・英語の両方に対応

## License

Private skill. All rights reserved.
