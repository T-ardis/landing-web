import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join, resolve } from 'path';

const REPO_ROOT = resolve(__dirname, '../../..');
const SRC_ROOT = resolve(__dirname, '../..');
const ENV_EXAMPLE = join(REPO_ROOT, '.env.example');

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      out.push(...walk(full));
    } else if (/\.(ts|tsx)$/.test(entry) && !full.includes('__tests__')) {
      out.push(full);
    }
  }
  return out;
}

function referencedEnvVars(): Set<string> {
  const vars = new Set<string>();
  for (const file of walk(SRC_ROOT)) {
    const src = readFileSync(file, 'utf8');
    for (const m of src.matchAll(/process\.env\.([A-Z0-9_]+)/g)) {
      vars.add(m[1]);
    }
  }
  return vars;
}

function documentedEnvVars(): Set<string> {
  const vars = new Set<string>();
  const text = readFileSync(ENV_EXAMPLE, 'utf8');
  for (const line of text.split('\n')) {
    const m = line.match(/^([A-Z0-9_]+)=/);
    if (m) vars.add(m[1]);
  }
  return vars;
}

describe('.env.example', () => {
  it('should exist at the repo root', () => {
    expect(existsSync(ENV_EXAMPLE)).toBe(true);
  });

  it('should document the server-only waitlist secrets', () => {
    const documented = documentedEnvVars();
    expect(documented).toContain('NOTION_API_KEY');
    expect(documented).toContain('NOTION_DATABASE_ID');
  });

  it('should document the client app URL', () => {
    expect(documentedEnvVars()).toContain('NEXT_PUBLIC_APP_URL');
  });

  it('should document every environment variable referenced in src', () => {
    const documented = documentedEnvVars();
    const missing = [...referencedEnvVars()].filter((v) => !documented.has(v));
    expect(missing).toEqual([]);
  });

  it('should not commit any real secret value (placeholders only)', () => {
    const text = readFileSync(ENV_EXAMPLE, 'utf8');
    // Notion integration tokens start with "secret_" / "ntn_"; assert none present.
    expect(text).not.toMatch(/secret_[A-Za-z0-9]{20,}/);
    expect(text).not.toMatch(/ntn_[A-Za-z0-9]{20,}/);
  });
});
