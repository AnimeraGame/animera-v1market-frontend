import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import WarningIcon from '@material-ui/icons/Warning'
import Button from '@material-ui/core/Button'
import Close from '@material-ui/icons/Close'

const styles = theme => ({
  rowWarning: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.core.colors.lighterOrange,
    padding: '15px 15px 15px 15px',
    'border-radius': '5px',
    width: '100%',
    'box-sizing': 'border-box',
  },
  labelGrid: {
    display: 'flex',
  },
  warningText: {
    color: theme.core.colors.black,
    fontSize: theme.core.sizes.sm,
    fontWeight: 600,
    padding: '3px 0px 0px 0px',
  },
  warningIcon: {
    color: theme.core.colors.lightOrange,
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

const WarningFeedback = props => {
  const { classes, text, onClick, isOpen } = props

  return isOpen ? (
    <div className={classes.rowWarning} data-tc="warning-feedback">
      <div className={classes.labelGrid}>
        <WarningIcon fontSize="default" className={classes.warningIcon} />
        <Typography component="p" className={classes.warningText}>
          {text}
        </Typography>
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

WarningFeedback.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  isOpen: PropTypes.bool,
  onClick: PropTypes.func,
}

export default withStyles(styles)(WarningFeedback)
