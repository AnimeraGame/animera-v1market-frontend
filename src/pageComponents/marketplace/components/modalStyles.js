import { makeStyles } from '@material-ui/core/styles'
import { constants } from 'components/Theme/constants'

const commonStyles = theme => ({
  '& .MuiDialogContent-root': {
    padding: '0px',
  },
  '& .MuiOutlinedInput-root': {
    minHeight: 54,
    maxHeight: 54,
  },
  '& .MuiOutlinedInput-multiline': {
    maxHeight: 'unset',
  },
  '& .header': {
    borderBottom: 'none',
    padding: '20px 32px',
    [theme.breakpoints.down('xs')]: {
      padding: '0px 16px',
    },
    '& .MuiIconButton-root': {
      border: `1px solid ${theme.core.colors.n20}`,
      backgroundColor: theme.core.colors.white,
      padding: 6,
      '&:hover': {
        backgroundColor: theme.core.colors.n10,
      },
    },
  },
  '& .MuiDialogTitle-root': {
    flexFlow: 'row wrap',
    padding: '15px 16px 15px 0px',
    '& .MuiTypography-h6': {
      fontSize: 24,
      lineHeight: '30px',
    },
  },
})

export const modalStyles = makeStyles(theme => ({
  root: {
    '& .MuiDialog-paperScrollPaper': {
      maxWidth: 700,
      overflowX: 'hidden',
      minHeight: 300,
      width: 700,
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        margin: 16,
      },
    },
    ...commonStyles(theme),
  },
}))

export const filterModalStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.up(constants.tabletWidth)]: {
      display: 'none',
    },
    '& .MuiDialog-paperScrollPaper': {
      maxWidth: 350,
      overflowX: 'hidden',
      minHeight: 300,
      width: 350,
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        minHeight: '100%',
        minWidth: '100%',
      },
    },
    ...commonStyles(theme),
  },
}))
