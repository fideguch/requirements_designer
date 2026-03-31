# Skill Orchestration / スキルオーケストレーション

起動時のプロジェクトスキャン、成熟度判定、フェーズ別スキル自動起動を定義するリファレンス。

---

## 1. 起動時プロジェクトスキャン

requirements_designer 起動時に、カレントディレクトリを以下の順序でスキャンする。

### スキャン対象

| カテゴリ         | スキャン対象                                                                               | 検出する情報                         |
| ---------------- | ------------------------------------------------------------------------------------------ | ------------------------------------ |
| プロジェクト基盤 | `package.json`, `Cargo.toml`, `go.mod`, `pyproject.toml`, `Gemfile`, `pom.xml`             | 技術スタック、依存ライブラリ         |
| Claude Code 設定 | `CLAUDE.md`, `.claude/`, `.mcp.json`                                                       | 設定済みか、MCP 接続先               |
| デザイン資産     | `DESIGN.md`, `designs/`, Figma URL の痕跡                                                  | デザインシステムの有無、既存トークン |
| ソースコード     | `src/`, `app/`, `pages/`, `components/`, `lib/`                                            | フロントエンド/バックエンド構成      |
| テスト           | `tests/`, `__tests__/`, `*.spec.*`, `*.test.*`                                             | テストフレームワーク、カバレッジ     |
| DB/データ        | `migrations/`, `prisma/`, `schema.sql`, `supabase/`, `drizzle/`                            | データモデル、DB 種別                |
| CI/CD            | `.github/workflows/`, `Dockerfile`, `vercel.json`, `wrangler.toml`                         | デプロイ環境                         |
| ドキュメント     | `docs/`, `README.md`, `specs/`                                                             | 既存仕様書・PRD                      |
| 要件成果物       | `designs/workflow_config.md`, `designs/README.md`, `designs/functional_requirements.md` 等 | requirements_designer の進捗         |

### スキャン手順

1. Glob で上記パターンを検索（深さ2階層まで）
2. 検出したファイル/ディレクトリの存在を記録
3. `package.json` 等があれば中身を読み技術スタックを特定
4. `designs/` 内のファイル一覧から進捗フェーズを判定
5. 結果をユーザーに提示:「以下の情報を検出しました。正しいですか？」

---

## 2. プロジェクト成熟度判定

スキャン結果から4段階の成熟度を自動判定する。

| 成熟度            | 判定条件                           | 推奨モード     | 開始フェーズ                |
| ----------------- | ---------------------------------- | -------------- | --------------------------- |
| **Lv.0 新規**     | ソースコードなし、designs/ なし    | Full or Light  | Phase 0                     |
| **Lv.1 構想中**   | designs/ が途中まで存在            | 前回モード継続 | 中断フェーズから再開        |
| **Lv.2 開発済み** | ソースコードあり、designs/ なし    | Enhance        | Phase 0（スキャン情報注入） |
| **Lv.3 運用中**   | ソースコード + CI/CD + テスト + DB | Enhance        | Phase 0（フルスキャン注入） |

### 成熟度の提示テンプレート

```
📊 プロジェクトスキャン結果

成熟度: Lv.X [ラベル]
検出: [技術スタック] / [コンポーネント数] / [テストファイル数] / [DBモデル数]
推奨モード: [Full / Light / Enhance]
開始フェーズ: [Phase X]

この情報は正しいですか？修正があれば教えてください。
```

### Lv.2/Lv.3 での Current State Summary 自動生成

スキャン結果を `designs/README.md` Section 10 に自動記録する:

```markdown
## 10. Current State Summary (auto-detected)

- **Maturity**: Lv.X
- **Tech Stack**: [検出結果]
- **Frontend**: [ディレクトリ構成、コンポーネント数]
- **Backend**: [API エンドポイント数]
- **DB**: [スキーマファイル、モデル数]
- **Tests**: [テストフレームワーク、ファイル数]
- **Design**: [DESIGN.md の有無、トークン定義状況]
- **CI/CD**: [ワークフロー、デプロイ先]
```

---

## 3. フェーズ別スキル自動起動マップ

### 凡例

- **常時**: フェーズ進行時に必ず起動
- **条件付き**: 特定条件を満たした場合のみ起動
- **コンテキスト注入**: スキル起動時にスキャン情報を渡す

### Phase 0-4: 要件定義フェーズ

| Phase | タイミング     | 起動スキル              | 条件                   | 注入コンテキスト               |
| ----- | -------------- | ----------------------- | ---------------------- | ------------------------------ |
| 0     | モード選択時   | —                       | —                      | スキャン結果から推奨モード提示 |
| 1     | アイデア曖昧時 | `/brainstorming`        | ユーザー入力が抽象的   | 技術スタック、既存機能         |
| 1     | 完了後         | `/pm-problem-statement` | 常時                   | README.md Section 1-2          |
| 2     | Actor 定義時   | `/pm-jobs-to-be-done`   | 常時                   | 既存コードのユーザーロール情報 |
| 2     | 信頼設計質問   | —（質問バンク Round 3D） | 常時（全プロジェクト） | `ux_trust_design.md` Tier 1   |
| 2     | AI信頼設計質問 | —（質問バンク Round 3E） | AI機能検出時           | `ux_trust_design.md` Tier 2   |
| 3     | NFR 抽出時     | `/pm-pestel-analysis`   | 日本市場向けプロダクト | 法規制チェックリスト           |
| 4A    | スコア不合格   | `/pm-problem-statement` | スコア < 70            | 弱い次元の詳細                 |
| 4B    | US 生成後      | `/pm-user-story`        | 常時                   | FR 一覧 + 既存テストパターン   |
| 4B    | US 5件以上時   | `/pm-user-story-mapping` | US数 ≥ 5              | 信頼USを含むリリーススライス   |

