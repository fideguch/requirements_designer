# Requirements Designer

<<<<<<< HEAD
**261 tests passing** | **Anthropic 500-line compliant** | **Figma MCP integrated**

対話式Q&Aで要件定義を行う Claude Code スキル。
「○○の要件定義をしたい」と伝えるだけで、プロジェクト憲章・機能要件・非機能要件・ユーザーストーリーを段階的に生成し、品質スコアで改善点を提示する。Figma MCP連携でデザインシステム・ワイヤーフレーム・モックアップまで一気通貫で生成可能。

---

## Quick Start

```bash
# 1. Clone
cd ~/.claude/skills && git clone git@github.com:fideguch/requirements_designer.git

# 2. Install & verify
cd requirements_designer && npm install && npm test

# 3. Use
# Claude Code で「要件定義をしたい」と入力するだけ
```

**動作要件**: Node.js 20+ / Claude Code CLI

---

## Features

- **3つのモード** — Full（本番, 40-60分）/ Light（MVP, 15-20分）/ Enhance（既存プロダクト改善, 30-45分）
- **7つの成果物を自動生成** — 憲章・FR・NFR・US・UL・ワークフロー設定・UIデザインブリーフ
- **5次元品質スコアリング** — 網羅性・具体性・テスト可能性・一貫性・追跡可能性（100点満点）
- **Figma MCP連携** — 要件からデザインシステム・WF・モックアップを直接Figmaに生成
- **ユビキタス言語 (DDD)** — ドメイン用語の自動抽出 + UI/コード命名規則の統一
- **ドリフト防止** — Phase 2 で目標・スコープとの矛盾を自動検出、却下スコープを理由付き記録
- **261件の回帰テスト** — Playwright + TypeScript、CI/CD完備

---

## Modes

|                  | Full             | Light              | Enhance                      |
| ---------------- | ---------------- | ------------------ | ---------------------------- |
| **対象**         | 本番プロジェクト | MVP / PoC          | 既存プロダクト改善           |
| **所要時間**     | 40-60分          | 15-20分            | 30-45分                      |
| **品質評価**     | 5次元 100pt      | 3次元 60pt         | 5次元 100pt（デルタ調整）    |
| **合格ライン**   | 70/100           | 42/60              | 70/100                       |
| **Phase 5 (UI)** | 実行             | スキップ           | スキップ                     |
| **特徴**         | 全フェーズ実行   | 質問・FR項目を削減 | Webリサーチ + 変更ヒアリング |

---

## How It Works

### Phase 0: ワークフロー設定

モード選択（Full / Light / Enhance）とスキップ設定を `designs/workflow_config.md` に記録。

### Phase 1: プロジェクト理解 (1-2 ラウンド)

プロジェクト憲章を作成。背景・目的・アクター・スコープ・成功基準を整理。
Enhanceモードではインターネットリサーチとヒアリングを同時進行。

### Phase 2: 機能要件の抽出 (2-5 ラウンド)

アクターごとに機能を深掘り、`FR-001` 形式で記録。ドリフト防止チェック付き。
Enhanceモードでは Change Type（Add / Modify / Remove）を付与。

### Phase 3: 非機能要件の抽出 (2-3 ラウンド)

10カテゴリで抽出。不明項目はWeb検索でベストプラクティスを提案。

### Phase 4: 品質評価・仕上げ

- **4A**: 品質スコアリング（5次元 x 20pt = 100pt）
- **4B**: ユーザーストーリー自動生成（Given-When-Then 受け入れ基準付き）
- **4C**: ユビキタス言語定義（ドメイン用語 + コード命名規則）
- **4D**: 次のステップ提案（PRD化 / 実装計画 / UIデザイン / 品質改善）

### Phase 5: UIデザイン (3-5 ラウンド) — Figma MCP連携

5Aデザインブリーフ → 5B IA・ユーザーフロー → 5C デザインシステム → 5D ワイヤーフレーム → 5E モックアップ & 品質評価

---

## 生成されるドキュメント

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

---

## Quality Scoring

| 次元                       | 配点 | 評価内容                               |
| -------------------------- | ---- | -------------------------------------- |
| 網羅性 (Completeness)      | 20   | 全アクター網羅、CRUD操作、エッジケース |
| 具体性 (Specificity)       | 20   | 定量的な値、具体的データ形式           |
| テスト可能性 (Testability) | 20   | 明確なpass/fail基準、受け入れ基準      |
| 一貫性 (Consistency)       | 20   | 用語統一、矛盾なし、ID参照の整合性     |
| 追跡可能性 (Traceability)  | 20   | 目標→FR→NFR→USの紐付け                 |
=======
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
>>>>>>> 8ceb636 (chore: initial commit with README and gitignore)

