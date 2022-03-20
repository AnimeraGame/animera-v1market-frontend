import React from 'react'
import PropTypes from 'prop-types'
import { Dialog, DialogContent, Slide, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ReactPlayer from 'react-player/lazy'
import CloseIcon from '@material-ui/icons/Close'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export const useStyles = makeStyles(theme => ({
  dialog: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  root: {
    maxWidth: 960,
    background: 'rgb(27, 38, 56)',
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
    position: 'relative',
    '& .MuiDialogContent-root': {
      padding: 0,
    },
    '& .player-container': {
      position: 'relative',
      paddingTop: '56.25%', // used to make the player responsive
    },
    '& .react-player': {
      position: 'absolute',
      top: '0',
      left: '0',
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
}))

const VideoPlayer = ({
  onClose,
  isOpen,
  url,
  t,
  playerControls = true,
  lightMode = false,
  handlePipToggle,
  autoPlay = true,
}) => {
  const classes = useStyles()

  return (
    <Dialog
      aria-labelledby="video-player"
      disableBackdropClick
      fullWidth={true}
      maxWidth={'md'}
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      classes={{
        paperWidthMd: classes.root,
        paperFullWidth: classes.paperFullWidth,
        paper: classes.paper,
        root: classes.dialog,
      }}
      onClose={onClose}>
      <div className={classes.body}>
        <DialogContent className="player-container">
          <IconButton className={classes.closeIconButton} onClick={onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
          <ReactPlayer
            url={url}
            className="react-player"
            width="100%"
            height="100%"
            controls={playerControls}
            playing={autoPlay}
            light={lightMode}
            stopOnUnmount={false}
            onEnablePIP={handlePipToggle}
            onDisablePIP={handlePipToggle}
            pip={false} // picture in picture mode
            // config={{ file: { attributes: { disablepictureinpicture: 'true' } } }} to disable the picture in picture mode
          />
        </DialogContent>
      </div>
    </Dialog>
  )
}

VideoPlayer.propTypes = {
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
  autoPlay: PropTypes.bool,
  url: PropTypes.string,
  t: PropTypes.func,
  playerControls: PropTypes.bool,
  lightMode: PropTypes.bool,
  handlePipToggle: PropTypes.func,
}

export default VideoPlayer
