import type { Config } from 'tailwindcss';

const config: Config = {
  presets: [require('../../packages/ui/tailwind.config')],
  content: [
    './**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
};

export default config;
