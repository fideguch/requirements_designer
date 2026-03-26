---
name: requirements_designer
description: >
  対話式Q&Aで要件定義を行うスキル。プロジェクト憲章・機能要件・非機能要件・
  ユーザーストーリーを段階的に生成し、品質スコアで改善点を提示する。
  さらにFigma MCP連携でデザインシステム・ワイヤーフレーム・モックアップまで生成可能。
  トリガー: "要件定義", "requirements definition", "機能要件", "非機能要件",
  "要件を整理", "要件をまとめて", "user stories", "ユーザーストーリー",
  "プロジェクト憲章", "project charter", "要件定義したい",
  "UIデザイン", "UI design", "Figmaデザイン", "ワイヤーフレーム",
  "wireframe", "モックアップ", "mockup", "デザインシステム", "design system"
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
  「品質スコアを出して」
  「ユーザーストーリーを生成して」
  「ヘルプ」
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
📊 現在の進捗: Phase 2 完了（機能要件 12件定義済み）
   → 次は Phase 3: 非機能要件の抽出 です
```

---

## Workflow Overview

### 事前準備: designs/ ディレクトリのセットアップ

1. カレントディレクトリに `designs/` が存在するか確認
2. 存在しない場合: `scripts/scaffold-requirements.sh` を実行してテンプレートから雛形を生成
3. 存在する場合: 既存ファイルを読み込み、進捗を判定して途中から再開

---

## Phase 0: ワークフロー設定

**目的:** プロジェクトの特性に応じて、実行するフェーズを選択し `designs/workflow_config.md` に記録する。

### 進め方

1. ユーザーに以下を確認:

```
⚙️ ワークフロー設定

このプロジェクトで実行するフェーズを選んでください:

✅ Phase 1: プロジェクト理解（必須）
✅ Phase 2: 機能要件の抽出（必須）
⬜ Phase 3: 非機能要件の抽出 — スキップ可能（MVP/PoCの場合等）
✅ Phase 4A: 品質スコアリング（必須）
✅ Phase 4B: ユーザーストーリー（必須）
⬜ Phase 4C: ユビキタス言語定義 — スキップ可能（技術者向けツール等）
⬜ Phase 5: UIデザイン — スキップ可能（API/バックエンドのみ等）

