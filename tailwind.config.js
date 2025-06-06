/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "rgb(var(--color-primary) / 0.05)",
          100: "rgb(var(--color-primary) / 0.1)",
          200: "rgb(var(--color-primary) / 0.2)",
          300: "rgb(var(--color-primary) / 0.3)",
          400: "rgb(var(--color-primary) / 0.4)",
          500: "rgb(var(--color-primary) / 0.5)",
          600: "rgb(var(--color-primary) / 0.6)",
          700: "rgb(var(--color-primary) / 0.7)",
          800: "rgb(var(--color-primary) / 0.8)",
          900: "rgb(var(--color-primary) / 0.9)",
          950: "rgb(var(--color-primary) / 0.95)",
        },
        secondary: {
          50: "rgb(var(--color-secondary) / 0.05)",
          100: "rgb(var(--color-secondary) / 0.1)",
          200: "rgb(var(--color-secondary) / 0.2)",
          300: "rgb(var(--color-secondary) / 0.3)",
          400: "rgb(var(--color-secondary) / 0.4)",
          500: "rgb(var(--color-secondary) / 0.5)",
          600: "rgb(var(--color-secondary) / 0.6)",
          700: "rgb(var(--color-secondary) / 0.7)",
          800: "rgb(var(--color-secondary) / 0.8)",
          900: "rgb(var(--color-secondary) / 0.9)",
          950: "rgb(var(--color-secondary) / 0.95)",
        },
        accent: {
          50: "rgb(var(--color-accent) / 0.05)",
          100: "rgb(var(--color-accent) / 0.1)",
          200: "rgb(var(--color-accent) / 0.2)",
          300: "rgb(var(--color-accent) / 0.3)",
          400: "rgb(var(--color-accent) / 0.4)",
          500: "rgb(var(--color-accent) / 0.5)",
          600: "rgb(var(--color-accent) / 0.6)",
          700: "rgb(var(--color-accent) / 0.7)",
          800: "rgb(var(--color-accent) / 0.8)",
          900: "rgb(var(--color-accent) / 0.9)",
          950: "rgb(var(--color-accent) / 0.95)",
        },
        success: {
          50: "rgb(var(--color-success) / 0.05)",
          100: "rgb(var(--color-success) / 0.1)",
          500: "rgb(var(--color-success) / 0.5)",
          600: "rgb(var(--color-success) / 0.6)",
        },
        warning: {
          50: "rgb(var(--color-warning) / 0.05)",
          100: "rgb(var(--color-warning) / 0.1)",
          500: "rgb(var(--color-warning) / 0.5)",
          600: "rgb(var(--color-warning) / 0.6)",
        },
        error: {
          50: "rgb(var(--color-error) / 0.05)",
          100: "rgb(var(--color-error) / 0.1)",
          500: "rgb(var(--color-error) / 0.5)",
          600: "rgb(var(--color-error) / 0.6)",
        },
        neutral: {
          50: "rgb(var(--color-neutral) / 0.05)",
          100: "rgb(var(--color-neutral) / 0.1)",
          200: "rgb(var(--color-neutral) / 0.2)",
          300: "rgb(var(--color-neutral) / 0.3)",
          400: "rgb(var(--color-neutral) / 0.4)",
          500: "rgb(var(--color-neutral) / 0.5)",
          600: "rgb(var(--color-neutral) / 0.6)",
          700: "rgb(var(--color-neutral) / 0.7)",
          800: "rgb(var(--color-neutral) / 0.8)",
          900: "rgb(var(--color-neutral) / 0.9)",
          950: "rgb(var(--color-neutral) / 0.95)",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        heading: ["Montserrat", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-in-out",
        "slide-up": "slide-up 0.5s ease-out",
        "slide-down": "slide-down 0.5s ease-out",
        "slide-left": "slide-left 0.5s ease-out",
        "slide-right": "slide-right 0.5s ease-out",
        "snow-fall": "snowfall linear infinite",
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
        "slide-down": {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "slide-left": {
          "0%": { transform: "translateX(10px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "slide-right": {
          "0%": { transform: "translateX(-10px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
