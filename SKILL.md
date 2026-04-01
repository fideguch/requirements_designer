---
name: requirements_designer
description: >-
  Interactive Q&A skill for requirements definition. Generates project charters,
  functional/non-functional requirements, user stories, and quality scores.
  Integrates with Figma MCP to produce design systems, wireframes, and mockups.
  Use when starting a new project, defining requirements, or creating UI designs from specs.
intent: >-
  Guide product managers and engineers through structured requirements definition
  via multi-phase interactive Q&A. Produces complete, scored requirement documents
  and optionally generates Figma UI designs from the validated requirements.
type: interactive
best_for:
  - 'Starting a new project and defining requirements from scratch'
  - 'Enhancing existing product requirements with delta definitions'
  - 'Generating structured requirement documents (FR/NFR/US)'
  - 'Scoring and improving requirements quality (5-dimension rubric)'
  - 'Creating Figma UI designs from validated requirements'
  - 'Defining ubiquitous language for DDD projects'
triggers:
  - '要件定義'
  - 'requirements definition'
  - '機能要件'
  - '非機能要件'
  - '要件を整理'
  - '要件をまとめて'
  - 'user stories'
  - 'ユーザーストーリー'
  - 'プロジェクト憲章'
  - 'project charter'
  - '要件定義したい'
  - 'UIデザイン'
  - 'UI design'
  - 'Figmaデザイン'
  - 'ワイヤーフレーム'
  - 'wireframe'
  - 'モックアップ'
  - 'mockup'
  - 'デザインシステム'
  - 'design system'
  - '既存プロダクト改善'
  - 'existing product enhancement'
  - '機能改善'
  - 'プレビューして'
  - 'preview'
  - 'designs/をプレビュー'
  - 'マークダウンプレビュー'
---

# Requirements Designer

対話式Q&Aによる要件定義スキル。PMが最小限の入力で、構造化された要件ドキュメントを生成する。

---

## Help Command

以下のいずれかでヘルプを表示する:

- 「ヘルプ」「help」「使い方」「how to use」「何から始める」「getting started」
- **初回起動時**（`designs/` ディレクトリが存在しない場合）にも自動表示

### ヘルプ出力テンプレート

```
📋 Requirements Designer — クイックガイド

🚀 始め方
  「○○の要件定義をしたい」と伝えるだけでOK！
  対話形式で質問に答えていくと、要件ドキュメントが自動生成されます。

📦 生成されるドキュメント
  designs/
  ├── workflow_config.md             … ワークフロー設定 (Phase 0)
  ├── README.md                      … プロジェクト憲章
  ├── functional_requirements.md     … 機能要件 (FR-001〜)
  ├── non_functional_requirements.md … 非機能要件 (NFR-001〜)
  ├── user_stories.md                … ユーザーストーリー (US-001〜)
  ├── ubiquitous_language.md         … ユビキタス言語定義 (UL-001〜)
  └── ui_design_brief.md             … UIデザインブリーフ (Phase 5)

🔄 5つのフェーズ
  Phase 1: プロジェクト理解    → 背景・目標・スコープを整理
  Phase 2: 機能要件の抽出      → 対話Q&Aで機能を洗い出し
  Phase 3: 非機能要件の抽出    → 性能・セキュリティ等を定義
  Phase 4: 品質評価 & 仕上げ   → スコアリング・US生成・ユビキタス言語定義・次のステップ
  Phase 5: UIデザイン          → Figma MCPでDS・WF・モックアップ生成

⭐ 品質スコア (100点満点)
  網羅性 / 具体性 / テスト可能性 / 一貫性 / 追跡可能性
  → 70点以上で実装計画へ、80点以上でPRD化を推奨

💡 ライトモード (MVP/PoC向け)
  Phase 0で選択 → 15-20分で完了。3次元60点満点。

🔄 エンハンスモード (既存プロダクト改善)
  Phase 0で選択 → 30-45分。リサーチ+ヒアリング同時進行。Phase 5自動スキップ。

🔗 連携スキル
  /brainstorming        → アイデアが固まらない時に
  /doc-coauthoring      → 要件をPRDに仕上げる時に
  /writing-plans        → 実装計画を作る時に
  /ui-ux-pro-max        → プレミアムUI/UXデザイン原則
  /frontend-design      → 高品質フロントエンドデザイン
  /web-design-guidelines → UIガイドライン準拠チェック

💡 コマンド例
  「Slackボットの要件定義をしたい」
  「既存のdesigns/を読み込んで続きをやりたい」
  「既存プロダクトの改善要件を定義したい」
  「品質スコアを出して」
  「ユーザーストーリーを生成して」
  「ヘルプ」
  「プレビューして」
```

