module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      content: ['PT Sans', 'sans-serif'],
      display: ['Roboto Slab', 'serif'],
    },
    colors: {
      transparent: 'transparent',

      //surfaces
      surface: '#fafafa',
      onSurface: '#212121',

      //colors
      yellow: '#FFC600',
      pink: '#FF008E',
      green: '#77D970',
      blue: '#9ADCFF',
      salmon: '#FF6464',
      orange: '#F47340',
    },
    letterSpacing: {
      tightest: '-0.5px',
      tighter: '-0.25px',
      tight: '-0.1px',
      normal: '0px',
      wide: '0.1px',
      wider: '0.25px',
      widest: '0.5px',
    },
    screens: {
      xs: '360px',
      sm: '640px',
      md: '1023px',
      lg: '1279px',
      xl: '1536px',
      '2xl': '1920px',
    },
    extend: {
      transitionTimingFunction: {
        'in-out-back': 'cubic-bezier(0.7, -0.4, 0.4, 1.4)',
      },
      backdropBlur: {
        xxs: '1px',
        xs: '2px',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/line-clamp')],
};
