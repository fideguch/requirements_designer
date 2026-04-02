# ユビキタス言語定義

> [📋 目次](./README.md) | [設定](./workflow_config.md) | [機能要件](./functional_requirements.md) | [非機能要件](./non_functional_requirements.md) | [US](./user_stories.md) | **UL** | [UI](./ui_design_brief.md)

> 💡 Phase 4C の出力。FR/NFR/US からドメイン用語を自動抽出し、Q&A で精緻化します。

---

## このドキュメントについて

本ページはプロジェクトの**ユビキタス言語定義**（Ubiquitous Language）です。FR・NFR・USから自動抽出した用語をベースに、対話Q&Aで精緻化しています。

---

## 1. 用語集

### [カテゴリ名]

<a id="ul-001"></a>

| ID     | 用語   | UIラベル   | 定義   | ソース                                                                            | 画面(SC)                                      | 備考   |
| ------ | ------ | ---------- | ------ | --------------------------------------------------------------------------------- | --------------------------------------------- | ------ |
| UL-001 | [用語] | [UIラベル] | [定義] | [FR-001](./functional_requirements.md#fr-001), [US-001](./user_stories.md#us-001) | [SC-001](./functional_requirements.md#sc-001) | [備考] |

<details><summary>コード表現の詳細</summary>

#### UL-001: [用語]

- **コード表現**: Class: `PascalCase` / Variable: `camelCase` / DB: `snake_case` / API: `/kebab-case`
- **エイリアス**: [許容される同義語]
- **アンチパターン**: [避けるべき表現と理由]
- **使用例**: UI: 「...」 / Code: `...` / Conversation: 「...」

</details>

---

## 2. アンチパターン一覧

> 技術用語がそのままユーザー向け名称になっている等、避けるべき命名パターンを記録する。
>
> **原則:**
>
> - 実装技術はコード内部に留め、UIには「何ができるか」で表現する
> - ユーザーの語彙レベルに合わせて名称を選ぶ
> - 1つの概念に複数の名前をつけない

| Avoid This Term | Use Instead (UL-ID)                  | Reason                                 |
| --------------- | ------------------------------------ | -------------------------------------- |
| [技術的な用語]  | UL-001: [ユーザーフレンドリーな用語] | [技術名称がそのまま機能名になっている] |

### よくあるアンチパターン例

| Pattern                      | Bad Example              | Good Example                       | Why                                |
| ---------------------------- | ------------------------ | ---------------------------------- | ---------------------------------- |
| 技術名がそのまま機能名       | 「ML協調フィルタリング」 | 「おすすめマッチング」             | ユーザーは実装技術を知る必要がない |
| プロトコル名がそのまま機能名 | 「WebRTC P2P転送」       | 「クイックシェア」                 | ユーザーのメリットで表現すべき     |
| DB用語がUI表示               | 「レコードを挿入」       | 「新規登録」                       | ユーザーの行動で表現すべき         |
| 開発者向け略語               | 「CRUD操作」             | 「データの作成・閲覧・編集・削除」 | 一般ユーザーには通じない           |
| 内部ステータス名             | 「PENDING_APPROVAL」     | 「承認待ち」                       | ユーザーの状況で表現すべき         |

---

## 3. 命名規則

### 一般ルール

1. **機能名はユーザーのメリットで表現する** — 実装技術（アルゴリズム名、プロトコル名）をUIに出さない
2. **ターゲットユーザーの語彙に合わせる** — 技術者向けと一般ユーザー向けで使い分ける
3. **1概念 = 1用語** — コード・UI・会話で同じ用語を使う（同義語を増やさない）
4. **曖昧な汎用語を避ける** — 「データ」「アイテム」「オブジェクト」等の具体性のない語は使わない

### プログラミング言語別規約

<!-- 実装で使用するプログラミング言語に応じてカスタマイズ -->

| Context                        | Convention            | Example              |
| ------------------------------ | --------------------- | -------------------- |
| TypeScript/JavaScript class    | PascalCase            | `ClassName`          |
| TypeScript/JavaScript variable | camelCase             | `variableName`       |
| TypeScript/JavaScript method   | camelCase             | `methodName()`       |
| Python class                   | PascalCase            | `ClassName`          |
| Python variable/function       | snake_case            | `variable_name`      |
| Go struct                      | PascalCase (exported) | `StructName`         |
| Go variable                    | camelCase             | `variableName`       |
| Database table                 | snake_case (plural)   | `table_names`        |
| Database column                | snake_case            | `column_name`        |
| API endpoint                   | kebab-case            | `/api/endpoint-path` |
| React component                | PascalCase            | `<ComponentName />`  |
| CSS class                      | kebab-case            | `.class-name`        |
| Environment variable           | SCREAMING_SNAKE_CASE  | `VARIABLE_NAME`      |
| Constants                      | SCREAMING_SNAKE_CASE  | `MAX_VALUE`          |

### 使用技術スタック

- **Programming Language(s)**: [TypeScript / Python / Go / etc.]
- **Framework(s)**: [Next.js / Django / Echo / etc.]
- **Database**: [PostgreSQL / MySQL / MongoDB / etc.]
- **Existing Style Guide**: [URL or "None"]

---

[← US](./user_stories.md) | [📋 目次](./README.md) | [UI →](./ui_design_brief.md)

<!--
  ==========================================
  内部マッピング（処理用 / ユーザーは無視してOK）
  ==========================================
  Section 1 (用語集, 画面SC列含む) → Phase 5D/5E UIラベル、実装コード命名
  Section 2 (Anti-Patterns)        → Phase 4A 一貫性チェック補強
  Section 3 (Naming Rules)         → 実装フェーズのコード規約
  ==========================================
-->
