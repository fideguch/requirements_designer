# Requirements Designer

対話式Q&Aで要件定義を行う Claude Code スキル。
プロジェクト憲章・機能要件・非機能要件・ユーザーストーリーを段階的に生成し、品質スコアで改善点を提示する。
さらにFigma MCP連携でデザインシステム・ワイヤーフレーム・モックアップまで生成可能。

## Overview

PMやエンジニアが最小限の入力で、構造化された要件ドキュメント一式を生成できる。
「○○の要件定義をしたい」と伝えるだけで、対話形式の質問に答えていくことで要件が整理される。
Phase 5では、Figma MCPツールを使って要件に基づくUIデザインを直接Figmaファイルとして生成できる。

### 生成されるドキュメント

```
designs/
├── workflow_config.md             … ワークフロー設定 (Phase 0)
├── README.md                      … プロジェクト憲章
├── functional_requirements.md     … 機能要件 (FR-001〜)
├── non_functional_requirements.md … 非機能要件 (NFR-001〜)
├── user_stories.md                … ユーザーストーリー (US-001〜)
├── ubiquitous_language.md         … ユビキタス言語定義 (UL-001〜)
└── ui_design_brief.md             … UIデザインブリーフ (Phase 5)
```

## How It Works

5つのフェーズで段階的に要件を構築し、UIデザインまで一気通貫で進められる。

### Phase 0: ワークフロー設定

スキル起動直後にフルモード（全フェーズ実行、40-60分）またはライトモード（MVP/PoC向け、15-20分）を選択し、`designs/workflow_config.md` に記録する。Phase 1-2は必須、Phase 3・4C・5はプロジェクト特性に応じてスキップ可能。途中再開時は設定を表示し確認を取る。

#### ライトモード (MVP/PoC向け)

Phase 0 でライトモードを選択すると、15-20分で完了する簡易版を実行:

- Phase 3（非機能要件）、4C（ユビキタス言語）、5（UIデザイン）を自動スキップ
- 質問ラウンド削減（Phase 1: 1回、Phase 2: 2回）
- FR項目を10→5に削減（説明・アクター・主フロー・例外フロー・優先度）
- 品質評価を3次元60点満点（合格ライン42点 = 70%）

### Phase 1: プロジェクト理解 (1-2 ラウンド)

プロジェクト憲章 (`designs/README.md`) を作成する。背景・目的・アクター・スコープ・成功基準を整理。テンプレートの必須セクションをベースに、不足情報を質問で補完する。

### Phase 2: 機能要件の抽出 (3-5 ラウンド)

アクターごとに機能を深掘りし、`FR-001` 形式で `designs/functional_requirements.md` に記録する。コア機能 → エッジケース → 補完の順で段階的に質問。各FRには説明・アクター・事前条件・主フロー・例外フロー・優先度 (MoSCoW) を含む。

### Phase 3: 非機能要件の抽出 (2-3 ラウンド)

10カテゴリ（パフォーマンス、可用性、セキュリティ、スケーラビリティ、ユーザビリティ、保守性、互換性、法規制、データ、運用）について `designs/non_functional_requirements.md` に記録する。「わからない」と答えた項目にはWeb検索でドメインのベストプラクティスを調査し提案する。

### Phase 4: 品質評価・ユーザーストーリー・次のステップ

- **4A: 品質スコアリング** — 5次元 x 20点 = 100点満点で要件の品質を評価
- **4B: ユーザーストーリー生成** — FRから Given-When-Then 形式の受け入れ基準付きUSを自動生成
- **4C: ユビキタス言語定義** — FR/NFR/USからドメイン用語を抽出し、ユーザー視点の命名とコード命名規則を定義
- **4D: 次のステップ提案** — スコアに応じてPRD化・実装計画・UIデザイン・追加改善を提案

### Phase 5: UIデザイン (3-5 ラウンド) — Figma MCP連携

要件定義の成果物に基づき、Figma MCPツールを使ってデザインアーティファクトを直接生成する。

- **5A: UIデザインブリーフ** — プラットフォーム・ブランド・スタイル方針を対話Q&Aで収集
- **5B: IA & ユーザーフロー** — FigJamに情報設計図・ユーザーフロー図を自動生成
- **5C: デザインシステム構築** — Figmaファイルにカラー変数・タイポスタイル・スペーシング変数を定義
- **5D: ワイヤーフレーム** — グレースケールのWFを画面ごとに作成、バッチレビュー
- **5E: モックアップ & 品質評価** — デザインシステム適用の高忠実度モックアップ + 5次元100点満点スコアリング

#### 使用するFigma MCPツール

| ツール                       | 用途                                       |
| ---------------------------- | ------------------------------------------ |
| `create_new_file`            | FigJam/Designファイルの新規作成            |
| `use_figma`                  | Plugin API経由でFigmaに直接書き込み        |
| `generate_diagram`           | Mermaid記法でIA図・フロー図を生成          |
| `get_screenshot`             | デザインのプレビュースクリーンショット取得 |
| `search_design_system`       | 既存デザインシステムコンポーネント探索     |
| `create_design_system_rules` | デザインシステムルール生成                 |
| `whoami`                     | Figma認証確認                              |

