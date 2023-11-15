import type { Config } from "tailwindcss";

const config: Config = {
  mode: "jit",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/_components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/popup/index.tsx",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["var(--font-roboto)"],
      },
    },
  },
  prefix: "plasmo-",
  plugins: [],
};
export default config;
