/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        pinkBg: "#f6def6", // Light pink background color
        pinkBtn: "#fea6ff", // Custom pink button color
        darkPink: "#f572f5", // Darker pink for better contrast
        lightPink: "#f8b1f8",
        bgColor: "#3A2C55",
        btnColor: "#573889",
        tableOdd: "#4D4063",
        tableEven: "#3A2C55",
      },
      backgroundImage: {
        "custom-image": "url('Assets/3182.jpg')",
      },
    },
  },
  plugins: [],
};
