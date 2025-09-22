import {heroui} from '@heroui/theme';
import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/components/(card|ripple).js"
  ],
  theme: {
    extend: {},
  },
  plugins: [heroui()],
}

export default config