### 進捗表示（designs/ が存在する場合）

既存の `designs/` を検出したら、どのフェーズまで完了しているかを判定して表示:

- workflow_config.md が存在 → Phase 0 完了
- README.md が存在 → Phase 1 完了
- functional_requirements.md が存在し、FR-001以上の要件あり → Phase 2 完了
- non_functional_requirements.md が存在し、NFR-001以上の要件あり → Phase 3 完了
- user_stories.md が存在 → Phase 4B 完了
- ubiquitous_language.md が存在し、UL-001以上の用語あり → Phase 4C 完了
- ui_design_brief.md が存在 → Phase 5A 完了
- ui_design_brief.md に FigJam URL 記載あり → Phase 5B 完了
- ui_design_brief.md に Design File URL 記載あり → Phase 5C+ 進行中

表示例:

```
📊 現在の進捗: Phase 2 完了（機能要件 12件定義済み）[ライトモード]
📊 現在の進捗: Phase 2 完了（変更要件 8件定義済み）[エンハンスモード]
   → 次は Phase 4A: 品質スコアリング です
```

---

## Workflow Overview

### 事前準備: プロジェクトスキャン + designs/ セットアップ

1. カレントディレクトリ全体をスキャンし、プロジェクト成熟度を判定（`references/skill_orchestration.md` Section 1-2 参照）
   - Lv.0 新規 / Lv.1 構想中 / Lv.2 開発済み / Lv.3 運用中
2. スキャン結果をユーザーに提示:「以下の情報を検出しました。正しいですか？」
3. `designs/` が存在しない場合: `scripts/scaffold-requirements.sh` で雛形を生成
4. `designs/` が存在する場合: 既存ファイルを読み込み、進捗を判定して途中から再開
5. Lv.2/Lv.3 の場合: スキャン結果を `designs/README.md` Section 10 に自動記録

---

## Phase 0: ワークフロー設定

**目的:** プロジェクトの特性に応じて、実行するフェーズを選択し `designs/workflow_config.md` に記録する。

### 進め方

1. ユーザーにモード選択を確認（1️⃣フルモード / 2️⃣ライトモード / 3️⃣エンハンスモード）:
   - **フルモード** (デフォルト / 40-60分): 全フェーズ実行。続けてPhase 3/4C/5の個別スキップ選択UIを表示
   - **ライトモード** (MVP/PoC / 15-20分): Phase 3, 4C, 5を自動スキップ。質問ラウンド・FR項目・品質次元も削減
   - **エンハンスモード** (既存プロダクト改善 / 30-45分): Phase 5を自動スキップ。Phase 3/4Cは個別選択UI表示

2. ユーザーの回答に基づき `templates/workflow_config.md` をベースに `designs/workflow_config.md` を生成
3. Mode フィールドに選択したモードを記録。スキップフェーズのStatus列を「スキップ」に変更

> スキップ可能フェーズの詳細は `templates/workflow_config.md` の Skippable Phases Guide を参照。

### モード別設定値

> 詳細は `templates/workflow_config.md` の Mode セクションを参照。

| パラメータ       | Full        | Light       | Enhance              |
| ---------------- | ----------- | ----------- | -------------------- |
| Phase 1 ラウンド | 1-2         | 1           | 1-2 (リサーチ並行)   |
| Phase 2 ラウンド | 3-5         | 2           | 2-3 (変更ヒアリング) |
| FR項目           | 全10項目    | 必須5項目   | 全10項目 (デルタ)    |
| 品質             | 5次元 100pt | 3次元 60pt  | 5次元 100pt          |
| 合格ライン       | 70/100      | 42/60 (70%) | 70/100               |
| 自動スキップ     | なし        | Ph3,4C,5    | Ph5                  |

