import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Dialog, DialogContent, Slide, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import ReactPlayer from 'react-player/lazy'
import get from 'lodash/get'
import includes from 'lodash/includes'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ZoomOutIcon from '@material-ui/icons/ZoomOut'
import ZoomInIcon from '@material-ui/icons/ZoomIn'
import clsx from 'clsx'

// local imports
import { FontWeights, H6 } from 'components/Typography'
import Loading from 'components/Loading'
import Thumbs from 'components/Media/MediaCarousel/MediaComponent'
import CardDetails from './CardDetails'
import useDevice from 'hooks/useDevice'
import { useStyles } from './cardModalStyles'
import TradingHistory from './TradingHistory'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const CardModal = ({
  onClose,
  isOpen,
  t,
  playerControls = false,
  lightMode = false,
  handlePipToggle,
  autoPlay = true,
  current = 0,
  cardInfo = {},
  showHistory = false,
}) => {
  const classes = useStyles()
  const { isTablet } = useDevice()
  const mediaList = get(cardInfo, 'mediaList', [])
  const [currentMedia, setCurrentMedia] = useState(mediaList[current])
  const [currentIndex, setCurrentIndex] = useState(current)
  const [imageHeight, setImageHeight] = useState(isTablet ? 50 : 70) // vh unit is used
  const [imageWidth, setImageWidth] = useState(90) // vw unit is used
  const [loading, setLoading] = useState(true)
  const [videoLoading, setVideoLoading] = useState(true)
  const transactions = get(cardInfo, 'info.transactions', [])

  const handleNavigation = index => {
    if (imageHeight !== isTablet ? 50 : 70) {
      setImageWidth(90)
      setImageHeight(isTablet ? 50 : 70)
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
      // scroll={'body'}
      TransitionComponent={Transition}
      keepMounted
      classes={{
        paperWidthMd: classes.root,
        paperFullWidth: classes.paperFullWidth,
        paper: classes.paper,
        root: classes.dialog,
      }}
      onClose={onClose}>
      <IconButton className={clsx(classes.closeIconButton, classes.iconButton)} onClick={onClose}>
        <CloseIcon />
      </IconButton>
      <div className={classes.body}>
        <DialogContent>
          <div style={{ position: 'relative' }}>
            {mediaList.length > 1 ? (
              <div className={classes.count}>
                <H6 fontWeight={FontWeights.regular}>
                  {currentIndex + 1 + '/' + mediaList.length}
                </H6>
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

            {mediaList.length > 1 ? (
              <div className={classes.thumbnailsContainer}>
                {mediaList.map((media, idx) => (
                  <div className="thumbnail" key={idx}>
                    <Thumbs t={t} media={media} handleClick={() => handleNavigation(idx)} />
                  </div>
                ))}
              </div>
            ) : null}
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
            ) : null}
          </div>
          <CardDetails nftData={cardInfo} t={t} />
          {transactions?.length && showHistory ? (
            <TradingHistory transactions={transactions} t={t} />
          ) : null}
        </DialogContent>
      </div>
    </Dialog>
  )
}

CardModal.propTypes = {
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
  t: PropTypes.func,
  autoPlay: PropTypes.bool,
  playerControls: PropTypes.bool,
  showHistory: PropTypes.bool,
  lightMode: PropTypes.bool,
  handlePipToggle: PropTypes.func,
  current: PropTypes.number,
  cardInfo: PropTypes.object,
}

export default CardModal
