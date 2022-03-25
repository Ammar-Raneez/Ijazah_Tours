module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  plugins: ['@typescript-eslint'],
  extends: ['airbnb-base', 'plugin:import/typescript'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    quotes: [
      'error',
      'single',
      { avoidEscape: true, allowTemplateLiterals: true },
    ],
    indent: ['error', 2],
    'no-unreachable': ['warn'],
    'no-return-await': ['warn'],
    'no-useless-return': ['warn'],
    'no-var': ['warn'],
    'no-else-return': ['warn', { allowElseIf: false }],
    'no-duplicate-imports': ['error'],
    'prefer-const': ['error'],
    'no-const-assign': ['error'],
    'no-dupe-args': ['error'],
    'no-dupe-else-if': ['error'],
    'no-ex-assign': ['error'],
    'no-import-assign': ['error'],
    'no-irregular-whitespace': ['error'],
    'no-self-assign': ['error'],
    'no-self-compare': ['error'],
    'no-undef': ['error'],
    'no-use-before-define': ['error', { variables: false, functions: false }],
    'dot-notation': ['error', { allowKeywords: false }],
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'no-param-reassign': ['error', { props: false }],
    'consistent-return': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': ['off'],
    'linebreak-style': 'off',
    'max-len': ['error', { code: 120 }],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error', { ignoreTypeValueShadow: true }],
    'no-unused-vars': 'off',
    'global-require': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
  },
};