ライトモードFR必須5項目: 説明・アクター・主フロー・例外フロー・優先度
ライトモード信頼設計: 2ラウンド制限内でも Round 3D の Q74-Q76（操作可視化・Undo・破壊的操作確認）の3問は必須出題する
エンハンスモード詳細: `references/enhance_mode.md` 参照

### 必須フェーズ（スキップ不可）

Phase 1, Phase 2, Phase 4A, Phase 4B, Phase 4D

### 途中再開時の動作

`designs/workflow_config.md` が既に存在する場合:

1. 設定内容（モード含む）を表示
2. 「この設定で続けますか？変更がある場合は教えてください。」と確認
3. 変更があれば `workflow_config.md` を更新（モード変更: フル↔ライト↔エンハンスも可能）
4. 変更がなければ進捗判定に基づき該当フェーズから再開

### 各フェーズでのスキップ判定

各フェーズの開始時に `designs/workflow_config.md` を確認し:

- Status が「スキップ」のフェーズは自動的にスキップ
- スキップ時に「Phase X はワークフロー設定でスキップされています。次のフェーズに進みます。」と表示

---

## Phase 1: プロジェクト理解 (1-2ラウンド)

**目的:** プロジェクト憲章 (`designs/README.md`) の作成

### 進め方

1. `templates/README_charter.md` のテンプレートをベースに `designs/README.md` を生成
2. ユーザーにテンプレートの **必須セクション（1〜5）** を埋めてもらう
3. 記入内容を読み込み、不足情報を質問で補完する

### 質問戦略

- `references/question_bank.md` の Phase 1 セクションを参照
- 1ラウンドにつき **3〜5問** をバッチ出題
- ユーザーの回答は箇条書きの短い回答でOK
- 回答に基づき `designs/README.md` を段階的に更新

### Phase 1 完了条件

以下が全て明確になったら次フェーズへ:

- プロジェクトの目的と背景
- 主要なアクター/ユーザー（最低2つ）
- スコープ（In/Out）
- 成功基準（最低1つの定量指標）

完了時に信頼キャリブレーション段階（Pre-interaction / Early usage / Ongoing / Error recovery）を識別し `designs/README.md` に記録する（`references/ux_trust_design.md` Section 5 参照）。

完了時にユーザーに確認: 「プロジェクト憲章のドラフトが完成しました。Phase 2（機能要件の抽出）に進みますか？」

### エンハンスモード時の動作

Phase 1 でリサーチとヒアリングを同時進行する。詳細は `references/enhance_mode.md` 参照。

1. プロダクト名・URL等の基本情報をユーザーに聞く
2. WebSearch / WebFetch で並行リサーチ（ツール不可時はユーザー手動入力）
3. 収集した情報を信頼度分類（✅確認済み / ⚠️要確認 / ❓不明）してユーザーに提示
4. ユーザー確認後、README.md の「現状サマリー」セクションに記録
5. 変更の背景・目的をヒアリングし、通常のプロジェクト憲章セクションに反映

---

## Phase 2: 機能要件の抽出 (3-5ラウンド)

**目的:** `designs/functional_requirements.md` の段階的構築

### 進め方

1. `designs/README.md` を**全セクション**読み込み、プロジェクト全体の文脈を把握する
2. アクターごとに機能を深掘りする質問を出題
3. 回答を元に FR-001 形式で要件を記録

### 質問の順序

1. **コア機能** (ラウンド1-2): 各アクターの主要アクション、データCRUD
2. **エッジケース** (ラウンド3): 失敗時の挙動、権限、バリデーション
3. **信頼設計** (ラウンド3D, 全プロジェクト): 可視性・制御・エラー回復等のTier 1質問（`references/ux_trust_design.md` 参照）。AI機能がある場合はRound 3E（Tier 2）も追加
4. **補完** (ラウンド4-5): バッチ処理、レポート、管理機能

