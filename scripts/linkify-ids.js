#!/usr/bin/env node
// linkify-ids.js — Detect and fix unlinked ID references in designs/*.md
//
// Usage:
//   node scripts/linkify-ids.js [path]        # detect only (exit 1 if found)
//   node scripts/linkify-ids.js --fix [path]   # detect and auto-fix
//
// [path] can be a directory or a single .md file.
// No external dependencies.

'use strict';

const fs = require('fs');
const path = require('path');

const ID_PATTERN = /(?:FR|NFR|US|SC|UL)-\d{3}/g;

// Map ID prefix to the file where its anchors are defined
const FILE_MAP = {
  FR: 'functional_requirements.md',
  NFR: 'non_functional_requirements.md',
  US: 'user_stories.md',
  UL: 'ubiquitous_language.md',
  SC: 'functional_requirements.md',
};

function buildLink(id, currentFile) {
  const prefix = id.split('-')[0];
  const anchor = id.toLowerCase();
  const targetFile = FILE_MAP[prefix];

  if (!targetFile || targetFile === currentFile) {
    return `[${id}](#${anchor})`;
  }
  return `[${id}](./${targetFile}#${anchor})`;
}

/**
 * Strip HTML comment regions from a line, returning only non-comment text.
 * Preserves character positions by replacing comment content with spaces.
 */
function stripComments(line, inComment) {
  let result = '';
  let i = 0;
  let commenting = inComment;

  while (i < line.length) {
    if (!commenting) {
      if (line.substring(i, i + 4) === '<!--') {
        commenting = true;
        result += '    '; // replace <!-- with spaces
        i += 4;
        continue;
      }
      result += line[i];
    } else {
      if (line.substring(i, i + 3) === '-->') {
        commenting = false;
        result += '   '; // replace --> with spaces
        i += 3;
        continue;
      }
      result += ' '; // replace comment char with space
    }
    i++;
  }

  return { text: result, inComment: commenting };
}

/**
 * Check if a match at the given position is already inside a markdown link.
 * Uses the ORIGINAL line (before any modifications) for reliable detection.
 */
function isInsideLink(line, matchIndex, matchLen) {
  // Check if inside an HTML anchor attribute: <a id="fr-001">
  const segment = line.substring(0, matchIndex + matchLen + 5);
  const lastAnchorOpen = segment.lastIndexOf('<a id="');
  if (lastAnchorOpen !== -1 && lastAnchorOpen < matchIndex) {
    const closingQuote = segment.indexOf('">', lastAnchorOpen + 7);
    if (closingQuote === -1 || closingQuote >= matchIndex) {
      return true; // Inside anchor attribute
    }
  }

  // Check if this ID is the text of a markdown link: [ID](...)
  // Look for the nearest enclosing [...](...)
  const before = line.substring(0, matchIndex);
  const after = line.substring(matchIndex + matchLen);

  // Direct check: immediately preceded by [ and followed by ](
  if (before.endsWith('[') && after.startsWith('](')) {
    return true;
  }

  // Check if inside link text: [some ID text](url)
  // Find the last unmatched [ before our position
  let bracketDepth = 0;
  for (let i = matchIndex - 1; i >= 0; i--) {
    if (line[i] === ']') bracketDepth++;
    if (line[i] === '[') {
      if (bracketDepth === 0) {
        // Found unmatched [. Check if there's a ]( that closes AFTER our position
        const closePos = line.indexOf('](', matchIndex);
        if (closePos !== -1 && closePos < line.indexOf('[', matchIndex + matchLen)) {
          return true;
        }
        // Also check if ]( immediately follows the match
        if (after.match(/^\]\(/)) {
          return true;
        }
        break;
      }
      bracketDepth--;
    }
  }

  return false;
}

