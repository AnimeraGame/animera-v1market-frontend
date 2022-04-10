import { useState } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ErrorIcon from '@material-ui/icons/Error'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import Close from '@material-ui/icons/Close'
import noop from 'lodash/noop'

const styles = theme => ({
  rowSuccess: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.core.colors.lighterRed,
    padding: '12px 15px 12px 15px',
    'border-radius': '5px',
    width: '100%',
    'box-sizing': 'border-box',
  },
  labelGrid: {
    display: 'flex',
  },
  errorText: {
    color: theme.core.colors.black,
    fontSize: theme.core.sizes.sm,
    fontWeight: 600,
    padding: '3px 0px 0px 0px',
  },
  errorIcon: {
    color: theme.core.colors.darkRed,
    alignSelf: 'center',
    margin: '0px 15px 0px 0px',
  },
  buttonSec: {
    marginRight: 5,
    textAlign: 'right',
    '& .MuiIconButton-root': {
      color: theme.core.colors.n90,
      padding: 6,
    },
  },
})

const ErrorFeedback = props => {
  const { classes, text, onClose, onClick, showWarningIcon = true } = props
  const [open, setOpen] = useState(true)

  const handleClick = () => {
    setOpen(false)
    onClose()
    onClick()
  }

  return (
    <>
      {open ? (
        <div className={classes.rowSuccess} data-tc="error-feedback">
          <Grid item sm={12} md={10} className={classes.labelGrid}>
            {showWarningIcon && <ErrorIcon fontSize="default" className={classes.errorIcon} />}
            <Typography component="p" className={classes.errorText}>
              {text}
            </Typography>
          </Grid>
          <Grid item sm={12} md={2} className={classes.buttonSec}>
            <IconButton onClick={handleClick}>
              <Close />
            </IconButton>
          </Grid>
        </div>
      ) : null}
    </>
  )
}

ErrorFeedback.propTypes = {
  classes: PropTypes.object.isRequired,
  showWarningIcon: PropTypes.bool,
  text: PropTypes.string,
  onClick: PropTypes.func,
  onClose: PropTypes.func,
}

ErrorFeedback.defaultProps = {
  onClick: noop,
  onClose: noop,
}

export default withStyles(styles)(ErrorFeedback)
