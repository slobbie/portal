module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'import'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'import/order': [
      'warn',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'index'],
        ],
        pathGroups: [
          { pattern: '@app/**', group: 'internal' },
          { pattern: '@widgets/**', group: 'internal' },
          { pattern: '@features/**', group: 'internal' },
          { pattern: '@shared/**', group: 'internal' },
          { pattern: '@assets/**', group: 'internal' },
        ],
        'newlines-between': 'never',
      },
    ],
  },
};
