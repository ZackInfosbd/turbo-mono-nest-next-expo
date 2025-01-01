import type { Config } from 'tailwindcss';
import sharedConfig from '@repo/ui/tailwind.config';

export default {
  // presets: [require('../../packages/ui/tailwind.config')],
  ...sharedConfig,
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  plugins: [],
} satisfies Config;
