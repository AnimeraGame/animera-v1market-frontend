import React, { useEffect } from 'react'
import { Popover } from '@material-ui/core'
import PropTypes from 'prop-types'
import ErrorFeedback from './Error'
import SuccessFeedback from './Success'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  paper: {
    width: 'auto',
    maxWidth: 450,
    [theme.breakpoints.down('md')]: {
      width: 'auto',
    },
    [theme.breakpoints.down('sm')]: {
      width: '65%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  },
}))

const Feedback = ({ message, onClose, type, showWarningIcon, closedAfter = 5000, open }) => {
  const classes = useStyles()
  useEffect(() => {
    const timeout = setTimeout(() => onClose(), closedAfter)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <Popover
      anchorReference="anchorPosition"
      classes={{ paper: classes.paper }}
      anchorPosition={{ top: 75, left: window.innerWidth - 30 }}
      open={open}
      onClose={onClose}>
      {type === 'success' ? (
        <SuccessFeedback text={message} onClose={onClose} />
      ) : (
        <ErrorFeedback text={message} onClose={onClose} showWarningIcon={showWarningIcon} />
      )}
    </Popover>
  )
}
Feedback.propTypes = {
  message: PropTypes.string,
  onClose: PropTypes.func,
  type: PropTypes.string,
  closedAfter: PropTypes.number,
  showWarningIcon: PropTypes.bool,
}

export default Feedback
