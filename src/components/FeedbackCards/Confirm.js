import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Done from '@material-ui/icons/Done'
import noop from 'lodash/noop'

const styles = theme => ({
  rowSuccess: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.core.colors.lighterGreen,
    marginBottom: '20px',
    padding: '15px 15px 15px 15px',
    'border-radius': '5px',
  },
  labelGrid: {
    display: 'flex',
  },
  successText: {
    color: theme.core.colors.black,
    fontSize: theme.core.sizes.sm,
    fontWeight: 600,
    padding: '0px 10px 0px 0px',
    letterSpacing: '0.12px',
  },
  buttonSec: {
    marginRight: 5,
    textAlign: 'right',
  },
  blackButton: {
    color: theme.core.colors.white,
    borderRadius: '2px',
    padding: '8px 18px',
    backgroundColor: theme.core.colors.black,
  },
  greyButton: {
    marginRight: 15,
    padding: '8px 15px',
  },
  iconClass: {
    color: theme.core.colors.darkGreen,
    alignSelf: 'center',
    margin: '0px 15px 0px 0px',
  },
})

const SuccessFeedback = props => {
  const { classes, text, isOpen, onClick, onCancel } = props

  return (
    <>
      {isOpen ? (
        <div className={classes.rowSuccess}>
          <Grid item sm={12} md={7} className={classes.labelGrid}>
            <Done fontSize="default" className={classes.iconClass} />
            <Typography component="p" className={classes.successText}>
              {text}
            </Typography>
          </Grid>
          <Grid item sm={12} md={5} className={classes.buttonSec}>
            <Button onClick={onCancel} className={classes.greyButton}>
              Cancel
            </Button>
            <Button
              data-tc="confirm-btn"
              onClick={onClick}
              variant="contained"
              className={classes.blackButton}>
              Confirm
            </Button>
          </Grid>
        </div>
      ) : null}
    </>
  )
}

SuccessFeedback.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  isOpen: PropTypes.bool,
  onClick: PropTypes.func,
  onCancel: PropTypes.func,
}

SuccessFeedback.defaultProps = {
  onCancel: noop,
  onClick: noop,
}

export default withStyles(styles)(SuccessFeedback)
