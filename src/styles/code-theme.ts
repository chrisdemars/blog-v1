import type { ThemeRegistration } from 'shiki';

// Syntax highlighting built from the site palette: keywords mint, strings
// celadon, functions mist, constants and comments teal, types platinum (bold).
// Every color passes WCAG AA on jet (see /design-system).
export const codeTheme = {
  name: 'jet-and-celadon',
  type: 'dark' as const,
  colors: {
    'editor.background': '#1f2421',
    'editor.foreground': '#dce1de',
  },
  tokenColors: [
    {
      scope: ['comment', 'punctuation.definition.comment'],
      settings: {
        foreground: '#759e9e',
        fontStyle: 'italic',
      },
    },
    {
      scope: ['keyword', 'storage', 'storage.type', 'keyword.operator.new'],
      settings: {
        foreground: '#49a078',
      },
    },
    {
      scope: ['string', 'string.quoted', 'markup.inline.raw'],
      settings: {
        foreground: '#9cc5a1',
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
        foreground: '#a4bdbb',
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
        foreground: '#759e9e',
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
        foreground: '#dce1de',
        fontStyle: 'bold',
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
