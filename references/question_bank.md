# Question Bank / 質問カタログ

要件定義の各フェーズで使用する質問集。1ラウンドにつき3〜5問をバッチ出題する。
ユーザーの回答状況やドメインに応じて適切な質問を選択する。

---

## Phase 1: プロジェクト理解 / Project Understanding

### Round 1A: 全体像 / Big Picture

1. **このシステムは何の問題を解決しますか？誰のためですか？**
   What problem does this system solve? Who is it for?

2. **主なユーザー/アクターは誰ですか？それぞれの役割は？**
   Who are the primary actors/users? What are their roles?

3. **明確にスコープ外とするものは何ですか？**
   What is explicitly out of scope?

4. **連携が必要な既存システムはありますか？**
   Are there existing systems this must integrate with?

5. **成功とは何ですか？どう測定しますか？**
   What does success look like? How will you measure it?

### Round 1B: 制約と背景 / Constraints & Context

6. **スケジュールや予算の制約はありますか？**
   Timeline and budget constraints?

7. **技術的な制約や希望はありますか？（言語、フレームワーク、インフラ等）**
   Technology constraints or preferences?

8. **法規制やコンプライアンス要件はありますか？**
   Regulatory or compliance requirements?

9. **チーム規模と構成は？（社内/外部委託、スキルセット）**
   Team size and composition?

10. **競合や参考にしているサービスはありますか？**
    Are there competitors or reference services?

---

## Phase 2: 機能要件の抽出 / Functional Requirements

### Round 2A: コア機能 / Core Features

11. **各アクターが行う主要なアクション（操作）を列挙してください。**
    List the main actions each actor performs.

12. **最も重要なユーザーフローを最初から最後まで教えてください。**
    Walk me through the most important user flow end-to-end.

13. **各アクターが作成・参照・更新・削除するデータは何ですか？**
    What data does each actor create, read, update, or delete?

14. **システムが生成する通知やアラートはありますか？**
    What notifications or alerts does the system produce?

15. **ユーザーの認証方法は？（メール/パスワード、SSO、OAuth等）**
    How do users authenticate?

### Round 2B: エッジケースと詳細 / Edge Cases & Details

16. **[特定のステップ]が失敗したらどうなりますか？**
    What happens when [specific step] fails?

17. **承認や確認のステップはありますか？（ワークフロー）**
    Are there approval or confirmation steps?

18. **権限レベルや認可ルールはありますか？（誰が何をできるか）**
    What are the permission levels / authorization rules?

19. **入力時のデータバリデーションはどうあるべきですか？**
    How should data be validated at input?

20. **同時編集や競合状態はどう扱いますか？**
    How should concurrent edits or race conditions be handled?

### Round 2C: 補完 / Completeness Check

21. **バッチ処理やスケジュール実行される処理はありますか？**
    Are there batch or scheduled operations?

22. **レポートや分析機能は必要ですか？どんな指標を見たいですか？**
    What reporting or analytics features are needed?

23. **管理者向けの機能は何が必要ですか？**
    What admin or management capabilities are required?

24. **エラーはユーザーにどう伝えますか？（画面表示、メール、通知等）**
    How are errors communicated to users?

25. **データのインポート/エクスポート機能は必要ですか？**
    Are import/export capabilities needed?

26. **検索やフィルタリング機能は必要ですか？何を検索しますか？**
    Are search or filtering features needed? What can be searched?

27. **多言語対応は必要ですか？どの言語？**
    Is localization needed? Which languages?

28. **ファイルアップロード機能は必要ですか？（種類、サイズ上限）**
    Are file upload capabilities needed?

---

## Phase 3: 非機能要件の抽出 / Non-Functional Requirements

### Round 3A: パフォーマンスと信頼性 / Performance & Reliability

29. **想定される同時ユーザー数は？ピーク時の負荷は？**
    Expected concurrent users? Peak load?

30. **主要操作の許容レスポンスタイムは？**
    Acceptable response time for key operations?

31. **必要な稼働率は？（99.9%? 99.99%?）**
    Required uptime / availability?

32. **災害復旧要件は？RPO（データ損失許容時間）/ RTO（復旧時間目標）は？**
    Disaster recovery requirements? RPO/RTO?

