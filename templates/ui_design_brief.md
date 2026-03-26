# UI Design Brief / UIデザインブリーフ

<!--
  このテンプレートはPhase 5A（UIデザインブリーフ）の出力です。
  Phase 5Aの対話Q&Aで収集した情報をもとに自動生成されます。
  後続のPhase 5B-5Eで参照されるため、正確に記入してください。
-->

---

## Document Info

- **Project**: [プロジェクト名]
- **Generated from**: designs/ v1.0
- **Last Updated**: [日付]

---

## 1. Platform & Responsive Strategy / プラットフォームとレスポンシブ戦略

<!-- 必須 -->

- **Target**: [Web / Mobile App / Both]
- **Primary approach**: [Desktop-first / Mobile-first]
- **Breakpoints**:
  - Mobile: 320px
  - Tablet: 768px
  - Desktop: 1024px
  - Wide: 1440px

---

## 2. Brand Identity / ブランドアイデンティティ

<!-- 必須 -->

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

<!-- 必須 -->

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

## 4. Accessibility / アクセシビリティ

<!-- 必須 -->

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

<!-- Phase 5B以降で自動更新 -->

- **FigJam (IA & Flows)**: [URL — Phase 5B完了時に記入]
- **Design File**: [URL — Phase 5C完了時に記入]

---

## 7. Screen Inventory / 画面インベントリ

<!-- Phase 5B完了時にuser_stories.mdから自動生成 -->

| Screen ID | Screen Name | Source US | Priority | Status |
| --------- | ----------- | --------- | -------- | ------ |
| SCR-001   |             | US-001    | Must     | -      |
| SCR-002   |             | US-002    | Must     | -      |
| SCR-003   |             | US-003    | Should   | -      |

Status: `-` = 未着手 / `WF` = ワイヤーフレーム完了 / `MK` = モックアップ完了

---

<!--
  ==========================================
  内部マッピング（スキル処理用 / ユーザーは無視してOK）
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