デフォルトは全フェーズ実行です。
スキップしたいフェーズがあれば教えてください。
```

2. ユーザーの回答に基づき `templates/workflow_config.md` をベースに `designs/workflow_config.md` を生成
3. スキップするフェーズのStatus列を「スキップ」に変更し、Reason列に理由を記録

### スキップ可能フェーズ

| Phase | スキップが適切なケース |
|-------|---------------------|
| Phase 3（非機能要件） | MVP/PoC段階、NFRが別ドキュメントで定義済み |
| Phase 4C（ユビキタス言語） | 技術者のみが使う内部ツール、既存プロジェクトで用語確立済み |
| Phase 5（UIデザイン） | APIのみ、CLIツール、UIが別チームで実施 |

### 必須フェーズ（スキップ不可）

Phase 1, Phase 2, Phase 4A, Phase 4B, Phase 4D

### 途中再開時の動作

`designs/workflow_config.md` が既に存在する場合:
1. 設定内容を表示
2. 「この設定で続けますか？変更がある場合は教えてください。」と確認
3. 変更があれば `workflow_config.md` を更新
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

完了時にユーザーに確認: 「プロジェクト憲章のドラフトが完成しました。Phase 2（機能要件の抽出）に進みますか？」

---

## Phase 2: 機能要件の抽出 (3-5ラウンド)

**目的:** `designs/functional_requirements.md` の段階的構築

### 進め方

1. `designs/README.md` のセクション3（アクター）とセクション4（やりたいこと）を読み込む
2. アクターごとに機能を深掘りする質問を出題
3. 回答を元に FR-001 形式で要件を記録

### 質問の順序

1. **コア機能** (ラウンド1-2): 各アクターの主要アクション、データCRUD
2. **エッジケース** (ラウンド3): 失敗時の挙動、権限、バリデーション
3. **補完** (ラウンド4-5): バッチ処理、レポート、管理機能

### 要件の記録形式

各FRは以下の構造で記録する:
```
#### FR-001: [要件タイトル]
- **説明**: ...
- **アクター**: ...
- **事前条件**: ...
- **トリガー**: ...
- **主フロー**: 1. ... 2. ...
- **代替フロー**: ...
- **例外フロー**: ...
- **事後条件**: ...
- **ビジネスルール**: ...
- **優先度**: Must / Should / Could / Won't
```

### ラウンド間の動作

- 各ラウンド終了時に、新たに追加されたFRの一覧を表示
- ユーザーの確認を得てから次のラウンドへ
- 「十分」と判断されたら Phase 3 へ移行

---

## Phase 3: 非機能要件の抽出 (2-3ラウンド)

**目的:** `designs/non_functional_requirements.md` の構築

### 進め方

1. `designs/README.md` のセクション5（制約）とセクション6（品質期待値）を読み込む
2. 10カテゴリについて順に質問:
   - パフォーマンス / 可用性 / セキュリティ / スケーラビリティ / ユーザビリティ
   - 保守性 / 互換性 / 法規制・コンプライアンス / データ / 運用
3. **WebSearchツールを活用**して、ドメイン固有のベストプラクティスを調査し提案

### NFRの記録形式

```
#### NFR-001: [要件タイトル]
- **説明**: ...
- **カテゴリ**: パフォーマンス / 可用性 / セキュリティ 等
- **指標**: ...
- **目標値**: ...
- **測定方法**: ...
- **優先度**: Must / Should / Could
- **関連FR**: FR-XXX
```

### ベストプラクティス提案

ユーザーが「わからない」と答えた項目については:
1. Web検索で同業種・同規模の一般的な水準を調査
2. 「一般的にはこの程度です」と提案して判断を仰ぐ
3. `references/best_practices.md` も参照

---

## Phase 4: 品質評価・ユーザーストーリー・ユビキタス言語・連携

### 4A: 品質スコアリング

`references/quality_rubric.md` に基づき、5次元 x 20点 = 100点満点で評価。

| 次元 | 配点 | 評価内容 |
|------|------|---------|
| 網羅性 (Completeness) | 20 | 全アクター網羅、CRUD操作、エッジケース |
| 具体性 (Specificity) | 20 | 定量的な値、具体的データ形式 |
| テスト可能性 (Testability) | 20 | 明確なpass/fail基準、受け入れ基準 |
| 一貫性 (Consistency) | 20 | 用語統一、矛盾なし、ID参照の整合性 |
| 追跡可能性 (Traceability) | 20 | 目標→FR→NFR→USの紐付け |

#### スコア表示形式

```
## 要件品質スコア

| 次元 | スコア | 評価 |
|------|--------|------|
| 網羅性 | 16/20 | Good - 管理者エラー回復フローが未定義 |
| 具体性 | 12/20 | Adequate - 5件のFRに定量基準なし |
| テスト可能性 | 18/20 | Excellent |
| 一貫性 | 17/20 | Good - 用語の軽微な揺れあり |
| 追跡可能性 | 14/20 | Good - 3件のFRが目標に未紐付け |

**合計: 77/100**

### 改善提案
1. [最もインパクトの大きい改善]
2. [2番目の改善]
3. [3番目の改善]
```

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

#### US形式

```
#### US-001: [ストーリータイトル]
- **ストーリー**: As a [アクター], I want [機能], so that [価値].
- **ソースFR**: FR-001, FR-002
- **優先度**: Must / Should / Could
- **受け入れ基準**:
  - [ ] Given [事前条件], When [トリガー], Then [期待結果]
  - [ ] Given [代替フロー条件], When [アクション], Then [期待動作]
  - [ ] Given [例外フロー条件], When [エラー発生], Then [エラー処理]
