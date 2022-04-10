import PropTypes from 'prop-types'
import { Button as MaterialButton, IconButton } from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import ProgressLoading from 'components/Loading'

const BackButton = ({ history }) => (
  <IconButton onClick={history.goBack}>
    <ArrowBack />
  </IconButton>
)

BackButton.propTypes = {
  history: PropTypes.shape().isRequired,
}

const styles = theme => ({
  button: {
    margin: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    padding: '4px 20px',
  },
  white: {
    backgroundColor: theme.core.colors.white,
  },
})

const cardButtonStyles = theme => ({
  button: {
    margin: theme.spacing(1),
    padding: '4px 20px',
    display: 'flex',
    alignItems: 'center',
    borderStyle: 'dashed',
    '&:hover': {
      borderStyle: 'dashed',
    },
  },

  rounded: {
    borderRadius: 20,
  },
  circular: {
    borderRadius: '50%',
    minWidth: 36,
    width: 36,
  },
})

const ContainedDefault = ({ children, classes, size = 'medium', ...other }) => (
  <MaterialButton
    disableElevation
    variant="contained"
    size={size}
    className={classes.button}
    {...other}>
    {children}
  </MaterialButton>
)

ContainedDefault.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.shape().isRequired,
  size: PropTypes.string,
}

const ContainedPrimary = ({
  children,
  loading,
  disabled,
  classes,
  size = 'medium',
  onClick,
  icon,
  ...other
}) => (
  <MaterialButton
    variant="contained"
    color="primary"
    disableElevation
    size={size}
    className={classes.button}
    disabled={disabled || loading}
    onClick={!loading ? onClick : null}
    {...other}>
    {loading ? (
      <ProgressLoading className="progress-loader" size={28} />
    ) : (
      <>
        {icon ? <div style={{ marginRight: 4, position: 'relative', top: 2 }}>{icon}</div> : null}
        {children}
      </>
    )}
  </MaterialButton>
)

ContainedPrimary.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.shape().isRequired,
  onClick: PropTypes.func,
  size: PropTypes.string,
  loading: PropTypes.bool,
  icon: PropTypes.object,
}

const ContainedSecondary = ({ children, classes, size = 'medium', ...other }) => (
  <MaterialButton
    variant="contained"
    color="secondary"
    disableElevation
    size={size}
    className={classes.button}
    {...other}>
    {children}
  </MaterialButton>
)

ContainedSecondary.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.shape().isRequired,
  size: PropTypes.string,
}

const TextDefault = ({ children, classes, size = 'medium', ...other }) => (
  <MaterialButton variant="outlined" size={size} className={classes.button} {...other}>
    {children}
  </MaterialButton>
)

TextDefault.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.shape().isRequired,
  size: PropTypes.string,
}

const TextPrimary = ({ children, classes, loading, size = 'medium', ...other }) => (
  <MaterialButton color="primary" size={size} className={classes.button} {...other}>
    {loading ? <ProgressLoading className="progress-loader" size={24} /> : children}
  </MaterialButton>
)

TextPrimary.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.shape().isRequired,
  size: PropTypes.string,
  loading: PropTypes.bool,
}

const TextSecondary = ({ children, classes, size = 'medium', ...other }) => (
  <MaterialButton color="secondary" size={size} className={classes.button} {...other}>
    {children}
  </MaterialButton>
)

TextSecondary.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.shape().isRequired,
  size: PropTypes.string,
}

const OutlinedDefault = ({ children, classes, size = 'medium', ...other }) => (
  <MaterialButton variant="outlined" size={size} className={classes.button} {...other}>
    {children}
  </MaterialButton>
)

OutlinedDefault.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.shape().isRequired,
  size: PropTypes.string,
}

const ContainedWhite = ({ children, classes, size = 'medium', ...other }) => (
  <MaterialButton
    variant="outlined"
    size={size}
    className={clsx(classes.button, classes.white)}
    {...other}>
    {children}
  </MaterialButton>
)

ContainedWhite.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.shape().isRequired,
  size: PropTypes.string,
}

const OutlinedPrimary = ({
  children,
  classes,
  size = 'medium',
  disabled,
  icon,
  loading,
  loadingSpinnerSize = 28,
  onClick,
  ...other
}) => (
  <MaterialButton
    variant="outlined"
    color="primary"
    size={size}
    disabled={disabled || loading}
    onClick={!loading ? onClick : null}
    className={classes.button}
    {...other}>
    {loading ? (
      <ProgressLoading size={loadingSpinnerSize} />
    ) : (
      <>
        {icon ? <div style={{ marginRight: 4, position: 'relative', top: 2 }}>{icon}</div> : null}
        {children}
      </>
    )}
  </MaterialButton>
)

OutlinedPrimary.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.shape().isRequired,
  size: PropTypes.string,
  loading: PropTypes.bool,
  loadingSpinnerSize: PropTypes.number,
  icon: PropTypes.object,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
}

const OutlinedSecondary = ({
  children,
  loading,
  onClick,
  disabled,
  icon,
  classes,
  size = 'medium',
  ...other
}) => (
  <MaterialButton
    variant="outlined"
    color="secondary"
    size={size}
    disabled={disabled || loading}
    onClick={!loading ? onClick : null}
    className={classes.button}
    {...other}>
    {loading ? (
      <ProgressLoading className="progress-loader" size={28} />
    ) : (
      <>
        {icon ? <div style={{ marginRight: 4, position: 'relative', top: 2 }}>{icon}</div> : null}
        {children}
      </>
    )}
  </MaterialButton>
)

OutlinedSecondary.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.shape().isRequired,
  size: PropTypes.string,
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.object,
}

const CardButton = ({ children, classes, isCircular = false, ...other }) => (
  <MaterialButton
    variant="outlined"
    className={clsx(classes.button, isCircular ? classes.circular : classes.rounded)}
    {...other}>
    {children}
  </MaterialButton>
)

CardButton.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.shape().isRequired,
  isCircular: PropTypes.bool,
}

const ContainedDefaultButton = withStyles(styles)(ContainedDefault)
const ContainedPrimaryButton = withStyles(styles)(ContainedPrimary)
const ContainedSecondaryButton = withStyles(styles)(ContainedSecondary)
const ContainedWhiteButton = withStyles(styles)(ContainedWhite)

const TextDefaultButton = withStyles(styles)(TextDefault)
const TextPrimaryButton = withStyles(styles)(TextPrimary)
const TextSecondaryButton = withStyles(styles)(TextSecondary)

const OutlinedDefaultButton = withStyles(styles)(OutlinedDefault)
const OutlinedPrimaryButton = withStyles(styles)(OutlinedPrimary)
const OutlinedSecondaryButton = withStyles(styles)(OutlinedSecondary)

const CardControlButton = withStyles(cardButtonStyles)(CardButton)

export {
  BackButton,
  ContainedDefaultButton,
  ContainedPrimaryButton,
  ContainedSecondaryButton,
  ContainedWhiteButton,
  TextDefaultButton,
  TextPrimaryButton,
  TextSecondaryButton,
  OutlinedDefaultButton,
  OutlinedPrimaryButton,
  OutlinedSecondaryButton,
  CardControlButton,
}
