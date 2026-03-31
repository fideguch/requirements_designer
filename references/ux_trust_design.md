# UX信頼設計リファレンス / UX Trust Design Reference

要件定義の全フェーズで参照する信頼設計のコンテンツハブ。
2層構造（Tier 1: 全プロジェクト / Tier 2: AI強化）で信頼設計を体系化する。

---

## 1. 信頼方程式（NNGroup 2026）

```
信頼 = 透明性 × 制御 × 一貫性 × 障害時支援
Trust = Transparency × Control × Consistency × Failure Support
```

この方程式は**全プロダクトに適用される普遍的原則**。AI機能がある場合、各要素がさらに増幅される。

---

## 2. 2層構造の概要

```
┌─────────────────────────────────────────────────┐
│ Tier 1: 普遍的信頼設計（全プロジェクト必須）       │
│   P1-P7: Nielsen ヒューリスティクス + 信頼固有原則 │
├─────────────────────────────────────────────────┤
│ Tier 2: AI強化信頼設計（AI機能がある場合に追加）   │
│   P8-P13: AI固有の信頼パターン                    │
└─────────────────────────────────────────────────┘
```

- **Tier 1 (P1-P7)**: 全プロジェクトで常時適用。Nielsen 10ヒューリスティクスの信頼4要素 + 信頼固有3原則
- **Tier 2 (P8-P13)**: AI機能検出時に追加適用。Google PAIR / Smashing Magazine / Microsoft の知見

---

## 3. Tier 1: 7つの普遍的信頼パターン（全プロジェクト必須）

### P1: Visibility（システム状態の可視性）

- **出典**: Nielsen #1, NNGroup, UX Design Institute
- **原則**: 操作結果・処理状態・変更内容をリアルタイムでフィードバック
- **適用例**: 保存完了トースト、処理中プログレスバー、変更diff表示
- **FR例**: 「全CRUD操作後に操作結果サマリを表示する」
- **成功指標**: ユーザーが操作結果を3秒以内に認知できる

### P2: User Control（ユーザー制御と自由）

- **出典**: Nielsen #3, Apple HIG, UX Design Institute
- **原則**: 明確な「非常口」、Undo/Redo、操作のキャンセル
- **適用例**: Gmail 30秒Undo、Figmaの履歴パネル、Ctrl+Z
- **FR例**: 「重要操作に取り消し機能を提供する」
- **NFR例**: 「Undo可能時間窓: 30秒以上」

### P3: Error Prevention & Recovery（エラー予防と回復）

- **出典**: Nielsen #5 + #9, Standard Beagle, Baymard Institute
- **原則**: 確認ダイアログでエラー予防、入力保持でデータロス防止、明確な回復ステップ
- **適用例**: 削除前の確認、フォーム入力の自動保存、エラー時の具体的修正案
- **FR例**: 「破壊的操作に確認ステップを設ける」
- **NFR例**: 「エラーメッセージに修正アクションを含む」

### P4: Consistency（一貫性と予測可能性）

- **出典**: Nielsen #4, NNGroup信頼方程式, UX Design Institute
- **原則**: 同じ操作は同じ結果、統一されたUI言語、予測可能な挙動
- **適用例**: Google Workspaceの統一デザイン、ステータス色の一貫性
- **NFR例**: 「操作フィードバックの形式を全機能で統一する」

### P5: Appropriate Friction（適切な摩擦）

- **出典**: Microsoft Collaborative UX, Baymard Institute
- **原則**: 重要な決定ポイントでユーザーを減速させ、所有権を確認
- **適用例**: 送信前プレビュー、引用付きファクトチェック促進、保存・共有時の確認
- **FR例**: 「重要操作前にプレビューを表示する」「外部公開時に確認ステップを設ける」

### P6: Action Audit & Undo（操作監査と取り消し）

