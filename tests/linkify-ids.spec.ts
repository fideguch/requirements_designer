import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { execSync } from 'child_process';

const SCRIPT = path.resolve(__dirname, '..', 'scripts', 'linkify-ids.js');

function createTempDir(): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'linkify-ids-'));
}

function writeMd(dir: string, name: string, content: string): string {
  const fp = path.join(dir, name);
  fs.writeFileSync(fp, content, 'utf-8');
  return fp;
}

function run(args: string): { stdout: string; stderr: string; exitCode: number } {
  try {
    const stdout = execSync(`node "${SCRIPT}" ${args}`, {
      encoding: 'utf-8',
      timeout: 10000,
    });
    return { stdout, stderr: '', exitCode: 0 };
  } catch (err: unknown) {
    const e = err as { stdout?: string; stderr?: string; status?: number };
    return {
      stdout: e.stdout ?? '',
      stderr: e.stderr ?? '',
      exitCode: e.status ?? 1,
    };
  }
}

function cleanup(dir: string): void {
  fs.rmSync(dir, { recursive: true, force: true });
}

// ============================================================
// linkify-ids.js — Detection
// ============================================================
test.describe('linkify-ids: Detection', () => {
  test('detects bare unlinked ID reference', () => {
    const dir = createTempDir();
    try {
      writeMd(dir, 'test.md', 'This references FR-001 in text.\n');
      const result = run(dir);
      expect(result.exitCode).toBe(1);
      expect(result.stdout).toContain('FR-001');
    } finally {
      cleanup(dir);
    }
  });

  test('detects multiple IDs on one line', () => {
    const dir = createTempDir();
    try {
      writeMd(dir, 'test.md', 'See FR-001 and US-002 and NFR-003.\n');
      const result = run(dir);
      expect(result.exitCode).toBe(1);
      expect(result.stdout).toContain('FR-001');
      expect(result.stdout).toContain('US-002');
      expect(result.stdout).toContain('NFR-003');
    } finally {
      cleanup(dir);
    }
  });
});

// ============================================================
// linkify-ids.js — Skip patterns
// ============================================================
test.describe('linkify-ids: Skip patterns', () => {
  test('skips IDs inside HTML comments', () => {
    const dir = createTempDir();
    try {
      writeMd(dir, 'test.md', '<!-- FR-001 is commented out -->\n');
      const result = run(dir);
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('OK');
    } finally {
      cleanup(dir);
    }
  });

  test('skips IDs inside fenced code blocks (```)', () => {
    const dir = createTempDir();
    try {
      writeMd(dir, 'test.md', '```\nFR-001\n```\n');
      const result = run(dir);
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('OK');
    } finally {
      cleanup(dir);
    }
  });

  test('skips IDs inside tilde code blocks (~~~)', () => {
    const dir = createTempDir();
    try {
      writeMd(dir, 'test.md', '~~~\nFR-001\n~~~\n');
      const result = run(dir);
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('OK');
    } finally {
      cleanup(dir);
    }
  });

  test('skips IDs in heading lines', () => {
    const dir = createTempDir();
    try {
      writeMd(dir, 'test.md', '## FR-001: Some heading\n');
      const result = run(dir);
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('OK');
    } finally {
      cleanup(dir);
    }
  });

  test('skips already-linked IDs', () => {
    const dir = createTempDir();
    try {
      writeMd(dir, 'test.md', 'See [FR-001](#fr-001) for details.\n');
      const result = run(dir);
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('OK');
    } finally {
      cleanup(dir);
    }
  });

  test('skips bold IDs (**FR-001**)', () => {
    const dir = createTempDir();
    try {
      writeMd(dir, 'test.md', 'The **FR-001** requirement.\n');
      const result = run(dir);
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('OK');
    } finally {
      cleanup(dir);
    }
  });

  test('skips standalone anchor tag lines', () => {
    const dir = createTempDir();
    try {
      writeMd(dir, 'test.md', '<a id="fr-001"></a>\n');
      const result = run(dir);
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('OK');
    } finally {
      cleanup(dir);
    }
  });
});

// ============================================================
// linkify-ids.js — Fix mode
// ============================================================
test.describe('linkify-ids: Fix mode', () => {
  test('--fix converts bare ID to markdown link', () => {
    const dir = createTempDir();
    try {
      const fp = writeMd(dir, 'test.md', 'See FR-001 here.\n');
      const result = run(`--fix ${dir}`);
      expect(result.exitCode).toBe(0);
      const content = fs.readFileSync(fp, 'utf-8');
      expect(content).toContain('[FR-001]');
    } finally {
      cleanup(dir);
    }
  });

  test('--fix creates cross-file link for different target file', () => {
    const dir = createTempDir();
    try {
      const fp = writeMd(dir, 'user_stories.md', 'Implements FR-001.\n');
      run(`--fix ${dir}`);
      const content = fs.readFileSync(fp, 'utf-8');
      expect(content).toContain('[FR-001](./functional_requirements.md#fr-001)');
    } finally {
      cleanup(dir);
    }
  });

  test('--fix creates same-file anchor link', () => {
    const dir = createTempDir();
    try {
      const fp = writeMd(dir, 'functional_requirements.md', 'Related to FR-002.\n');
      run(`--fix ${dir}`);
      const content = fs.readFileSync(fp, 'utf-8');
      expect(content).toContain('[FR-002](#fr-002)');
      expect(content).not.toContain('./');
    } finally {
      cleanup(dir);
    }
  });

  test('--fix preserves CRLF line endings', () => {
    const dir = createTempDir();
    try {
      const fp = writeMd(dir, 'test.md', 'Line one FR-001.\r\nLine two.\r\n');
      run(`--fix ${dir}`);
      const content = fs.readFileSync(fp, 'utf-8');
      expect(content).toContain('\r\n');
    } finally {
      cleanup(dir);
    }
  });

  test('--fix leaves no .tmp file (atomic write)', () => {
    const dir = createTempDir();
    try {
      writeMd(dir, 'test.md', 'See FR-001 here.\n');
      run(`--fix ${dir}`);
      const files = fs.readdirSync(dir);
      expect(files.filter((f) => f.endsWith('.tmp'))).toHaveLength(0);
    } finally {
      cleanup(dir);
    }
  });

  test('--fix is idempotent (running twice gives same result)', () => {
    const dir = createTempDir();
    try {
      writeMd(dir, 'test.md', 'See FR-001 and US-001 here.\n');
      run(`--fix ${dir}`);
      const fp = path.join(dir, 'test.md');
      const afterFirst = fs.readFileSync(fp, 'utf-8');
      run(`--fix ${dir}`);
      const afterSecond = fs.readFileSync(fp, 'utf-8');
      expect(afterSecond).toBe(afterFirst);
    } finally {
      cleanup(dir);
    }
  });
});

