# Phase 5: UIデザイン — 詳細手順リファレンス

> このファイルは SKILL.md Phase 5 の詳細実装手順です。
> Phase 5 開始時に自動的に参照されます。

---

## 5A: UIデザインブリーフ (1ラウンド)

**目的:** デザインに必要な方針・ブランド情報を対話Q&Aで収集し、`designs/ui_design_brief.md` を生成する。

### 進め方

1. `mcp__claude_ai_Figma__whoami` でFigma認証確認・planKey取得
2. `templates/ui_design_brief.md` のテンプレートをベースに `designs/ui_design_brief.md` を生成
3. `references/ui_design_questions.md` の Phase 5A セクションから3〜5問をバッチ出題
4. 回答に基づき `designs/ui_design_brief.md` を段階的に更新
5. 既存デザインシステムがあるか `mcp__claude_ai_Figma__search_design_system` で探索
6. `designs/ubiquitous_language.md` が存在する場合、UIラベルにはULの「ユーザー向けラベル」を優先使用する

### 適用するデザイン原則

- **ui-ux-pro-max ルール1「疑ってから作る」**: 各要素が本当に必要か問う
- **frontend-design のデザイン思考**: Purpose → Tone → Constraints → Differentiation

### 5A 完了条件

以下が全て明確になったら次サブフェーズへ:

- ターゲットプラットフォームとレスポンシブ戦略
- ブランドカラー（Primary/Secondary/Accent）
- タイポグラフィ方針
- アクセシビリティ目標レベル
- デザインスタイルの方向性

---

## 5B: 情報設計 & ユーザーフロー (1ラウンド)

**目的:** IA図とユーザーフロー図をFigJamに生成する。

### 進め方

1. `designs/user_stories.md` を読み込み、Epic → 画面マッピングを作成
2. `designs/functional_requirements.md` のメインフロー → ユーザーフロー図の素材を抽出
3. 画面インベントリ（SCR-001〜）を作成し `designs/ui_design_brief.md` Section 7 に記録

### Figma MCPツール

1. `mcp__claude_ai_Figma__create_new_file` — FigJamファイル作成（editorType: "figjam"）
   - ファイル名: `[プロジェクト名] — IA & User Flows`
   - planKey: 5Aで取得したplanKeyを使用
2. `mcp__claude_ai_Figma__generate_diagram` — Mermaid記法でIA図生成（flowchart LR）
3. `mcp__claude_ai_Figma__generate_diagram` — 主要ユーザーフロー図を2-3本生成（最高優先度FRのメインフロー）

### マッピングロジック

- 各 **Epic**（USのグルーピング）→ IA図のトップレベルセクション
- 各 **US** → 1画面（SCR-XXX）にマッピング
- 各 **FR メインフロー** → ユーザーフロー図（画面遷移の連鎖）
- **NFR ユーザビリティ要件** → フロー図上の制約注釈

### 5B 完了条件

- FigJamファイルのURLを `designs/ui_design_brief.md` Section 6 に記録
- 画面インベントリが完成
- ユーザーに確認: 「IA図とユーザーフロー図を生成しました。Phase 5C（デザインシステム構築）に進みますか？」

---

## 5C: デザインシステム構築 (1ラウンド)

**目的:** Figmaデザインファイルを作成し、デザインシステム（変数・スタイル）をセットアップする。

### 進め方

1. Figmaデザインファイルを新規作成
2. 3ページ構成を作成: "Design System" / "Wireframes" / "Mockups"
3. `designs/ui_design_brief.md` のブランド情報に基づきトークンを定義
4. Design Systemページにトークンドキュメントフレームを作成
5. `get_screenshot` でプレビューを表示しユーザーレビュー

### Figma MCPツール

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

### 適用するデザイン原則

- **ui-ux-pro-max スペーシングトークン**: Section 112px / Group 64px / Element 24px
- **ui-ux-pro-max タイポスケール**: 日本語は英語の1サイズ小さく
- **frontend-design**: 独自タイポグラフィ選定（Inter, Arial, Roboto を避ける）
- **WCAG準拠**: コントラスト比検証（`references/figma_code_patterns.md` Section 8 参照）