### 要件の記録形式

各FRは `templates/functional_requirements.md` の FR-001 形式で記録する。

- **フルモード**: 全10項目（説明・アクター・事前条件・トリガー・主フロー・代替フロー・例外フロー・事後条件・ビジネスルール・優先度）
- **ライトモード**: 必須5項目（説明・アクター・主フロー・例外フロー・優先度）

### ラウンド間の動作

- 各ラウンド終了時に、新たに追加されたFRの一覧を表示
- ユーザーの確認を得てから次のラウンドへ
- 「十分」と判断されたら Phase 3 へ移行

### 画面一覧の導出

FRカテゴリ確定後に画面一覧（SC-001〜）を導出する。

- 各FRのアクター・主フローから、必要な画面を特定
- 1画面が複数FRを実装する場合がある（N:M関係）
- SC-001 形式のIDを付与し、`designs/functional_requirements.md` の「画面一覧」セクションに記録
- Status は `—`（未着手）で初期化。Phase 5 進行時に WF済/MK済 に更新

### アンカーリンク規約

全テンプレートで以下のアンカーリンク規約を適用する:

#### 基本ルール
- 各エントリ見出しの直前に `<a id="fr-001"></a>` 形式のアンカータグを設置
- ID形式: 小文字ハイフン区切り（`fr-001`, `nfr-001`, `us-001`, `sc-001`, `ul-001`）
- 同一ドキュメント内リンク: `[FR-001](#fr-001)`
- 別ドキュメントリンク: `[FR-001](./functional_requirements.md#fr-001)`

#### コンマ区切りID（HARD-GATE）
各IDを個別にリンク化する。プレーンテキストでの列挙は禁止:
- ✅ `[FR-001](#fr-001), [FR-002](#fr-002), [FR-003](#fr-003)`
- ❌ `FR-001, FR-002, FR-003`

#### レンジ記法（HARD-GATE）
レンジ記法（〜）は使用禁止。個別IDをすべて列挙してリンク化する:
- ✅ `[FR-001](#fr-001), [FR-002](#fr-002), ..., [FR-008](#fr-008)`
- ❌ `FR-001〜008`

#### NFRアンカーID形式
全NFRで `nfr-XXX` 番号形式に統一。カテゴリ名を含めない:
- ✅ `<a id="nfr-004"></a>`
- ❌ `<a id="nfr-00x-availability"></a>`

#### リンク化対象（漏れ防止）
以下の全箇所でID参照をリンク化する:
- トレーサビリティマトリクス・サマリーテーブルの全ID
- 各エントリの `> **関連:**` / `**ソースFR:**` 行の全ID
- テーブルセル内の全ID（画面一覧のソースFR/US列、ULのソース列等）
- 備考・本文中のID参照

#### 品質ゲート（HARD-GATE）
Phase 4A の出力品質チェックで以下を実行し、0件であることを確認:
```bash
# 未リンクID検出（アンカー定義・HTMLコメント行を除外）
grep -Pn '(?<!\[)(?:FR|NFR|US|SC|UL)-\d{3}(?![\w-])' designs/*.md | grep -v '<a id=' | grep -v '<!--'
```
結果が0件でなければ、該当箇所を全てリンク化してから出力する。

### ドリフト防止

新たなFRを記録する前に、`designs/README.md` のセクション2（目標）・セクション5（スコープ・制約）を参照し、矛盾がないか検証する。矛盾を検出した場合はユーザーに警告してから記録する。却下された項目は README.md の「却下されたスコープ」テーブルに理由付きで記録する。

### エンハンスモード時の動作

「変更ヒアリング」形式で進行。質問カタログは `references/enhance_mode.md` 参照。
FRに Change Type (Add/Modify/Remove) と Current Behavior フィールドを追加可能。

---

## Phase 3: 非機能要件の抽出 (2-3ラウンド)

**目的:** `designs/non_functional_requirements.md` の構築

### 進め方

