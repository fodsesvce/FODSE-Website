import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#09090B",
        surface: "#111827",
        "surface-2": "#1F2937",
        border: "#1F2937",
        "border-subtle": "#374151",
        accent: {
          DEFAULT: "#2563EB",
          light: "#3B82F6",
          dark: "#1D4ED8",
          muted: "#1e3a5f",
        },
        text: {
          primary: "#F9FAFB",
          secondary: "#D1D5DB",
          muted: "#6B7280",
          faint: "#4B5563",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "accent-gradient": "linear-gradient(135deg, #1e3a5f 0%, #2563EB 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
