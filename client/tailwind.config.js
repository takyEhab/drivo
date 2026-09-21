export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#0B0B0F", 800: "#15151B", 700: "#1E1E27" },
        ember: { DEFAULT: "#FF3D00", 600: "#E63600" },
        volt: "#00E0FF",
        sand: "#F5F1EA",
      },
      fontFamily: {
        sans: ["Inter", "Cairo", "system-ui", "sans-serif"],
        ar: ["Cairo", "sans-serif"],
      },
    },
  },
  plugins: [],
};
