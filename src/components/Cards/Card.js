// Card container
// https://projects.invisionapp.com/d/main/#/console/17431458/367992893/preview

import PropTypes from 'prop-types'
import MaterialUICard from '@material-ui/core/Card'
import { withStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import noop from 'lodash/noop'

const styles = theme => ({
  root: {
    marginBottom: theme.spacing(2),
    transition: '.15s',
  },
  clickable: {
    cursor: 'pointer',
  },
  elevation0: {
    boxShadow: 'none',
  },
  elevation1: {
    border: `1px solid ${theme.core.colors.n20}`,
    overflow: 'hidden',
    boxShadow: 'none',
  },
  elevation2: {
    boxShadow: '0 1px 2px 0 rgba(44,44,61,0.1), 0 4px 6px 0 rgba(44,44,61,0.32)',
  },
  elevation3: {
    boxShadow: '0 1px 2px 0 rgba(44,44,61,0.2), 0 8px 10px 0 rgba(44,44,61,0.3)',
  },
  elevation4: {
    boxShadow: '0 1px 2px 0 rgba(44,44,61,0.3), 0 24px 32px 0 rgba(44,44,61,0.3)',
  },
  selected: {
    backgroundColor: theme.core.colors.black,
    '& span, p, caption, div, h1, h2, h3': {
      color: theme.core.colors.white,
    },
    '& .info-text': {
      color: theme.core.colors.n40,
    },
  },
  focused: {
    boxShadow: '0 1px 2px 0 rgba(44, 44, 61, 0.2), 0 8px 10px 0 rgba(44, 44, 61, 0.3)',
  },
  shadowOnHover: {
    '&:hover': {
      boxShadow: '0 1px 2px 0 rgba(44, 44, 61, 0.2), 0 8px 10px 0 rgba(44, 44, 61, 0.3)',
    },
  },
})

const Card = ({
  children,
  classes,
  className,
  shadowOnHover,
  elevation,
  isSelected,
  isFocused,
  tooltip,
  onClick,
  ...restProps
}) => {
  const classNames = clsx(
    classes.root,
    classes[`elevation${elevation}`],
    className,
    isSelected && classes.selected,
    isFocused && classes.focused,
    shadowOnHover && classes.shadowOnHover,
    onClick && onClick !== noop && classes.clickable
  )

  return (
    <MaterialUICard className={classNames} onClick={onClick} {...restProps}>
      {children}
    </MaterialUICard>
  )
}

Card.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  className: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  elevation: PropTypes.number,
  isSelected: PropTypes.bool,
  isFocused: PropTypes.bool,
  onClick: PropTypes.func,
  shadowOnHover: PropTypes.bool,
  tooltip: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string,
  }),
}

Card.defaultProps = {
  elevation: 1,
}

export default withStyles(styles)(Card)
