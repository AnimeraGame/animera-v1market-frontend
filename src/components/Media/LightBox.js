import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Dialog, DialogContent, Slide, IconButton, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'
import ReactPlayer from 'react-player/lazy'
import get from 'lodash/get'
import includes from 'lodash/includes'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import Description from '@material-ui/icons/Description'
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf'
import CloudDownloadIcon from '@material-ui/icons/CloudDownloadOutlined'
import ZoomOutIcon from '@material-ui/icons/ZoomOut'
import ZoomInIcon from '@material-ui/icons/ZoomIn'
import clsx from 'clsx'

import { FontWeights, H6 } from 'components/Typography'
import Loading from 'components/Loading'
import Thumbs from './MediaCarousel/ThumbMediaComponent'
import { constants } from 'components/Theme/constants'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const useStyles = makeStyles(theme => ({
  dialog: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    '& .MuiDialog-paperScrollBody': {
      maxWidth: 'calc(100% - 8px)',
    },
  },
  root: {
    maxWidth: '100%',
    minHeight: 300,
    height: '100vh',
    [theme.breakpoints.down('sm')]: {
      minHeight: 'auto',
    },
  },
  paperFullWidth: {
    width: 'calc(100% - 8px)',
  },
  paper: {
    margin: 0,
    background: 'transparent',
    [theme.breakpoints.down('md')]: {
      margin: '0px 8px',
    },
  },
  body: {
    display: 'flex',
    width: '100%',
    height: '100%',
    margin: 'auto 0px',
    position: 'relative',
    '& .MuiDialogContent-root': {
      padding: 0,
      position: 'relative',
      margin: 'auto',
      height: '100%',
    },
    '& .player-container': {
      width: '100%',
      position: 'relative',
      paddingTop: '56.25%', // used to make the player responsive
    },
    '& .react-player': {
      position: 'absolute',
      top: '0',
      left: '0',
    },
  },
  videoWrapper: {
    width: `90%`,
    maxWidth: 960,
    margin: `auto`,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  iconButton: {
    background: 'transparent',
    padding: 4,
    zIndex: 3,
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.2)',
    },
    '& svg': {
      color: theme.core.colors.white,
      fontSize: '2.25rem',
      [theme.breakpoints.down('sm')]: {
        fontSize: '1.5rem',
      },
    },
  },
  closeIconButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  zoomInButton: {
    position: 'absolute',
    top: 10,
    right: 110,
    transform: 'scale(-1, 1)',
  },
  zoomOutButton: {
    position: 'absolute',
    top: 10,
    right: 60,
    transform: 'scale(-1, 1)',
  },
  backIcon: {
    position: 'absolute',
    top: '45%',
    left: '1%',
    padding: 1,
    zIndex: 1,
    cursor: 'pointer',
    background: theme.core.colors.white,
    '&:hover': {
      background: theme.core.colors.n10,
    },
    '& svg': {
      color: theme.core.colors.primaryColor,
    },
  },
  nextIcon: {
    position: 'absolute',
    top: '45%',
    right: '1%',
    background: theme.core.colors.white,
    padding: 1,
    zIndex: 1,
    cursor: 'pointer',
    '&:hover': {
      background: theme.core.colors.n10,
    },
    '& svg': {
      color: theme.core.colors.primaryColor,
    },
  },
  imageContainer: {
    width: '100%',
    padding: '12px 0px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
    height: '100%',
    '& img': {
      borderRadius: 8,
      objectFit: 'contain',
    },
  },
  containerWithFileName: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    minHeight: 400,
    height: '100%',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    '& svg': {
      color: theme.core.colors.white,
      paddingBottom: '12px',
      height: '50px',
      width: '50px',
    },
  },
  rowTextIcon: {
    flexDirection: 'row',
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    justifyContent: 'center',
    color: theme.core.colors.white,
  },
  count: {
    position: 'absolute',
    top: '2%',
    left: '50%',
    color: theme.core.colors.white,
  },
  loading: {
    height: '90%',
    width: '90%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    margin: '0px 5%',
    '& .MuiCircularProgress-colorPrimary': {
      color: theme.core.colors.white,
    },
  },
  thumbnailsContainer: {
    position: 'absolute',
    top: '25%',
    left: '5%',
    height: 'auto',
    zIndex: theme.zIndex.modal + 2,
    [theme.breakpoints.down(constants.tabletWidth)]: {
      display: 'none',
    },
    '& .thumbnail': {
      padding: 0,
      marginBottom: 8,
      width: 120,
      height: 80,
      borderRadius: 8,
      overflow: 'hidden',
    },
  },
  arrowContainer: {
    display: 'none',
    [theme.breakpoints.down(constants.tabletWidth)]: {
      display: 'block',
    },
  },
}))

