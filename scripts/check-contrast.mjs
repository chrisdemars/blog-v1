// Checks every required text/background pair in the palette against WCAG AA.
// Reads token values straight from src/styles/global.css so the two can't drift.
// Usage: node scripts/check-contrast.mjs

import { readFileSync } from 'node:fs';
import {
  CONTRAST_PAIRS,
  contrastRatio,
  parseTokens,
} from '../src/lib/contrast.ts';

const css = readFileSync(
  new URL('../src/styles/global.css', import.meta.url),
  'utf8',
);
const tokens = Object.fromEntries(
  parseTokens(css).map(({ name, hex }) => [name, hex]),
);

let failed = 0;
for (const { fg, bg, min } of CONTRAST_PAIRS.filter((p) => p.required)) {
  if (!tokens[fg] || !tokens[bg]) {
    console.error(`✗ missing token: ${tokens[fg] ? bg : fg}`);
    failed++;
    continue;
  }
  const r = contrastRatio(tokens[fg], tokens[bg]);
  const ok = r >= min;
  if (!ok) failed++;
  console.log(
    `${ok ? '✓' : '✗'} ${fg} on ${bg}: ${r.toFixed(2)}:1 (needs ${min}:1)`,
  );
}

if (failed) {
  console.error(`\n${failed} pair(s) fail WCAG AA`);
  process.exit(1);
}
