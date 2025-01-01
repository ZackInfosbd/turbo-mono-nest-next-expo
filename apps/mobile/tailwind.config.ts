import type { Config } from 'tailwindcss';
import sharedConfig from '@repo/ui/tailwind.config';
// @ts-expect-error - no types
import nativewind from 'nativewind/preset';

export default {
  ...sharedConfig,
  presets: [nativewind],
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  plugins: [],
} satisfies Config;
