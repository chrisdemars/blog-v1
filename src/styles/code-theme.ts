import type { ThemeRegistration } from 'shiki';

// Syntax highlighting built from the site's greens: keywords lime, strings
// green, functions teal, constants mint, types moss. Every color passes WCAG AA
// on --color-primary-raised (see /design-system).
export const codeTheme = {
  name: 'black-and-green',
  type: 'dark' as const,
  colors: {
    'editor.background': '#0b1a11',
    'editor.foreground': '#e3f5e8',
  },
  tokenColors: [
    {
      scope: ['comment', 'punctuation.definition.comment'],
      settings: {
        foreground: '#a3c4ad',
        fontStyle: 'italic',
      },
    },
    {
      scope: ['keyword', 'storage', 'storage.type', 'keyword.operator.new'],
      settings: {
        foreground: '#b5f04a',
      },
    },
    {
      scope: ['string', 'string.quoted', 'markup.inline.raw'],
      settings: {
        foreground: '#3ee07f',
      },
    },
    {
      scope: [
        'entity.name.function',
        'support.function',
        'meta.function-call',
        'entity.name.tag',
      ],
      settings: {
        foreground: '#35d6b5',
      },
    },
    {
      scope: [
        'constant.numeric',
        'constant.language',
        'constant.other',
        'variable.other.constant',
      ],
      settings: {
        foreground: '#a6f5c6',
      },
    },
    {
      scope: [
        'entity.name.type',
        'entity.name.class',
        'support.type',
        'support.class',
        'entity.other.attribute-name',
      ],
      settings: {
        foreground: '#8fcf6b',
      },
    },
    {
      scope: ['markup.heading', 'markup.bold'],
      settings: {
        fontStyle: 'bold',
      },
    },
  ],
} satisfies ThemeRegistration;
