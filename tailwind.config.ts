import type { Config } from "tailwindcss";
import { withUt } from "uploadthing/tw";
import plugin from 'tailwindcss/plugin'

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      
    },
  },
  plugins: [
    
  ],
};
export default withUt(config);
