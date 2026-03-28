# Contributing Guide

## 開発フロー

### 1. Issue の作成

- [機能要望テンプレート](/.github/ISSUE_TEMPLATE/feature_request.yml) または [バグ報告テンプレート](/.github/ISSUE_TEMPLATE/bug_report.yml) を使用

### 2. ブランチの作成

```bash
# 機能追加
git checkout -b feature/<issue番号>-<概要>

# バグ修正
git checkout -b fix/<issue番号>-<概要>

# リファクタリング
git checkout -b refactor/<issue番号>-<概要>
```

### 3. コミットメッセージ

```
<type>: <概要> (#<issue番号>)

<詳細説明（任意）>
```

**type 一覧:**

- `feat`: 新機能（フェーズ追加、トリガー追加等）
- `fix`: バグ修正
- `refactor`: リファクタリング
- `docs`: ドキュメント
- `test`: テスト追加・修正
- `chore`: CI/インフラ・その他

### 4. ローカル検証（PR 作成前に必須）

```bash
npm run quality    # lint + typecheck + format:check
npm test           # Playwright リグレッションテスト (~200件)
```

### 5. SKILL.md 変更時の注意（CRITICAL）

SKILL.md を変更する場合、以下の 4 箇所を必ず同時に更新すること:

1. **SKILL.md** — フロントマター、ヘルプ、進捗検出、フェーズセクション、Reference Files テーブル
2. **README.md** — 概要、ドキュメント一覧、Phase 説明、ファイル構成
3. **scripts/scaffold-requirements.sh** — テンプレートコピー、フラグ対応
4. **tests/skill-structure.spec.ts** — ファイル存在、コンテンツ、クロスリファレンステスト

### 6. Pull Request の作成

- [PR テンプレート](/.github/pull_request_template.md) に沿って記述
- `closes #XX` で関連 Issue を紐付け

### 7. コードレビュー

- 最低 1 名のレビュー承認が必要
- CI チェック（lint, typecheck, format:check, test）が全て通過していること

### 8. マージ

- Squash merge を推奨

## ステータスワークフロー

```
Backlog → In Progress → Review → Done
```

## ラベル

| カテゴリ | ラベル       | 説明             |
| -------- | ------------ | ---------------- |
| Type     | `feature`    | 新機能追加       |
| Type     | `bug`        | バグ修正         |
| Type     | `docs`       | ドキュメント     |
| Area     | `skill`      | SKILL.md 変更    |
| Area     | `templates`  | テンプレート変更 |
| Area     | `references` | リファレンス変更 |
| Area     | `test`       | テスト変更       |
| Area     | `infra`      | CI/インフラ変更  |
