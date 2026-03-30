# ユーザーストーリー

> [📋 目次](./README.md) | [設定](./workflow_config.md) | [機能要件](./functional_requirements.md) | [非機能要件](./non_functional_requirements.md) | **US** | [UL](./ubiquitous_language.md) | [UI](./ui_design_brief.md)

---

## Document Info

- Project: [プロジェクト名]
- Generated from: functional_requirements.md v1.0
- Last Updated: [日付]

---

## Story Format

> As a **[role/actor]**, I want **[feature/capability]**, so that **[benefit/value]**.

各ストーリーには受け入れ基準（Acceptance Criteria）を **Given-When-Then** 形式で記載する。

---

## Stories by Epic

### [Epic 1: エピック名] / [Epic Name]

> 💡 エピック = FRのカテゴリに対応

#### US-001: [ストーリータイトル]

- **ストーリー / Story**: As a [アクター], I want [機能], so that [価値].
- **ソースFR / Source FR**: FR-001, FR-002
- **優先度 / Priority**: Must / Should / Could
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

## Story Map Overview / ストーリーマップ

| エピック | Must           | Should         | Could  |
| -------- | -------------- | -------------- | ------ |
| [Epic 1] | US-001, US-002 | US-005         | US-010 |
| [Epic 2] | US-003         | US-006, US-007 |        |
| [Epic 3] | US-004         | US-008, US-009 | US-011 |

---

## Summary / サマリー

| 優先度   | 件数 | ストーリーポイント合計 |
| -------- | ---- | ---------------------- |
| Must     |      |                        |
| Should   |      |                        |
| Could    |      |                        |
| **合計** |      |                        |

---

[← 非機能要件](./non_functional_requirements.md) | [📋 目次](./README.md) | [UL →](./ubiquitous_language.md)