33. **データ量の増加ペースは？1年後の想定は？**
    Data growth rate? Expected volume in one year?

### Round 3B: セキュリティと運用 / Security & Operations

34. **認証方式は？（SSO、OAuth、MFA等）**
    Authentication method?

35. **データの機密性レベルは？暗号化要件は？**
    Data sensitivity level? Encryption requirements?

36. **監査ログの要件はありますか？（誰が何をいつ操作したか）**
    Audit logging requirements?

37. **デプロイ環境は？（クラウド、オンプレミス、ハイブリッド）**
    Deployment environment?

38. **CI/CDやデプロイ頻度の要件は？**
    CI/CD or deployment frequency requirements?

### Round 3C: 品質と保守性 / Quality & Maintenance

39. **対応するブラウザ/デバイス/OSは？**
    Supported browsers/devices/OS?

40. **アクセシビリティ要件は？（WCAG準拠レベル）**
    Accessibility requirements?

41. **多言語/国際化の対応は必要ですか？**
    Localization / internationalization needs?

42. **データ保持期間とバックアップポリシーは？**
    Data retention and backup policies?

43. **監視・アラートの要件は？（何を監視し、誰に通知するか）**
    Monitoring and alerting requirements?

---

## ドメイン固有の補足質問 / Domain-Specific Supplements

### Webアプリケーション

44. **SEO対策は必要ですか？**
45. **サードパーティ分析ツール（GA4等）の導入は？**
46. **CDN利用は想定していますか？**

### モバイルアプリ

47. **iOS/Android両対応ですか？片方のみ？**
48. **プッシュ通知は必要ですか？**
49. **オフライン機能は必要ですか？**

### API / バックエンド

50. **外部公開APIですか？内部利用のみですか？**
51. **レート制限やクォータは必要ですか？**
52. **APIバージョニング戦略は？**

### データパイプライン

53. **リアルタイム処理ですか？バッチ処理ですか？**
54. **データソースは何ですか？（DB、API、ファイル等）**
55. **データ品質の検証ルールはありますか？**

---

## Phase 1 エンハンス: 対話型リサーチ / Enhance Mode: Interactive Research

### Round E1A: プロダクト基本情報 / Product Basics

56. **プロダクトの名前とURLを教えてください**
    What is the product name and URL?

57. **このプロダクトの主な機能を簡単に説明してください**
    Briefly describe the product's main features.

58. **ターゲットユーザーは誰ですか？**
    Who are the target users?

59. **技術スタックは何を使っていますか？（わかる範囲で）**
    What tech stack is used? (as far as you know)

### Round E1B: 変更の背景 / Change Context

60. **今回の変更のきっかけは何ですか？**
    What triggered this change? (user feedback, business strategy, tech debt)

61. **この変更で達成したい目標は何ですか？**
    What goals do you want to achieve with this change?

62. **変更のスコープ: 影響範囲はプロダクト全体？特定の機能？**
    Change scope: entire product or specific features?

---

## Phase 2 エンハンス: 変更ヒアリング / Enhance Mode: Change Hearing

### Round E2A: 変更の特定 / Change Identification

63. **追加したい機能・振る舞いは何ですか？**
    What features or behaviors do you want to add?

64. **修正が必要な既存機能はありますか？どう変えたいですか？**
    Are there existing features that need modification? How?

65. **削除・廃止する機能はありますか？**
    Are any features being removed or deprecated?

66. **変更しない部分は何ですか？**
    What parts of the product will NOT change?

### Round E2B: 変更の詳細 / Change Details

67. **各変更について: 現状の振る舞いと目標の振る舞いを教えてください**
    For each change: describe current behavior and target behavior.

68. **変更による他機能への影響はありますか？**
    Will these changes affect other features?

69. **データモデルの変更は必要ですか？**
    Are data model changes required?

70. **既存ユーザーへの影響は？マイグレーションは必要ですか？**
    Impact on existing users? Is migration needed?

### Round E2C (任意): 影響分析 / Impact Analysis

71. **既存機能との衝突・依存関係はありますか？**
    Are there conflicts or dependencies with existing features?

72. **リグレッションリスクが高い箇所はどこですか？**
    Where is the highest regression risk?

73. **パフォーマンスやセキュリティへの影響はありますか？**
    Any performance or security implications?
