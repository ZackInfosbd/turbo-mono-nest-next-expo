import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
];

export default eslintConfig;

// import { FlatCompat } from '@eslint/eslintrc';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const compat = new FlatCompat({
//   baseDirectory: __dirname,
//   resolvePluginsRelativeTo: __dirname,
// });

// // Get Next.js config first
// const nextConfigs = compat.config({
//   extends: ['next/core-web-vitals', 'prettier'],
// });

// // Merge configs carefully to avoid plugin duplication
// const mergedConfigs = [
//   ...nextConfigs.map((config) => ({
//     ...config,
//     plugins: {
//       ...config.plugins,
//     },
//     rules: {
//       ...config.rules,
//       'react/react-in-jsx-scope': 'off',
//       'react/prop-types': 'off',
//       '@next/next/no-html-link-for-pages': 'off',
//       '@next/next/no-img-element': 'off',
//     },
//   })),
//   {
//     files: [
//       'app/**/*.{ts,tsx}',
//       'pages/**/*.{ts,tsx}',
//       'components/**/*.{ts,tsx}',
//     ],
//     rules: {
//       '@next/next/no-head-element': 'error',
//     },
//   },
//   {
//     ignores: [
//       '.next',
//       'next-env.d.ts',
//       'next.config.js',
//       'next.config.mjs',
//       'next.config.ts',
//     ],
//   },
// ];

// export default mergedConfigs;