1. `designs/README.md` を**全セクション**読み込み、プロジェクト全体の文脈を踏まえる
2. 10カテゴリについて順に質問:
   - パフォーマンス / 可用性 / セキュリティ / スケーラビリティ / ユーザビリティ（信頼設計NFRを含む: `references/ux_trust_design.md` Section 8）
   - 保守性 / 互換性 / 法規制・コンプライアンス / データ / 運用
3. **WebSearchツールを活用**して、ドメイン固有のベストプラクティスを調査し提案

### NFRの記録形式

各NFRは `templates/non_functional_requirements.md` の NFR-001 形式で記録する。

### ベストプラクティス提案

ユーザーが「わからない」と答えた項目については:

1. Web検索で同業種・同規模の一般的な水準を調査
2. 「一般的にはこの程度です」と提案して判断を仰ぐ
3. `references/best_practices.md` も参照

---

## Phase 4: 品質評価・ユーザーストーリー・ユビキタス言語・連携

### 4A: 品質スコアリング

`references/quality_rubric.md` に基づき、5次元 x 20点 = 100点満点で評価。

> **ライトモード**: 網羅性・具体性・テスト可能性の3次元 x 20pt = 60点満点。
> 合格ライン: 42/60。詳細は `references/quality_rubric.md` ライトモード評価セクション参照。
>
> **エンハンスモード**: デルタ要件向けに調整された5次元100pt評価。
> 詳細は `references/enhance_mode.md` 品質スコアリング調整セクション参照。

次元別スコア（X/20）+ 評価コメント + 合計点を表形式で表示し、改善提案を3件提示する。各次元の詳細チェック項目は `references/quality_rubric.md` 参照。

#### スコアに基づく推奨

- **70点未満**: 追加Q&Aラウンドを推奨（弱い次元を特定してフォーカス質問）
- **70〜79点**: 実装計画に進めるが改善余地あり
- **80点以上**: PRD化・実装計画への移行を推奨

改善後は再スコアリングしてデルタを表示する。

### 4B: ユーザーストーリー生成

確定したFRからユーザーストーリーを自動生成し、`designs/user_stories.md` に書き出す。

#### 生成ルール

- 1つのFRから1〜3件のUSを生成（複雑なFRは分割）
- FRのカテゴリをエピックとしてグルーピング
- 優先度はソースFRから継承（最高優先度を採用）

USは `templates/user_stories.md` の US-001 形式（As a / I want / so that + Given-When-Then受け入れ基準）で記録する。信頼設計FR（P1-P7）からも信頼USを自動生成する（AI機能時はP8-P13からも追加）。US数が5件以上の場合は `/pm-user-story-mapping` を起動してリリーススライスに配置する。生成後にユーザーレビューを依頼し、修正があれば反映する。

### 4C: ユビキタス言語定義

確定したFR・NFR・USからドメイン用語を抽出し、`designs/ubiquitous_language.md` を生成する。

#### 目的

- ドメイン専門家と開発者の間で共通語彙を確立する（DDD: Ubiquitous Language）
- 機能名に技術用語がそのまま使われることを防ぐ（例: 「ML協調フィルタリング」→「おすすめマッチング」）
- UI表示ラベルとコード内の命名を統一的に管理する
- ユーザーの属性・技術レベルに合わせた自然な用語を選定する

#### 進め方

1. 既存の `designs/` ドキュメントを全て読み込み、ドメイン用語を自動抽出
2. `references/ubiquitous_language_questions.md` に基づき、3ラウンドのQ&Aで精緻化（用語確認→ユーザー視点→コード命名）
3. `templates/ubiquitous_language.md` をベースに `designs/ubiquitous_language.md` を生成

> 精緻化ルール・UL記録形式の詳細は `references/ubiquitous_language_questions.md` および `templates/ubiquitous_language.md` を参照。

#### 4C 完了条件

- `designs/ubiquitous_language.md` が生成されている
- UL-001以上の用語が定義されている
- 全ULにソースFR/NFR/USが紐づいている
- アンチパターン一覧に1件以上の「避けるべき用語」が記録されている
- ユーザーに確認: 「ユビキタス言語定義が完成しました。Phase 4D（次のステップ）に進みますか？」

