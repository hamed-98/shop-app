/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'Vazir': ["Vazir"],
        'VazirMedium': ["VazirMedium"],
        'VazirBold': ["VazirBold"],
        'Ojan': ["Ojan"],
        'VazirFd' : ["VazirFd"]
      },
      colors:{
        "quillGray-50":"#f6f7f7",
        "quillGray-100":"#d7ddd9",
        "quillGray-200":"#c3ccc6",
        "quillGray-300":"#9daba3",
        "quillGray-400":"#79887f",
        "quillGray-500":"#5e6e65",
        "quillGray-600":"#4a5750",
        "quillGray-700":"#3e4743",
        "quillGray-800":"#343b38",
        "quillGray-900":"#2e3331",
        "quillGray-950":"#171c19",
      }
    },
  },
  plugins: [],
}