```

生成後にユーザーレビューを依頼し、修正があれば反映する。

### 4C: ユビキタス言語定義

確定したFR・NFR・USからドメイン用語を抽出し、`designs/ubiquitous_language.md` を生成する。

#### 目的

- ドメイン専門家と開発者の間で共通語彙を確立する（DDD: Ubiquitous Language）
- 機能名に技術用語がそのまま使われることを防ぐ（例: 「ML協調フィルタリング」→「おすすめマッチング」）
- UI表示ラベルとコード内の命名を統一的に管理する
- ユーザーの属性・技術レベルに合わせた自然な用語を選定する

#### 進め方

1. 既存の `designs/` ドキュメント（README.md, functional_requirements.md, non_functional_requirements.md, user_stories.md）を全て読み込む
2. ドメイン用語を自動抽出:
   - **README.md** → アクター名、プロジェクト目標のキーワード
   - **functional_requirements.md** → FR説明の名詞（エンティティ）、主フローの動詞（アクション）、ビジネスルールの条件用語
   - **non_functional_requirements.md** → カテゴリ名、技術境界の用語
   - **user_stories.md** → I want節（機能名称）、受け入れ基準のドメイン用語
3. `references/ubiquitous_language_questions.md` に基づき、3ラウンドのQ&Aで精緻化:
   - **Round 1: 用語抽出・確認** — 自動抽出結果の確認、欠落概念の補完、境界コンテキストの識別
   - **Round 2: ユーザー視点の精緻化** — 技術用語→ユーザーフレンドリーな名前、ロール別用語、業界標準語
   - **Round 3: コード命名規則** — プログラミング言語/FW、命名規約、API/DB命名方針
4. `templates/ubiquitous_language.md` をベースに `designs/ubiquitous_language.md` を生成

#### ユーザー視点の精緻化ルール

1. **技術名称を機能名にしない**: 実装技術はコード内部に留め、UIには「何ができるか」で表現する
   - 悪い例: 「WebRTC P2P転送」→ 良い例: 「クイックシェア」
   - 悪い例: 「ML協調フィルタリング」→ 良い例: 「おすすめマッチング」
2. **ユーザーの語彙に合わせる**: ターゲットユーザーの技術レベル・業界用語・日常語に合わせる
3. **1概念 = 1用語**: 同じ概念にコード・UI・会話で同じ用語を使う（同義語を増やさない）
4. **アンチパターンを明記**: 避けるべき表現とその理由を記録する

#### UL形式

各ULは以下の構造で記録する:
```
#### UL-001: [用語]
- **定義 / Definition**: [この概念の明確な意味]
- **ユーザー向けラベル / User-Facing Label**: [UIに表示する名前]
- **コード表現 / Code Representation**:
  - Class/Type: `PascalCase`
  - Variable/Method: `camelCase`
  - DB Table/Column: `snake_case`
  - API Endpoint: `/kebab-case`
- **コンテキスト / Context**: BC-001
- **ソース / Source**: FR-001, US-003
- **エイリアス / Aliases**: [許容される同義語]
- **アンチパターン / Anti-patterns**: [避けるべき表現と理由]
- **使用例 / Usage Examples**:
  - UI: 「[ボタンテキスト]」
  - Code: `[コードスニペット]`
```

#### 4C 完了条件

- `designs/ubiquitous_language.md` が生成されている
- UL-001以上の用語が定義されている
- 全ULにソースFR/NFR/USが紐づいている
- アンチパターン一覧に1件以上の「避けるべき用語」が記録されている
- ユーザーに確認: 「ユビキタス言語定義が完成しました。Phase 4D（次のステップ）に進みますか？」

---

### 4D: 次のステップ提案

要件の完成度に応じて、次のアクションを提案:

```
## Next Steps

要件定義が完了しました！次のステップを選んでください:

📄 PRD化
  要件をフォーマルなPRDに仕上げたい場合:
  → /doc-coauthoring を使って designs/ の内容をPRDに変換

💡 もっとアイデアを練りたい
  特定の領域をもっと深掘りしたい場合:
  → /brainstorming でアイデアを発散・収束

🔨 実装計画を作りたい
  開発チームに渡せる実装計画が欲しい場合:
  → /writing-plans で要件からタスク分解

🎨 UIデザインを作りたい
  要件からFigmaでデザインを直接生成したい場合:
  → Phase 5: UI Design に進む（Figma MCP連携）
  → デザインシステム・ワイヤーフレーム・モックアップを自動生成

📖 ユビキタス言語を確認・修正したい
  用語の追加・修正をしたい場合:
  → 「ユビキタス言語を修正したい」と伝えてください

📊 品質をもっと上げたい
  スコアの低い次元を改善したい場合:
  → 「品質スコアを改善したい」と伝えてください
```

---

## Phase 5: UIデザイン (3-5ラウンド)

**目的:** 要件定義ドキュメント（Phase 1-4の成果物）に基づき、Figma MCPツールを使ってデザインアーティファクトを生成する。

### Phase 5 の開始条件

- Phase 4 完了（user_stories.md が存在し、US-001以上のストーリーあり）
- 品質スコア >= 70（70未満の場合は警告表示の上、ユーザー判断でオーバーライド可能）
- ユーザーが Phase 5 への進行を確認

---

### 5A: UIデザインブリーフ (1ラウンド)

**目的:** デザインに必要な方針・ブランド情報を対話Q&Aで収集し、`designs/ui_design_brief.md` を生成する。

#### 進め方

1. `mcp__claude_ai_Figma__whoami` でFigma認証確認・planKey取得
2. `templates/ui_design_brief.md` のテンプレートをベースに `designs/ui_design_brief.md` を生成
3. `references/ui_design_questions.md` の Phase 5A セクションから3〜5問をバッチ出題
4. 回答に基づき `designs/ui_design_brief.md` を段階的に更新
5. 既存デザインシステムがあるか `mcp__claude_ai_Figma__search_design_system` で探索
6. `designs/ubiquitous_language.md` が存在する場合、UIラベルにはULの「ユーザー向けラベル」を優先使用する

#### 適用するデザイン原則

- **ui-ux-pro-max ルール1「疑ってから作る」**: 各要素が本当に必要か問う
- **frontend-design のデザイン思考**: Purpose → Tone → Constraints → Differentiation

#### 5A 完了条件

以下が全て明確になったら次サブフェーズへ:
- ターゲットプラットフォームとレスポンシブ戦略
- ブランドカラー（Primary/Secondary/Accent）
- タイポグラフィ方針
- アクセシビリティ目標レベル
- デザインスタイルの方向性

---

### 5B: 情報設計 & ユーザーフロー (1ラウンド)

**目的:** IA図とユーザーフロー図をFigJamに生成する。

#### 進め方

1. `designs/user_stories.md` を読み込み、Epic → 画面マッピングを作成
2. `designs/functional_requirements.md` のメインフロー → ユーザーフロー図の素材を抽出
3. 画面インベントリ（SCR-001〜）を作成し `designs/ui_design_brief.md` Section 7 に記録

#### Figma MCPツール

1. `mcp__claude_ai_Figma__create_new_file` — FigJamファイル作成（editorType: "figjam"）
   - ファイル名: `[プロジェクト名] — IA & User Flows`
   - planKey: 5Aで取得したplanKeyを使用
2. `mcp__claude_ai_Figma__generate_diagram` — Mermaid記法でIA図生成（flowchart LR）
3. `mcp__claude_ai_Figma__generate_diagram` — 主要ユーザーフロー図を2-3本生成（最高優先度FRのメインフロー）

#### マッピングロジック

- 各 **Epic**（USのグルーピング）→ IA図のトップレベルセクション
- 各 **US** → 1画面（SCR-XXX）にマッピング
- 各 **FR メインフロー** → ユーザーフロー図（画面遷移の連鎖）
- **NFR ユーザビリティ要件** → フロー図上の制約注釈

#### 5B 完了条件

- FigJamファイルのURLを `designs/ui_design_brief.md` Section 6 に記録
- 画面インベントリが完成
- ユーザーに確認: 「IA図とユーザーフロー図を生成しました。Phase 5C（デザインシステム構築）に進みますか？」

---

### 5C: デザインシステム構築 (1ラウンド)

**目的:** Figmaデザインファイルを作成し、デザインシステム（変数・スタイル）をセットアップする。

#### 進め方

1. Figmaデザインファイルを新規作成
2. 3ページ構成を作成: "Design System" / "Wireframes" / "Mockups"
3. `designs/ui_design_brief.md` のブランド情報に基づきトークンを定義
4. Design Systemページにトークンドキュメントフレームを作成
5. `get_screenshot` でプレビューを表示しユーザーレビュー

#### Figma MCPツール

1. `mcp__claude_ai_Figma__create_new_file` — デザインファイル作成（editorType: "design"）
   - ファイル名: `[プロジェクト名] — UI Design`
2. `mcp__claude_ai_Figma__use_figma` — 複数回:
   - ページ作成（Design System / Wireframes / Mockups）
   - カラー変数コレクション作成（`references/figma_code_patterns.md` Section 3 参照）
   - タイポグラフィスタイル定義（Section 5 参照）
   - スペーシング変数作成（Section 4 参照）
   - トークンドキュメントフレーム作成
3. `mcp__claude_ai_Figma__create_design_system_rules` — デザインシステムルール生成（オプション）
4. `mcp__claude_ai_Figma__search_design_system` — 既存コンポーネントの探索（再利用判定）
5. `mcp__claude_ai_Figma__get_screenshot` — Design Systemページのプレビュー表示

#### 適用するデザイン原則

- **ui-ux-pro-max スペーシングトークン**: Section 112px / Group 64px / Element 24px
- **ui-ux-pro-max タイポスケール**: 日本語は英語の1サイズ小さく
- **frontend-design**: 独自タイポグラフィ選定（Inter, Arial, Roboto を避ける）
- **WCAG準拠**: コントラスト比検証（`references/figma_code_patterns.md` Section 8 参照）

#### フィードバックループ

```
get_screenshot でプレビュー表示
→ ユーザーフィードバック収集
→ use_figma で即修正
→ get_screenshot で再プレビュー
→ 承認されたら Phase 5D へ
```

#### 5C 完了条件

- デザインファイルURLを `designs/ui_design_brief.md` Section 6 に記録
- 全カラー変数・タイポスタイル・スペーシング変数が定義済み

---

### 5D: ワイヤーフレーム (1-2ラウンド)

**目的:** 画面インベントリに基づき、グレースケールのワイヤーフレームをFigmaに作成する。

#### 進め方

1. 画面インベントリ（SCR-001〜）をユーザーに提示
2. Must優先度の画面から3-5画面ずつバッチ処理
3. 各画面のワイヤーフレームを "Wireframes" ページに作成
4. バッチごとに `get_screenshot` でプレビュー表示しレビュー

#### Figma MCPツール

1. `mcp__claude_ai_Figma__use_figma` — 各画面のWF作成（`references/figma_code_patterns.md` Section 6, 7 参照）
   - Auto Layoutベースのレイアウト
   - WF_COLORSパレット（グレースケール）使用
   - プレースホルダー矩形で画像/コンテンツ領域を表現
   - テキストラベルで要素名を明記
   - **ubiquitous_language.md 参照**: 画面上のラベル・ボタン名・ナビゲーション項目はULの「ユーザー向けラベル」を使用
2. `mcp__claude_ai_Figma__get_screenshot` — バッチごとのプレビュー表示
3. `mcp__claude_ai_Figma__search_design_system` — 再利用可能なコンポーネント探索

#### 命名規則

- フレーム名: `WF-[US-XXX] — [Screen Name]`
- 例: `WF-US001 — Dashboard`, `WF-US003 — User Registration`

#### バッチ処理フロー

```
1. 画面インベントリ表示（SCR-001〜、ソースUS・優先度付き）
2. Must優先度から3-5画面ずつバッチ処理
3. --- バッチN ---
   a. use_figma でWF生成
   b. 各画面の構成要素をテキストで説明（ヒーロー要素の明示）
   c. get_screenshot で全画面プレビュー表示
   d. 「レイアウト・要素の過不足・ナビ構造のフィードバックをお願いします」
   e. ユーザーフィードバック → use_figma で即修正 → 再スクショ
