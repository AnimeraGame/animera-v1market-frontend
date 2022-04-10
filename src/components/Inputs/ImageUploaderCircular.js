import { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { Edit, PhotoCamera } from '@material-ui/icons'
import includes from 'lodash/includes'
import { Badge, Avatar, IconButton } from '@material-ui/core'
import styled from 'styled-components'

import theme from 'components/Theme'
import { FontWeights, Body2, Caption } from 'components/Typography'
import Loading from 'components/Loading'
import { TextPrimaryButton, OutlinedPrimaryButton } from 'components/Inputs'
import { ContainedPrimaryButton } from 'components/Inputs/buttons/index'
import { bytesToSize } from 'lib/util/sizeUtil'

const allowedMimeTypes = 'image/png,image/jpeg,image/bmp'

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`

export const UploadContainer = styled.div`
  position: relative;
  border-radius: 50%;
  height: 124px;
  width: 124px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.n00};
  border: 1px solid ${theme.colors.n20};
  cursor: pointer;
  box-shadow: 0 4px 12px 0 #0000001a;
  :hover {
    background-color: ${theme.colors.n10};
    border: 1px solid ${theme.colors.n30};
  }
`
export const HiddenInput = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
`

export const SPhotoCamera = styled(PhotoCamera)`
  && {
    margin-top: 8px;
    font-size: 28px;
    color: ${theme.colors.n60};
  }
`
const StyledIconButton = styled(IconButton)`
  && {
    padding: 4px;
    width: 32px;
    height: 32px;
    border: ${'1px solid ' + theme.colors.n20};
    background-color: ${theme.colors.white};
    &:hover {
      background-color: ${theme.colors.white};
    }

    svg {
      color: ${theme.colors.n80};
      font-size: 14px;
    }
  }
`

const StyledAvatar = styled(Avatar)`
  && {
    width: 124px;
    height: 124px;
    cursor: default;
  }
`

const UploadErrorWrapper = styled.div`
  padding: 4px 20px;
  color: ${theme.colors.red};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
  flex-direction: column;
  ${props => props.theme.breakpoints.down('sm')} {
    margin-top: 8px;
    button {
      padding: 0px 8px;
    }
  }
`

const BusinessLogo = ({
  t,
  pictureUrl,
  onLogoChange,
  imageUploadError,
  uploading,
  editBadgeButton = false,
  twoActionButtons,
  handleRemove,
  placeholder,
  disableRemoveButton = false,
  remainingBytes,
  displayName = 'User Name',
}) => {
  const containerRef = useRef()
  const hiddenInputRef = useRef()
  const [currentFile, setCurrentFile] = useState()
  const [error, setError] = useState(false)
  const [sizeError, setSizeError] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)

  useEffect(() => {
    if (pictureUrl) {
      setCurrentFile(pictureUrl)
    }
    return () => {
      setSizeError(false)
    }
  }, [pictureUrl])

  const handleFile = file => {
    if (!file || !file.type || !includes(allowedMimeTypes, file.type)) {
      setError(true)
    } else {
      if (file.size > remainingBytes) {
        setErrorMessage(t('availableStorageBytes', { storage: bytesToSize(remainingBytes) }))
        setSizeError(true)
      } else {
        setError(false)
        const reader = new FileReader()
        reader.onloadend = () => {
          const base64Encoded = reader.result
          setCurrentFile(base64Encoded)
          onLogoChange(file)
        }
        reader.readAsDataURL(file)
      }
    }
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
          {sizeError && !imageUploadError ? errorMessage : null}
        </Body2>
      </UploadErrorWrapper>
    )
  }
  return (
    <Container>
      <UploadContainer
        editBadgeButton={editBadgeButton}
        ref={containerRef}
        hasImage={!!currentFile}
        onClick={handleClick}>
        <HiddenInput
          ref={hiddenInputRef}
          type="file"
          accept={allowedMimeTypes}
          onChange={handleChange}
        />
        {currentFile ? (
          <>
            <Badge
              overlap="circle"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              badgeContent={
                editBadgeButton ? (
                  <StyledIconButton
                    onClick={e => {
                      e.stopPropagation()
                      handleClick()
                    }}
                    title={t('changeImage')}>
                    <Edit fontSize="small" />
                  </StyledIconButton>
                ) : null
              }>
              <StyledAvatar onClick={e => e.stopPropagation()} alt="logo" src={currentFile} />
            </Badge>
          </>
        ) : (
          <>
            <SPhotoCamera />
            <Caption fontWeight={FontWeights.semiBold}>{t(placeholder)}</Caption>
          </>
        )}
        {uploading ? (
          <Loading absolute bgColor="rgba(0, 0, 0, 0.2)" style={{ borderRadius: '100%' }} />
        ) : null}
      </UploadContainer>
      {error || sizeError || imageUploadError ? getErrorDiv() : null}
      {twoActionButtons ? null : currentFile ? (
        <TextPrimaryButton
          size="small"
          disabled={uploading}
          style={{ margin: error || imageUploadError ? '0px 0px 8px' : '8px 0px' }}
          onClick={e => {
            e.stopPropagation()
            handleClick()
          }}>
          {t('editAvatar')}
        </TextPrimaryButton>
      ) : null}
      {twoActionButtons ? (
        <ButtonsContainer>
          <ContainedPrimaryButton
            size="small"
            onClick={e => {
              e.stopPropagation()
              handleClick()
            }}>
            {t('replacePhoto')}
          </ContainedPrimaryButton>
          <OutlinedPrimaryButton
            size="small"
            disabled={disableRemoveButton}
            onClick={() => {
              setCurrentFile(null)
              handleRemove()
            }}>
            {t('removePhoto')}
          </OutlinedPrimaryButton>
        </ButtonsContainer>
      ) : null}
    </Container>
  )
}

BusinessLogo.propTypes = {
  pictureUrl: PropTypes.string,
  onLogoChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  imageUploadError: PropTypes.bool,
  editBadgeButton: PropTypes.bool,
  twoActionButtons: PropTypes.bool,
  handleRemove: PropTypes.func,
  placeholder: PropTypes.string,
  displayName: PropTypes.string,
}

export default BusinessLogo