### Phase 5: UI デザインフェーズ

| Sub-phase | タイミング     | 起動スキル/ツール            | 条件                 | 注入コンテキスト             |
| --------- | -------------- | ---------------------------- | -------------------- | ---------------------------- |
| 5A        | ブリーフ作成時 | `/ui-ux-pro-max`             | 常時                 | 既存 DESIGN.md トークン      |
| 5A        | ブリーフ作成時 | `/frontend-design`           | 常時                 | 既存コンポーネント一覧       |
| 5B        | IA 設計時      | `/pm-customer-journey-map`   | 常時                 | FR メインフロー + 信頼タッチポイント |
| 5C        | DS 構築後      | `get_screenshot` + HEAL 検証 | 常時                 | DESIGN.md トークン           |
| 5D        | WF 各バッチ後  | `get_screenshot` + HEAL 検証 | 常時                 | —                            |
| 5D        | WF 各バッチ後  | `/web-design-guidelines`     | 常時                 | スクリーンショット結果       |
| 5E        | MK 各バッチ後  | `get_screenshot` + HEAL 検証 | 常時                 | —                            |
| 5E        | MK 各バッチ後  | `/ui-ux-pro-max`             | 常時                 | プレデリバリーチェックリスト |
| 5E        | MK 各バッチ後  | `/web-design-guidelines`     | 常時                 | スクリーンショット結果       |
| 5E        | MK 各バッチ後  | `/frontend-design`           | 常時                 | デザイン品質評価基準         |
| 5E        | LP/EC 案件     | `/cro-methodology`           | プロダクトタイプ判定 | ファネル情報                 |

### Phase 4D: 完了時の提案

| 条件        | 提案スキル         | 動作                           |
| ----------- | ------------------ | ------------------------------ |
| スコア ≥ 70 | `/speckit-bridge`  | 提案のみ（起動はユーザー判断） |
| スコア ≥ 80 | `/doc-coauthoring` | PRD 化を提案                   |

---

## 4. シナリオ別動作フロー

### A. 新規プロジェクト — 一気通貫

```
起動 → スキャン → Lv.0 → Phase 0（Full推奨）
→ Ph1: /brainstorming → /pm-problem-statement
→ Ph2: /pm-jobs-to-be-done → FR抽出
→ Ph3: /pm-pestel-analysis → NFR抽出
→ Ph4: スコアリング → /pm-user-story → US → UL → 次ステップ
→ Ph5A: /ui-ux-pro-max + /frontend-design
→ Ph5B: /pm-customer-journey-map
→ Ph5C-E: DS → WF → MK（各バッチ: get_screenshot + HEAL + デザインスキル群）
→ 完了
```

### B. 要件定義途中 — 中断再開

```
起動 → スキャン → Lv.1（designs/ 途中）→ 中断フェーズ特定
→ 「Phase X から再開します」→ 前回モードで続行
```

### C. 開発済み・要件なし — 後付け要件定義

```
起動 → スキャン → Lv.2（src/ あり、designs/ なし）
→ Phase 0: Enhance 推奨（「既存コードを検出しました」）
→ Ph1: スキャン結果を Current State Summary に自動記録 → 既知情報の質問を省略
→ Ph2: リポジトリ構造を踏まえた変更ヒアリング
→ Ph3-4: 既存テスト・CI を NFR に反映
→ Ph5: 自動スキップ（Enhance デフォルト）or ユーザー選択
```

### D. デザイン途中 — Phase 5 再開

```
起動 → スキャン → Lv.1 + Phase 5 進行中
→ Figma の状態を get_screenshot で確認
→ 未完了バッチから続行（HEAL + デザインスキル自動起動）
```

### E. 運用中プロダクト — 機能追加

```
起動 → スキャン → Lv.3（src/ + CI + tests/ + DB）
→ Phase 0: Enhance 推奨 → フルスキャン結果注入
→ Ph1: 「以下を検出しました。正しいですか？」→ 確認後に変更背景ヒアリング
→ Ph2: リグレッションリスクを意識した変更ヒアリング
→ Ph3: 既存 NFR との整合性チェック
```

---

## 5. スキル起動の実行方法

スキル起動は Skill tool を使用して実行する。起動時にコンテキストを注入する場合、スキルの入力としてスキャン結果や designs/ の情報を含める。

### 起動パターン

```
1. スキル起動が必要なタイミングに到達
2. 注入するコンテキストを designs/ や スキャン結果から収集
3. Skill tool でスキルを起動（コンテキストを引数として渡す）
4. スキルの出力を現在のフェーズの成果物に反映
5. ユーザーに結果を提示して確認
```

### スキル起動をスキップする場合

以下の場合、スキル起動をスキップしてよい:

- ユーザーが明示的に「スキップ」を指示した場合
- 同一セッション内で既に同じスキルが起動済みで、入力に変化がない場合
- Light Mode でフェーズ自体がスキップされている場合