function processFile(filepath, fix) {
  const currentFile = path.basename(filepath);
  let content;
  try {
    content = fs.readFileSync(filepath, 'utf-8');
  } catch (err) {
    console.error(`Error reading ${filepath}: ${err.message}`);
    return [];
  }

  // Normalize line endings to \n, remember if CRLF
  const hasCRLF = content.includes('\r\n');
  if (hasCRLF) content = content.replace(/\r\n/g, '\n');

  const lines = content.split('\n');
  const issues = [];
  let inCodeBlock = false;
  let inHtmlComment = false;

  const newLines = lines.map((line, idx) => {
    const lineNum = idx + 1;

    // Track fenced code blocks (``` or ~~~)
    if (/^(`{3,}|~{3,})/.test(line.trim())) {
      inCodeBlock = !inCodeBlock;
      return line;
    }
    if (inCodeBlock) return line;

    // Handle HTML comments — strip comment regions, process remainder
    const { text: uncommented, inComment: stillInComment } = stripComments(line, inHtmlComment);
    inHtmlComment = stillInComment;
    // If the entire line is inside a comment, skip
    if (uncommented.trim() === '') return line;

    // Skip lines that are ONLY an anchor tag (standalone anchor)
    if (line.trim().match(/^<a id="[^"]+"><\/a>$/)) return line;

    // Skip heading lines (definitions, not references)
    if (/^#{1,6}\s/.test(line.trim())) return line;

    // Find all ID matches in the uncommented text
    const matches = [...uncommented.matchAll(ID_PATTERN)];
    if (matches.length === 0) return line;

    // Process matches on the ORIGINAL line, using positions from uncommented text
    let newLine = line;
    let offset = 0;

    for (const match of matches) {
      const id = match[0];
      const posInUncommented = match.index;
      const adjustedPos = posInUncommented + offset;

      // Skip if already inside a markdown link (check original line)
      if (isInsideLink(newLine, adjustedPos, id.length)) continue;

      // Skip if inside bold markers: **FR-001**
      const bBefore = newLine.substring(Math.max(0, adjustedPos - 2), adjustedPos);
      const bAfter = newLine.substring(adjustedPos + id.length, adjustedPos + id.length + 2);
      if (bBefore === '**' && bAfter === '**') continue;

      const link = buildLink(id, currentFile);
      issues.push({
        file: currentFile,
        line: lineNum,
        id,
        context: line.trim().substring(0, 100),
      });

      if (fix) {
        newLine =
          newLine.substring(0, adjustedPos) + link + newLine.substring(adjustedPos + id.length);
        offset += link.length - id.length;
      }
    }

    return newLine;
  });

  if (fix && issues.length > 0) {
    let output = newLines.join('\n');
    if (hasCRLF) output = output.replace(/\n/g, '\r\n');

    // Atomic write: temp file then rename
    const tmpPath = filepath + '.tmp';
    fs.writeFileSync(tmpPath, output, 'utf-8');
    fs.renameSync(tmpPath, filepath);
  }

  return issues;
}

// --- Main ---
const args = process.argv.slice(2);
const fix = args.includes('--fix');
const dirArg = args.find((a) => a !== '--fix') || 'designs';
const targetPath = path.resolve(dirArg);

if (!fs.existsSync(targetPath)) {
  console.error(`Error: ${targetPath} not found`);
  process.exit(1);
}

let mdFiles;
if (fs.statSync(targetPath).isDirectory()) {
  mdFiles = fs
    .readdirSync(targetPath)
    .filter((f) => f.endsWith('.md') && !f.startsWith('.'))
    .map((f) => path.join(targetPath, f));
} else if (targetPath.endsWith('.md')) {
  mdFiles = [targetPath];
} else {
  console.error(`Error: ${targetPath} is not a directory or .md file`);
  process.exit(1);
}

if (mdFiles.length === 0) {
  console.error(`Error: No .md files found`);
  process.exit(1);
}

let totalIssues = 0;

for (const filepath of mdFiles) {
  const issues = processFile(filepath, fix);
  if (issues.length > 0) {
    const filename = path.basename(filepath);
    console.log(`\n${fix ? 'FIX' : 'WARN'}  ${filename}: ${issues.length} unlinked ID(s)`);
    for (const issue of issues) {
      console.log(`  L${issue.line}: ${issue.id} -- ${issue.context}`);
    }
    totalIssues += issues.length;
  }
}

if (totalIssues === 0) {
  console.log('OK: All ID references are properly linked.');
  process.exit(0);
} else if (fix) {
  console.log(`\nFIX: Fixed ${totalIssues} unlinked ID(s).`);
  process.exit(0);
} else {
  console.log(`\nFAIL: Found ${totalIssues} unlinked ID(s). Run with --fix to auto-link.`);
  process.exit(1);
}
