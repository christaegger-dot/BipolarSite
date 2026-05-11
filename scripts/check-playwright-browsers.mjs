#!/usr/bin/env node
import { access } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

const checks = [
  {
    name: 'Chromium headless shell',
    rel: 'chromium_headless_shell-1217/chrome-headless-shell-linux64/chrome-headless-shell',
  },
  {
    name: 'Firefox',
    rel: 'firefox-1495/firefox/firefox',
  },
  {
    name: 'WebKit',
    rel: 'webkit-2272/pw_run.sh',
  },
];

const cacheDir = process.env.PLAYWRIGHT_BROWSERS_PATH || path.join(os.homedir(), '.cache', 'ms-playwright');

const missing = [];
for (const check of checks) {
  const fullPath = path.join(cacheDir, check.rel);
  try {
    await access(fullPath);
  } catch {
    missing.push({ ...check, fullPath });
  }
}

if (missing.length === 0) {
  console.log(`✅ Playwright browsers available in: ${cacheDir}`);
  process.exit(0);
}

console.error('❌ Playwright browser preflight failed. Missing executables:');
for (const item of missing) {
  console.error(`- ${item.name}: ${item.fullPath}`);
}
console.error('\nRun: npx playwright install');
process.exit(1);