- **出典**: Smashing Magazine, Apple HIG
- **原則**: 全操作の時系列ログ、目立つUndoボタン、履歴の保持
- **適用例**: 操作ログ画面、変更履歴タイムライン、以前の状態への復元
- **FR例**: 「操作履歴の表示機能を提供する」
- **NFR例**: 「操作ログの保持期間: 90日以上」

### P7: Feedback Loop（フィードバックループ）

- **出典**: Microsoft HAX Toolkit, NNGroup
- **原則**: ユーザーからのフィードバック収集→システム改善の可視化
- **適用例**: 「この結果は役に立ちましたか？」、NPS調査、フィードバック反映通知
- **FR例**: 「ユーザーフィードバック収集機能を提供する」

---

## 4. Tier 2: 6つのAI強化信頼パターン（AI機能プロジェクト）

### P8: Intent Preview（意図プレビュー）

- **原則**: AI操作前に「これを実行します。よろしいですか？」と確認
- **成功指標**: 編集なし受諾率 >85%
- **適用**: 不可逆操作には必須、低リスク操作はオプション

### P9: Autonomy Dial（自律度調整ダイヤル）

- **原則**: ユーザーがAIの自律レベルを制御できる4段階
- **4段階**: 観察&提案 → 計画&提示 → 確認付き実行 → 自律実行
- **設計指針**: デフォルトは低自律、信頼構築に応じて段階的に拡大

### P10: Explainable Rationale（説明可能な根拠）

- **出典**: Google PAIR（部分説明を推奨）
- **原則**: 「あなたがXと言ったから、Yをしました」形式の理由提示
- **設計指針**: 完全な説明より、ユーザーが検証可能な部分説明を優先

### P11: Confidence Signal（信頼度シグナル）

- **出典**: Google PAIR
- **4形式**: カテゴリ型（高/中/低）/ N-best（上位3候補）/ 数値型（87%）/ データ可視化
- **設計指針**: ユーザーの専門度に合わせた形式を選択

### P12: Escalation Pathway（エスカレーション経路）

- **原則**: AIが対応できない場合の明確なエスカレーション手段
- **3段階**: 明確化要求 → 選択肢提示 → 人間ルーティング
- **成功指標**: エスカレーション頻度5-15%、回復成功率>90%

### P13: Anti-Anthropomorphism（反擬人化）

- **出典**: Microsoft Copilot UX Guidance
- **禁止語彙**: 「理解する」「考える」「感じる」
- **推奨語彙**: 「処理する」「分析する」「生成する」
- **原則**: AIを人間として描写せず、ツールとして正確に表現する

---

## 5. 信頼キャリブレーション4段階

Google PAIR の信頼キャリブレーションを全プロダクト向けに適用:

| 段階            | 全プロダクト                         | AI強化時の追加                   |
| --------------- | ------------------------------------ | -------------------------------- |
| Pre-interaction | 機能説明・制約の期待値設定           | AI能力の明示・XAI                |
| Early usage     | チュートリアル・サンドボックス探索   | AI試行機能・低リスク操作から開始 |
| Ongoing         | 操作成功の積み重ね・段階的な機能開放 | 自動化範囲の段階的拡大           |
| Error recovery  | エラーからの復帰・回復ステップの明示 | 透明な障害説明・フォールバック   |

---

## 6. 信頼設計質問カタログ

### Round 3D: 信頼設計（全プロジェクト必須） — Q74-Q80

Phase 2 の機能要件抽出で使用。`references/question_bank.md` に統合済み。

### Round 3E: AI信頼設計（AI機能がある場合） — Q81-Q85

AI機能検出時にPhase 2で追加出題。`references/question_bank.md` に統合済み。

---

## 7. 信頼FRパターンテンプレート

13パターンから生成するFRテンプレート:

