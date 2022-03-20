import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import DoneIcon from '@material-ui/icons/Done'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import Close from '@material-ui/icons/Close'
import noop from 'lodash/noop'

const styles = theme => ({
  rowSuccess: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.core.colors.extremelyLightGreen,
    padding: '12px 15px',
    'border-radius': '5px',
    width: '100%',
    'box-sizing': 'border-box',
  },
  labelGrid: {
    display: 'flex',
  },
  successText: {
    color: theme.core.colors.black,
    fontSize: theme.core.sizes.sm,
    fontWeight: 600,
    padding: '3px 0px 0px 0px',
  },
  successIcon: {
    color: theme.palette.primary.main,
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

const SuccessFeedback = props => {
  const { classes, text, onClose, onClick } = props
  const [open, setOpen] = useState(true)

  const handleClick = () => {
    setOpen(false)
    onClose()
    onClick()
  }

  return (
    <>
      {open ? (
        <div className={classes.rowSuccess} data-tc="success-feedback">
          <Grid item sm={12} md={10} className={classes.labelGrid}>
            <DoneIcon fontSize="default" className={classes.successIcon} />
            <Typography component="p" className={classes.successText}>
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

SuccessFeedback.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string,
  onClick: PropTypes.func,
  onClose: PropTypes.func,
}

SuccessFeedback.defaultProps = {
  onClick: noop,
  onClose: noop,
}

export default withStyles(styles)(SuccessFeedback)
