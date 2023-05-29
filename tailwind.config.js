/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./public/**/*.{html,js}",
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        blue: "#213F7D",
        teal: "#39CDCC",
        fade: "#545F7D26",
        shade: "#fbfbfb",
        gray: "#545F7D",
        warn: "#E9B200",
        error: "#E4033B",
        success: "#39CD62",
        outline: "#d8dee8",
      },
    },
  },
  plugins: [require('flowbite/plugin')],
}