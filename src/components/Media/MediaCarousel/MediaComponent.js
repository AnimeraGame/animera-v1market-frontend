import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@material-ui/core'
import isEmpty from 'lodash/isEmpty'
import clsx from 'clsx'
import includes from 'lodash/includes'
import { makeStyles } from '@material-ui/core/styles'
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined'
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded'
import HeadsetOutlinedIcon from '@material-ui/icons/HeadsetOutlined'
import Description from '@material-ui/icons/Description'
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf'
import CloudDownloadIcon from '@material-ui/icons/CloudDownloadOutlined'

import { FontWeights, H6 } from 'components/Typography'
import Theme from 'components/Theme'

const useStyles = makeStyles(theme => ({
  roots: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `1px solid ${theme.core.colors.neutral}`,
    marginBottom: 0,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  hoverSelection: {
    '&:hover': {
      borderColor: theme.core.colors.n40,
    },
  },
  fileContainer: {
    width: '100%',
    overflow: 'hidden',
    height: '100%',
    display: 'flex',
    position: 'relative',
    backgroundColor: theme.core.colors.lightNeutral,
    '& .file-name': {
      backgroundColor: theme.core.colors.white,
      color: theme.core.colors.n70,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%',
      borderRadius: '6px',
      cursor: 'default',
    },
    '& img': {
      margin: 'auto',
      display: 'block',
      height: '100%',
      width: '100%',
      objectFit: 'cover',
      objectPosition: 'center',
    },
  },
  icon: {
    color: theme.core.colors.n70,
    cursor: 'pointer',
  },
  largeIcon: {
    color: theme.core.colors.n70,
    paddingBottom: '12px',
    height: '75px',
    width: '75px',
    cursor: 'pointer',
  },
  playIconContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    display: 'flex',
    '&:hover': {
      '& .background': {
        padding: 5,
        transition: '.20s',
      },
    },
    '& .background': {
      padding: 0,
      display: 'flex',
      borderRadius: '50%',
      background: 'rgba(0, 0, 0, 0.3)',
    },
  },
  iconWhite: {
    color: theme.core.colors.white,
    fontSize: 30,
  },
  blackOverlay: {
    display: 'flex',
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: theme.core.colors.black,
    opacity: 0.6,
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
  },
  containerWithFileName: {
    display: 'block',
    width: '100%',
    paddingTop: '20%',
    height: '100vh',
    objectFit: 'cover',
    backgroundColor: theme.core.colors.n10,
  },
  imageBox: {
    backgroundColor: theme.core.colors.n10,
    cursor: 'pointer',
    overflow: 'hidden',
    transition: 'transform .4s',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    '&:hover': {
      transform: 'scale(1.04)',
    },
  },
  coverImageBox: {
    backgroundColor: theme.core.colors.n10,
    cursor: 'pointer',
    overflow: 'hidden',
    transition: 'transform .4s',
    '& img': {
      objectFit: 'cover',
      width: '100%',
      position: 'absolute',
      left: '50%',
      top: '50%',
      '-webkit-transform': 'translate(-50%,-50%)',
      '-ms-transform': 'translate(-50%,-50%)',
      transform: 'translate(-50%, -50%)',
      minWidth: '100%',
      minHeight: '100%',
    },
    '&:hover': {
      transform: 'scale(1.04)',
    },
  },
}))

const MediaComponent = ({ t, media, handleClick }) => {
  const classes = useStyles()
  const getMediaTypePlaceholder = mimeType => {
    if (includes(mimeType, 'image')) {
      return (
        <Box
          display="flex"
          width="100%"
          height="100%"
          className={media.coverImage ? classes.coverImageBox : classes.imageBox}
          title={t('preview')}
          onClick={handleClick}>
          <img loading="lazy" alt={media.imageTitle} src={media.url ? media.url : ''} />
        </Box>
      )
    }
    if (includes(mimeType, 'video')) {
      return (
        <Box
          display="flex"
          width="100%"
          height="100%"
          title={t('preview')}
          style={{ cursor: 'pointer' }}
          onClick={handleClick}>
          {!media.thumbnailUrl ? <div className={classes.blackOverlay} /> : null}
          {media.thumbnailUrl ? (
            <img
              loading="lazy"
              alt={media.imageTitle || ''}
              src={media.thumbnailUrl ? media.thumbnailUrl : ''}
            />
          ) : null}
          <div className={classes.playIconContainer}>
            <div className="background">
              <PlayArrowRoundedIcon className={classes.iconWhite} />
            </div>
          </div>
        </Box>
      )
    }
    if (includes(mimeType, 'audio')) {
      return (
        <Box
          display="flex"
          width="100%"
          height="100%"
          onClick={() => {
            if (includes(mimeType, '/mpeg')) handleClick()
          }}
          className={classes.containerWithFileName}
          style={{ cursor: 'pointer' }}
          title={t('download')}>
          <HeadsetOutlinedIcon className={classes.largeIcon} />
          {media.fileName && (
            <H6 style={{ color: Theme.colors.n50 }} fontWeight={FontWeights.medium}>
              {media.fileName}
            </H6>
          )}
        </Box>
      )
    } else {
      return (
        <Box
          title={t('download')}
          className={classes.containerWithFileName}
          onClick={() => window.open(media.url, '_blank')}>
          <CloudDownloadIcon className={classes.largeIcon} />
          {media.fileName && (
            <div className={classes.rowTextIcon}>
              {includes(media.mimeType, '/pdf') ? (
                <PictureAsPdfIcon color="primary" style={{ fontSize: 22, marginRight: 6 }} />
              ) : (
                <Description color="primary" style={{ fontSize: 22, marginRight: 6 }} />
              )}
              <H6 style={{ color: Theme.colors.n50 }} fontWeight={FontWeights.medium}>
                {media.fileName}
              </H6>
            </div>
          )}
        </Box>
      )
    }
  }

  return (
    <>
      <div className={classes.roots}>
        <div className={clsx(classes.container, isEmpty(media) && classes.hoverSelection)}>
          {isEmpty(media) ? (
            <ErrorOutlineOutlinedIcon className={classes.icon} />
          ) : (
            <Box className={classes.fileContainer}>{getMediaTypePlaceholder(media.mimeType)}</Box>
          )}
        </div>
      </div>
    </>
  )
}

MediaComponent.propTypes = {
  t: PropTypes.func,
  media: PropTypes.object,
  handleClick: PropTypes.func,
}

export default MediaComponent
