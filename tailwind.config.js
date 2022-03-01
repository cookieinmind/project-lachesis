module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      handwritten: ['Schoolbell', 'cursive'],
    },
    colors: {
      transparent: 'transparent',
      //Main
      primary: '#CAC1EA',
      secondary: '#B5C9D7',
      tertiary: '#CAC1EA',

      onPrimary: '#322C4C',
      onSecondary: '#20333E',
      onTertiary: '#322C4C',

      //Backgrounds
      background: '#191C1E',
      semiTransparent: 'rgba(25, 28, 30, 0.5)',
      transparentBackgroundX: 'rgba(25, 28, 30, 0.75)',
      transparentBackground: 'rgba(25, 28, 30, 0.97)',
      onBackground: '#E1E2E5',

      surface: '#E1E2E5',
      onSurface: '#191c1e',

      surfaceVariant: '#41484d',
      onSurfaceVariant: '#c0c7cd',

      //Containers
      primaryContainer: '#484264',
      onPrimaryContainer: '#E7DEFF',

      secondaryContainer: '#374955',
      onSecondaryContainer: '#D1E5F3',

      tertiaryContainer: '#484264',
      onTertiaryContainer: '#E7DEFF',

      //Extras
      outline: '#71787D',

      error: '#ffb4a9',
      onError: '#680003',
      errorContainer: '#930006',
      onErrorContainer: '#ffdad4',

      inversePrimary: '#00668B',

      shadow: '#000000',
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
      dropShadow: {
        'page-title': '2px 2px 0px #797297',
        chip: '-2px 2px 0px #000000',
      },
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
