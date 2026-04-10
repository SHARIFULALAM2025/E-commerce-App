/** @type {import('tailwindcss').Config} */
module.exports = {
  // নিশ্চিত করুন যে সব ফোল্ডার এখানে উল্লেখ আছে
  content: [
    "./App.js",
    "./src/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./screens/**/*.{js,jsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}