import PropTypes from 'prop-types'
import { Modal, TextField, FormControl, IconButton } from '@material-ui/core'
import { CloseOutlined } from '@material-ui/icons'
import styled from 'styled-components'

import Loading from 'components/Loading'
import { ContainedPrimaryButton, OutlinedDefaultButton } from 'components/Inputs'
import { H6, Body2, FontWeights } from 'components/Typography'
import theme from 'components/Theme'

const transform = 'translate(-50%, -50%) !important'
export const PopupContent = styled.div`
  border-radius: 4px;
  position: absolute;
  display: flex;
  max-width: 600px;
  flex-direction: column;
  white-space: pre-wrap;
  top: 50%;
  left: 50%;
  transform: ${transform};
  background-color: ${theme.colors.white};
  outline: none;
  min-width: 300px;

  ${props => props.theme.breakpoints.down('sm')} {
    width: 90%;
  }

  .closeIcon {
    height: 40px;
    width: 40px;
  }

  .delete_message {
    margin-top: 20px;
  }
`

export const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 20px 20px 0px 20px;
  min-height: 100px;
  p {
    margin-top: 10px;
  }
  ${props => props.theme.breakpoints.down('sm')} {
    padding: 10px 20px 0px 16px;
  }
`
export const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  border-bottom: 1px solid ${theme.colors.borderColor};
  padding: 0px 10px 0px 20px;
`

export const BottomSection = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  padding-right: 10px;
  padding-top: 30px;
  padding-bottom: 10px;
  button {
    :nth-child(2) {
      margin-left: 10px;
      min-width: 80px;
    }
  }
  ${props => props.theme.breakpoints.down('sm')} {
    padding: 20px 10px;
  }
`

const ConfirmationPopup = ({
  open,
  title,
  message,
  handleConfirm,
  handleCancel,
  cancelButtonText = '',
  saveButtonText = '',
  pending = false,
  optionalMessage,
  onMessageChange,
  showChangeMessage,
  placeholder,
}) => {
  return (
    <Modal open={open}>
      <PopupContent>
        {pending && <Loading absolute bgColor="rgba(0, 0, 0, 0.2)" />}
        <HeaderSection>
          <H6 fontWeight={FontWeights.bold}>{title}</H6>
          <IconButton className="closeIcon" onClick={handleCancel}>
            <CloseOutlined />
          </IconButton>
        </HeaderSection>
        <MainSection>
          <Body2 component="div">
            <div dangerouslySetInnerHTML={{ __html: message }} />
          </Body2>
          {showChangeMessage && (
            <FormControl className="delete_message" fullWidth>
              <TextField
                value={optionalMessage}
                placeholder={placeholder}
                autoComplete="off"
                variant="outlined"
                multiline
                rows={4}
                onChange={onMessageChange}
                fullWidth
              />
            </FormControl>
          )}
        </MainSection>

        <BottomSection>
          <OutlinedDefaultButton size="small" onClick={handleCancel}>
            {cancelButtonText}
          </OutlinedDefaultButton>
          <ContainedPrimaryButton size="small" onClick={handleConfirm}>
            {saveButtonText}
          </ContainedPrimaryButton>
        </BottomSection>
      </PopupContent>
    </Modal>
  )
}

ConfirmationPopup.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string,
  message: PropTypes.string,
  handleConfirm: PropTypes.func,
  handleCancel: PropTypes.func,
  cancelButtonText: PropTypes.string,
  saveButtonText: PropTypes.string,
  pending: PropTypes.bool,
  placeholder: PropTypes.string,
  optionalMessage: PropTypes.string,
  onMessageChange: PropTypes.func,
  showChangeMessage: PropTypes.bool,
}

export default ConfirmationPopup
