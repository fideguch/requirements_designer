# ユーザーストーリー

> [📋 目次](./README.md) | [設定](./workflow_config.md) | [機能要件](./functional_requirements.md) | [非機能要件](./non_functional_requirements.md) | **US** | [UL](./ubiquitous_language.md) | [UI](./ui_design_brief.md)

---

## このドキュメントについて

ユーザーストーリーとは、**「誰が・何をしたい・なぜ」**をユーザーの視点で整理したものです。各ストーリーには**受け入れ基準**（Given-When-Then形式）がついています。
ストーリー形式: As a **[role/actor]**, I want **[feature/capability]**, so that **[benefit/value]**.

---

## ストーリーマップ

| エピック | Must                                 | Should                               | Could             |
| -------- | ------------------------------------ | ------------------------------------ | ----------------- |
| [Epic 1] | [US-001](#us-001), [US-002](#us-002) | [US-005](#us-005)                    | [US-010](#us-010) |
| [Epic 2] | [US-003](#us-003)                    | [US-006](#us-006), [US-007](#us-007) |                   |
| [Epic 3] | [US-004](#us-004)                    | [US-008](#us-008), [US-009](#us-009) | [US-011](#us-011) |

> **集計**: Must ***件 (***SP) / Should ***件 (***SP) / 合計 ***件 (***SP)

---

## エピック別ストーリー

### [Epic 1: エピック名] / [Epic Name]

> 💡 エピック = FRのカテゴリに対応

| US ID             | タイトル   | ソースFR                                      | 優先度 | SP  |
| ----------------- | ---------- | --------------------------------------------- | ------ | --- |
| [US-001](#us-001) | [タイトル] | [FR-001](./functional_requirements.md#fr-001) | Must   | —   |

<a id="us-001"></a>

#### US-001: [ストーリータイトル] — Must / Should / Could (SP)

**ソースFR:** [FR-001](./functional_requirements.md#fr-001), [FR-002](./functional_requirements.md#fr-002)

- **ストーリー / Story**: As a [アクター], I want [機能], so that [価値].
- **ストーリーポイント / Story Points**: [見積もり]
- **受け入れ基準 / Acceptance Criteria**:
  - [ ] Given [事前条件], When [アクション], Then [期待結果]
  - [ ] Given [代替条件], When [別のアクション], Then [期待動作]
  - [ ] Given [例外条件], When [エラー発生], Then [エラー処理]
- **備考 / Notes**: ...

---

<!-- US-002以降も同じ形式で追加 -->

<details><summary>書き方のヒント・INVEST原則</summary>

良いユーザーストーリーの例:
✅ As a 来店客, I want QRコードでメニューを閲覧できる,
so that スタッフを待たずに注文を検討できる.
❌ As a ユーザー, I want メニューを見たい, so that 便利.

受け入れ基準の例:
✅ Given メニュー画面を開いている,
When 「カテゴリ: ドリンク」をタップ,
Then ドリンクカテゴリの商品のみが表示される
❌ メニューがフィルタリングできる

INVEST原則:
I - Independent（独立している）
N - Negotiable（交渉可能）
V - Valuable（価値がある）
E - Estimable（見積もり可能）
S - Small（小さい）
T - Testable（テスト可能）

</details>

---

[← 非機能要件](./non_functional_requirements.md) | [📋 目次](./README.md) | [UL →](./ubiquitous_language.md)
