import theme from './index'

const { palette, ...restTheme } = theme

// see https://material-ui.com/customization/themes/ for more details and available overrides
export default {
  /* Material Ui Official Format */
  core: restTheme,
  // breakpoint overrides. See: https://material-ui.com/customization/breakpoints/
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 1366,
      xl: 1440,
    },
  },
  // https://www.figma.com/file/y1ro7NzIxcXNuu9R68TARW/Full-House-UI-**?node-id=0%3A1
  typography: {
    fontFamily: `'DM Sans', sans-serif`,
    letterSpacing: 0,
    useNextVariants: true,
    h1: {
      fontSize: 50,
      fontWeight: 600,
      lineHeight: '65px',
      letterSpacing: '0.5px',
      '@media (max-width:768px)': {
        fontSize: 32,
        lineHeight: '40px',
      },
    },
    h2: {
      fontSize: 45,
      fontWeight: 600,
      lineHeight: '60px',
      letterSpacing: '0.5px',
      '@media (max-width:768px)': {
        fontSize: 28,
        lineHeight: '32px',
      },
    },
    h3: {
      fontSize: 35,
      fontWeight: 600,
      letterSpacing: '0.5px',
      lineHeight: '46px',
      '@media (max-width:768px)': {
        fontSize: 24,
        lineHeight: '28px',
      },
    },
    h4: {
      fontSize: 28,
      fontWeight: 600,
      letterSpacing: '0.5px',
      lineHeight: '36px',
      '@media (max-width:768px)': {
        fontSize: 20,
        lineHeight: '24px',
      },
    },
    h5: {
      fontSize: 20,
      fontWeight: 500,
      letterSpacing: '0.5px',
      lineHeight: '26px',
      '@media (max-width:768px)': {
        fontSize: 18,
        lineHeight: '20px',
      },
    },
    h6: {
      fontSize: 18,
      fontWeight: 500,
      letterSpacing: '0.2px',
      lineHeight: '22px',
      '@media (max-width:768px)': {
        fontSize: '16px',
        lineHeight: '20px',
      },
    },
    subtitle1: {
      fontSize: '16px',
      fontWeight: 500,
      lineHeight: '24px',
      fontFamily: `'DM Mono', sans-serif`,
    },
    subtitle2: {
      fontSize: '14px',
      fontWeight: 600,
      lineHeight: '20px',
      fontFamily: `'DM Mono', sans-serif`,
    },
    body1: {
      fontSize: '16px',
      fontWeight: 500,
      lineHeight: '20px',
      letterSpacing: '0.2px',
    },
    body2: {
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '20px',
      letterSpacing: '0.2px',
    },
    caption: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '18px',
      letterSpacing: '0.2px',
    },
    button: {
      boxShadow: 'none',
      letterSpacing: '0.43px',
      textTransform: 'none',
      fontWeight: 500,
      '@media (max-width:768px)': {
        fontSize: '95%',
        paddingLeft: 12,
        paddingRight: 12,
      },
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          fontFamily: `'DM Sans', sans-serif`,
          backgroundColor: theme.colors.white,
        },
      },
    },
    MuiButton: {
      contained: {
        boxShadow: 'none',
        letterSpacing: '0.5px',
        fontWeight: 600,
        '&.Mui-disabled': {
          backgroundColor: theme.colors.disabledBackground,
        },
        '@media (max-width:768px)': {
          fontSize: '95%',
          paddingLeft: 12,
          paddingRight: 12,
        },
      },
      outlined: {
        boxShadow: 'none',
        letterSpacing: '0.5px',
        fontWeight: 600,
        '@media (max-width:768px)': {
          fontSize: '95%',
          paddingLeft: 12,
          paddingRight: 12,
        },
      },
      root: {
        minHeight: 44,
        boxShadow: 'none',
        letterSpacing: '0.5px',
        borderRadius: '25px',
        '@media (max-width:768px)': {
          fontSize: '95%',
          paddingLeft: 12,
          paddingRight: 12,
          minHeight: 'auto',
        },
      },
      sizeSmall: {
        minHeight: 36,
        fontSize: 12,
      },
      sizeLarge: {
        minHeight: 52,
        fontSize: 16,
      },
      text: {
        padding: '8px 16px',
        letterSpacing: '0.5px',
        fontWeight: 600,
        '&:hover': {
          background: theme.colors.primaryColorHover,
        },
        '@media (max-width:768px)': {
          fontSize: '95%',
          paddingLeft: 12,
          paddingRight: 12,
        },
      },
    },
    MuiLink: {
      button: {
        letterSpacing: '0.43px',
        fontWeight: 600,
        '@media (max-width:768px)': {
          fontSize: '95%',
          paddingLeft: 12,
          paddingRight: 12,
        },
      },
    },
    MuiSelect: {
      select: {
        fontSize: '16px',
        fontWeight: '400',
        letterSpacing: '0.44px',
      },
    },
    MuiMenu: {
      paper: {
        boxShadow: '1px 6px 9px rgba(0,0,0,0.05)',
        borderRadius: '4px',
        border: `solid 1px ${restTheme.colors.n20}`,
      },
    },

    MuiMenuItem: {
      root: {
        fontSize: '14px',
        fontWeight: '400',
        letterSpacing: '0.44px',
      },
    },
    MuiTabs: {
      root: {
        borderBottom: `solid 1px ${restTheme.colors.n20}`,
        overflow: 'unset',
        minHeight: '33px',
      },
      fixed: {
        overflowX: 'unset',
      },
    },
    MuiTab: {
      root: {
        fontSize: '16px',
        fontWeight: 500,
        lineHeight: '20px',
        minHeight: '36px',
        textTransform: 'none',
      },
    },
    MuiPrivateTabIndicator: {
      root: {
        height: '5px',
        bottom: '-5px',
      },
    },
    MuiCard: {
      root: {
        overflow: 'unspecified',
      },
    },
    MuiFormLabel: {
      root: {
        fontSize: '16px',
        letterSpacing: '0.5px',
        color: theme.colors.n50,
      },
    },
    MuiInputBase: {
      root: {
        fontSize: '16px',
        lineHeight: '20px',
        '& $focused': {
          color: theme.colors.n,
        },
      },
      input: {
        fontSize: '16px',
        height: '20px',
        '&::-webkit-input-placeholder': {
          fontSize: '16px',
        },
      },
    },
    MuiOutlinedInput: {
      root: {
        minHeight: '50px',
        borderRadius: 8,
        '& $disabled': {
          backgroundColor: theme.colors.disabledBackground,
        },
        '&$focused': {
          borderColor: theme.colors.primaryColor,
          color: theme.colors.n80,
        },
        '&.Mui-error': {
          '& fieldset': {
            borderWidth: 2,
          },
        },
      },
      notchedOutline: {
        borderColor: theme.colors.n80,
        borderWidth: 2,
        '&$focused': {
          borderColor: theme.colors.primaryColor,
        },
      },
      input: {
        borderColor: theme.colors.n80,
        padding: '16px 14px',
        '&$focused': {
          borderColor: theme.colors.primaryColor,
          color: theme.colors.n80,
        },
        '&[type=password]': { font: 'small-caption', fontSize: '18px', letterSpacing: '2px' },
      },
    },
    MuiInputLabel: {
      outlined: {
        fontSize: '14px',
        '&$shrink': {
          transform: 'translate(14px, -5px) scale(0.75)',
        },
      },
    },
    MuiIconButton: {
      root: {
        color: theme.colors.n50,
      },
    },
    MuiDrawer: {
      paper: {
        overflowY: 'none',
      },
    },
    MuiFormHelperText: {
      root: {
        marginTop: 8,
        color: theme.colors.n50,
        letterSpacing: '0.5px',
        lineHeight: '14px',
        '&.Mui-error': {
          fontWeight: 500,
        },
      },
    },
  },
  MuiTableRow: {
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.colors.n10,
      },
    },
  },
  palette,
}