- **70点未満**: 追加Q&Aラウンドを推奨
- **70〜79点**: 実装計画に進めるが改善余地あり
- **80点以上**: PRD化・実装計画への移行を推奨

<<<<<<< HEAD
---

## Usage

### コマンド例

| 入力                                       | 動作                              |
| ------------------------------------------ | --------------------------------- |
| `Slackボットの要件定義をしたい`            | Phase 1 から開始                  |
| `既存プロダクトの改善要件を定義したい`     | エンハンスモードで開始            |
| `既存のdesigns/を読み込んで続きをやりたい` | 進捗判定して途中から再開          |
| `品質スコアを出して`                       | Phase 4A の品質スコアリングを実行 |
| `ユーザーストーリーを生成して`             | Phase 4B のUS生成を実行           |
| `ヘルプ`                                   | クイックガイドを表示              |

### トリガーワード

`要件定義` / `requirements definition` / `機能要件` / `非機能要件` / `要件を整理` / `user stories` / `ユーザーストーリー` / `プロジェクト憲章` / `project charter` / `UIデザイン` / `Figmaデザイン` / `ワイヤーフレーム` / `モックアップ` / `デザインシステム` / `既存プロダクト改善` / `機能改善`

---

## Integration with Other Skills

| スキル                   | 用途                                                         |
| ------------------------ | ------------------------------------------------------------ |
| `/brainstorming`         | アイデアが固まらない段階で発散・収束                         |
| `/speckit-bridge`        | designs/ を spec-kit 形式（spec.md + constitution.md）に変換 |
| `/doc-coauthoring`       | 要件をフォーマルなPRDに仕上げる                              |
| `/writing-plans`         | 要件から実装計画・タスク分解を作成                           |
| `/ui-ux-pro-max`         | プレミアムUI/UXデザイン原則（Phase 5で自動適用）             |
| `/frontend-design`       | 高品質フロントエンドデザイン原則（Phase 5で自動適用）        |
| `/web-design-guidelines` | UIガイドライン準拠チェック（Phase 5Eで使用）                 |

---
=======
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
>>>>>>> 8ceb636 (chore: initial commit with README and gitignore)

## File Structure

```
requirements_designer/
<<<<<<< HEAD
├── SKILL.md                           # スキル定義 (461行)
├── README.md                          # このファイル
├── templates/                         # designs/ にコピーされるテンプレート (7件)
│   ├── README_charter.md              #   プロジェクト憲章
│   ├── functional_requirements.md     #   機能要件
│   ├── non_functional_requirements.md #   非機能要件
│   ├── user_stories.md                #   ユーザーストーリー
│   ├── workflow_config.md             #   ワークフロー設定
│   ├── ubiquitous_language.md         #   ユビキタス言語定義
│   └── ui_design_brief.md            #   UIデザインブリーフ
├── references/                        # スキル実行中に参照するリファレンス (9件)
│   ├── question_bank.md               #   Phase 1-3 質問カタログ (73問)
│   ├── quality_rubric.md              #   品質評価ルブリック (Full/Light/Enhance)
│   ├── enhance_mode.md                #   エンハンスモード詳細手順
│   ├── best_practices.md              #   NFR提案用ベストプラクティス
│   ├── ubiquitous_language_questions.md #  UL質問カタログ
│   ├── phase5_ui_design.md            #   Phase 5 詳細手順リファレンス
│   ├── ui_design_questions.md         #   UIデザイン質問カタログ
│   ├── ui_design_rubric.md            #   UIデザイン品質ルブリック
│   └── figma_code_patterns.md         #   Figma Plugin APIパターン集
├── scripts/
│   └── scaffold-requirements.sh       #   designs/ 初期セットアップ
└── tests/
    └── skill-structure.spec.ts        #   回帰テスト (261件)
```

---
=======
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
>>>>>>> 8ceb636 (chore: initial commit with README and gitignore)

## Language Support

- ユーザーの入力言語を自動検出し、出力をその言語に合わせる
<<<<<<< HEAD
- 要件ID (`FR-001`, `NFR-001`, `US-001`) とセクションヘッダは英語で統一
=======
- 要件ID (`FR-001`, `NFR-001`, `US-001`) とセクションヘッダは英語で統一（国際的可読性のため）
>>>>>>> 8ceb636 (chore: initial commit with README and gitignore)
- 日本語・英語の両方に対応

## License

Private skill. All rights reserved.
