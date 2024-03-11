module.exports = {
  root: true,
  extends: ['universe/native', 'universe/shared/typescript-analysis'],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.d.ts'],
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  ],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', 'react-native', 'react-hooks', 'simple-import-sort'],
  rules: {
    semi: 0,
    'import/order': 'off',
    'react/jsx-boolean-value': 'error',
    'react/jsx-curly-brace-presence': [
      'error',
      { props: 'never', children: 'never' },
    ],
    'react/no-unstable-nested-components': ['warn', { allowAsProps: true }],
    'react-native/no-unused-styles': 'warn',
    '@typescript-eslint/no-unused-vars': 'error',
    'simple-import-sort/imports': 'error',
  },
  env: {
    node: true,
  },
  ignorePatterns: ['node_modules', 'ios', 'android'],
}