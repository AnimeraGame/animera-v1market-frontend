import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@material-ui/core'
import isEmpty from 'lodash/isEmpty'
import clsx from 'clsx'
import includes from 'lodash/includes'
import { makeStyles } from '@material-ui/core/styles'
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined'
import TextIcon from '@material-ui/icons/Folder'
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded'
import HeadsetOutlinedIcon from '@material-ui/icons/HeadsetOutlined'
import Description from '@material-ui/icons/Description'
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf'

import { FontWeights, Caption } from 'components/Typography'
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
    backgroundColor: theme.core.colors.n00,
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
      cursor: 'pointer',
    },
  },
  icon: {
    color: theme.core.colors.n70,
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

  fileNameContainer: {
    display: 'flex',
    backgroundColor: theme.core.colors.n10,
    width: '100%',
    height: '35%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTop: `1px solid ${theme.core.colors.n00}`,
  },

  rowTextIcon: {
    flexDirection: 'row',
    display: 'flex',
    width: '90%',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    justifyContent: 'center',
  },

  containerWithFileName: {
    display: 'flex',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: theme.core.colors.n30,
  },
  imageBox: {
    backgroundColor: 'transparent',
    overflow: 'hidden',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  },
}))

const ThumbMediaComponent = ({ t, media, onClick = () => {} }) => {
  const classes = useStyles()

  const getMediaTypePlaceholder = mimeType => {
    if (includes(mimeType, 'image')) {
      return (
        <Box
          display="flex"
          width="100%"
          height="100%"
          onClick={onClick}
          className={classes.imageBox}
          title={t('preview')}>
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
          onClick={onClick}
          style={{ cursor: 'pointer' }}>
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
          style={{ cursor: 'pointer' }}
          onClick={onClick}
          title={t('download')}>
          <div className={classes.containerWithFileName}>
            <div>
              <HeadsetOutlinedIcon />
            </div>
            {media.fileName && (
              <div className={classes.fileNameContainer}>
                <div className={classes.rowTextIcon}>
                  <HeadsetOutlinedIcon color="primary" style={{ fontSize: 12, marginRight: 6 }} />
                  <Caption style={{ color: Theme.colors.n50 }} fontWeight={FontWeights.medium}>
                    {media.fileName}
                  </Caption>
                </div>
              </div>
            )}
          </div>
        </Box>
      )
    } else {
      return (
        <Box className="file-name" title={t('download')} style={{ cursor: 'pointer' }}>
          <div className={classes.containerWithFileName}>
            <div>
              <TextIcon className={classes.icon} />
            </div>
            {media.fileName && (
              <div className={classes.fileNameContainer}>
                <div className={classes.rowTextIcon}>
                  {includes(media.mimeType, '/pdf') ? (
                    <PictureAsPdfIcon color="primary" style={{ fontSize: 12, marginRight: 6 }} />
                  ) : (
                    <Description color="primary" style={{ fontSize: 12, marginRight: 6 }} />
                  )}
                  <Caption style={{ color: Theme.colors.n50 }} fontWeight={FontWeights.medium}>
                    {media.fileName}
                  </Caption>
                </div>
              </div>
            )}
          </div>
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

ThumbMediaComponent.propTypes = {
  t: PropTypes.func,
  onClick: PropTypes.func,
  media: PropTypes.object,
}

export default ThumbMediaComponent
