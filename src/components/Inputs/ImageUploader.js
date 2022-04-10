import { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { Close } from '@material-ui/icons'
import includes from 'lodash/includes'

// local imports
import {
  Image,
  UploadContainer,
  HiddenInput,
  UploadPrompt,
  ImageContainer,
  SAddIcon,
  DeleteButton,
  ImageOverlay,
  UploadErrorWrapper,
} from './styles'
import { bytesToSize } from 'lib/util/sizeUtil'
import { Body1, Body2, FontWeights } from 'components/Typography'
import ProgressLoading from 'components/Loading'

const allowedMimeTypes = 'image/png,image/jpeg,image/gif'

const ImageUploader = ({
  t,
  image,
  handleImage,
  cWidth = '160px',
  cHeight = '160px',
  fullWidthResponsive = false,
  showRemoveIcon = false,
  remainingBytes = 8000000,
  uploading = false,
  imageUploadError = false,
}) => {
  const containerRef = useRef()
  const hiddenInputRef = useRef()
  const [isDragOver, setDragOver] = useState(false)
  const [currentFile, setCurrentFile] = useState()
  const [error, setError] = useState(false)
  const [sizeError, setSizeError] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)

  useEffect(() => {
    if (image) {
      setCurrentFile(image)
    }
  }, [image])

  const handleFile = file => {
    if (!file || !file.type || !includes(allowedMimeTypes, file.type)) {
      setError(true)
    } else {
      if (file.size > remainingBytes) {
        setError(false)
        setErrorMessage(t('availableStorageBytes', { storage: bytesToSize(remainingBytes) }))
        setSizeError(true)
      } else {
        setError(false)
        setSizeError(false)
        handleImage(file)
        const reader = new FileReader()
        reader.onloadend = () => {
          const base64Encoded = reader.result
          setCurrentFile(base64Encoded)
        }
        reader.readAsDataURL(file)
      }
    }
  }

  const handleRemove = e => {
    setCurrentFile('')
    handleImage(null)
    e.stopPropagation()
  }

  const handleDragEnter = e => {
    e.preventDefault()
    e.stopPropagation()
    setDragOver(true)
  }

  const handleDragLeave = e => {
    e.preventDefault()
    e.stopPropagation()
    setDragOver(false)
  }

  const handleDrop = e => {
    handleDragLeave(e)
    handleFile(e.dataTransfer.files[0])
  }

  const handleClick = () => {
    if (!uploading) {
      hiddenInputRef.current.focus()
      hiddenInputRef.current.click()
    }
  }

  const handleChange = e => {
    handleFile(e.target.files[0])
    e.target.value = null
  }

  const getErrorDiv = () => {
    return (
      <UploadErrorWrapper>
        <Body2 fontWeight={FontWeights.regular} style={{ textAlign: 'center' }}>
          {imageUploadError ? t('somethingWentWrongRefreshPage') : null}
          {error && !imageUploadError ? t('invalidFileFormat') : null}
          {sizeError && !error && !imageUploadError ? errorMessage : null}
        </Body2>
      </UploadErrorWrapper>
    )
  }

  return (
    <Image fullWidthResponsive={fullWidthResponsive}>
      <UploadContainer
        cWidth={cWidth}
        image={Boolean(currentFile)}
        cHeight={cHeight}
        fullWidthResponsive={fullWidthResponsive}
        ref={containerRef}
        hasImage={!!currentFile}
        hovered={isDragOver}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        error={sizeError || error || imageUploadError}
        onClick={handleClick}>
        <HiddenInput
          ref={hiddenInputRef}
          type="file"
          accept={allowedMimeTypes}
          onChange={handleChange}
        />
        {uploading ? (
          <ProgressLoading absolute bgColor="rgba(0, 0, 0, 0.2)" style={{ borderRadius: 8 }} />
        ) : null}

        {currentFile && showRemoveIcon && (
          <DeleteButton className="delete-icon" onClick={handleRemove}>
            <Close />
          </DeleteButton>
        )}
        {currentFile ? (
          <ImageOverlay className="replace-overlay">
            <Body1 fontWeight={FontWeights.semiBold}>{t('change')}</Body1>
          </ImageOverlay>
        ) : null}
        {currentFile ? (
          <ImageContainer
            cWidth={cWidth}
            cHeight={cHeight}
            src={currentFile}
            alt="logo"
            fullWidthResponsive={fullWidthResponsive}
          />
        ) : (
          <>
            <SAddIcon />
            <UploadPrompt>{t('upload')}</UploadPrompt>
          </>
        )}
      </UploadContainer>
      {error || sizeError || imageUploadError ? getErrorDiv() : null}
    </Image>
  )
}

ImageUploader.propTypes = {
  image: PropTypes.string,
  handleImage: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  cWidth: PropTypes.string,
  cHeight: PropTypes.string,
  fullWidthResponsive: PropTypes.bool,
  uploading: PropTypes.bool,
  remainingBytes: PropTypes.number,
  imageUploadError: PropTypes.bool,
}

export default ImageUploader