---

### 4D: 次のステップ提案

要件の完成度に応じて、次のアクションを提案:

要件の完成度に応じて、次のアクションを提案:

- **PRD化** → `/doc-coauthoring` で designs/ をPRDに変換
- **アイデア深掘り** → `/brainstorming` で発散・収束
- **実装計画** → `/writing-plans` で要件からタスク分解
- **UIデザイン** → Phase 5 に進む（Figma MCP連携でDS・WF・モックアップ生成）
- **ユビキタス言語の修正** → 「ユビキタス言語を修正したい」と伝える
- **品質改善** → 「品質スコアを改善したい」と伝える

---

## Phase 5: UIデザイン (3-5ラウンド)

**目的:** 要件定義ドキュメント（Phase 1-4の成果物）に基づき、Figma MCPツールを使ってデザインアーティファクトを生成する。

> **詳細手順は `references/phase5_ui_design.md` を参照。** 以下は概要と開始条件のみ。

### Phase 5 の開始条件

- Phase 4 完了（user_stories.md が存在し、US-001以上のストーリーあり）
- 品質スコア >= 70（70未満の場合は警告表示の上、ユーザー判断でオーバーライド可能）
- ユーザーが Phase 5 への進行を確認

### FigJam図の生成（オプション）

Phase 5 開始時、designs/ の内容を分析して以下を提案:

> 💡 `/pm-figjam-diagrams` でdesigns/の内容をFigJam図に変換できます。
> ユーザーストーリーマップ、ユーザーフロー、状態遷移図など、要件に適した図種を提案します。

ユーザーが希望する場合は `/pm-figjam-diagrams` を起動（designs/連携モード自動適用）。

### サブフェーズ概要

| Sub-phase | 目的                    | 主要 Figma MCP ツール                         | 成果物                                                         |
| --------- | ----------------------- | --------------------------------------------- | -------------------------------------------------------------- |
| **5A**    | UIデザインブリーフ      | `whoami`, `search_design_system`              | `designs/ui_design_brief.md`（Section 3.5 信頼設計原則を含む） |
| **5B**    | IA & ユーザーフロー     | `create_new_file`, `generate_diagram`         | FigJam IA図 + 画面インベントリ                                 |
| **5C**    | デザインシステム構築    | `create_new_file`, `use_figma`                | Figma DS (カラー/タイポ/スペーシング変数)                      |
| **5D**    | ワイヤーフレーム        | `use_figma`, `get_screenshot`                 | グレースケール WF (バッチ3-5画面)                              |
| **5E**    | モックアップ & 品質評価 | `use_figma`, `get_screenshot`, `get_metadata` | 高忠実度モックアップ + UIデザイン品質スコア                    |

### 自動起動するスキル（Phase 5）

以下のスキルを各サブフェーズで**自動起動**する（詳細は `references/skill_orchestration.md` Section 3）:

- **`/ui-ux-pro-max`**: 5A（ブリーフ）+ 5E（プレデリバリーチェック）
- **`/frontend-design`**: 5A（デザイン思考）+ 5E（品質評価）
- **`/web-design-guidelines`**: 5D（レイアウト監査）+ 5E（最終UI監査）
- **`/pm-customer-journey-map`**: 5B（IA設計）
- **`/cro-methodology`**: 5E（LP/EC案件のCVR最適化）

### 共通ルール

- 全サブフェーズでバッチ処理後に `get_screenshot` → HEAL検証 → スキル起動 → ユーザーフィードバック → 即修正
- 5D-5E: 信頼UIパターン（トースト/確認ダイアログ/Undo）を `references/ux_trust_design.md` Section 9 に基づき配置。AI機能時はインライン推論/信頼度インジケータも追加
- `ubiquitous_language.md` が存在する場合、UIラベルにはULの「ユーザー向けラベル」を優先使用
- 命名規則: WF-[US-XXX], MK-[US-XXX] 形式

---

## Known Limitations & Edge Cases

### Phase 5（Figma MCP）の制約