4. 全バッチ完了 → 画面インベントリのStatus列を "WF" に更新
```

#### 適用するデザイン原則

- **ui-ux-pro-max ルール2「1ヒーロー/セクション」**: 各画面で最も目立つ要素を1つ決定
- **ui-ux-pro-max ルール3「70点の均一を避ける」**: 要素の強弱に差をつける
- **web-design-guidelines**: Vercel Web Interface Guidelinesとの整合性チェック

---

### 5E: モックアップ & 品質評価 (1-2ラウンド)

**目的:** ワイヤーフレームにデザインシステムを適用して高忠実度モックアップを作成し、品質スコアリングを行う。

#### 進め方

1. Must優先度の画面から3-5画面ずつバッチ処理
2. WFフレームを "Mockups" ページに複製
3. デザインシステム（カラー変数・タイポスタイル・スペーシング）を適用
4. バッチごとに `get_screenshot` でプレビュー、ui-ux-pro-max チェック結果を表示
5. 全画面完了後、`references/ui_design_rubric.md` に基づき品質スコアリング

#### Figma MCPツール

1. `mcp__claude_ai_Figma__use_figma` — 各画面のモックアップ作成
   - グレーの fills → カラー変数適用
   - プレースホルダーテキスト → タイポグラフィスタイル適用
   - 固定サイズ → スペーシング変数適用
   - 角丸・シャドウ追加
2. `mcp__claude_ai_Figma__get_screenshot` — バッチごとのプレビュー表示
3. `mcp__claude_ai_Figma__get_metadata` — ノードプロパティの検証

#### 命名規則

- フレーム名: `MK-[US-XXX] — [Screen Name]`
- 例: `MK-US001 — Dashboard`, `MK-US003 — User Registration`

#### バッチ処理フロー

```
1. Must優先度画面から3-5画面ずつバッチ処理
2. --- バッチN ---
   a. WFフレームを"Mockups"ページに複製
   b. use_figma でデザインシステム適用
   c. get_screenshot でモックアップ表示
   d. ui-ux-pro-max チェック結果を自動表示:
      ✅/⚠️ ヒーロー要素の明確さ
      ✅/⚠️ セクション間隔 >= 112px
      ✅/⚠️ WCAGコントラスト比
      ✅/⚠️ ボタンスタイル準拠
      ✅/⚠️ 背景の単色ルール
   e. ユーザーフィードバック → use_figma で即修正 → 再スクショ
