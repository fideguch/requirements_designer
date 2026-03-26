# Ubiquitous Language Question Bank / ユビキタス言語質問カタログ

ユビキタス言語定義フェーズ（Phase 4C）で使用する質問集。
3ラウンド構成で、自動抽出用語の確認→ユーザー視点の精緻化→コード命名規則の順に進める。

---

## Phase 4C: ユビキタス言語定義 / Ubiquitous Language Definition

### Round 4C-1: 用語抽出・確認 / Term Extraction & Verification

1. **以下はFR/NFR/USから自動抽出したドメイン用語です。過不足はありますか？**
   Here are domain terms auto-extracted from FR/NFR/US. Any additions or removals?

2. **この中で、プロジェクト固有の意味を持つ用語はどれですか？（一般的な意味と異なるもの）**
   Which terms have project-specific meanings different from their general usage?

3. **このプロジェクトには異なる語彙体系を持つ領域（コンテキスト）がありますか？（例: 「注文」が顧客側と物流側で意味が違う等）**
   Does this project have distinct bounded contexts where the same term means different things?

4. **チーム内で用語の揺れ（同じ概念に複数の名前）が発生している箇所はありますか？**
   Are there cases where the team uses multiple names for the same concept?

5. **外部システム（API、サードパーティサービス）で使われている用語と、社内用語が異なるものはありますか？**
   Are there terms used by external systems (APIs, third-party services) that differ from internal terminology?

### Round 4C-2: ユーザー視点の精緻化 / User-Facing Language Refinement

6. **各機能名は、エンドユーザーがそのまま理解できる表現になっていますか？技術的すぎるものはありませんか？**
   Are feature names understandable to end users as-is? Any that are too technical?

7. **ユーザーはこの概念をどう呼びますか？（ユーザーインタビューや問い合わせで使われる言葉）**
   What do users call this concept? (Words used in interviews or support inquiries)

8. **ターゲットユーザーの技術レベルはどの程度ですか？（エンジニア / ビジネスユーザー / 一般消費者）**
   What is the target user's technical proficiency? (Engineer / Business user / General consumer)

9. **ロールによって異なる用語を使う必要がありますか？（例: 管理者は「テナント」、一般ユーザーは「ワークスペース」）**
   Do different roles need different terms? (e.g., admin says "tenant", user says "workspace")

10. **業界標準の用語で、ユーザーが当然期待するものはありますか？（例: ECなら「カート」「チェックアウト」）**
    Are there industry-standard terms users naturally expect? (e.g., "cart" and "checkout" for e-commerce)

### Round 4C-3: コード命名規則 / Code Naming Convention

11. **実装に使用するプログラミング言語とフレームワークは何ですか？**
    What programming language(s) and framework(s) will be used for implementation?

12. **既存のコードベースやスタイルガイドに従う命名規則はありますか？**
    Are there existing codebase conventions or style guides to follow?

13. **API のエンドポイント名は、ユーザー向け用語と技術用語のどちらに寄せますか？**
    Should API endpoint names lean toward user-facing terms or technical aliases?

14. **データベースのカラム名はドメインモデルの用語と完全に一致させますか？略語は許容しますか？**
    Should database column names exactly match domain model terms? Are abbreviations acceptable?

15. **フロントエンドのコンポーネント名とバックエンドのクラス名は同じドメイン用語で統一しますか？**
    Should frontend component names and backend class names use the same domain terms?

---

## ドメイン固有の補足質問 / Domain-Specific Supplements

### SaaS / マルチテナント

16. **「テナント」「ワークスペース」「組織」「アカウント」のうち、ユーザーに最もなじみのある表現は？**
    Which is most familiar to users: "tenant", "workspace", "organization", or "account"?

17. **プランやサブスクリプションに関する用語は？（「フリープラン」「エンタープライズ」等）**
    Subscription/plan terminology? ("Free plan", "Enterprise", etc.)

### ECサイト / マーケットプレイス

18. **「商品」「アイテム」「SKU」「プロダクト」のうち、ユーザーとシステムでそれぞれどれを使いますか？**
    Which do you use for users vs. system: "product", "item", "SKU"?

19. **購買フロー内の状態名（カート→注文確認→決済→配送）で社内とユーザー向けで異なる用語は？**
    Purchase flow state names that differ between internal and user-facing?

### 管理システム / ダッシュボード

20. **「ユーザー」「メンバー」「アカウント」「担当者」等、人を指す用語で最も適切なものは？**
    For referring to people: "user", "member", "account", "staff" — which is most appropriate?

21. **権限レベルの名前（「管理者」「編集者」「閲覧者」等）はユーザーに見せますか？内部用ですか？**
    Are permission level names ("admin", "editor", "viewer") user-facing or internal only?

### モバイルアプリ

22. **プッシュ通知のカテゴリ名（「お知らせ」「アラート」「リマインダー」等）の使い分けは？**
    How to differentiate notification categories: "announcement", "alert", "reminder"?

23. **オフライン時の状態表示に使う用語は？（「同期中」「オフライン」「更新待ち」等）**
    Terms for offline states: "syncing", "offline", "pending update"?