- 認証済み Figma アカウント（Editor 権限以上）が必要
- チームファイルはチームメンバーシップが必要
- Plugin API 呼び出しは大規模ワークスペースでタイムアウトの可能性あり
- 1回の操作で処理可能な画面数は最大50
- `whoami` が失敗した場合、Phase 5 開始前にユーザーに認証を促す

### 品質スコアの注意事項

- 5次元ルーブリックはヒューリスティック評価（アルゴリズムではない）
- 評価者の解釈により ±3 点の変動あり
- 再スコアリング時の一貫性は保証されない
- スコア 70 点未満は speckit-bridge への入力として不適格

### 多言語サポート

- 言語検出: ユーザーの最初のメッセージの言語で全出力言語を決定
- コード識別子（FR-001, US-001 等）は言語設定に関わらず常に英語
- プロジェクト途中での言語切り替えは非対応

### 非対応シナリオ

- 要件間の循環依存
- リアルタイム共同編集
- 他ツール（Jira, Notion 等）からの既存要件インポート
- Phase のロールバック/Undo（designs/ は追記専用）
- 500行を超える単一要件ドキュメントの自動分割

### エラーハンドリング

- Web 検索のタイムアウト: 30秒でリトライ、3回失敗で汎用提案にフォールバック
- Figma 認証失敗: エラーメッセージを表示し、Phase 5 をスキップ可能にする
- designs/ ディレクトリ不在: scaffold-requirements.sh で自動初期化を促す
- 不完全な Phase 完了: 中断箇所から再開可能（Progress Detection で検出）

---

## Language Support

- ユーザーの最初のメッセージの言語を検出し、以降の出力をその言語に合わせる
- 要件ID (FR-001, NFR-001, US-001) とセクションヘッダは**英語で統一**（国際的可読性）
- 説明文・質問・回答はユーザーの言語に合わせる

---

## Preview Command

「プレビューして」で designs/ をブラウザプレビュー。外部依存不要。ブラウザを閉じて終了。

---

## Resuming Existing Work

`designs/` が既に存在する場合の再開手順:

1. 全ファイルを読み込み
2. 進捗を自動判定（Phase 1〜5のどこまで完了か）
3. ヘルプとともに進捗状況を表示
4. ユーザーに「続きから進めますか？」と確認
5. 該当フェーズから再開

---

## Reference Files

スキルの実行中に以下のファイルを参照する:

| ファイル                                      | 参照タイミング                             |
| --------------------------------------------- | ------------------------------------------ |
| `references/question_bank.md`                 | 各フェーズの質問生成時                     |
| `references/quality_rubric.md`                | Phase 4A のスコアリング時                  |
| `references/best_practices.md`                | Phase 3 のNFR提案時                        |
| `templates/README_charter.md`                 | Phase 1 のREADME生成時                     |
| `templates/functional_requirements.md`        | Phase 2 のFR記録時                         |
| `templates/non_functional_requirements.md`    | Phase 3 のNFR記録時                        |
| `templates/user_stories.md`                   | Phase 4B のUS生成時                        |
| `templates/workflow_config.md`                | Phase 0 のワークフロー設定生成時           |
| `references/ubiquitous_language_questions.md` | Phase 4C のUL抽出Q&A時                     |
| `templates/ubiquitous_language.md`            | Phase 4C のUL定義生成時                    |
| `references/ui_design_questions.md`           | Phase 5A のデザインブリーフQ&A時           |
| `references/ui_design_rubric.md`              | Phase 5E のUIデザイン品質スコアリング時    |
| `references/figma_code_patterns.md`           | Phase 5C-5E のFigma Plugin APIコード生成時 |
| `references/phase5_ui_design.md`              | Phase 5 の詳細手順リファレンス             |
| `references/enhance_mode.md`                  | エンハンスモードの詳細手順リファレンス     |
| `references/skill_orchestration.md`           | プロジェクトスキャン・スキル自動起動マップ |
| `references/ux_trust_design.md`               | 全フェーズの信頼設計パターン参照           |
| `templates/ui_design_brief.md`                | Phase 5A のデザインブリーフ生成時          |