// ============================================================
// linkify-ids.js — All linked (success)
// ============================================================
test.describe('linkify-ids: All linked', () => {
  test('exits 0 with OK when all IDs are already linked', () => {
    const dir = createTempDir();
    try {
      writeMd(dir, 'test.md', 'See [FR-001](#fr-001) and [US-002](./user_stories.md#us-002).\n');
      const result = run(dir);
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('OK');
    } finally {
      cleanup(dir);
    }
  });
});

// ============================================================
// linkify-ids.js — README reference detection & fix
// ============================================================
test.describe('linkify-ids: README references', () => {
  test('detects plain "README §3" reference', () => {
    const dir = createTempDir();
    try {
      writeMd(
        dir,
        'ubiquitous_language.md',
        '| UL-001 | 用語 | UIラベル | 定義 | README §3 | SC-001 | 備考 |\n'
      );
      const result = run(dir);
      expect(result.exitCode).toBe(1);
      expect(result.stdout).toContain('README');
    } finally {
      cleanup(dir);
    }
  });

  test('detects plain "README KPI" reference', () => {
    const dir = createTempDir();
    try {
      writeMd(
        dir,
        'ubiquitous_language.md',
        '| UL-002 | 指標 | KPI | 定義 | README KPI | SC-002 | 備考 |\n'
      );
      const result = run(dir);
      expect(result.exitCode).toBe(1);
      expect(result.stdout).toContain('README');
    } finally {
      cleanup(dir);
    }
  });

  test('skips already-linked README reference', () => {
    const dir = createTempDir();
    try {
      writeMd(dir, 'test.md', 'See [README](./README.md) for details.\n');
      const result = run(dir);
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('OK');
    } finally {
      cleanup(dir);
    }
  });

  test('skips README in file path context (./README.md)', () => {
    const dir = createTempDir();
    try {
      writeMd(dir, 'test.md', 'Defined in ./README.md section 3.\n');
      const result = run(dir);
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('OK');
    } finally {
      cleanup(dir);
    }
  });

  test('--fix converts "README §3" to markdown link', () => {
    const dir = createTempDir();
    try {
      const fp = writeMd(dir, 'ubiquitous_language.md', '| UL-001 | 用語 | 定義 | README §3 |\n');
      run(`--fix ${dir}`);
      const content = fs.readFileSync(fp, 'utf-8');
      expect(content).toContain('[README](./README.md)');
      expect(content).not.toContain('README §3');
    } finally {
      cleanup(dir);
    }
  });

  test('--fix converts standalone "README" in table cell', () => {
    const dir = createTempDir();
    try {
      const fp = writeMd(dir, 'test.md', '| ソース | README |\n');
      run(`--fix ${dir}`);
      const content = fs.readFileSync(fp, 'utf-8');
      expect(content).toContain('[README](./README.md)');
    } finally {
      cleanup(dir);
    }
  });

  test('--fix handles mixed ID + README on same line', () => {
    const dir = createTempDir();
    try {
      const fp = writeMd(
        dir,
        'ubiquitous_language.md',
        '| UL-001 | 用語 | 定義 | FR-001, README §3 | SC-001 |\n'
      );
      run(`--fix ${dir}`);
      const content = fs.readFileSync(fp, 'utf-8');
      expect(content).toContain('[FR-001](./functional_requirements.md#fr-001)');
      expect(content).toContain('[README](./README.md)');
      expect(content).toContain('[SC-001]');
      expect(content).not.toContain('README §3');
    } finally {
      cleanup(dir);
    }
  });

  test('--fix is idempotent for README references', () => {
    const dir = createTempDir();
    try {
      writeMd(dir, 'test.md', '| ソース | README §3 |\n');
      const fp = path.join(dir, 'test.md');
      run(`--fix ${dir}`);
      const afterFirst = fs.readFileSync(fp, 'utf-8');
      run(`--fix ${dir}`);
      const afterSecond = fs.readFileSync(fp, 'utf-8');
      expect(afterSecond).toBe(afterFirst);
    } finally {
      cleanup(dir);
    }
  });
});

// ============================================================
// linkify-ids.js — Error cases
// ============================================================
test.describe('linkify-ids: Error cases', () => {
  test('exits 1 for non-existent path', () => {
    const result = run('/tmp/non-existent-path-xyz-12345');
    expect(result.exitCode).toBe(1);
  });

  test('exits 1 for directory with no .md files', () => {
    const dir = createTempDir();
    try {
      const result = run(dir);
      expect(result.exitCode).toBe(1);
    } finally {
      cleanup(dir);
    }
  });
});
