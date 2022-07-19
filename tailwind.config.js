module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'display': ['Roboto', 'sans-serif']
    },
    extend: {
      colors: {
        'primary': "#56BF6B",
        'primary-saturated': "#63DB71",
        'secondary': "#110426"
      },
      boxShadow: {
        '3xl': '0 0 35px rgba(0, 0, 0, 0.15)',
        '4xl': [
            '0 35px 35px rgba(0, 0, 0, 0.25)',
            '0 45px 65px rgba(0, 0, 0, 0.15)'
        ]
      },
      aspectRatio: {
        '2/3': '2 / 3'
      }
    },
  },
  plugins: [],
}