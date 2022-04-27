import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import { useSelector } from 'react-redux'
import toNumber from 'lodash/toNumber'
import isNumber from 'lodash/isNumber'
import web3 from 'web3'

import { FontWeights, Body1, Body2, H6, Caption } from 'components/Typography'
import ModalHoc from 'components/Modal/ModalHoc'
import theme from 'components/Theme'
import { getWallet, getBalance } from 'state/settings/selectors'
import {
  ContainedPrimaryButton,
  OutlinedSecondaryButton,
  TextPrimaryButton,
} from 'components/Inputs'
import { isNumeric } from 'lib/util/numberUtil'
import { useWeb3React } from '@web3-react/core'
import { createOffer } from 'lib/util/web3/purchase'
import usePostRequest from 'hooks/UsePostRequest'
import UPDATE_OFFER_NFT_MUTATION from 'state/marketplace/queries/updateOffer'
import InputFieldWithSuffix from 'pageComponents/common/InputFieldWithSuffix'
import { HistoryContainer, ModalContainer, TabContainer, TabPanel, modalStyles } from './modalStyle'
import ProgressLoading from 'components/Loading'
import { ConfirmationPopup } from 'components/Modal'

// eslint-disable-next-line no-unused-vars
const BNB_TYPE = 1

const SetPriceModal = ({
  t,
  isOpen,
  onClose,
  tokenData,
  onSubmit,
  setPriceSuccessMessage,
  setPriceErrorMessage,
  user,
}) => {
  console.log('token Data', tokenData)
  // hooks
  const classes = modalStyles()
  const wallet = useSelector(state => getWallet(state))

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [price, setPrice] = useState(get(tokenData, 'directOffer.price', ''))
  const [isPriceValid, setIsPriceValid] = useState(true)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [minimumBid, setMinimumBid] = useState('')
  const activeTab = 0
  const { library, account } = useWeb3React()
  
  const { mutationRes: updateOfferNftMutation } = usePostRequest(
    'UPDATE_OFFER_NFT_MUTATION',
    UPDATE_OFFER_NFT_MUTATION
  )


  const handleOfferRemove = async () => {
    setIsDeleteOpen(false)
    setIsDeleting(true)
    const payload = {
      status: 1,
      id: toNumber(tokenData.id),
    }
    updateOfferNftMutation.mutate(payload, {
      onSuccess: data => {
        setPriceSuccessMessage(t('offerRemoveSuccess'))
        onSubmit(null)
        setIsDeleting(false)
      },
      onError: (err, variables) => {
        // eslint-disable-next-line no-console
        console.log({ err })
        setIsDeleting(false)
        setPriceErrorMessage(t('somethingWentWrongOfferRemoval'))
      },
    })
  }
  const handleSubmit = async () => {
    setIsSubmitting(true)
    // TO-DO need to add wallet address on submitting
    const tokenId = parseInt(tokenData.nft.tokenId)
    try {
      const result = await createOffer(library, price, 1, tokenId, account)

      const payload = {
        data: {
          id: parseInt(tokenData.id),
          seller: result.walletAddress,
          buyer: wallet.address,
          token_address: result.tokenAddress,
          price: result.sellPrice,
          expire_at: new Date(result.sellDeadline * 1000),
          buyer_signature: result.sellerSig,
          status: 0,
        },
      }

      updateOfferNftMutation.mutate(payload, {
        onSuccess: data => {
          setPriceSuccessMessage(t('priceUpdateSuccess'))
          setIsSubmitting(false)
          console.log(data.updateEstate);
          onSubmit(data.updateEstate)
          onClose()
        },
        onError: (err, variables) => {
          // eslint-disable-next-line no-console
          console.log({ err })
          setPriceErrorMessage(t('somethingWentWrongPriceUpdate'))
          setIsSubmitting(false)
        },
      })
    } catch (error) {
      setIsSubmitting(false)
    }
  }

  const getFee = percentage => {
    if (activeTab === 0) {
      return isNumeric(price) || isNumber(price) ? (price * percentage).toFixed(2) : '0'
    }
    if (activeTab === 1) {
      return isNumeric(minimumBid) ? (minimumBid * percentage).toFixed(2) : '0'
    }
    return '-'
  }

  const handlePriceChange = e => {
    const value = e.target.value
    if (parseInt(value) < 0 || parseInt(value) > 50000) setIsPriceValid(false)
    else setIsPriceValid(true)
    setPrice(e.target.value)
  }

  const getTabContent = () => (
    <>
      <div className="body">
        {!account ? (
          <div className="row connect-error">
            <Body1 fontWeight={FontWeights.medium}>{t('connectWalletWarningSetPrice')}</Body1>
          </div>
        ) : null}
        <div className="row">
          <H6 fontWeight={FontWeights.bold} className="label">
            TokenID
          </H6>
          <Body1 fontWeight={FontWeights.semiBold}>{get(tokenData, 'nft.tokenId', '')}</Body1>
        </div>

        <div className="row">
          <H6 fontWeight={FontWeights.bold} className="label">
            Last Offer Price
          </H6>
          <Body1 fontWeight={FontWeights.semiBold}>{web3.utils.fromWei(get(tokenData, 'price', 0))} MARS</Body1>
        </div>
        {activeTab === 0 ? (
          <>
            <div className="row">
              <div className="label">
                <H6 fontWeight={FontWeights.bold}>
                  {t('updatePrice')}
                </H6>
                <Body2 fontWeight={FontWeights.regular}>
                  {t('updatePriceLabel')}
                </Body2>
                <Body2 fontWeight={FontWeights.regular}>{t('biddersLabel')}</Body2>
              </div>
              <InputFieldWithSuffix
                className="input-box"
                value={price}
                onChange={e => handlePriceChange(e)}
                t={t}
                error={!isPriceValid}
                disabled={isSubmitting}
              />
              {!isPriceValid ? (
                <div className="error">
                  <Caption fontWeight={FontWeights.regular}>{t('priceWarning')}</Caption>
                </div>
              ) : null}
            </div>
          </>
        ) : (
          <>
            <div className="row">
              <div className="label">
                <H6 fontWeight={FontWeights.bold}>{t('minimumBid')}</H6>
                <Body2 fontWeight={FontWeights.regular}>{t('setStartingPrice')}</Body2>
              </div>
              <InputFieldWithSuffix
                className="input-box"
                value={minimumBid}
                onChange={e => setMinimumBid(e.target.value)}
                t={t}
              />
            </div>
            <div className="row">
              <div className="label">
                <H6 fontWeight={FontWeights.bold}>{t('endDate')}</H6>
                <Body2 fontWeight={FontWeights.regular}>{t('endDateLabel')}</Body2>
              </div>
            </div>
          </>
        )}
        <div className="fees">
          <H6 fontWeight={FontWeights.bold} className="label">
            {t('fees')}
          </H6>
        </div>
        <div className="org-fee fees">
          <Body1 fontWeight={FontWeights.regular} className="label org-fee-label">
            {t('toMarsVerse')}
          </Body1>
          <Body1 fontWeight={FontWeights.regular}>{`${getFee(0.05)} ${t('mars')}`}</Body1>
        </div>
        <div className="fees">
          <Body1 fontWeight={FontWeights.regular} className="label">
            {t('toNFTCreator')}
          </Body1>
          <Body1 fontWeight={FontWeights.regular}>{`0 ${t('mars')}`}</Body1>
        </div>
        <div className="fees">
          <Body1 fontWeight={FontWeights.regular} className="label">
            {t('totalFees')}
          </Body1>
          <Body1 fontWeight={FontWeights.regular}>{`${getFee(0.05)} ${t('mars')}`}</Body1>
        </div>
      </div>
      <div className="footer">
        <OutlinedSecondaryButton disabled={isDeleting || isSubmitting} onClick={onClose}>
          {t('cancel')}
        </OutlinedSecondaryButton>
        <ContainedPrimaryButton
          disabled={
            !price.length ||
            isSubmitting ||
            !isPriceValid ||
            toNumber(get(tokenData, 'activeDirectOffer.price', -1)) === toNumber(price) ||
            !account ||
            isDeleting
          }
          onClick={handleSubmit}>
          {isSubmitting ? (
            <>
              <span>
                <ProgressLoading size={16} />
              </span>
              &nbsp; {t('pleaseWait')}
            </>
          ) : t('updatePrice')
          }
        </ContainedPrimaryButton>
      </div>
    </>
  )

  return (
    <>
      <ModalHoc
        disableBackdropClick
        classes={classes}
        openModal={isOpen}
        onClose={onClose}
        title={t('update')}>
        <ModalContainer>
          <HistoryContainer>
            <TabContainer>
              <TabPanel>{getTabContent()}</TabPanel>
              {/* <Tabs
              className="tabs-container"
              value={activeTab}
              onChange={handleTabChange}
              variant="scrollable"
              tabs={[t('setPrice'), t('highestBid')]}>
              <TabPanel>{getTabContent()}</TabPanel>
              <TabPanel>{getTabContent()}</TabPanel>
            </Tabs> */}
            </TabContainer>
          </HistoryContainer>
        </ModalContainer>
      </ModalHoc>
      {isDeleteOpen ? (
        <ConfirmationPopup
          title={t('removeOffer')}
          message={`${t('areYouSureRemove')}<b>${get(tokenData, 'tokenId', '')}</b> ${t(
            'fromMarketPlace'
          )}`}
          saveButtonText={t('remove')}
          cancelButtonText={t('cancel')}
          open={isDeleteOpen}
          handleCancel={() => setIsDeleteOpen(false)}
          handleConfirm={handleOfferRemove}
        />
      ) : null}
    </>
  )
}

SetPriceModal.propTypes = {
  t: PropTypes.func,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  tokenData: PropTypes.object,
  user: PropTypes.object,
  onSubmit: PropTypes.func,
  setPriceSuccessMessage: PropTypes.func,
  setPriceErrorMessage: PropTypes.func,
}

export default SetPriceModal
