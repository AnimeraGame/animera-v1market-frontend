import React, { useRef, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
  IconButton,
} from '@material-ui/core'
import HorizontalMenuIcon from '@material-ui/icons/MoreHoriz'
import VerticalMenuIcon from '@material-ui/icons/MoreVert'
import PropTypes from 'prop-types'
import VideocamOutlinedIcon from '@material-ui/icons/VideocamOutlined'

// local imports
import Theme from 'components/Theme'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& .MuiIconButton-root': {
      padding: 4,
    },
  },
  paper: {
    marginRight: theme.spacing(2),
    zIndex: 2,
    boxShadow: '0px 0px 16px rgba(0, 0, 0, 0.16)',
    border: `1px solid ${theme.core.colors.n40}`,
    borderRadius: 4,
    minWidth: 140,
  },
  icon: {
    color: Theme.colors.n70,
  },
  listItem: {
    minHeight: 30,
    color: Theme.colors.n70,
    fontWeight: 500,
    '&:hover': {
      color: theme.palette.primary.main,
      background: 'transparent',
    },
  },
  listItemIcon: {
    color: theme.core.colors.black,
    opacity: '0.6',
    marginRight: 12,
  },
}))

const ActionMenu = ({
  t,
  iconDirection = 'vertical',
  disabled = false,
  menuItems,
  portal = true,
}) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null)

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen)
  }

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }
    setOpen(false)
  }

  const handleListKeyDown = event => {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open)
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus()
    }
    prevOpen.current = open
  }, [open])

  return (
    <div className={classes.root}>
      <div>
        <IconButton
          disabled={disabled}
          aria-label="open-menu"
          ref={anchorRef}
          aria-controls={open ? 'class-menu' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}>
          {iconDirection === 'horizontal' ? (
            <HorizontalMenuIcon className={classes.icon} />
          ) : (
            <VerticalMenuIcon className={classes.icon} />
          )}
        </IconButton>
        {open ? (
          <Popper
            className={classes.paper}
            placement="bottom-end"
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            disablePortal={portal}
            transition>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom' ? 'start top' : 'start bottom' }}>
                <Paper style={{ boxShadow: 'none' }}>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      id="action-menu"
                      onKeyDown={handleListKeyDown}
                      style={{ outline: 'none' }}>
                      {menuItems.map(item => (
                        <MenuItem
                          key={item.title}
                          classes={{ root: classes.listItem }}
                          disabled={item.disabled}
                          onClick={e => {
                            handleClose(e)
                            item.onClick()
                          }}>
                          {item.showIcon ? (
                            <VideocamOutlinedIcon className={classes.listItemIcon} />
                          ) : null}
                          {item.title}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        ) : null}
      </div>
    </div>
  )
}

ActionMenu.propTypes = {
  t: PropTypes.func,
  iconDirection: PropTypes.string,
  disabled: PropTypes.bool,
  portal: PropTypes.bool,
  menuItems: PropTypes.array,
}

export default ActionMenu
