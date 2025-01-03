// import type { Config } from 'tailwindcss';
// import sharedConfig from '@repo/ui/tailwind.config';
// // @ts-expect-error - no types
// import nativewind from 'nativewind/preset';

// export default {
//   ...sharedConfig,
//   presets: [nativewind],
//   content: [
//     './src/app/**/*.{js,ts,jsx,tsx}',
//     './src/components/**/*.{js,ts,jsx,tsx}',
//   ],
//   plugins: [],
// } satisfies Config;

// const tailwindRootConfig = require('../../packages/ui/tailwind.config');

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   ...tailwindRootConfig,
//   darkMode: 'media',
//   content: [
//     './app/**/*.{js,ts,jsx,tsx,mdx}',
//     './components/**/*.{js,ts,jsx,tsx,mdx}',

//     // Or if using `src` directory:
//     './src/**/*.{html,js,jsx,ts,tsx}',

//     //'./src/core-components/**/**/*.{html,js,jsx,ts,tsx}',
//     //'./src/hooks/**/*.{html,js,jsx,ts,tsx,mdx}',

//     /**
//      *
//      * If you have monorepo with Tailwind CSS components in one package and
//      * application in the other you may find that Tailwind won't work for components. To
//      * fix that you need to add new entry to content inside tailwind.config.js:
//      */
//     //'../../packages/hello-ui/components/**/*.{html,js,jsx,ts,tsx,mdx}', // here is path to Tailwind CSS components package
//   ],
// };

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./src/**/*.{js,jsx,ts,tsx}', './app/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {},
  },
  plugins: [],
};
