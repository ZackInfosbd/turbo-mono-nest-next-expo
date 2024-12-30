import baseConfig from '@repo/eslint-config/eslint.shared.mjs';

export default [
  ...baseConfig,
  {
    rules: {
      '@typescript-eslint/require-await': 'off',

      'no-restricted-imports': 'off',
      'no-console': 'off',
    },
  },
];

// import { config } from '@repo/eslint-config/react-internal';

// /** @type {import("eslint").Linter.Config} */
// export default config;
