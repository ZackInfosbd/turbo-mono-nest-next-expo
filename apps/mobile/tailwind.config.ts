import type { Config } from 'tailwindcss';
// @ts-expect-error - no types
import nativewind from 'nativewind/preset';

import baseConfig from '@repo/ui/tailwind.config';

export default {
  ...baseConfig,
  content: [
    './src/**/*.{ts,tsx}',
    // '../../packages/native/src/**/*.{ts,tsx}'
  ],
  // presets: [baseConfig, nativewind],
  presets: [nativewind],
} satisfies Config;
