/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        annie: ['Annie Use Your Telescope'],
        bubble: ['Bubblegum Sans'],
        cookie: ['Cookie'],
        roboto: ['Roboto', 'sans-serif'],
        rubik: ['Rubik', 'sans-serif'],
        epilogue: ['Epilogue', 'sans-serif'],
      },
      content: {
        leaf: './src/assets/leaf.png',
        line: './src/assets/slider.png'
      },
      animation: {
        text: 'text 5s ease infinite',
        imgMove: 'imgMove 5s linear 1s ease-out infinite',
      },
      keyframes: {
        text: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        imgMove: {
          '0%': {
            'transform': 'rotate3d(0, 1, 0, 0deg)'
          },
          '30%': {
            'transform': 'rotate3d(0, 1, 0, 5deg)'
          },
          '60%': {
            'transform': 'rotate3d(0, 1, 0, 0deg)'
          },
          '80%': {
            'transform': 'rotate3d(0, 1, 0, 5deg)'
          },
          '100%': {
            'transform': 'rotate3d(0, 1, 0, 0deg)'
          },
        }
      },
    },
  },
  plugins: [],
}

// font-family: 'Annie Use Your Telescope', cursive;
// font-family: 'Bubblegum Sans', cursive;
// font-family: 'Cookie', cursive;
// font-family: 'Roboto', sans-serif;
// font-family: 'Rubik', sans-serif;
