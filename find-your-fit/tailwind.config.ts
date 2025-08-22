import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: {
          DEFAULT: "#0F6EFD"
        },
        aqua: {
          DEFAULT: "#12D4D4"
        },
        navy: {
          DEFAULT: "#0B1E3C"
        },
        slateText: "#334155",
        background: "#F8FAFC"
      },
      container: {
        center: true,
        padding: "1rem"
      },
      borderRadius: {
        xl: "1rem"
      }
    }
  },
  plugins: [tailwindAnimate]
};

export default config;
