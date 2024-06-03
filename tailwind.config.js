/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(135deg, #a2f5d9 8%, #0093E9 61%, #8ab6e2 81%)",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