3. 全画面完了 → 画面インベントリのStatus列を "MK" に更新
```

#### 適用するデザイン原則

- **ui-ux-pro-max プレデリバリーチェックリスト**:
  - [ ] Lighthouse Accessibility 100%相当
  - [ ] プロジェクトのglobals.cssトークンを使用
  - [ ] 画像がヒーロー
  - [ ] セクション間隔 >= 112px
  - [ ] ボタンは白/ボーダーベース
  - [ ] 背景は単色
  - [ ] Lucideアイコン（絵文字不使用）
  - [ ] ダークモード対応（設定で有効な場合）
  - [ ] cursor-pointer on clickables
  - [ ] レスポンシブデザイン

- **ui-ux-pro-max 禁止パターン**:
  自動チェックで以下を検出した場合は警告:
  - `bg-white/5 backdrop-blur-xl` の過用
  - アニメーションblob背景
  - グレインテクスチャ
  - フローティンググローオーブ
  - `shadow-lg shadow-indigo-500/20` 系のシャドウ
  - 均一な3カラムカードグリッド
  - `py-12` 以下のセクション間隔
  - `hover:scale-105` + shadow アニメーション

#### 品質スコアリング

`references/ui_design_rubric.md` に基づき、5次元 x 20点 = 100点満点で評価:

```
## UIデザイン品質スコア

