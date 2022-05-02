import { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import get from 'lodash/get'
import toNumber from 'lodash/toNumber'
import { Link } from '@material-ui/core'

import { ContainedPrimaryButton, OutlinedSecondaryButton } from 'components/Inputs'
import { FontWeights, Body1 } from 'components/Typography'
import ModalHoc from 'components/Modal/ModalHoc'
// import usePostRequest from 'hooks/UsePostRequestNew'
import Feedback from 'components/FeedbackCards/Feedback'
import theme from 'components/Theme'
import { modalStyles } from './modalStyles'
import ProgressLoading from 'components/Loading'
import InputFieldWithSuffix from 'pageComponents/common/InputFieldWithSuffix'

const ModalContainer = styled.div`
  width: 100%;
  padding: 20px 32px;
  display: flex;
  flex-direction: column;
  min-height: 300px;

  ${props => props.theme.breakpoints.down('xs')} {
    padding: 16px;
  }

  .input-box {
    position: relative;
    max-width: 220px;
    margin-left: auto;

    ${props => props.theme.breakpoints.down('sm')} {
      max-width: 100%;
      width: 100%;
      margin-top: 12px;
    }
  }

  .label {
    padding-right: 12px;

    a {
      color: ${theme.colors.darkBlue};
      padding-left: 2px;
      :hover {
        color: ${theme.colors.extraDarkBlue};
        text-decoration: none;
      }
    }
  }
  .connect-error {
    color: ${theme.colors.errorColor};
  }

  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-flow: row wrap;
    margin: 16px 0px 8px;
    width: 100%;
    .value {
      color: ${theme.colors.n80};
    }
    .warning-text {
      color: ${theme.colors.errorColor};
    }
    .value {
      color: ${theme.colors.n80};
    }
  }

  .footer-note {
    width: 100%;
    margin: auto 0px 8px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-top: 16px;
    flex-flow: column nowrap;

    .game-error {
      margin-top: 16px;
      color: ${theme.colors.errorColor};
    }
  }

  .footer {
    width: 100%;
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

const getRow = (label = '', value = '') => (
  <div className="row">
    <Body1 fontWeight={FontWeights.bold} className="label">
      {label}
    </Body1>
    <Body1 className="value" fontWeight={FontWeights.regular}>
      {value}
    </Body1>
  </div>
)

const BuyNowModal = ({
  t,
  isOpen,
  onClose,
  onSubmit,
  cardInfo,
  cardType = 'SIMPLE',
  balance = {},
  isSubmitting,
  account,
}) => {
  // hooks
  const classes = modalStyles()
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [updateError, setUpdateError] = useState(false)
  const [minimumBid, setMinimumBid] = useState('')
  const price = get(cardInfo, 'price', 0)
  const canBuyNft = toNumber(balance.mars) >= toNumber(price)
  console.log('card info', cardInfo)
  return (
    <>
      {updateSuccess ? (
        <Feedback
          type="success"
          message={t('purchaseSuccess')}
          onClose={() => setUpdateSuccess(false)}
          open={updateSuccess}
        />
      ) : null}
      {updateError ? (
        <Feedback
          type="error"
          message={t('purchaseError')}
          onClose={() => setUpdateError(false)}
          open={updateError}
        />
      ) : null}
      <ModalHoc
        disableBackdropClick
        disableEscapeKeyDown
        classes={classes}
        openModal={isOpen}
        onClose={onClose}
        disableCloseIcon={isSubmitting}
        title={cardType === 'SIMPLE' ? t('buyNFT') : t('bid')}>
        <ModalContainer>
          {cardType === 'SIMPLE' ? (
            <>
              {!account ? (
                <div className="row connect-error">
                  <Body1 fontWeight={FontWeights.medium}>{t('connectWalletWarningSetPrice')}</Body1>
                </div>
              ) : null}
              {getRow(t('tokenId'), get(cardInfo, 'nft.tokenId', ''))}
              <div className="row">
                <Body1 fontWeight={FontWeights.bold} className="label">
                  {t('price')}:
                </Body1>
                <Body1 fontWeight={FontWeights.semiBold}>{`${price} MARS`}</Body1>
              </div>
              {!canBuyNft ? (
                <div>
                  <Body1 fontWeight={FontWeights.regular} component="div" className="label">
                    <span className="warning-text">{t('marsWarning')}</span>
                    <Link
                      href="https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x818ec0a7fe18ff94269904fced6ae3dae6d6dc0b"
                      target="_blank"
                      rel="noopener">
                      {t('marsLink')}
                    </Link>
                  </Body1>
                </div>
              ) : null}
            </>
          ) : (
            <>
              {getRow(t('tokenId'), get(cardInfo, 'nft.tokenId', ''))}
              {getRow(t('startingPrice'), '100 MARS')}
              {getRow(t('highestBid'), '150 MARS')}
              {getRow(t('highestBidder'), '0x403033fcfbb2ba1c384b1e9cc7008e9402616a95')}
              {getRow(t('myCurrentBid'), '175 MARS')}
              <div className="row">
                <div>
                  <Body1 fontWeight={FontWeights.bold} className="label">
                    {t('price')}:
                  </Body1>
                  <Body1 fontWeight={FontWeights.regular} component="div" className="label">
                    {t('marsWarning')}
                    <Link
                      href="https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x818ec0a7fe18ff94269904fced6ae3dae6d6dc0b"
                      target="_blank"
                      rel="noopener">
                      {t('marsLink')}
                    </Link>
                  </Body1>
                </div>
                <InputFieldWithSuffix
                  className="input-box"
                  value={minimumBid}
                  onChange={e => setMinimumBid(e.target.value)}
                  t={t}
                />
              </div>
            </>
          )}
          <div className="footer-note">
            <Body1 fontWeight={FontWeights.regular}>{t('pleaseKeepScreenOpen')}</Body1>
          </div>
          <div className="footer">
            <OutlinedSecondaryButton disabled={isSubmitting} onClick={onClose}>
              {t('cancel')}
            </OutlinedSecondaryButton>
            <ContainedPrimaryButton
              // disabled={!canBuyNft || !account || isSubmitting}
              onClick={() => onSubmit(cardInfo)}>
              {isSubmitting ? (
                <>
                  <span>
                    <ProgressLoading size={16} />
                  </span>{' '}
                  &nbsp; {t('pleaseWait')}
                </>
              ) : cardType === 'SIMPLE' ? (
                t('buyNow')
              ) : (
                t('submitBid')
              )}
            </ContainedPrimaryButton>
          </div>
        </ModalContainer>
      </ModalHoc>
    </>
  )
}

BuyNowModal.propTypes = {
  t: PropTypes.func,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  tokenData: PropTypes.object,
  account: PropTypes.string,
  balance: PropTypes.object,
  cardType: PropTypes.oneOf(['SIMPLE', 'BID']),
  isSubmitting: PropTypes.bool,
}

export default BuyNowModal
