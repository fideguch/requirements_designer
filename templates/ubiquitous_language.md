# Ubiquitous Language / ユビキタス言語定義

<!--
  このテンプレートはPhase 4C（ユビキタス言語定義）の出力です。
  FR・NFR・USから自動抽出されたドメイン用語をベースに、
  対話Q&Aでユーザー視点の命名とコード命名規則を確定します。
  後続のPhase 5（UIデザイン）と実装フェーズで参照されるため、正確に記入してください。
-->

---

## Document Info

- **Project**: [プロジェクト名]
- **Generated from**: functional_requirements.md, non_functional_requirements.md, user_stories.md
- **Last Updated**: [日付]

---

## 1. Bounded Contexts / 境界づけられたコンテキスト

<!--
  プロジェクト内で異なる語彙体系を持つ領域を識別する。
  小規模プロジェクトではBC-001のみの場合も多い。
  同じ用語が異なるコンテキストで異なる意味を持つ場合、
  コンテキストを分けて管理する。
-->

| Context ID | Context Name     | Description              | Primary Actors |
| ---------- | ---------------- | ------------------------ | -------------- |
| BC-001     | [コンテキスト名] | [このコンテキストの説明] | [主要アクター] |

---

## 2. Glossary / 用語集

### BC-001: [コンテキスト名]

#### UL-001: [用語 / Term]

- **定義 / Definition**: [この概念のこのコンテキストにおける明確な意味]
- **ユーザー向けラベル / User-Facing Label**: [UIに表示する名前]
- **コード表現 / Code Representation**:
  - Class/Type: `PascalCase`
  - Variable/Method: `camelCase`
  - DB Table/Column: `snake_case`
  - API Endpoint: `/kebab-case`
  - File Path: `kebab-case`
- **コンテキスト / Context**: BC-001
- **ソース / Source**: FR-001, US-001
- **エイリアス / Aliases**: [許容される同義語]
- **アンチパターン / Anti-patterns**: [避けるべき表現と理由]
- **使用例 / Usage Examples**:
  - UI: 「[ボタンテキストやラベルの例]」
  - Code: `[コードスニペットの例]`
  - Conversation: 「[会話での使用例]」

---

## 3. Anti-Pattern Registry / アンチパターン一覧

<!--
  技術用語がそのままユーザー向け名称になっている等、
  避けるべき命名パターンを記録する。

  原則:
  - 実装技術はコード内部に留め、UIには「何ができるか」で表現する
  - ユーザーの語彙レベルに合わせて名称を選ぶ
  - 1つの概念に複数の名前をつけない
-->

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

## 4. Naming Convention Rules / 命名規則

### 一般ルール

1. **機能名はユーザーのメリットで表現する** — 実装技術（アルゴリズム名、プロトコル名）をUIに出さない
2. **ターゲットユーザーの語彙に合わせる** — 技術者向けと一般ユーザー向けで使い分ける
3. **1概念 = 1用語** — コード・UI・会話で同じ用語を使う（同義語を増やさない）
4. **曖昧な汎用語を避ける** — 「データ」「アイテム」「オブジェクト」等の具体性のない語は使わない

### Language-Specific Conventions / プログラミング言語別規約

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

### Target Stack / 使用技術スタック

- **Programming Language(s)**: [TypeScript / Python / Go / etc.]
- **Framework(s)**: [Next.js / Django / Echo / etc.]
- **Database**: [PostgreSQL / MySQL / MongoDB / etc.]
- **Existing Style Guide**: [URL or "None"]

---

## 5. Traceability Matrix / 追跡マトリクス

| UL-ID  | Term | User Label | Source FR | Source NFR | Source US | Used in UI (SCR) |
| ------ | ---- | ---------- | --------- | ---------- | --------- | ---------------- |
| UL-001 |      |            |           |            |           |                  |

---

## 6. Summary / サマリー

| Bounded Context | Term Count | Anti-Pattern Count |
| --------------- | ---------- | ------------------ |
| BC-001: [name]  |            |                    |
| **Total**       |            |                    |

---

<!--
  ==========================================
  内部マッピング（スキル処理用 / ユーザーは無視してOK）
  ==========================================
  Section 1 (Bounded Contexts)  → Phase 5 コンテキスト別画面グルーピング
  Section 2 (Glossary)          → Phase 5D/5E UIラベル、実装コード命名
  Section 3 (Anti-Patterns)     → Phase 4A 一貫性チェック補強
  Section 4 (Naming Rules)      → 実装計画 (/writing-plans) のコード規約
  Section 5 (Traceability)      → Phase 5 画面-用語マッピング
  ==========================================
-->
