# UIデザインブリーフ

> [📋 目次](./README.md) | [設定](./workflow_config.md) | [機能要件](./functional_requirements.md) | [非機能要件](./non_functional_requirements.md) | [US](./user_stories.md) | [UL](./ubiquitous_language.md) | **UI**

> 💡 Phase 5A の出力。対話 Q&A で収集したデザイン方針を記録します。

---

## Document Info

- **Project**: [プロジェクト名]
- **Generated from**: designs/ v1.0
- **Last Updated**: [日付]

---

## 1. Platform & Responsive Strategy / プラットフォームとレスポンシブ戦略

> **必須**

- **Target**: [Web / Mobile App / Both]
- **Primary approach**: [Desktop-first / Mobile-first]
- **Breakpoints**:
  - Mobile: 320px
  - Tablet: 768px
  - Desktop: 1024px
  - Wide: 1440px

---

## 2. Brand Identity / ブランドアイデンティティ

> **必須**

### Colors

| Role        | Color | HEX       | Usage                            |
| ----------- | ----- | --------- | -------------------------------- |
| Primary     |       | #**\_\_** | CTAボタン、主要アクセント        |
| Secondary   |       | #**\_\_** | セカンダリボタン、補助アクセント |
| Accent      |       | #**\_\_** | ハイライト、バッジ               |
| Neutral-50  |       | #**\_\_** | 背景色（最も明るい）             |
| Neutral-900 |       | #**\_\_** | テキスト色（最も暗い）           |
| Success     |       | #**\_\_** | 成功状態                         |
| Warning     |       | #**\_\_** | 警告状態                         |
| Error       |       | #**\_\_** | エラー状態                       |
| Info        |       | #**\_\_** | 情報状態                         |

### Typography

| Role           | Font Family | Size (Desktop) | Size (Mobile) | Weight   |
| -------------- | ----------- | -------------- | ------------- | -------- |
| Display / Hero |             | 96px           | 48px          | Bold     |
| H1             |             | 48px           | 32px          | Bold     |
| H2             |             | 36px           | 24px          | SemiBold |
| H3             |             | 24px           | 20px          | SemiBold |
| Body           |             | 16px           | 16px          | Regular  |
| Caption        |             | 14px           | 12px          | Regular  |
| Overline       |             | 12px           | 10px          | Medium   |

- **Japanese font**: [Noto Sans JP / Yu Gothic / etc.]

### Logo

- **Logo URL or description**: [URL / ファイルパス / 「未定」]

---

## 3. Design Style / デザインスタイル

> **必須**

- **Direction**: [Minimal / Editorial / Dashboard / Playful / Corporate]
- **Mood keywords**: [3-5 words, e.g., "clean, professional, trustworthy"]
- **Reference designs**:
  - [URL 1]
  - [URL 2]
  - [URL 3]

### Design Principles (from ui-ux-pro-max)

- **Hero element per section**: 各セクションに1つのヒーロー要素を設定
- **Spacing tokens**: Section 112px / Group 64px / Element 24px
- **Button style**: Primary = white bg, black text / Secondary = border only
- **Background**: Solid colors only, NO gradients

---

## 3.5. Trust Design Principles / 信頼設計原則

<!-- 信頼方程式（NNGroup 2026）: 信頼 = 透明性 × 制御 × 一貫性 × 障害時支援 -->

### Tier 1: 普遍的信頼パターン（全プロジェクト必須）

| パターン                               | 適用  | 設計メモ                                     |
| -------------------------------------- | ----- | -------------------------------------------- |
| P1: Visibility（状態可視性）           | ✓必須 | [操作結果表示: トースト/インライン/モーダル] |
| P2: User Control（制御）               | ✓必須 | [Undo提供: Yes. 時間窓: ___秒]               |
| P3: Error Prevention（エラー予防）     | ✓必須 | [確認ステップ対象: 削除/送信/___]            |
| P4: Consistency（一貫性）              | ✓必須 | [フィードバック統一ルール: ___]              |
| P5: Appropriate Friction（適切な摩擦） | ✓必須 | [プレビュー対象: ___]                        |
| P6: Audit & Undo（監査と取り消し）     | ✓必須 | [操作ログ表示: Yes/No. 保持期間: ___]        |
| P7: Feedback Loop（フィードバック）    | ✓必須 | [収集方法: 👍👎/NPS/コメント]                |

### Tier 2: AI強化信頼パターン（AI機能がある場合）

| パターン                   | 適用     | 設計メモ                                 |
| -------------------------- | -------- | ---------------------------------------- |
| P8: Intent Preview         | [Yes/No] | [不可逆操作のみ / 全操作]                |
| P9: Autonomy Dial          | [Yes/No] | [段階: 提案/計画/確認/自律]              |
| P10: Explainable Rationale | [Yes/No] | [一行理由/詳細パネル/プログレッシブ開示] |
| P11: Confidence Signal     | [Yes/No] | [カテゴリ/N-best/数値/可視化]            |
| P12: Escalation Pathway    | [Yes/No] | [明確化要求/選択肢/人間ルーティング]     |
| P13: Anti-Anthropomorphism | [Yes/No] | [禁止語彙リスト適用]                     |

### 信頼キャリブレーション4段階

- Pre-interaction: [___]
- Early usage: [___]
- Ongoing: [___]
- Error recovery: [___]

---

## 4. Accessibility / アクセシビリティ

> **必須**

- **Target level**: [WCAG 2.1 AA / AAA]
- **Contrast ratio**: Normal text ≥ 4.5:1, Large text ≥ 3:1
- **Touch target**: ≥ 44px x 44px
- **Language**: [ja / en / multi]
- **Dark mode**: [Yes / No / Future]

---

## 5. Existing Design System / 既存デザインシステム

- **Library URL**: [Figma URL / "None"]
- **Components to reuse**: [リスト / "None"]
- **Icon set**: [Lucide / Material / Heroicons / etc.]

---

## 6. Figma Files / Figmaファイル

> 💡 Phase 5B 以降で自動更新

- **FigJam (IA & Flows)**: [URL — Phase 5B完了時に記入]
- **Design File**: [URL — Phase 5C完了時に記入]

---

## 7. Screen Inventory / 画面インベントリ

> 💡 Phase 5B 完了時に user_stories.md から自動生成

| Screen ID | Screen Name | Source US | Priority | Status |
| --------- | ----------- | --------- | -------- | ------ |
| SCR-001   |             | US-001    | Must     | -      |
| SCR-002   |             | US-002    | Must     | -      |
| SCR-003   |             | US-003    | Should   | -      |

Status: `-` = 未着手 / `WF` = ワイヤーフレーム完了 / `MK` = モックアップ完了

---
[← UL](./ubiquitous_language.md) | [📋 目次](./README.md)

<!--
  ==========================================
  内部マッピング（処理用 / ユーザーは無視してOK）
  ==========================================
  Section 1 (Platform)       → Phase 5D レスポンシブフレームサイズ
  Section 2 (Brand)          → Phase 5C デザインシステム変数
  Section 3 (Style)          → Phase 5D/5E デザイン方向性
  Section 4 (Accessibility)  → Phase 5C/5E WCAG検証基準
  Section 5 (Existing DS)    → Phase 5C search_design_system入力
  Section 6 (Figma Files)    → Phase 5B/5C ファイルURL管理
  Section 7 (Screens)        → Phase 5D/5E 作業対象リスト
  ==========================================
-->
