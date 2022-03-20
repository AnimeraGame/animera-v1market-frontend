import { makeStyles } from '@material-ui/core/styles'
import { constants } from 'components/Theme/constants'

export const useStyles = makeStyles(theme => ({
  dialog: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    '& .MuiDialog-paperScrollBody': {
      maxWidth: 'calc(100% - 8px)',
    },
  },
  root: {
    maxWidth: '100%',
    minHeight: 300,
    height: '100vh',
    [theme.breakpoints.down('sm')]: {
      minHeight: 'auto',
    },
  },
  paperFullWidth: {
    width: 'calc(100% - 8px)',
  },
  paper: {
    margin: 0,
    background: 'transparent',
    [theme.breakpoints.down('md')]: {
      margin: '0px 8px',
    },
  },
  body: {
    display: 'flex',
    width: '100%',
    height: '100%',
    margin: 'auto 0px',
    position: 'relative',
    '& .MuiDialogContent-root': {
      padding: 0,
      position: 'relative',
      margin: 'auto',
      height: '100%',
    },
    '& .player-container': {
      width: '100%',
      position: 'relative',
      paddingTop: '56.25%', // used to make the player responsive
    },
    '& .react-player': {
      position: 'absolute',
      top: '0',
      left: '0',
    },
  },
  videoWrapper: {
    width: `90%`,
    maxHeight: '75%',
    display: 'flex',
    alignItems: 'center',
    paddingTop: 28,
    maxWidth: 960,
    margin: `auto`,
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      maxHeight: '60%',
    },
  },
  iconButton: {
    background: 'transparent',
    padding: 4,
    zIndex: 3,
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.2)',
    },
    '& svg': {
      color: theme.core.colors.white,
      fontSize: '2.25rem',
      [theme.breakpoints.down('sm')]: {
        fontSize: '1.5rem',
      },
    },
  },
  closeIconButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  zoomInButton: {
    position: 'absolute',
    top: 10,
    right: 110,
    transform: 'scale(-1, 1)',
  },
  zoomOutButton: {
    position: 'absolute',
    top: 10,
    right: 60,
    transform: 'scale(-1, 1)',
  },
  backIcon: {
    position: 'absolute',
    top: '45%',
    left: '1%',
    padding: 1,
    zIndex: 1,
    cursor: 'pointer',
    background: theme.core.colors.white,
    '&:hover': {
      background: theme.core.colors.n10,
    },
    '& svg': {
      color: theme.core.colors.primaryColor,
    },
  },
  nextIcon: {
    position: 'absolute',
    top: '45%',
    right: '1%',
    background: theme.core.colors.white,
    padding: 1,
    zIndex: 1,
    cursor: 'pointer',
    '&:hover': {
      background: theme.core.colors.n10,
    },
    '& svg': {
      color: theme.core.colors.primaryColor,
    },
  },
  imageContainer: {
    width: '100%',
    maxHeight: '75%',
    padding: '32px 0px 12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
    '& img': {
      borderRadius: 8,
      objectFit: 'contain',
    },
    [theme.breakpoints.down('sm')]: {
      maxHeight: '60%',
    },
  },
  count: {
    position: 'absolute',
    top: '0%',
    left: '50%',
    color: theme.core.colors.white,
  },
  loading: {
    height: '90%',
    width: '90%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    margin: '0px 5%',
    '& .MuiCircularProgress-colorPrimary': {
      color: theme.core.colors.white,
    },
  },
  thumbnailsContainer: {
    position: 'absolute',
    top: '25%',
    left: '5%',
    height: 'auto',
    zIndex: theme.zIndex.modal + 2,
    [theme.breakpoints.down(constants.tabletWidth)]: {
      display: 'none',
    },
    '& .thumbnail': {
      padding: 0,
      marginBottom: 8,
      width: 120,
      height: 80,
      borderRadius: 8,
      overflow: 'hidden',
    },
  },
  arrowContainer: {
    display: 'none',
    [theme.breakpoints.down(constants.tabletWidth)]: {
      display: 'block',
    },
  },
}))