| 次元 | スコア | 評価 |
|------|--------|------|
| DS完全性 | __/20 | |
| 画面カバレッジ | __/20 | |
| ビジュアルヒエラルキー | __/20 | |
| アクセシビリティ | __/20 | |
| 要件トレーサビリティ | __/20 | |

**合計: __/100**

### 改善提案
1. [最もインパクトの大きい改善]
2. [2番目の改善]
3. [3番目の改善]
```

#### スコアに基づく推奨

- **70点未満**: 追加バッチで弱い次元を改善
- **70〜79点**: 実装に進めるが改善余地あり
- **80点以上**: 実装計画・Code Connect連携を推奨

#### 5E 完了後の次のステップ提案

```
## Next Steps

UIデザインが完了しました！次のステップを選んでください:

🔗 Code Connect連携
  FigmaコンポーネントとコードベースのコンポーネントをCode Connectで紐付けたい場合:
  → Figma MCP の get_code_connect_suggestions / add_code_connect_map を使用

🔨 実装計画を作りたい
  デザインから開発チームに渡せる実装計画が欲しい場合:
  → /writing-plans で要件+デザインからタスク分解

📄 PRD化
  要件+デザインをフォーマルなPRDに仕上げたい場合:
  → /doc-coauthoring を使って designs/ の内容をPRDに変換

🎨 デザインをもっと良くしたい
  品質スコアの低い次元を改善したい場合:
  → 「UIデザインの品質を改善したい」と伝えてください

📊 デザイン監査
  Web Interface Guidelinesに基づくUIレビュー:
  → /web-design-guidelines でデザイン準拠チェック
```

---

## Language Support

- ユーザーの最初のメッセージの言語を検出し、以降の出力をその言語に合わせる
- 要件ID (FR-001, NFR-001, US-001) とセクションヘッダは**英語で統一**（国際的可読性）
- 説明文・質問・回答はユーザーの言語に合わせる

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

| ファイル | 参照タイミング |
|---------|---------------|
| `references/question_bank.md` | 各フェーズの質問生成時 |
| `references/quality_rubric.md` | Phase 4A のスコアリング時 |
| `references/best_practices.md` | Phase 3 のNFR提案時 |
| `templates/README_charter.md` | Phase 1 のREADME生成時 |
| `templates/functional_requirements.md` | Phase 2 のFR記録時 |
| `templates/non_functional_requirements.md` | Phase 3 のNFR記録時 |
| `templates/user_stories.md` | Phase 4B のUS生成時 |
| `templates/workflow_config.md` | Phase 0 のワークフロー設定生成時 |
| `references/ubiquitous_language_questions.md` | Phase 4C のUL抽出Q&A時 |
| `templates/ubiquitous_language.md` | Phase 4C のUL定義生成時 |
| `references/ui_design_questions.md` | Phase 5A のデザインブリーフQ&A時 |
| `references/ui_design_rubric.md` | Phase 5E のUIデザイン品質スコアリング時 |
| `references/figma_code_patterns.md` | Phase 5C-5E のFigma Plugin APIコード生成時 |
| `templates/ui_design_brief.md` | Phase 5A のデザインブリーフ生成時 |
