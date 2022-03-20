import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import InfoIcon from '@material-ui/icons/Info'
import Button from '@material-ui/core/Button'
import Close from '@material-ui/icons/Close'

const styles = theme => ({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: theme.core.colors.lightNeutral,
    padding: 16,
    borderRadius: 5,
  },
  labelGrid: {
    display: 'flex',
  },
  content: {
    color: theme.core.colors.black,
    fontSize: theme.core.sizes.sm,
    fontWeight: 600,
    padding: '3px 0px 0px 0px',
  },
  infoIcon: {
    color: theme.core.colors.black,
    alignSelf: 'center',
    margin: '0px 10px 0px 0px',
  },
  buttonSec: {
    marginRight: 5,
    marginLeft: 20,
    textAlign: 'right',
  },
  buttonClose: {
    minWidth: '24px',
    padding: 0,
  },
  icon: {
    color: theme.core.colors.n60,
  },
})

const GeneralFeedback = props => {
  const { classes, content, onClick, isOpen } = props

  return isOpen ? (
    <div className={classes.root}>
      <div className={classes.labelGrid}>
        <InfoIcon fontSize="default" className={classes.infoIcon} />
        <div className={classes.content}>{content}</div>
      </div>
      {onClick && (
        <div className={classes.buttonSec}>
          <Button onClick={onClick} className={classes.buttonClose}>
            <Close className={classes.icon} />
          </Button>
        </div>
      )}
    </div>
  ) : null
}

GeneralFeedback.propTypes = {
  classes: PropTypes.object.isRequired,
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  isOpen: PropTypes.bool,
  onClick: PropTypes.func,
}

export default withStyles(styles)(GeneralFeedback)