### フィードバックループ

```
get_screenshot でプレビュー表示
→ ユーザーフィードバック収集
→ use_figma で即修正
→ get_screenshot で再プレビュー
→ 承認されたら Phase 5D へ
```

### 5C 完了条件

- デザインファイルURLを `designs/ui_design_brief.md` Section 6 に記録
- 全カラー変数・タイポスタイル・スペーシング変数が定義済み

---

## 5D: ワイヤーフレーム (1-2ラウンド)

**目的:** 画面インベントリに基づき、グレースケールのワイヤーフレームをFigmaに作成する。

### 進め方

1. 画面インベントリ（SCR-001〜）をユーザーに提示
2. Must優先度の画面から3-5画面ずつバッチ処理
3. 各画面のワイヤーフレームを "Wireframes" ページに作成
4. バッチごとに `get_screenshot` でプレビュー表示しレビュー

### Figma MCPツール

1. `mcp__claude_ai_Figma__use_figma` — 各画面のWF作成（`references/figma_code_patterns.md` Section 6, 7 参照）
   - Auto Layoutベースのレイアウト
   - WF_COLORSパレット（グレースケール）使用
   - プレースホルダー矩形で画像/コンテンツ領域を表現
   - テキストラベルで要素名を明記
   - **ubiquitous_language.md 参照**: 画面上のラベル・ボタン名・ナビゲーション項目はULの「ユーザー向けラベル」を使用
2. `mcp__claude_ai_Figma__get_screenshot` — バッチごとのプレビュー表示
3. `mcp__claude_ai_Figma__search_design_system` — 再利用可能なコンポーネント探索

### 命名規則

- フレーム名: `WF-[US-XXX] — [Screen Name]`
- 例: `WF-US001 — Dashboard`, `WF-US003 — User Registration`

### バッチ処理フロー

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

### 適用するデザイン原則

- **ui-ux-pro-max ルール2「1ヒーロー/セクション」**: 各画面で最も目立つ要素を1つ決定
- **ui-ux-pro-max ルール3「70点の均一を避ける」**: 要素の強弱に差をつける
- **web-design-guidelines**: Vercel Web Interface Guidelinesとの整合性チェック

---

## 5E: モックアップ & 品質評価 (1-2ラウンド)

**目的:** ワイヤーフレームにデザインシステムを適用して高忠実度モックアップを作成し、品質スコアリングを行う。

### 進め方

1. Must優先度の画面から3-5画面ずつバッチ処理
2. WFフレームを "Mockups" ページに複製
3. デザインシステム（カラー変数・タイポスタイル・スペーシング）を適用
4. バッチごとに `get_screenshot` でプレビュー、ui-ux-pro-max チェック結果を表示
5. 全画面完了後、`references/ui_design_rubric.md` に基づき品質スコアリング

### Figma MCPツール

1. `mcp__claude_ai_Figma__use_figma` — 各画面のモックアップ作成
   - グレーの fills → カラー変数適用
   - プレースホルダーテキスト → タイポグラフィスタイル適用
   - 固定サイズ → スペーシング変数適用
   - 角丸・シャドウ追加
2. `mcp__claude_ai_Figma__get_screenshot` — バッチごとのプレビュー表示
3. `mcp__claude_ai_Figma__get_metadata` — ノードプロパティの検証

### 命名規則

- フレーム名: `MK-[US-XXX] — [Screen Name]`
- 例: `MK-US001 — Dashboard`, `MK-US003 — User Registration`

### バッチ処理フロー

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

### 適用するデザイン原則

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

### 品質スコアリング

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

### スコアに基づく推奨

- **70点未満**: 追加バッチで弱い次元を改善
- **70〜79点**: 実装に進めるが改善余地あり
- **80点以上**: 実装計画・Code Connect連携を推奨

### 5E 完了後の次のステップ提案

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
