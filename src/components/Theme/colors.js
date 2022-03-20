const gray = {
  900: '#202020',
  800: '#2D2D2D',
  700: '#4A4A4A',
  600: '#717171',
  500: '#80868B',
  400: '#DADCE0',
  300: '#DDDDDD',
  200: '#E6E6E6',
  100: '#F7F7F7',
  90: '#F9FAFB',
}

const green = {
  900: '#052E1C',
  800: '#045134',
  700: '#03754C',
  600: '#029863',
  500: '#01BB7B',
  400: '#12CC89',
  300: '#70DBB2',
  200: '#A7EBCD',
  100: '#DEFBE8',
}

const red = {
  900: '#4D0D18',
  800: '#731424',
  700: '#991A2F',
  600: '#C0213B',
  500: '#AB0000',
  400: '#E44949',
  300: '#FAA4A6',
  200: '#FFD2D0',
  100: '#FFEFEE',
}

const purple = {
  900: '#120E57',
  800: '#1D1869',
  700: '#2D2683',
  600: '#40389C',
  500: '#574DB6',
  400: '#8177D3',
  300: '#A198E9',
  200: '#C5BEF7',
  100: '#E2DEFB',
}

const yellow = {
  900: '#856404',
  800: '#93670F',
  700: '#B78619',
  600: '#DBA724',
  500: '#FFCA31',
  400: '#FFD85B',
  300: '#FFE584',
  200: '#FFE799',
  100: '#FFF8D5',
  50: '#FBFBF8',
}

const orange = {
  900: '#6E2809',
  800: '#85380C',
  700: '#A65015',
  600: '#DD7311',
  500: '#E68A2B',
  400: '#F1AF5E',
  300: '#F8C77F',
  200: '#FDE1AB',
  100: '#FDF1D4',
  50: '#FBF7ED',
}

const blue = {
  900: '#0F1D2D',
  800: '#1E3A5A',
  700: '#2C5688',
  600: '#3B73B5',
  500: '#4A90E2',
  400: '#72A9E9',
  300: '#9AC1EF',
  200: '#C2DAF6',
  100: '#EAF2FC',
}

const white = '#FFFFFF'
const backgroundGray = gray[90]
const tabBorderGray = gray[200]
const black = gray[900]
const extremeBlack = '#000'

// Third Party Brand colors
const googleTextColor = 'rgba(0,0,0,0.54)'
const facebookBlue = '#4578F2'

const primaryColor = '#F59B47'
const primaryColorDark = '#F5851D'
const primaryColorHover = '#fCECDC'

const errorColor = '#FA6060'

const buttonBorderGray = '#E1E1E1'
const borderColor = '#DEDEDE'
const disabledBackground = '#DDDDDD'
const iconColor = '#C4C4C4'
const linkColor = '#168DFB'

const gradient1 = 'linear-gradient(99.18deg, #FE428E 19.18%, #FDAE47 80.01%)'
const gradient2 = 'linear-gradient(99.18deg, #33B56B 19.18%, #F3F248 80.01%)'
const gradient3 = 'linear-gradient(99.18deg, #33B56B 19.18%, #F3F248 80.01%)'
const gradient4 = 'linear-gradient(99.18deg, #319A93 19.18%, #2DE3BD 80.01%)'
const gradient5 = 'linear-gradient(99.18deg, #9F9F9F 19.18%, #C4C4C4 80.01%)'
const gradient6 = 'linear-gradient(99.18deg, #596AFF 19.18%, #57A0FF 80.01%)'
const gradient7 = 'linear-gradient(99.18deg, #596BFE 19.18%, #FFED4F 80.01%)'
const cardShadow = '0 4px 12px 0 #0000001a'