| パターン                        | FRテンプレート                                           | 成功指標               |
| ------------------------------- | -------------------------------------------------------- | ---------------------- |
| P1: Visibility                  | 「[操作]完了後に[フィードバック形式]で結果を表示する」   | 認知時間 <3秒          |
| P2: User Control                | 「[操作]に対してUndo機能を提供する」                     | Undo利用率、回復成功率 |
| P3: Error Prevention & Recovery | 「[破壊的操作]の前に確認ダイアログを表示する」           | 誤操作率の低減         |
| P4: Consistency                 | 「全機能で[フィードバック形式]を統一する」               | UI一貫性スコア         |
| P5: Appropriate Friction        | 「[重要操作]の前にプレビューを表示する」                 | 確認後の修正率         |
| P6: Action Audit & Undo         | 「操作履歴を[保持期間]保持し、表示する」                 | ログ参照率             |
| P7: Feedback Loop               | 「[フィードバック収集方法]でユーザー意見を収集する」     | 回答率                 |
| P8: Intent Preview              | 「AI操作前にプレビューを表示し確認を求める」             | 編集なし受諾率 >85%    |
| P9: Autonomy Dial               | 「AIの自律レベルを4段階で設定可能にする」                | 段階利用分布           |
| P10: Explainable Rationale      | 「AI判断の根拠を一行で表示する」                         | 説明理解度             |
| P11: Confidence Signal          | 「AI出力に信頼度を[形式]で表示する」                     | キャリブレーション精度 |
| P12: Escalation Pathway         | 「AIが対応できない場合のエスカレーション手段を提供する」 | 回復成功率 >90%        |
| P13: Anti-Anthropomorphism      | 「AI応答に禁止語彙リストを適用する」                     | 違反検出率 0%          |

---

## 8. 信頼NFRパターンテンプレート

### 全プロジェクト共通NFR

| カテゴリ           | NFRテンプレート                               | 推奨値        |
| ------------------ | --------------------------------------------- | ------------- |
| フィードバック遅延 | 「操作結果のフィードバック表示は[X]秒以内」   | 3秒以内       |
| エラー回復時間     | 「エラーからの回復に必要なステップは[X]以内」 | 3ステップ以内 |
| Undo時間窓         | 「取り消し可能な時間は[X]秒以上」             | 30秒以上      |
| 監査ログ保持       | 「操作ログの保持期間は[X]日以上」             | 90日以上      |
| 一貫性率           | 「フィードバック形式の統一率は[X]%以上」      | 95%以上       |

### AI固有NFR（Tier 2）

| カテゴリ               | NFRテンプレート                          | 推奨値  |
| ---------------------- | ---------------------------------------- | ------- |
| Intent Preview応答速度 | 「プレビュー生成は[X]秒以内」            | 2秒以内 |
| 説明可能性             | 「AI判断の根拠を[X]%の操作で提示」       | 100%    |
| エスカレーション率     | 「人間エスカレーションの頻度は[X]-[Y]%」 | 5-15%   |

---

## 9. UI実装パターンライブラリ

### 全プロジェクト共通UIパターン

| パターン       | UIコンポーネント                | 用途                                |
| -------------- | ------------------------------- | ----------------------------------- |
| トースト通知   | 画面下部の一時通知 + Undoリンク | P1: Visibility + P6: Undo           |
| プログレスバー | 処理進行状況の可視化            | P1: Visibility                      |
| 確認ダイアログ | 破壊的操作前のモーダル確認      | P3: Error Prevention + P5: Friction |
| Undoボタン     | 操作直後の取り消しCTA           | P2: Control + P6: Undo              |
| 操作ログパネル | 時系列の操作履歴                | P6: Audit                           |

### AI固有UIパターン（Tier 2）

| パターン           | UIコンポーネント             | 用途                                |
| ------------------ | ---------------------------- | ----------------------------------- |
| インライン推論     | AI判断根拠の折りたたみパネル | P10: Explainable Rationale          |
| 信頼度インジケータ | カテゴリ/数値のバッジ表示    | P11: Confidence Signal              |
| 判断境界表示       | AI自動判断と人間確認の閾値UI | P9: Autonomy Dial + P12: Escalation |

