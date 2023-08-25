import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors:{
        bg: "#f4f5f6",
        text: "#020303",
        primary: "#408ad4",
        secondary: "#d1e3f5",
        accent: "#2e7dcc",
        bgDark1: "#e9e9e9",
        bgDark2: "",
      }
    },
  },
  plugins: [],
}
export default config