## Quality Scoring

| 次元                       | 配点 | 評価内容                               |
| -------------------------- | ---- | -------------------------------------- |
| 網羅性 (Completeness)      | 20   | 全アクター網羅、CRUD操作、エッジケース |
| 具体性 (Specificity)       | 20   | 定量的な値、具体的データ形式           |
| テスト可能性 (Testability) | 20   | 明確なpass/fail基準、受け入れ基準      |
| 一貫性 (Consistency)       | 20   | 用語統一、矛盾なし、ID参照の整合性     |
| 追跡可能性 (Traceability)  | 20   | 目標→FR→NFR→USの紐付け                 |

- **70点未満**: 追加Q&Aラウンドを推奨
- **70〜79点**: 実装計画に進めるが改善余地あり
- **80点以上**: PRD化・実装計画への移行を推奨

## Installation

### 1. スキルの配置

`~/.claude/skills/` 配下にこのリポジトリを配置する。

```bash
cd ~/.claude/skills
git clone git@github.com:fideguch/requirements_designer.git
```

### 2. 依存パッケージのインストール

```bash
cd ~/.claude/skills/requirements_designer
npm install
```

### 3. テストの実行確認

```bash
npm test
```

200件のテストが全パスすればセットアップ完了。

### 動作要件

- Node.js 20+
- Claude Code CLI

## Usage

### 起動

Claude Code で以下のいずれかを入力:

```
/requirements_designer
要件定義をしたい
○○の要件定義をしたい
```

### トリガーワード

`要件定義` / `requirements definition` / `機能要件` / `非機能要件` / `要件を整理` / `要件をまとめて` / `user stories` / `ユーザーストーリー` / `プロジェクト憲章` / `project charter` / `要件定義したい` / `UIデザイン` / `UI design` / `Figmaデザイン` / `ワイヤーフレーム` / `wireframe` / `モックアップ` / `mockup` / `デザインシステム` / `design system`

### 途中再開

`designs/` ディレクトリが既に存在する場合、既存ファイルを読み込んで進捗を自動判定し、該当フェーズから再開する。

### コマンド例

| 入力                                       | 動作                              |
| ------------------------------------------ | --------------------------------- |
| `Slackボットの要件定義をしたい`            | Phase 1 から開始                  |
| `既存のdesigns/を読み込んで続きをやりたい` | 進捗判定して途中から再開          |
| `品質スコアを出して`                       | Phase 4A の品質スコアリングを実行 |
| `ユーザーストーリーを生成して`             | Phase 4B のUS生成を実行           |
| `ヘルプ`                                   | クイックガイドを表示              |

## File Structure

```
requirements_designer/
├── SKILL.md                           # スキル定義（メインロジック）
├── README.md                          # このファイル
├── templates/                         # designs/ にコピーされるテンプレート
│   ├── README_charter.md              #   プロジェクト憲章テンプレート
│   ├── functional_requirements.md     #   機能要件テンプレート
│   ├── non_functional_requirements.md #   非機能要件テンプレート
│   ├── user_stories.md                #   ユーザーストーリーテンプレート
│   ├── workflow_config.md             #   ワークフロー設定テンプレート
│   ├── ubiquitous_language.md         #   ユビキタス言語定義テンプレート
│   └── ui_design_brief.md             #   UIデザインブリーフテンプレート
├── references/                        # スキル実行中に参照するリファレンス
│   ├── question_bank.md               #   Phase 1-3 の質問カタログ（55問）
│   ├── quality_rubric.md              #   Phase 4A の品質評価ルブリック
│   ├── best_practices.md              #   NFR提案用のベストプラクティス集
│   ├── ubiquitous_language_questions.md #   Phase 4C のUL質問カタログ
│   ├── ui_design_questions.md         #   Phase 5A のUIデザイン質問カタログ
│   ├── ui_design_rubric.md            #   Phase 5E のUIデザイン品質ルブリック
│   └── figma_code_patterns.md         #   Phase 5C-5E のFigma Plugin APIパターン集
└── scripts/
    └── scaffold-requirements.sh       # designs/ ディレクトリの初期セットアップ
```

## Integration with Other Skills

Requirements Designer で生成した要件は、以下のスキルと連携できる。

| スキル                   | 用途                                                  |
| ------------------------ | ----------------------------------------------------- |
| `/brainstorming`         | アイデアが固まらない段階で発散・収束                  |
| `/doc-coauthoring`       | 要件をフォーマルなPRDに仕上げる                       |
| `/writing-plans`         | 要件から実装計画・タスク分解を作成                    |
| `/ui-ux-pro-max`         | プレミアムUI/UXデザイン原則（Phase 5で自動適用）      |
| `/frontend-design`       | 高品質フロントエンドデザイン原則（Phase 5で自動適用） |
| `/web-design-guidelines` | UIガイドライン準拠チェック（Phase 5Eで使用）          |

## Language Support

- ユーザーの入力言語を自動検出し、出力をその言語に合わせる
- 要件ID (`FR-001`, `NFR-001`, `US-001`) とセクションヘッダは英語で統一（国際的可読性のため）
- 日本語・英語の両方に対応

## License

Private skill. All rights reserved.
