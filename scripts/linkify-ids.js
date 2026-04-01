#!/usr/bin/env node
// linkify-ids.js — Detect and fix unlinked ID references in designs/*.md
//
// Usage:
//   node scripts/linkify-ids.js [designs_dir]        # detect only (exit 1 if found)
//   node scripts/linkify-ids.js --fix [designs_dir]   # detect and auto-fix
//
// No external dependencies. Uses line-based analysis with context-aware
// skipping (headings, anchor tags, HTML comments, code blocks).

'use strict';

const fs = require('fs');
const path = require('path');

const ID_PATTERN = /(?:FR|NFR|US|SC|UL)-\d{3}/g;
const LINKED_ID_PATTERN = /\[(?:FR|NFR|US|SC|UL)-\d{3}\]\(/g;

// Map ID prefix to the file where its anchors are defined
const FILE_MAP = {
  FR: 'functional_requirements.md',
  NFR: 'non_functional_requirements.md',
  US: 'user_stories.md',
  UL: 'ubiquitous_language.md',
  SC: 'functional_requirements.md', // SC anchors live in FR file
};

function buildLink(id, currentFile) {
  const prefix = id.split('-')[0];
  const anchor = id.toLowerCase().replace('-', '-');
  const targetFile = FILE_MAP[prefix];

  if (!targetFile) return `[${id}](#${anchor})`;

  if (targetFile === currentFile) {
    return `[${id}](#${anchor})`;
  }
  return `[${id}](./${targetFile}#${anchor})`;
}

function isInsideLink(line, matchIndex, matchStr) {
  // Check if this match is inside an HTML anchor tag: <a id="fr-001">
  const before = line.substring(0, matchIndex);
  if (before.includes('<a id="') && !before.includes('">')) {
    return true; // Inside an anchor tag attribute
  }

  // Check if this match is already part of a markdown link: [ID](...)
  const after = line.substring(matchIndex + matchStr.length);

  // Pattern: [...ID...](...)  — already linked
  const lastBracketOpen = before.lastIndexOf('[');
  const lastBracketClose = before.lastIndexOf(']');
  if (lastBracketOpen > lastBracketClose && after.startsWith('](')) {
    return true;
  }

  // Check if preceded by '[' (we're inside link text)
  if (lastBracketOpen > lastBracketClose) {
    // Verify there's a closing ]( after our position
    const closeIdx = line.indexOf('](', matchIndex);
    if (closeIdx !== -1) return true;
  }

  return false;
}

function processFile(filepath, fix) {
  const currentFile = path.basename(filepath);
  const content = fs.readFileSync(filepath, 'utf-8');
  const lines = content.split('\n');
  const issues = [];
  let inCodeBlock = false;
  let inHtmlComment = false;

  const newLines = lines.map((line, idx) => {
    const lineNum = idx + 1;

    // Track code blocks
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      return line;
    }
    if (inCodeBlock) return line;

    // Track HTML comments (multi-line)
    if (line.includes('<!--')) inHtmlComment = true;
    if (line.includes('-->')) {
      inHtmlComment = false;
      return line;
    }
    if (inHtmlComment) return line;

    // Note: lines with <a id=...> may also contain linkable IDs in table cells
    // Only skip if the ENTIRE line is just an anchor tag
    if (line.trim().startsWith('<a id=') && line.trim().endsWith('</a>')) return line;

    // Skip heading lines (#### FR-001: Title — these are definitions, not references)
    if (/^#{1,6}\s/.test(line.trim())) return line;

    // Find all ID matches in this line
    let newLine = line;
    let offset = 0;
    const matches = [...line.matchAll(ID_PATTERN)];

    for (const match of matches) {
      const id = match[0];
      const originalIndex = match.index;
      const adjustedIndex = originalIndex + offset;

      // Skip if already inside a markdown link
      if (isInsideLink(newLine, adjustedIndex, id)) continue;

      // Skip if inside bold markers for ID rule section (e.g., **FR-001**)
      const surroundingBefore = newLine.substring(Math.max(0, adjustedIndex - 3), adjustedIndex);
      const surroundingAfter = newLine.substring(adjustedIndex + id.length, adjustedIndex + id.length + 3);
      if (surroundingBefore.includes('**') && surroundingAfter.includes('**')) continue;

      const link = buildLink(id, currentFile);
      issues.push({
        file: currentFile,
        line: lineNum,
        id,
        context: line.trim().substring(0, 100),
      });

      if (fix) {
        newLine = newLine.substring(0, adjustedIndex) + link + newLine.substring(adjustedIndex + id.length);
        offset += link.length - id.length;
      }
    }

    return newLine;
  });

  if (fix && issues.length > 0) {
    fs.writeFileSync(filepath, newLines.join('\n'), 'utf-8');
  }

  return issues;
}

// --- Main ---
const args = process.argv.slice(2);
const fix = args.includes('--fix');
const dirArg = args.find((a) => a !== '--fix') || 'designs';
const designsDir = path.resolve(dirArg);

if (!fs.existsSync(designsDir)) {
  console.error(`Error: ${designsDir} not found`);
  process.exit(1);
}

// Support both directory and single file input
let mdFiles;
if (fs.statSync(designsDir).isDirectory()) {
  mdFiles = fs
    .readdirSync(designsDir)
    .filter((f) => f.endsWith('.md') && !f.startsWith('.'))
    .map((f) => path.join(designsDir, f));
} else if (designsDir.endsWith('.md')) {
  mdFiles = [designsDir];
} else {
  console.error(`Error: ${designsDir} is not a directory or .md file`);
  process.exit(1);
}

if (mdFiles.length === 0) {
  console.error(`Error: No .md files found in ${designsDir}`);
  process.exit(1);
}

let totalIssues = 0;

for (const filepath of mdFiles) {
  const issues = processFile(filepath, fix);
  if (issues.length > 0) {
    const filename = path.basename(filepath);
    console.log(`\n${fix ? '🔧' : '⚠️'}  ${filename}: ${issues.length} unlinked ID(s)`);
    for (const issue of issues) {
      console.log(`  L${issue.line}: ${issue.id} — ${issue.context}`);
    }
    totalIssues += issues.length;
  }
}

if (totalIssues === 0) {
  console.log('✅ All ID references are properly linked.');
  process.exit(0);
} else if (fix) {
  console.log(`\n🔧 Fixed ${totalIssues} unlinked ID(s).`);
  process.exit(0);
} else {
  console.log(`\n❌ Found ${totalIssues} unlinked ID(s). Run with --fix to auto-link.`);
  process.exit(1);
}
