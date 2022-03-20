import React from 'react'
import PropTypes from 'prop-types'
import { Dialog, DialogContent, Slide, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export const useStyles = makeStyles(theme => ({
  dialog: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  root: {
    maxWidth: 960,
    background: 'rgb(27, 38, 56)',
    minHeight: 300,
    [theme.breakpoints.down('sm')]: {
      minHeight: 'auto',
    },
  },
  paperFullWidth: {
    width: 'calc(100% - 64px)',
    [theme.breakpoints.down('md')]: {
      width: 'calc(100% - 32px)',
    },
  },
  paper: {
    margin: 32,
    background: 'rgb(27, 38, 56)',
    [theme.breakpoints.down('md')]: {
      margin: '32px 20px',
    },
  },
  body: {
    display: 'flex',
    width: '100%',
    height: '100%',
    margin: 'auto 0px',
    '& .MuiDialogContent-root': {
      padding: 0,
      position: 'relative',
    },
  },
  closeIconButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    background: 'rgba(255, 255, 255, 0.5)',
    padding: 4,
    zIndex: 1,
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.7)',
    },
    '& svg': {
      color: theme.core.colors.black,
    },
  },
  imageContainer: {
    width: '100%',
    padding: '12px 0px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& img': {
      borderRadius: 8,
      width: '92%',
      height: '60vh',
      objectFit: 'contain',
      [theme.breakpoints.down('sm')]: {
        width: '95%',
        height: 'auto',
      },
    },
  },
}))

const ImageViewer = ({ onClose, isOpen, url, t }) => {
  const classes = useStyles()

  return (
    <Dialog
      aria-labelledby="video-player"
      disableBackdropClick
      fullWidth={true}
      maxWidth={'md'}
      open={isOpen}
      scroll={'body'}
      TransitionComponent={Transition}
      keepMounted
      classes={{
        paperWidthMd: classes.root,
        paperFullWidth: classes.paperFullWidth,
        paper: classes.paper,
        root: classes.dialog,
      }}
      onClose={onClose}>
      <IconButton className={classes.closeIconButton} onClick={onClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
      <div className={classes.body}>
        <DialogContent>
          <div className={classes.imageContainer}>
            <img src={url} alt="" />
          </div>
        </DialogContent>
      </div>
    </Dialog>
  )
}

ImageViewer.propTypes = {
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
  url: PropTypes.string,
  t: PropTypes.func,
}

export default ImageViewer
