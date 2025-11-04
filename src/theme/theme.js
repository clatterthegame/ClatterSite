import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FF00FF', // Neon magenta
      light: '#FF66FF',
      dark: '#CC00CC',
      contrastText: '#000000',
    },
    secondary: {
      main: '#00FFFF', // Neon cyan
      light: '#66FFFF',
      dark: '#00CCCC',
    },
    accent: {
      main: '#FF00AA', // Hot pink
      light: '#FF66CC',
      dark: '#CC0088',
    },
    neon: {
      purple: '#9D00FF',
      pink: '#FF00FF',
      cyan: '#00FFFF',
      green: '#00FF88',
      yellow: '#FFFF00',
      orange: '#FF6600',
    },
    background: {
      default: '#000000',
      paper: 'rgba(10, 0, 20, 0.8)',
      elevated: 'rgba(20, 0, 40, 0.9)',
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.9)',
      disabled: 'rgba(255, 255, 255, 0.5)',
    },
    success: {
      main: '#00FF88',
      light: '#33FFAA',
      dark: '#00CC6A',
    },
  },
  typography: {
    fontFamily: ['Inter', 'system-ui', '-apple-system', 'sans-serif'].join(','),
    fontFamilyDisplay: ['"Space Grotesk"', 'Inter', 'sans-serif'].join(','),
    h1: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 700,
      fontSize: '3.5rem',
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      color: '#FFFFFF',
    },
    h2: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 700,
      fontSize: '2.75rem',
      lineHeight: 1.25,
      letterSpacing: '-0.01em',
      color: '#FFFFFF',
    },
    h3: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
      color: '#FFFFFF',
    },
    h4: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 600,
      fontSize: '1.75rem',
      lineHeight: 1.4,
      color: '#FFFFFF',
    },
    h5: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.5,
      color: '#FFFFFF',
    },
    h6: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.5,
      color: '#FFFFFF',
    },
    body1: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '1.125rem',
      lineHeight: 1.75,
      color: 'rgba(255, 255, 255, 0.9)',
    },
    body2: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '1rem',
      lineHeight: 1.7,
      color: 'rgba(255, 255, 255, 0.85)',
    },
    button: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '0.02em',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 12,
          padding: '14px 32px',
          fontSize: '1rem',
          fontWeight: 600,
          fontFamily: 'Orbitron, sans-serif',
          letterSpacing: '0.05em',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '0 4px 15px rgba(255, 215, 0, 0.2)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 20px rgba(255, 215, 0, 0.4)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #FF00FF 0%, #00FFFF 50%, #9D00FF 100%)',
          backgroundSize: '200% 200%',
          color: '#000000',
          fontWeight: 700,
          boxShadow: '0 0 20px rgba(255, 0, 255, 0.6), 0 0 40px rgba(0, 255, 255, 0.4)',
          animation: 'gradientShift 3s ease infinite',
          '&:hover': {
            boxShadow: '0 0 30px rgba(255, 0, 255, 0.8), 0 0 60px rgba(0, 255, 255, 0.6)',
            transform: 'translateY(-2px) scale(1.02)',
          },
        },
        outlined: {
          borderWidth: '2px',
          borderColor: '#FF00FF',
          color: '#FF00FF',
          boxShadow: '0 0 10px rgba(255, 0, 255, 0.4), inset 0 0 10px rgba(255, 0, 255, 0.1)',
          '&:hover': {
            borderWidth: '2px',
            borderColor: '#00FFFF',
            color: '#00FFFF',
            background: 'rgba(0, 255, 255, 0.1)',
            boxShadow: '0 0 30px rgba(0, 255, 255, 0.6), inset 0 0 20px rgba(0, 255, 255, 0.2)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundImage: 'linear-gradient(135deg, rgba(157, 0, 255, 0.15) 0%, rgba(255, 0, 255, 0.1) 50%, rgba(0, 255, 255, 0.15) 100%)',
          backdropFilter: 'blur(20px)',
          border: '2px solid',
          borderImage: 'linear-gradient(135deg, #FF00FF, #00FFFF, #9D00FF) 1',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '0 8px 32px rgba(255, 0, 255, 0.2), inset 0 0 20px rgba(0, 255, 255, 0.1)',
          '&:hover': {
            transform: 'translateY(-8px) scale(1.02)',
            boxShadow: '0 12px 48px rgba(255, 0, 255, 0.4), 0 0 60px rgba(0, 255, 255, 0.3), inset 0 0 30px rgba(157, 0, 255, 0.2)',
            borderImage: 'linear-gradient(135deg, #00FFFF, #FF00FF, #00FFFF) 1',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(135deg, rgba(26, 26, 46, 0.95) 0%, rgba(22, 33, 62, 0.95) 100%)',
          backdropFilter: 'blur(10px)',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'linear-gradient(180deg, #000000 0%, #0A0014 25%, #140028 50%, #1E003C 75%, #000000 100%)',
          backgroundSize: '100% 400%',
          backgroundAttachment: 'fixed',
          animation: 'backgroundShift 20s ease infinite',
        },
        '@global': {
          '@keyframes gradientShift': {
            '0%, 100%': {
              backgroundPosition: '0% 50%',
            },
            '50%': {
              backgroundPosition: '100% 50%',
            },
          },
          '@keyframes backgroundShift': {
            '0%, 100%': {
              backgroundPosition: '0% 0%',
            },
            '50%': {
              backgroundPosition: '0% 100%',
            },
          },
        },
      },
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0 2px 8px rgba(0, 0, 0, 0.1)',
    '0 4px 12px rgba(0, 0, 0, 0.15)',
    '0 6px 16px rgba(0, 0, 0, 0.2)',
    '0 8px 24px rgba(0, 0, 0, 0.25)',
    '0 10px 32px rgba(0, 0, 0, 0.3)',
    '0 12px 40px rgba(0, 0, 0, 0.35)',
    '0 14px 48px rgba(0, 0, 0, 0.4)',
    '0 16px 56px rgba(0, 0, 0, 0.45)',
    '0 18px 64px rgba(0, 0, 0, 0.5)',
    '0 20px 72px rgba(0, 0, 0, 0.55)',
    '0 22px 80px rgba(0, 0, 0, 0.6)',
    '0 24px 88px rgba(0, 0, 0, 0.65)',
    '0 26px 96px rgba(0, 0, 0, 0.7)',
    '0 28px 104px rgba(0, 0, 0, 0.75)',
    '0 30px 112px rgba(0, 0, 0, 0.8)',
    '0 32px 120px rgba(0, 0, 0, 0.85)',
    '0 34px 128px rgba(0, 0, 0, 0.9)',
    '0 36px 136px rgba(0, 0, 0, 0.95)',
    '0 38px 144px rgba(0, 0, 0, 1)',
    '0 40px 152px rgba(0, 0, 0, 1)',
    '0 42px 160px rgba(0, 0, 0, 1)',
    '0 44px 168px rgba(0, 0, 0, 1)',
    '0 46px 176px rgba(0, 0, 0, 1)',
    '0 48px 184px rgba(0, 0, 0, 1)',
  ],
})

export default theme

