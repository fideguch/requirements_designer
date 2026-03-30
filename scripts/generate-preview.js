#!/usr/bin/env node
// generate-preview.js — Convert designs/*.md to HTML and open in browser
// Usage: node scripts/generate-preview.js [designs_dir]
// No external dependencies. Uses npx marked for MD→HTML conversion.

'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const os = require('os');

const DESIGNS_DIR = process.argv[2] || 'designs';
const OUTPUT_DIR = path.join(os.tmpdir(), 'designs-preview');

const FILE_ORDER = [
  { file: 'README.md', label: 'プロジェクト憲章' },
  { file: 'workflow_config.md', label: 'ワークフロー設定' },
  { file: 'functional_requirements.md', label: '機能要件' },
  { file: 'non_functional_requirements.md', label: '非機能要件' },
  { file: 'user_stories.md', label: 'ユーザーストーリー' },
  { file: 'ubiquitous_language.md', label: 'ユビキタス言語' },
  { file: 'ui_design_brief.md', label: 'UIデザインブリーフ' },
];

if (!fs.existsSync(DESIGNS_DIR)) {
  console.error(`Error: ${DESIGNS_DIR} not found`);
  process.exit(1);
}

// Collect existing files
const existingFiles = FILE_ORDER.filter((entry) =>
  fs.existsSync(path.join(DESIGNS_DIR, entry.file))
);

if (existingFiles.length === 0) {
  console.error(`Error: No .md files found in ${DESIGNS_DIR}`);
  process.exit(1);
}

// Ensure output directory
if (fs.existsSync(OUTPUT_DIR)) {
  fs.rmSync(OUTPUT_DIR, { recursive: true });
}
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

function mdToHtml(markdown) {
  return execSync('npx -y marked --gfm', {
    input: markdown,
    encoding: 'utf-8',
    timeout: 30000,
  });
}

function buildSidebar(activeFile) {
  const links = existingFiles.map((entry) => {
    const htmlFile = entry.file.replace(/\.md$/, '.html');
    const isActive = entry.file === activeFile;
    const cls = isActive ? ' class="active"' : '';
    return `    <a href="./${htmlFile}"${cls}>${entry.label}</a>`;
  });
  return `    <a href="./index.html"${activeFile === 'index' ? ' class="active"' : ''}>📋 目次</a>\n${links.join('\n')}`;
}

function wrapHtml(title, content, activeFile) {
  return `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/github-markdown-css@5/github-markdown-min.css">
  <style>
    body { display: flex; margin: 0; font-family: -apple-system, BlinkMacSystemFont, sans-serif; background: #fff; }
    .sidebar { width: 240px; min-height: 100vh; padding: 20px; background: #f6f8fa; border-right: 1px solid #d0d7de; position: fixed; overflow-y: auto; }
    .sidebar h3 { margin: 0 0 16px; font-size: 14px; color: #656d76; text-transform: uppercase; letter-spacing: 0.5px; }
    .sidebar a { display: block; padding: 6px 12px; margin: 2px 0; border-radius: 6px; text-decoration: none; color: #24292f; font-size: 14px; }
    .sidebar a:hover { background: #eaeef2; }
    .sidebar a.active { background: #ddf4ff; color: #0969da; font-weight: 600; }
    .main { margin-left: 280px; padding: 32px 40px; max-width: 980px; width: 100%; }
    .markdown-body { font-size: 16px; line-height: 1.8; }
    .markdown-body table { display: table; width: 100%; }
    @media (max-width: 768px) {
      .sidebar { display: none; }
      .main { margin-left: 0; padding: 16px; }
    }
  </style>
</head>
<body>
  <nav class="sidebar">
    <h3>Documents</h3>
${buildSidebar(activeFile)}
  </nav>
  <main class="main">
    <article class="markdown-body">
${content}
    </article>
  </main>
</body>
</html>`;
}

function convertLinks(html) {
  return html.replace(/href="\.\/([^"]+)\.md"/g, 'href="./$1.html"');
}

// Generate each file
console.log(`📖 Generating preview for ${existingFiles.length} files...`);

for (const entry of existingFiles) {
  const mdPath = path.join(DESIGNS_DIR, entry.file);
  const markdown = fs.readFileSync(mdPath, 'utf-8');
  const htmlContent = convertLinks(mdToHtml(markdown));
  const htmlFile = entry.file.replace(/\.md$/, '.html');
  const fullHtml = wrapHtml(`${entry.label}`, htmlContent, entry.file);
  fs.writeFileSync(path.join(OUTPUT_DIR, htmlFile), fullHtml, 'utf-8');
  console.log(`  ✓ ${entry.file} → ${htmlFile}`);
}

// Generate index.html
const indexItems = existingFiles
  .map((entry) => {
    const htmlFile = entry.file.replace(/\.md$/, '.html');
    return `<li><a href="./${htmlFile}">${entry.label}</a> <span style="color:#656d76">— ${entry.file}</span></li>`;
  })
  .join('\n      ');

const indexContent = `
<h1>📋 要件ドキュメント一覧</h1>
<p>このプロジェクトの要件定義ドキュメントです。各リンクをクリックして閲覧できます。</p>
<ul style="line-height:2.2; font-size:16px;">
      ${indexItems}
</ul>
<hr>
<p style="color:#656d76; font-size:14px;">ブラウザのタブを閉じて終了。ファイルを編集した場合は再度「プレビューして」で更新されます。</p>`;

fs.writeFileSync(
  path.join(OUTPUT_DIR, 'index.html'),
  wrapHtml('要件ドキュメント一覧', indexContent, 'index'),
  'utf-8'
);
console.log('  ✓ index.html');

// Open in browser
const indexPath = path.join(OUTPUT_DIR, 'index.html');
console.log(`\n📖 Opening preview: ${indexPath}`);

const openCmd = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
execSync(`${openCmd} "${indexPath}"`);

console.log('   Close the browser tab to finish.');
