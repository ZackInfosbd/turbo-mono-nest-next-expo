import baseConfig from '@repo/eslint-config/eslint.shared.mjs';

export default [
  ...baseConfig,
  {
    rules: {
      'no-console': 'warn',
    },
  },
];
