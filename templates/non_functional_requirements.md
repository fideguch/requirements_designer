# 非機能要件

> [📋 目次](./README.md) | [設定](./workflow_config.md) | [機能要件](./functional_requirements.md) | **非機能要件** | [US](./user_stories.md) | [UL](./ubiquitous_language.md) | [UI](./ui_design_brief.md)

## このドキュメントについて

非機能要件とは、**「システムがどの程度の品質で動くべきか」**を定義したものです。エンジニアが技術選定やインフラ設計を行う際の判断基準になります。

---

## 要件サマリー

| カテゴリ       | Must                            | Should | 主要指標 | 目標値   |
| -------------- | ------------------------------- | ------ | -------- | -------- |
| パフォーマンス | [NFR-001](#nfr-001): [タイトル] | —      | [指標]   | [目標値] |

---

## カテゴリ別要件

### パフォーマンス

<a id="nfr-001"></a>

#### NFR-001: [要件タイトル] — Must / Should / Could

> **関連FR:** [FR-XXX](./functional_requirements.md#fr-xxx)

- **説明 / Description**: ...
- **指標 / Metric**: [レスポンスタイム、スループット等]
- **目標値 / Target**: [具体的な数値]
- **測定方法 / Measurement**: [どう測るか]

<details>
<summary>記入例: API レスポンスタイム</summary>

#### NFR-001: API レスポンスタイム

- **説明**: 主要APIエンドポイントのレスポンスタイム
- **指標**: 95パーセンタイルレスポンスタイム
- **目標値**: 200ms以内（GET）、500ms以内（POST）
- **測定方法**: APMツール（DataDog等）で継続監視
- **優先度**: Must
- **関連FR**: [FR-001](./functional_requirements.md#fr-001), [FR-005](./functional_requirements.md#fr-005)

</details>

---

### 可用性

<a id="nfr-002"></a>

#### NFR-00X: [要件タイトル] — Must / Should / Could

> **関連FR:** [FR-XXX](./functional_requirements.md#fr-xxx)

- **説明 / Description**: ...
- **指標 / Metric**: [稼働率、MTTR等]
- **目標値 / Target**: [具体的な数値]
- **測定方法 / Measurement**: [どう測るか]

<details>
<summary>記入例: サービス稼働率</summary>

#### NFR-00X: サービス稼働率

- **説明**: サービスの可用性目標
- **指標**: 月間稼働率
- **目標値**: 99.9%（月間ダウンタイム43分以内）
- **測定方法**: 外部監視サービス（UptimeRobot等）
- **優先度**: Must

</details>

---

### セキュリティ

<a id="nfr-003"></a>

#### NFR-00X: [要件タイトル] — Must / Should / Could

> **関連FR:** [FR-XXX](./functional_requirements.md#fr-xxx)

- **説明 / Description**: ...
- **指標 / Metric**: [準拠基準、脆弱性件数等]
- **目標値 / Target**: [具体的な数値・基準]
- **測定方法 / Measurement**: [どう測るか]

<details>
<summary>記入例: 認証・認可</summary>

#### NFR-00X: 認証・認可

- **説明**: ユーザー認証とアクセス制御
- **指標**: OWASP Top 10 準拠
- **目標値**: 全項目対応済み
- **測定方法**: 脆弱性スキャン（年2回）
- **優先度**: Must

</details>

---

### スケーラビリティ

<a id="nfr-004"></a>

#### NFR-00X: [要件タイトル] — Must / Should / Could

> **関連FR:** [FR-XXX](./functional_requirements.md#fr-xxx)

- **説明 / Description**: ...
- **指標 / Metric**: [同時接続数、処理件数等]
- **目標値 / Target**: [具体的な数値]
- **測定方法 / Measurement**: [どう測るか]

<details>
<summary>記入例: 水平スケーリング</summary>

#### NFR-00X: 水平スケーリング

- **説明**: 負荷増大時のスケーリング能力
- **指標**: 同時接続数
- **目標値**: 現在の3倍まで対応可能
- **測定方法**: 負荷テスト（k6, JMeter等）
- **優先度**: Should

</details>

---

### ユーザビリティ

<a id="nfr-005"></a>

#### NFR-00X: [要件タイトル] — Must / Should / Could

> **関連FR:** [FR-XXX](./functional_requirements.md#fr-xxx)

- **説明 / Description**: ...
- **指標 / Metric**: [完了率、エラー率等]
- **目標値 / Target**: [具体的な数値]
- **測定方法 / Measurement**: [どう測るか]

<details>
<summary>記入例: 初回利用完了率</summary>

#### NFR-00X: 初回利用完了率

- **説明**: 初めてのユーザーが主要タスクを完了できる割合
- **指標**: タスク完了率
- **目標値**: 90%以上（ユーザビリティテストで検証）
- **測定方法**: ユーザビリティテスト（5名以上）
- **優先度**: Should

</details>

---

### 保守性

<a id="nfr-006"></a>

#### NFR-00X: [要件タイトル] — Must / Should / Could

> **関連FR:** [FR-XXX](./functional_requirements.md#fr-xxx)

- **説明 / Description**: ...
- **指標 / Metric**: [カバレッジ、複雑度等]
- **目標値 / Target**: [具体的な数値]
- **測定方法 / Measurement**: [どう測るか]

<details>
<summary>記入例: テストカバレッジ</summary>

#### NFR-00X: テストカバレッジ

- **説明**: コードのテストカバレッジ維持
- **指標**: ラインカバレッジ
- **目標値**: 80%以上
- **測定方法**: CI/CDパイプライン内で自動計測
- **優先度**: Should

</details>

---

### 互換性

<a id="nfr-007"></a>

#### NFR-00X: [要件タイトル] — Must / Should / Could

> **関連FR:** [FR-XXX](./functional_requirements.md#fr-xxx)

- **説明 / Description**: ...
- **指標 / Metric**: [対応環境、バージョン等]
- **目標値 / Target**: [具体的な対応範囲]
- **測定方法 / Measurement**: [どう測るか]

<details>
<summary>記入例: ブラウザ対応</summary>

#### NFR-00X: ブラウザ対応

- **説明**: 対応するブラウザとバージョン
- **指標**: 対応ブラウザリスト
- **目標値**: Chrome/Safari/Firefox 最新2バージョン、iOS Safari、Android Chrome
- **測定方法**: E2Eテスト（Playwright等）
- **優先度**: Must

</details>

---

### 法規制・コンプライアンス

<a id="nfr-008"></a>

#### NFR-00X: [要件タイトル] — Must / Should / Could

> **関連FR:** [FR-XXX](./functional_requirements.md#fr-xxx)

- **説明 / Description**: ...
- **指標 / Metric**: [準拠法令、規格等]
- **目標値 / Target**: [準拠状態・対応内容]
- **測定方法 / Measurement**: [どう測るか]

<details>
<summary>記入例: 個人情報保護</summary>

#### NFR-00X: 個人情報保護

- **説明**: 個人情報の取り扱い
- **指標**: 個人情報保護法準拠
- **目標値**: プライバシーポリシー策定・同意取得実装
- **測定方法**: 法務レビュー
- **優先度**: Must

</details>

---

### データ

<a id="nfr-009"></a>

#### NFR-00X: [要件タイトル] — Must / Should / Could

> **関連FR:** [FR-XXX](./functional_requirements.md#fr-xxx)

- **説明 / Description**: ...
- **指標 / Metric**: [RPO、RTO、保存期間等]
- **目標値 / Target**: [具体的な数値]
- **測定方法 / Measurement**: [どう測るか]

<details>
<summary>記入例: バックアップ・復旧</summary>

#### NFR-00X: バックアップ・復旧

- **説明**: データのバックアップと災害復旧
- **指標**: RPO（Recovery Point Objective）/ RTO（Recovery Time Objective）
- **目標値**: RPO 1時間 / RTO 4時間
- **測定方法**: 復旧手順テスト（四半期ごと）
- **優先度**: Must

</details>

---

### 運用

<a id="nfr-010"></a>

#### NFR-00X: [要件タイトル] — Must / Should / Could

> **関連FR:** [FR-XXX](./functional_requirements.md#fr-xxx)

- **説明 / Description**: ...
- **指標 / Metric**: [通知時間、対応時間等]
- **目標値 / Target**: [具体的な数値]
- **測定方法 / Measurement**: [どう測るか]

<details>
<summary>記入例: 監視・アラート</summary>

#### NFR-00X: 監視・アラート

- **説明**: システム監視とアラート体制
- **指標**: アラート通知時間
- **目標値**: 異常検知から5分以内に通知
- **測定方法**: 監視ツール設定レビュー
- **優先度**: Must

</details>

---

[← 機能要件](./functional_requirements.md) | [📋 目次](./README.md) | [US →](./user_stories.md)
