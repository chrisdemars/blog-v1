// Checks every text/background pair in the palette against WCAG AA.
// Reads token values straight from src/styles/global.css so the two can't drift.
// Usage: node scripts/check-contrast.mjs

import { readFileSync } from 'node:fs';

const css = readFileSync(
  new URL('../src/styles/global.css', import.meta.url),
  'utf8',
);
const tokens = Object.fromEntries(
  [...css.matchAll(/--color-([a-z-]+):\s*(#[0-9a-f]{6})/gi)].map(
    ([, name, hex]) => [name, hex],
  ),
);

// [foreground, background, minimum ratio]
// 4.5 = AA body text, 3 = AA large text and UI components (focus rings, button borders).
const pairs = [];
for (const s of ['primary', 'secondary']) {
  for (const bg of [s, `${s}-raised`]) {
    pairs.push([`on-${s}`, bg, 4.5], [`on-${s}-muted`, bg, 4.5]);
  }
}
pairs.push(
  ['secondary', 'primary', 4.5], // links on dark
  ['secondary', 'primary-raised', 4.5],
  ['on-secondary', 'secondary', 4.5], // solid button on dark
  ['secondary', 'on-secondary', 4.5], // solid button on green
  ['secondary', 'primary', 3], // focus ring on dark
  ['on-secondary', 'secondary', 3], // focus ring on green
);
for (const accent of ['blue', 'purple', 'pink', 'yellow']) {
  pairs.push(
    [`accent-${accent}`, 'primary', 4.5],
    [`accent-${accent}`, 'primary-raised', 4.5],
  );
}

function luminance(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function ratio(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

let failed = 0;
for (const [fg, bg, min] of pairs) {
  if (!tokens[fg] || !tokens[bg]) {
    console.error(`✗ missing token: ${tokens[fg] ? bg : fg}`);
    failed++;
    continue;
  }
  const r = ratio(tokens[fg], tokens[bg]);
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
