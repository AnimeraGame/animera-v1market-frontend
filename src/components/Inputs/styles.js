import styled, { css } from 'styled-components'
import { FormControlLabel, FormHelperText, FormControl, IconButton } from '@material-ui/core'
import { PhotoCamera, Add } from '@material-ui/icons'
import theme from 'components/Theme'
import { ContainedSecondaryButton } from 'components/Inputs'
import { Body2 } from 'components/Typography'
import { constants } from 'components/Theme/constants'
import { ErrorMessage } from 'formik'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  ${props => props.theme.breakpoints.down('sm')} {
    padding: 0px;
  }
`
const twoInnerDivs = css`
  > div:first-child {
    margin-right: 26px;
    ${props => props.theme.breakpoints.down('sm')} {
      margin-right: 0px;
    }
  }

  > div:last-child {
    flex-grow: 1;
  }
`
export const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ marginBottom }) => marginBottom && '16px'};

  ${({ special }) => special && twoInnerDivs}
  ${props => props.theme.breakpoints.down('sm')} {
    flex-direction: column;
  }
`
export const Column = styled.div`
  display: flex;
  flex-direction: column;
`
export const Buttons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`
export const SContainedSecondaryButton = styled(ContainedSecondaryButton)`
  && {
    margin: 0px 0px 20px 0px;
    align-self: flex-start;
  }
`
const fullWidthWithGap = css`
  width: 100%;
  margin-bottom: 10px;
`
const smallInput = css`
  width: calc(50% - 8px);
  justify-content: space-between;
  display: flex;

  ${props => props.theme.breakpoints.down(constants.tabletWidth)} {
    width: 100%;
  }
`
const deleteIconButton = css`
  && {
    position: absolute;
    top: 3px;
    right: 4px;
    padding: 4px;
    background-color: rgba(0, 0, 0, 0.3);

    &:hover {
      background-color: ${theme.colors.white};
    }

    svg {
      color: ${theme.colors.red};
      font-size: 1.25rem;
    }
  }
`

export const PhoneDiv = styled.div`
  .phone-label {
    left: -8px;
  }
`
export const ZoomContainer = styled.div`
  border: 1px solid ${theme.colors.darkBlue};
  padding: 12px 20px 20px 20px;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  margin-top: 16px;

  .MuiFormControl-root {
    max-width: 320px;
  }
  .subtitle {
    margin-top: 12px;
  }
`
export const SFormControl = styled(FormControl)`
  && {
    ${({ fullWidth }) => (fullWidth ? fullWidthWithGap : smallInput)}
    .MuiFormControl-marginNormal {
      margin-bottom: 0px;
    }
    .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline {
      border-color: rgba(0, 0, 0, 0.1);
    }
  }
`
export const SFormControlLabel = styled(FormControlLabel)`
  && {
    ${fullWidthWithGap}
  }
`
export const ErrorBody2 = styled(Body2)`
  color: ${theme.colors.red};
  margin: 0 12px 0;
`
export const StyledErrorMessage = styled.div`
  position: absolute;
  bottom: -18px;
  color: ${theme.colors.errorColor};
  font-size: 12px;
  font-weight: 500;
  margin: 0px 0px 0px 12px;

  ${props => props.theme.breakpoints.down('sm')} {
    position: relative;
    bottom: 0px;
    margin-top: 4px;
  }
`
const margins = css`
  margin-top: 6px;
  margin-left: 12px;
`
export const SFormHelperText = styled(FormHelperText)`
  && {
    ${margins}
  }
`
export const SErrorMessage = styled(ErrorMessage)`
  ${margins}
`
export const Image = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${props => props.theme.breakpoints.down('sm')} {
    justify-content: center;
    align-items: center;
  }
`
export const UploadContainer = styled.div`
  position: relative;
  height: ${({ cHeight }) => cHeight || '150px'};
  width: ${({ cWidth }) => cWidth || '150px'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0px 0px 8px 0px;
  background-color: ${theme.colors.white};
  border-radius: 8px;
  cursor: pointer;
  border: 1px dashed
    ${({ image, error }) =>
      image ? theme.colors.n30 : error ? theme.colors.errorColor : theme.colors.lightGreen};
  color: ${({ image, error }) =>
    image ? theme.colors.n30 : error ? theme.colors.errorColor : theme.colors.lightGreen};

  .replace-overlay {
    display: none;
  }

  :hover {
    .replace-overlay {
      display: flex;
    }
  }

  ${props => props.theme.breakpoints.down('xs')} {
    height: 160px;
    width: ${({ fullWidthResponsive }) => (fullWidthResponsive ? '100%' : '160px')};
  }
`
export const HiddenInput = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
`
export const UploadPrompt = styled.div`
  font-size: 18px;
  font-weight: 400;
  line-height: 22px;
  text-align: center;
`
export const ExtensionList = styled.div`
  color: ${theme.colors.green};
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  text-align: center;
`
export const ImageContainer = styled.img`
  max-width: ${({ cWidth }) => cWidth || '160px'};
  max-height: ${({ cHeight }) => cHeight || '160px'};
  border-radius: 8px;

  ${props => props.theme.breakpoints.down('xs')} {
    max-height: 160px;
    max-width: ${({ fullWidthResponsive }) => (fullWidthResponsive ? '100%' : '160px')};
  }
`
export const SPhotoCamera = styled(PhotoCamera)`
  && {
    margin-top: 8px;
    font-size: 56px;
    color: ${theme.colors.n60};
  }
`
export const DeleteButton = styled(IconButton)`
  ${deleteIconButton}
`
export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0px;
  flex-direction: column;
  ${props => props.theme.breakpoints.down('sm')} {
    margin-top: 8px;
    button {
      padding: 0px 8px;
    }
  }
`
export const SAddIcon = styled(Add)`
  && {
    font-size: 40px;
  }
`

export const UploadErrorWrapper = styled.div`
  padding: 4px 20px;
  color: ${theme.colors.red};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ImageOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: ${theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`
