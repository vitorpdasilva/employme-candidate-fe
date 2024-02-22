module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  globals: {
    JSX: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['*.tsx'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'error',
      },
    },
  ],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'prettier',
    'plugin:@tanstack/eslint-plugin-query/recommended',
  ],
  plugins: ['react', '@typescript-eslint', 'prettier'],
  ignorePatterns: ['node_modules/', 'dist/', 'build/', 'public/', 'coverage/', '**/types.ts'],
  rules: {
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    indent: ['error', 2],
    'max-len': ['error', { code: 120, ignoreUrls: true, ignoreComments: true }],
    'eol-last': ['error', 'always'],
    'object-curly-spacing': ['error', 'always'],
    'react/no-unescaped-entities': 0,
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    '@tanstack/query/exhaustive-deps': 'error',
    '@tanstack/query/no-rest-destructuring': 'warn',
    '@tanstack/query/stable-query-client': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'all',
        argsIgnorePattern: '^_',
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
  },
}
