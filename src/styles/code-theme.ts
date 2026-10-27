import type { ThemeRegistration } from 'shiki';

// Syntax highlighting built from the site palette. Every color passes WCAG AA
// on --color-primary-raised (see /design-system).
export const codeTheme = {
  name: 'spacetime',
  type: 'dark' as const,
  colors: {
    'editor.background': '#122129',
    'editor.foreground': '#e6e9f0',
  },
  tokenColors: [
    {
      scope: ['comment', 'punctuation.definition.comment'],
      settings: {
        foreground: '#b6c0cf',
        fontStyle: 'italic',
      },
    },
    {
      scope: ['keyword', 'storage', 'storage.type', 'keyword.operator.new'],
      settings: {
        foreground: '#ff80fb',
      },
    },
    {
      scope: ['string', 'string.quoted', 'markup.inline.raw'],
      settings: {
        foreground: '#4cf490',
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
        foreground: '#02befa',
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
        foreground: '#fbdc8e',
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
        foreground: '#a880ff',
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
