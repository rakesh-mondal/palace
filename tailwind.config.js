/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}", "*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "#242A34",
        primary: {
          DEFAULT: "#96A090",
          foreground: "white",
          hover: "#242A34",
        },
        secondary: {
          DEFAULT: "#96A090",
          foreground: "#242A34",
        },
        success: {
          DEFAULT: "#A3D977",
          foreground: "#242A34",
        },
        warning: {
          DEFAULT: "#F4C542",
          foreground: "#242A34",
        },
        error: {
          DEFAULT: "#E57373",
          foreground: "white",
        },
        info: {
          DEFAULT: "#EAD3AB",
          foreground: "#242A34",
        },
        highlight: {
          DEFAULT: "#EAD3AB",
          foreground: "#242A34",
        },
        muted: {
          DEFAULT: "#F4F4F4",
          foreground: "#858889",
        },
        accent: {
          DEFAULT: "#EAD3AB",
          foreground: "#242A34",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        destructive: {
          DEFAULT: "#E57373",
          foreground: "white",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      ringColor: {
        DEFAULT: "hsl(var(--ring))",
      },
      fontSize: {
        sm: ["14px", "20px"],
        base: ["16px", "24px"],
        lg: ["18px", "28px"],
        xl: ["20px", "30px"],
      },
      fontFamily: {
        sans: ["var(--font-hanken-grotesk)", "sans-serif"],
        "hanken-grotesk": ["var(--font-hanken-grotesk)", "sans-serif"],
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out",
        "slide-up": "slide-up 0.5s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

