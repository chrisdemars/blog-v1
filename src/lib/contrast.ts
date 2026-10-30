// Palette contrast math shared by the /design-system page and
// scripts/check-contrast.mjs, so both report the same numbers.

export interface Token {
  name: string;
  hex: string;
  source: string;
}

export interface ContrastPair {
  fg: string;
  bg: string;
  // 4.5 = AA body text, 3 = AA large text and UI components.
  min: number;
  use: string;
  // Informational pairs document combinations we avoid; they never fail CI.
  required: boolean;
}

// Reads `--color-name: #hex; /* source */` declarations from global.css.
export function parseTokens(css: string): Token[] {
  return [
    ...css.matchAll(
      /--color-([a-z-]+):\s*(#[0-9a-f]{6});\s*(?:\/\*\s*(.*?)\s*\*\/)?/gi,
    ),
  ].map(([, name, hex, source]) => ({ name, hex, source: source ?? '' }));
}

function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

const pair = (
  fg: string,
  bg: string,
  min: number,
  use: string,
  required = true,
): ContrastPair => ({ fg, bg, min, use, required });

export const CONTRAST_PAIRS: ContrastPair[] = [
  ...(['primary', 'secondary'] as const).flatMap((s) =>
    [s, `${s}-raised`].flatMap((bg) => [
      pair(`on-${s}`, bg, 4.5, 'Body text'),
      pair(`on-${s}-muted`, bg, 4.5, 'Muted text'),
    ]),
  ),
  pair('secondary', 'primary', 4.5, 'Links on dark'),
  pair('secondary', 'primary-raised', 4.5, 'Links in dark cards'),
  pair('on-secondary', 'secondary', 4.5, 'Solid button on dark'),
  pair('secondary', 'on-secondary', 4.5, 'Solid button on green'),
  pair('secondary', 'primary', 3, 'Focus ring on dark'),
  pair('on-secondary', 'secondary', 3, 'Focus ring on green'),
  ...['teal', 'moss', 'lime', 'mint'].flatMap((accent) => [
    pair(`accent-${accent}`, 'primary', 4.5, 'Accent on dark'),
    pair(`accent-${accent}`, 'primary-raised', 4.5, 'Accent in dark cards'),
    pair(
      `accent-${accent}`,
      'secondary',
      4.5,
      'Accent on green (avoid)',
      false,
    ),
  ]),
];