export const colors = {
  /* Custom Colors not Used by Material UI Components but Available to Styled Components and
  components loaded with Materials UI's withStyles function  */
  // misc white to black
  white,
  cardShadow,
  backgroundGray,
  tabBorderGray,
  buttonBorderGray,
  black,
  extremeBlack,
  iconColor,
  googleTextColor,
  facebookBlue,
  linkColor,
  // colors
  extremelyLightGreen: green[100],
  extremelyLightYellow: yellow[50],
  extraLightGreen: green[200],
  lighterGreen: green[300],
  lightGreen: green[400],
  darkerGreen: green[700],
  darkGreen: green[600],
  extraLightBlue: blue[100],
  lightBlue: blue[200],
  defaultGreen: green[500],
  blue: blue[500],
  darkBlue: blue[600],
  extraDarkBlue: blue[700],
  deepBlue: blue[800],
  lightPurple: purple[400],
  purple: purple[500],
  darkPurple: purple[600],
  lightRed: red[100],
  lighterRed: red[200],
  roseRed: red[400],
  red: red[500],
  darkRed: red[600],
  extremelyLightOrange: orange[50],
  lighterOrange: orange[100],
  orange20: orange[200],
  lightOrange: orange[300],
  orange: orange[500],
  orange60: orange[600],
  // neutrals/grays
  lighterBackGray: gray[100],
  yellow: yellow[300],
  yellow90: yellow[900],
  yellow20: yellow[200],
  lightYellow: yellow[100],
  n00: gray[90],
  n10: gray[100],
  n20: gray[200],
  n30: gray[300],
  n40: gray[400],
  n50: gray[500],
  n60: gray[600],
  n70: gray[700],
  n80: gray[800],
  n90: gray[900],
  backgroundPrimary: primaryColor,
  borderColor,
  primaryColor,
  primaryColorDark,
  primaryColorHover,
  errorColor,
  disabledBackground,
  gradient1,
  gradient2,
  gradient3,
  gradient4,
  gradient5,
  gradient6,
  gradient7,
  game: {
    textColorGlow: '#fbfba0',
    textShadow: ' 0 0 20px #f59b47, 0 0 20px rgb(10 175 230 / 0%)',
    gradient10:
      'linear-gradient(180deg, #ADCF8B 0%, #068C13 100%), linear-gradient(0deg, #3FA27F, #3FA27F)',
    gradient9: 'linear-gradient(rgb(255 80 80) 0%, rgb(220 22 22) 100%)',
    gradient8:
      'linear-gradient(180deg, rgba(238, 238, 238, 0.2) 0%, rgba(145, 145, 145, 0.2) 39.06%, rgba(234, 234, 234, 0.2) 59.37%, rgba(0, 0, 0, 0.2) 100%), #F3F3F3',
    gradient7:
      'linear-gradient(180deg, #FFE6D3 0%, #EA9E6A 31.77%, #FFF5EF 58.85%, #D59A43 100%), linear-gradient(0deg, #A5A5A5, #A5A5A5)',
    gradient6:
      'linear-gradient(180deg, #484848 0%, #000000 100%), linear-gradient(0deg, #000000, #000000)',
    gradient5:
      'linear-gradient(180deg, #ADCF8B 0%, #068C13 100%),linear-gradient(0deg, #3FA27F, #3FA27F)',
    gradient4: 'radial-gradient(60.9% 60.9% at 50% 39.1%, #53CBF1 0%, #403DC8 100%)',
    gradient3: 'linear-gradient(180deg, #b02bef 0%, #1915b1 100%), #981212',
    gradient2:
      'linear-gradient(180deg, #BBD2D9 0%, #DDFBF2 31.67%, #F0FBFF 40%, #6BC3CF 56.77%, #7FAFBE 71.67%, #366E86 100%), #FFFFFF',
    gradient1:
      'linear-gradient(180deg, #D1B464 0%, #FBFBA0 31.67%, #FFFFFF 40%, #EFEF74 56.77%, #EACB28 71.67%, #CD603E 100%), #FFFFFF',
    boardColor:
      'radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(25,120,24,1) 0%, rgba(15,68,14,1) 100%)',
    text1: '#5A1111',
    border1: '#e1aa2f',
    border2: '#597b85',
    border3: '#415cc4',
    border4: '#0c3c0b',
    border5: '#2d2d2d',
    border6: '#538a33',
    lightColor: '#F1EB92',
    selector1: '#8f0000',
    selector2: '#3a1313',
    selector3: '#350c0c',
    selector4: '#ffd1d1',
    loaderBackground: '#9e692f',
    loaderBorder: '#faad1e',
  },
}

/* Colors that will be applied to Material's theme though its palette  */
export const palette = {
  primary: {
    light: primaryColor,
    main: primaryColor,
    dark: primaryColorDark,
    contrastText: white,
  },
  error: {
    main: errorColor,
  },
  secondary: {
    ultraLight: gray[400],
    light: gray[700],
    main: gray[800],
    dark: gray[900],
    contrastText: colors.white,
  },
  text: {
    primary: colors.black,
    error: errorColor,
  },
}
