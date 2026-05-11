#!/usr/bin/env node
import { access } from 'node:fs/promises';
import { chromium, firefox, webkit } from '@playwright/test';

const browsers = [
  { name: 'Chromium', type: chromium },
  { name: 'Firefox', type: firefox },
  { name: 'WebKit', type: webkit },
];

const missing = [];

for (const browser of browsers) {
  const executable = browser.type.executablePath();
  try {
    await access(executable);
  } catch {
    missing.push({ name: browser.name, executable });
  }
}

if (missing.length === 0) {
  console.log('✅ Playwright browser preflight passed.');
  for (const browser of browsers) {
    console.log(`- ${browser.name}: ${browser.type.executablePath()}`);
  }
  process.exit(0);
}

console.error('❌ Playwright browser preflight failed. Missing executables:');
for (const browser of missing) {
  console.error(`- ${browser.name}: ${browser.executable}`);
}
console.error('\nRun: npx playwright install');
process.exit(1);