const LightBox = ({
  onClose,
  isOpen,
  t,
  playerControls = false,
  lightMode = false,
  handlePipToggle,
  autoPlay = true,
  current = 0,
  mediaList = [],
}) => {
  const classes = useStyles()
  const [currentMedia, setCurrentMedia] = useState(mediaList[current])
  const [currentIndex, setCurrentIndex] = useState(current)
  const [imageHeight, setImageHeight] = useState(80) // vh unit is used
  const [imageWidth, setImageWidth] = useState(95) // vw unit is used
  const handleNavigation = index => {
    if (imageHeight !== 80) {
      setImageWidth(95)
      setImageHeight(80)
    }
    setCurrentIndex(index)
    setCurrentMedia(mediaList[index])
    if (includes(get(mediaList[index], 'mimeType', ''), 'image')) setLoading(true)
  }
  const handleZoomIn = index => {
    setImageHeight(prev => prev + 15)
    setImageWidth(prev => prev + 15)
  }

  const handleZoomOut = () => {
    if (imageHeight > 30 && imageWidth > 40) {
      setImageHeight(prev => prev - 15)
      setImageWidth(prev => prev - 15)
    }
  }
  const [loading, setLoading] = useState(true)
  const imageLoaded = () => {
    setLoading(false)
  }
  return (
    <Dialog
      aria-labelledby="light-box"
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
      {mediaList.length > 1 ? (
        <div className={classes.count}>
          <H6 fontWeight={FontWeights.regular}>{currentIndex + 1 + '/' + mediaList.length}</H6>
        </div>
      ) : null}
      {get(currentMedia, 'mimeType', '') === 'image' ? (
        <>
          <IconButton
            disabled={loading}
            className={clsx(classes.zoomInButton, classes.iconButton)}
            onClick={handleZoomIn}>
            <ZoomInIcon />
          </IconButton>
          <IconButton
            disabled={loading}
            className={clsx(classes.zoomOutButton, classes.iconButton)}
            onClick={handleZoomOut}>
            <ZoomOutIcon />
          </IconButton>
        </>
      ) : null}
      <IconButton className={clsx(classes.closeIconButton, classes.iconButton)} onClick={onClose}>
        <CloseIcon />
      </IconButton>
      {mediaList.length > 1 ? (
        <div className={classes.thumbnailsContainer}>
          {mediaList.map((media, idx) => (
            <div className="thumbnail" key={idx}>
              <Thumbs t={t} media={media} onClick={() => handleNavigation(idx)} />
            </div>
          ))}
        </div>
      ) : null}
      <div className={classes.body}>
        <DialogContent>
          {mediaList.length > 1 ? (
            <div className={classes.arrowContainer}>
              <IconButton
                className={classes.backIcon}
                onClick={e => {
                  e.stopPropagation()
                  currentIndex === 0
                    ? handleNavigation(mediaList.length - 1)
                    : handleNavigation(currentIndex - 1)
                }}>
                <ChevronLeftIcon />
              </IconButton>
              <IconButton
                className={classes.nextIcon}
                onClick={e => {
                  e.stopPropagation()
                  currentIndex === mediaList.length - 1
                    ? handleNavigation(0)
                    : handleNavigation(currentIndex + 1)
                }}>
                <ChevronRightIcon />
              </IconButton>
            </div>
          ) : null}
          {includes(get(currentMedia, 'mimeType', ''), 'image') ? (
            <>
              {loading ? (
                <div className={classes.loading}>
                  <Loading />
                </div>
              ) : null}
              <div
                className={classes.imageContainer}
                style={{ visibility: loading ? 'hidden' : 'visible' }}>
                <img
                  src={get(currentMedia, 'url', '')}
                  alt=""
                  loading="lazy"
                  onLoad={imageLoaded}
                  style={{ height: `${imageHeight}vh`, width: `${imageWidth}vw` }}
                />
              </div>
            </>
          ) : includes(get(currentMedia, 'mimeType', ''), 'video') ||
            includes(get(currentMedia, 'mimeType', ''), 'audio') ? (
            <div className={classes.videoWrapper}>
              <div className="player-container">
                <ReactPlayer
                  url={get(currentMedia, 'url', '')}
                  className="react-player"
                  width="100%"
                  height="100%"
                  controls={playerControls}
                  playing={autoPlay}
                  light={lightMode}
                  stopOnUnmount={false}
                  onEnablePIP={handlePipToggle}
                  onDisablePIP={handlePipToggle}
                  loop
                  pip={false} // picture in picture mode
                  // config={{ file: { attributes: { disablepictureinpicture: 'true' } } }} to disable the picture in picture mode
                />
              </div>
            </div>
          ) : (
            <Box
              title={t('download')}
              className={classes.containerWithFileName}
              onClick={() => window.open(get(currentMedia, 'url', ''), '_blank')}>
              <CloudDownloadIcon className={classes.largeIcon} />
              {get(currentMedia, 'fileName', false) ? (
                <div className={classes.rowTextIcon}>
                  {includes(get(currentMedia, 'mimeType', ''), '/pdf') ? (
                    <PictureAsPdfIcon color="primary" style={{ fontSize: 22, marginRight: 6 }} />
                  ) : (
                    <Description color="primary" style={{ fontSize: 22, marginRight: 6 }} />
                  )}
                  <H6 fontWeight={FontWeights.medium}>{get(currentMedia, 'fileName', '')}</H6>
                </div>
              ) : null}
            </Box>
          )}
        </DialogContent>
      </div>
    </Dialog>
  )
}

LightBox.propTypes = {
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
  t: PropTypes.func,
  autoPlay: PropTypes.bool,
  playerControls: PropTypes.bool,
  lightMode: PropTypes.bool,
  handlePipToggle: PropTypes.func,
  current: PropTypes.number,
  mediaList: PropTypes.array,
}

export default LightBox