---

## 10. エンタープライズルール

### Apple HIG: 視覚階層

- AI出力は**出発点**として提示し、最終決定権はユーザーに
- 視覚的に明確なヒエラルキーで重要度を伝達

### Microsoft: 反擬人化ルール

- AI応答に「理解する」「考える」「感じる」を使用禁止
- 代替: 「処理する」「分析する」「生成する」「検出する」

### Microsoft: 適切な摩擦

- 重要な決定ポイントでは意図的にユーザーを減速させる
- 「本当に削除しますか？」ではなく、操作の影響範囲を具体的に表示

---

## 11. bochi教訓（実装から得られた知見）

### Spec-Fiction 検出

仕様に書かれているが実装されていないパターン。FRの受け入れ基準に「動作確認済み」を必須とする。

### Agent Skip 防止

自動化エージェントがスキップしがちな品質ゲート。HARD-GATEとしてブロッキング検証を設定する。

### 可視化パターン（Visibility の実例）

thinking → edit → final の3段階でAI処理の進行状況を可視化し、ユーザーの不安を低減。

### Evidence Gate (VP-4)

全スコアにコード参照・テスト出力・メトリクスの根拠を要求する。根拠なきスコアは無効。

### 用語分離

技術用語とユーザー向け用語を分離管理し、UIにはユーザー向け用語のみ表示。ubiquitous_language.md と連携。

---

## 12. 信頼設計スコア調整基準

既存の5次元品質スコアリングに対する信頼設計の加減点ルール（全プロジェクト適用）。

### 調整テーブル

| 次元         | 加点(+2)                                   | 減点(-2)                                   | 根拠            |
| ------------ | ------------------------------------------ | ------------------------------------------ | --------------- |
| 網羅性       | P1-P7中4以上のFRが存在                     | 信頼設計FR（可視性/制御/エラー回復）がゼロ | Nielsen         |
| 具体性       | エラーメッセージ仕様+Undo時間窓が具体的    | 「適切に表示」のみで仕組み不明             | Standard Beagle |
| テスト可能性 | 信頼ACがGWT+成功指標あり                   | 信頼要件がテスト不能                       | Smashing        |
| 一貫性       | UI言語/操作フィードバックが全機能で統一    | 機能ごとにフィードバック形式が異なる       | NNGroup         |
| 追跡可能性   | 信頼FRが信頼キャリブレーション段階に紐付け | 信頼FRが孤立                               | Google PAIR     |

### AI強化時の追加調整

Tier 2パターン(P8-P13)の適用状況で各次元さらに±1点の追加調整を行う。

---

## リサーチソース

- [Nielsen 10 Usability Heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/)
- [NNGroup: State of UX 2026](https://www.nngroup.com/articles/state-of-ux-2026/)
- [UX Design Institute: 7 Principles 2026](https://www.uxdesigninstitute.com/blog/ux-design-principles-2026/)
- [Google PAIR: Explainability + Trust](https://pair.withgoogle.com/chapter/explainability-trust/)
- [Smashing Magazine: Agentic AI UX](https://www.smashingmagazine.com/2026/02/designing-agentic-ai-practical-ux-patterns/)
- [Microsoft: Copilot UX Guidance](https://learn.microsoft.com/en-us/microsoft-cloud/dev/copilot/isv/ux-guidance)
- [Microsoft: HAX Toolkit](https://aka.ms/haxtoolkit/)
- [Apple HIG: Machine Learning](https://developer.apple.com/design/human-interface-guidelines/machine-learning)
- [Baymard Institute: Checkout UX 2025](https://baymard.com/blog/current-state-of-checkout-ux)
- [Standard Beagle: 13 Error Fixes for Trust](https://standardbeagle.com/improving-user-trust-through-ux-design/)
