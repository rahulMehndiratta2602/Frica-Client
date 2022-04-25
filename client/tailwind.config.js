module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'xxs': '320px',
      'xs': '540px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px'
    },
    extend: {
      fontFamily: {
        'syneMono': [
          'Syne Mono', 'monospace'
        ],
        'montserrat': [
          'Montserrat', 'sans-serif'
        ]
      },
      colors: {
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
        tertiary: "var(--tertiary-color)",
        light: "var(--light-primary-color)",
        lightest: "var(--lightest-primary-color)",
        text: "var(--text-color)",

      }

    },
    plugins: [
      require('@tailwindcss/forms'),

      // ...
    ],
  }
}