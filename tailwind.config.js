1/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx,vue}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      colors: {
        primaryPurple: "hsl(286, 64%, 42%)",
        secondaryPurple: "hsl(286, 64%, 21%)",
      },
      fontSize: {
        xxs: "12px", // Example custom font size
        xxl: "1.75rem", // Example custom font size
      },
    },
  },
  plugins: [],
};
