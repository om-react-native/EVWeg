export const theme = {
  brandName: 'EVWeg',
  themeName: 'Arctic Frost',
  description: 'Clean and minimal - Scandinavian tech aesthetic',

  colors: {
    primary: {
      50: '#E6F9F7',
      100: '#CCF3EF',
      200: '#99E7DF',
      300: '#66DBCF',
      400: '#4ECDC4',
      500: '#3DB5AC',
      600: '#319088',
      700: '#256C66',
      800: '#194844',
      900: '#0C2422',
    },
    secondary: {
      50: '#F0F1F2',
      100: '#E1E3E5',
      200: '#C3C7CB',
      300: '#A5ABB1',
      400: '#878F97',
      500: '#556270',
      600: '#444E5A',
      700: '#333B43',
      800: '#22272D',
      900: '#111416',
    },
    accent: {
      50: '#F9FEFB',
      100: '#F3FCF7',
      200: '#E7F9EF',
      300: '#DBF6E7',
      400: '#C7F0DB',
      500: '#A3E5C3',
      600: '#7FDAAB',
      700: '#5BCF93',
      800: '#37C47B',
      900: '#2DA065',
    },
    dark: {
      50: '#E8E9E9',
      100: '#D1D2D3',
      200: '#A3A5A7',
      300: '#75787B',
      400: '#474B4F',
      500: '#2C3539',
      600: '#232A2E',
      700: '#1A2023',
      800: '#121517',
      900: '#090B0C',
    },
    light: {
      50: '#FFFFFF',
      100: '#F7FFFE',
      200: '#F0FEFD',
      300: '#E8FDFC',
      400: '#E1FCFB',
      500: '#D9FBFA',
      600: '#C2E8E7',
      700: '#ABD5D4',
      800: '#94C2C1',
      900: '#7DAFAE',
    },
  },

  gradients: {
    primary: 'linear-gradient(135deg, #4ECDC4 0%, #556270 100%)',
    primaryReverse: 'linear-gradient(135deg, #556270 0%, #4ECDC4 100%)',
    light: 'linear-gradient(135deg, #C7F0DB 0%, #4ECDC4 100%)',
    dark: 'linear-gradient(135deg, #2C3539 0%, #556270 100%)',
    radial: 'radial-gradient(circle at 30% 30%, #4ECDC4 0%, #556270 100%)',
  },

  typography: {
    fontFamily: {
      heading: "'Inter', 'SF Pro Display', 'Poppins', system-ui, sans-serif",
      body: "'Inter', 'SF Pro Text', system-ui, sans-serif",
      mono: "'JetBrains Mono', 'Fira Code', monospace",
    },
    fontSize: {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 30,
      '4xl': 36,
      '5xl': 48,
      '6xl': 60,
    },
    fontWeight: {
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
    '3xl': 64,
  },

  borderRadius: {
    sm: 6,
    md: 8,
    lg: 12,
    xl: 16,
    '2xl': 24,
    full: 9999,
  },

  shadows: {
    sm: {
      shadowColor: '#2C3539',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#2C3539',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3,
    },
    lg: {
      shadowColor: '#2C3539',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.1,
      shadowRadius: 15,
      elevation: 5,
    },
    xl: {
      shadowColor: '#2C3539',
      shadowOffset: { width: 0, height: 20 },
      shadowOpacity: 0.1,
      shadowRadius: 25,
      elevation: 8,
    },
    '2xl': {
      shadowColor: '#2C3539',
      shadowOffset: { width: 0, height: 25 },
      shadowOpacity: 0.25,
      shadowRadius: 50,
      elevation: 12,
    },
  },
};

export const lightTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    text: {
      primary: '#2C3539',
      secondary: '#556270',
      tertiary: '#878F97',
      inverse: '#FFFFFF',
      link: '#4ECDC4',
      linkHover: '#3DB5AC',
    },
    backgrounds: {
      primary: '#F7FFFE',
      secondary: '#F0FEFD',
      card: '#FFFFFF',
      dark: '#2C3539',
      light: '#F9FEFB',
    },
    borders: {
      light: '#E1E3E5',
      medium: '#C3C7CB',
      dark: '#556270',
    },
    buttons: {
      primary: {
        background: '#4ECDC4',
        text: '#FFFFFF',
        hover: '#3DB5AC',
        active: '#319088',
      },
      secondary: {
        background: '#556270',
        text: '#FFFFFF',
        hover: '#444E5A',
        active: '#333B43',
      },
      outline: {
        border: '#4ECDC4',
        text: '#4ECDC4',
        hover: {
          background: '#E6F9F7',
          text: '#319088',
        },
      },
    },
  },
};

export const darkTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    text: {
      primary: '#FFFFFF',
      secondary: '#E1E3E5',
      tertiary: '#A5ABB1',
      inverse: '#2C3539',
      link: '#4ECDC4',
      linkHover: '#66DBCF',
    },
    backgrounds: {
      primary: '#090B0C',
      secondary: '#121517',
      card: '#1A2023',
      dark: '#2C3539',
      light: '#22272D',
    },
    borders: {
      light: '#333B43',
      medium: '#444E5A',
      dark: '#556270',
    },
    buttons: {
      primary: {
        background: '#4ECDC4',
        text: '#FFFFFF',
        hover: '#3DB5AC',
        active: '#319088',
      },
      secondary: {
        background: '#556270',
        text: '#FFFFFF',
        hover: '#444E5A',
        active: '#333B43',
      },
      outline: {
        border: '#4ECDC4',
        text: '#4ECDC4',
        hover: {
          background: '#194844',
          text: '#66DBCF',
        },
      },
    },
  },
};

export type Theme = typeof lightTheme;

