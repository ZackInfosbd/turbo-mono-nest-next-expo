import type { Config } from 'tailwindcss';
import sharedConfig from '@repo/ui/tailwind.config';
// @ts-expect-error - no types
import nativewind from 'nativewind/preset';

export default {
  // presets: [require('../../packages/ui/tailwind.config')],
  ...sharedConfig,
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  presets: [nativewind],
  plugins: [],
} satisfies Config;
