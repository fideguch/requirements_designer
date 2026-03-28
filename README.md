# Requirements Designer

**267 tests** | **Anthropic 500-line compliant** | **Figma MCP integrated**

## Product Vision

> **JTBD**: PM がインタラクティブ Q&A を通じて、品質スコア付きの要件ドキュメント一式を生成する

| Field           | Definition                                                                      |
| --------------- | ------------------------------------------------------------------------------- |
| **Target User** | プロダクト開発を始める PM / テックリード                                        |
| **Core Value**  | 暗黙知の構造化 — 質問バンクとルーブリックで「書いたつもり」を防ぐ               |
| **Scope**       | Phase 0-5 (理解→FR→NFR→US→スコアリング→UIデザイン), 3 Mode (Full/Light/Enhance) |
| **Non-Goals**   | 実装計画の作成 (speckit-bridge/writing-plans の領域), コード生成, テスト作成    |

**Suite内の位置づけ**: `**requirements_designer** → speckit-bridge → my_pm_tools`。パイプラインの最上流、全プロダクト開発の起点。

---

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
- **76問+ 質問バンク** — Phase 1-3 の質問カタログで抜け漏れを防止
- **ドリフト防止** — Phase 2 で目標・スコープとの矛盾を自動検出、却下スコープを理由付き記録
- **エラーハンドリング** — Phase 5 開始時の品質スコア閾値チェック（70未満で警告、ユーザー判断でオーバーライド可能）
- **スキル自動起動** — 各フェーズで関連スキルを自動呼び出し（要件フェーズ5種 + デザインフェーズ5種）
- **267件の回帰テスト** — Playwright + TypeScript、CI/CD完備

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

開始条件: Phase 4 完了 + 品質スコア >= 70（70未満は警告の上、ユーザー判断でオーバーライド可能）。

| Sub-phase | 目的                    | 成果物                                      |
| --------- | ----------------------- | ------------------------------------------- |
| **5A**    | UIデザインブリーフ作成  | `designs/ui_design_brief.md`                |
| **5B**    | IA & ユーザーフロー     | FigJam IA図 + 画面インベントリ              |
| **5C**    | デザインシステム構築    | Figma DS (カラー/タイポ/スペーシング変数)   |
| **5D**    | ワイヤーフレーム        | グレースケール WF (バッチ3-5画面)           |
| **5E**    | モックアップ & 品質評価 | 高忠実度モックアップ + UIデザイン品質スコア |

必須フェーズ（スキップ不可）: Phase 1, Phase 2, Phase 4A, Phase 4B, Phase 4D

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

- **70点未満**: 追加Q&Aラウンドを推奨
- **70〜79点**: 実装計画に進めるが改善余地あり
- **80点以上**: PRD化・実装計画への移行を推奨

### ライトモード品質評価 (3次元 60pt)

網羅性・具体性・テスト可能性の3次元 x 20pt = 60点満点。合格ライン: 42/60 (70%)。
一貫性・追跡可能性はMVP段階では評価をスキップする。

### エンハンスモード品質評価

デルタ要件（Add/Modify/Remove）向けに調整された5次元100pt評価。
詳細は `references/enhance_mode.md` 参照。

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

## Skill Auto-Invocation

各フェーズで関連スキルを自動起動（詳細は `references/skill_orchestration.md`）。

**要件フェーズ（自動起動）:** `/brainstorming`, `/pm-problem-statement`, `/pm-jobs-to-be-done`, `/pm-pestel-analysis`, `/pm-user-story`
**デザインフェーズ（自動起動）:** `/ui-ux-pro-max`, `/frontend-design`, `/web-design-guidelines`, `/pm-customer-journey-map`, `/cro-methodology`
**完了後（手動提案）:** `/speckit-bridge`, `/doc-coauthoring`, `/writing-plans`

---

## File Structure

```
requirements_designer/
├── SKILL.md                           # スキル定義 (478行)
├── README.md                          # このファイル
├── templates/                         # designs/ にコピーされるテンプレート (7件)
│   ├── README_charter.md              #   プロジェクト憲章
│   ├── functional_requirements.md     #   機能要件
│   ├── non_functional_requirements.md #   非機能要件
│   ├── user_stories.md                #   ユーザーストーリー
│   ├── workflow_config.md             #   ワークフロー設定
│   ├── ubiquitous_language.md         #   ユビキタス言語定義
│   └── ui_design_brief.md            #   UIデザインブリーフ
├── references/                        # スキル実行中に参照するリファレンス (10件)
│   ├── question_bank.md               #   Phase 1-3 質問カタログ (76問)
│   ├── quality_rubric.md              #   品質評価ルブリック (Full/Light/Enhance)
│   ├── enhance_mode.md                #   エンハンスモード詳細手順
│   ├── skill_orchestration.md         #   プロジェクトスキャン・スキル自動起動マップ
│   ├── best_practices.md              #   NFR提案用ベストプラクティス
│   ├── ubiquitous_language_questions.md #  UL質問カタログ
│   ├── phase5_ui_design.md            #   Phase 5 詳細手順リファレンス
│   ├── ui_design_questions.md         #   UIデザイン質問カタログ
│   ├── ui_design_rubric.md            #   UIデザイン品質ルブリック
│   └── figma_code_patterns.md         #   Figma Plugin APIパターン集
├── scripts/
│   └── scaffold-requirements.sh       #   designs/ 初期セットアップ
└── tests/                             # 回帰テスト (267件, 6ファイル)
    ├── structure/
    │   ├── file-existence.spec.ts     #   ファイル存在チェック
    │   ├── skill-frontmatter.spec.ts  #   SKILL.md フロントマター検証
    │   └── template-content.spec.ts   #   テンプレート内容検証
    └── content/
        ├── cross-references.spec.ts   #   ファイル間参照整合性
        ├── phase-workflow.spec.ts      #   フェーズワークフロー検証
        └── rubric-scoring.spec.ts      #   品質ルブリック検証
```

---

## Language Support

- ユーザーの入力言語を自動検出し、出力をその言語に合わせる
- 要件ID (`FR-001`, `NFR-001`, `US-001`) とセクションヘッダは英語で統一
- 日本語・英語の両方に対応

## License

Private skill. All rights reserved.
