import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { utils } from 'ethers'
import { TextField, FormControl, FormHelperText } from '@material-ui/core'
import get from 'lodash/get'

import { ContainedPrimaryButton, OutlinedSecondaryButton } from 'components/Inputs'
import { H6, FontWeights, Body1 } from 'components/Typography'
import ModalHoc from 'components/Modal/ModalHoc'
// import usePostRequest from 'hooks/UsePostRequestNew'
import { modalStyles } from './modalStyle'
import Feedback from 'components/FeedbackCards/Feedback'
import theme from 'components/Theme'

const ModalContainer = styled.div`
  width: 100%;
  flex-direction: column;
  padding: 20px 32px;
  display: flex;
  min-height: 350px;

  ${props => props.theme.breakpoints.down('xs')} {
    padding: 16px;
  }

  .transfer-label {
    width: 100%;
  }

  .token {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: row wrap;
    margin: 16px 0px 0px;
    width: 100%;

    .label {
      padding-right: 12px;
    }
  }

  .erc-address-container {
    margin: 20px 0px 12px;

    .MuiFormControl-root {
      margin-top: 8px;
      width: 100%;
    }
    .error {
      color: ${theme.colors.errorColor};
    }
  }

  .footer {
    width: 100%;
    margin: auto 0px 0px;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    button {
      min-width: 150px;
      ${props => props.theme.breakpoints.down('xs')} {
        width: 45%;
        min-width: 70px;
      }
    }
    .MuiButton-contained {
      margin-right: 0px;
    }
  }
`

const TransferModal = ({ t, isOpen, onClose, onSubmit, tokenData }) => {
  // hooks
  const classes = modalStyles()
  const [ercAddress, setErcAddress] = useState('')
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [updateError, setUpdateError] = useState(false)
  const [ercAddressError, setErcAddressError] = useState('')

  const validateWalletAddress = address => {
    if (address.length > 40) setErcAddressError(!utils.isAddress(address))
    else setErcAddressError(true)
  }

  return (
    <>
      {updateSuccess ? (
        <Feedback
          type="success"
          message={t('billingUpdateSuccess')}
          onClose={() => setUpdateSuccess(false)}
          open={updateSuccess}
        />
      ) : null}
      {updateError ? (
        <Feedback
          type="error"
          message={t('billingUpdateError')}
          onClose={() => setUpdateError(false)}
          open={updateError}
        />
      ) : null}
      <ModalHoc
        disableBackdropClick
        classes={classes}
        openModal={isOpen}
        onClose={onClose}
        title={t('transferNft')}>
        <ModalContainer>
          <div className="token">{t('transferTokenLabel')}</div>
          <div className="token">
            <Body1 className="label">{t('tokenId')}:</Body1>
            <Body1 fontWeight={FontWeights.semiBold}>
              {get(tokenData, 'transactions[0].tokenId', '')}
            </Body1>
          </div>
          <div className="erc-address-container">
            <H6 fontWeight={FontWeights.bold}>{t('TransferToErcAddress')}</H6>
            <FormControl className="input" fullWidth>
              <TextField
                id="erc-address"
                variant={'outlined'}
                error={false}
                value={ercAddress}
                autoComplete="false"
                placeholder={t('enterErcAddress')}
                className="erc-address-input"
                onChange={e => {
                  setErcAddress(e.target.value)
                  validateWalletAddress(e.target.value)
                }}
                inputProps={{
                  maxLength: 100,
                }}
              />
              {ercAddressError ? (
                <FormHelperText className="error">{t('invalidWalletAddress')}</FormHelperText>
              ) : null}
            </FormControl>
          </div>
          <div className="footer">
            <OutlinedSecondaryButton onClick={onClose}>{t('cancel')}</OutlinedSecondaryButton>
            <ContainedPrimaryButton onClick={onSubmit}>{t('submit')}</ContainedPrimaryButton>
          </div>
        </ModalContainer>
      </ModalHoc>
    </>
  )
}

TransferModal.propTypes = {
  t: PropTypes.func,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  tokenData: PropTypes.object,
}

export default TransferModal
