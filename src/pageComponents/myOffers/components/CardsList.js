import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import find from 'lodash/find'
import omit from 'lodash/omit'
import keys from 'lodash/keys'
import has from 'lodash/has'
import times from 'lodash/times'
import isEmpty from 'lodash/isEmpty'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useWeb3React } from '@web3-react/core'
import { useSelector } from 'react-redux'
import clsx from 'clsx'

// local imports
import AssetCard from 'pageComponents/common/MarketplaceAssetCard'
import Placeholder from 'components/Placeholder'
import { ActionMenu } from 'components/Menus'
import PreviewModal from 'pageComponents/common/CardModal'
import { buyOffer } from 'lib/util/web3/purchase'
import { getBalance } from 'state/settings/selectors'
import { getAuthState } from 'state/auth/selectors'
import { getUserAuthInfo } from 'state/auth/selectors'
import Feedback from 'components/FeedbackCards/Feedback'
import useQueryRequest from 'hooks/UseQueryRequest'
import usePostRequest from 'hooks/UsePostRequest'
import FETCH_DIRECT_OFFERS from 'state/marketplace/queries/fetchDirectOffers'
import UPDATE_OFFER_NFT_MUTATION from 'state/marketplace/queries/updateOffer'
import ProgressLoading from 'components/Loading'
import { OffersCardsList, OffersCardsLoader } from './cardsListStyles'
import ConfirmationPopup from 'components/Modal/ConfirmationModal'
import SetPriceModal from './SetPriceModal'
import { toNumber } from 'lodash'

const CardsList = ({
  t,
  data,
  totalCount,
  loadNftList,
  isLoading,
  isError,
  setData,
  setTotalCount,
  setRarityFilterCount,
  router,
  showLastPrice,
}) => {
  // global state
  const user = useSelector(state => getUserAuthInfo(state))
  const cardIdInUrl = get(router, 'query.card', null)
  const modalType = get(router, 'query.type', null)
  const balance = useSelector(state => getBalance(state))
  const isUserLoggedIn = useSelector(state => getAuthState(state))

  // local state
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false)
  const [isCancelModalOpen, setCancelModalOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [priceSuccessMessage, setPriceSuccessMessage] = useState('')
  const [priceErrorMessage, setPriceErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { library, account } = useWeb3React()

  const { isFetching: cardLoading, refetch: fetchCardDetail } = useQueryRequest(
    ['FETCH_DIRECT_OFFERS_URL_SUPPORT'],
    {
      first: 1,
      after: '',
      searchString: cardIdInUrl,
      orderBy: {
        direction: 'desc',
        field: 'price',
      },
    },
    FETCH_DIRECT_OFFERS,
    {
      enabled: false,
      retry: 1,
      refetchOnWindowFocus: false,
    }
  )

  const { mutationRes: updateOfferNftMutation } = usePostRequest(
    'UPDATE_OFFER_NFT_MUTATION',
    UPDATE_OFFER_NFT_MUTATION
  )

  const handleCardClick = item => {
    console.log('item info', item)
    const mediaList = [
      {
        type: 'image',
        url: get(item, 'nft.nftMetadata.metadata.image', ''),
        thumbnailUrl: get(item, 'nft.nftMetadata.metadata.image', ''),
        title: get(item, 'nft.nftMetadata.metadata.name', 'Untitled'),
        mimeType: 'image',
      },
    ]
    setSelectedCard({
      mediaList: mediaList,
      info: item,
    })
    setIsPreviewOpen(true)
  }

  const handleSubmitDataUpdate = temp => {
    setData([
      ...data.slice(0, selectedCard.index),
      temp,
      ...data.slice(selectedCard.index + 1, data.length),
    ])
    setSelectedCard({})
  }

  const removeCardKeysFromUrl = () => {
    const { query: urlParameters } = router
    if (has(urlParameters, 'card')) {
      const filterParameters = omit(urlParameters, ['card', 'type'])
      if (isEmpty(filterParameters)) router.push('/my-offers/')
      else {
        let url = '/my-offers?'
        keys(filterParameters).map(
          (item, idx) =>
            (url +=
              idx === 0
                ? `${item}=${filterParameters[item]}`
                : `&${item}=${filterParameters[item]}`)
        )
        router.push(url)
      }
    }
  }

  const cancelOffer = async () => {
    setCancelModalOpen(false)
    console.log('selected card', selectedCard)
    const payload = {
      data: {
        status: 1,
        id: toNumber(selectedCard.card.id),
      },
    }

    updateOfferNftMutation.mutate(payload, {
      onSuccess: result => {
        setData([
          ...data.slice(0, selectedCard.index),
          ...data.slice(selectedCard.index + 1, data.length),
        ])
        setSelectedCard({})
        setPriceSuccessMessage(t('offerRemoveSuccess'))
      },
      onError: (err, variables) => {
        // eslint-disable-next-line no-console
        setPriceErrorMessage(t('somethingWentWrongOfferRemoval'))
      },
    })
  }

  const fetchCardDetails = async (index, card) => {
    const resData = await fetchCardDetail()
    const cardDetails = get(resData, 'data.directOffers.edges[0]', {})

    if (!isEmpty(cardDetails)) {
      if (modalType === 'preview') handleCardClick({ ...cardDetails })
      else {
        setSelectedCard({
          card: { ...cardDetails },
          index,
        })
        setIsPriceModalOpen(true)
      }
    } else removeCardKeysFromUrl()
  }

  useEffect(() => {
    if (!isPreviewOpen && !isPriceModalOpen && cardIdInUrl && modalType && data.length) {
      let index = null
      const card = find(data, (item, idx) => {
        const result = get(item, 'id', '') === cardIdInUrl
        if (result) index = idx
        return result
      })
      fetchCardDetails(index, card)
    }
  }, [cardIdInUrl, data, modalType])

  return (
    <>
      {priceErrorMessage.length ? (
        <Feedback
          closedAfter={60000}
          type="error"
          onClose={() => setPriceErrorMessage('')}
          message={priceErrorMessage || t('somethingWentWrongPrice')}
          open={Boolean(priceErrorMessage)}
        />
      ) : null}
      {priceSuccessMessage.length ? (
        <Feedback
          closedAfter={60000}
          type="success"
          onClose={() => setPriceSuccessMessage('')}
          message={priceSuccessMessage || t('priceSuccess')}
          open={Boolean(priceSuccessMessage)}
        />
      ) : null}
      <div className="mt24">
        {isError && !isLoading ? (
          <Placeholder message={t('fetchErrorMessage')} type="error" showShadow={false} />
        ) : null}
        {!isLoading && totalCount === 0 && !isError && !data.length ? (
          <Placeholder showShadow={false} message={t('emptyListMessage')} type="empty" />
        ) : null}
        {!isError ? (
          <InfiniteScroll
            scrollableTarget="main-container"
            dataLength={data.length}
            next={() => !isLoading && loadNftList()}
            hasMore={false}
            loader={
              <OffersCardsLoader>
                {times(3).map((d, index) => (
                  <div className={clsx('card-item', index === 2 && 'last-item')} key={index}>
                    <AssetCard marketPlace showPrice loading t={t} />
                  </div>
                ))}
              </OffersCardsLoader>
            }>
            <OffersCardsList>
              {data.map((item, index) => (
                <div className="card-item" key={index}>
                  <AssetCard
                    marketPlace
                    seller={get(item, 'seller', '')}
                    buyer={get(item, 'buyer', '')}
                    price={get(item, 'price', '')}
                    lastPrice={get(item, 'nft.directOffers[0].price', '')}
                    item={get(item, 'nft.nftMetadata.metadata')}
                    t={t}
                    tokenId={get(item, 'nft.tokenId', '')}
                    showLastPrice={showLastPrice}
                    handleCardClick={() => {
                      router.push(
                        `${router.asPath}${router?.asPath.length > 13 ? '&' : '?'}card=${get(
                          item,
                          'nft.tokenId',
                          ''
                        )}&type=preview`
                      )
                      handleCardClick(item)
                    }}
                    menu={
                      <ActionMenu
                        iconDirection="horizontal"
                        menuItems={[
                          {
                            title: 'Update Offer',
                            onClick: () => {
                              router.push(
                                `${router.asPath}${
                                  router?.asPath.length > 13 ? '&' : '?'
                                }card=${get(item, 'nft.tokenId', '')}&type=buy`
                              )
                              setSelectedCard({
                                card: item,
                                index,
                              })
                              setIsPriceModalOpen(true)
                            },
                          },
                          {
                            title: 'Cancel Offer',
                            onClick: () => {
                              setSelectedCard({
                                card: item,
                                index,
                              })
                              setCancelModalOpen(true)
                            },
                          },
                        ]}
                        portal={false}
                      />
                    }
                  />
                </div>
              ))}
            </OffersCardsList>
          </InfiniteScroll>
        ) : null}
      </div>
      {isPreviewOpen ? (
        <PreviewModal
          cardInfo={selectedCard}
          t={t}
          onClose={() => {
            setIsPreviewOpen(false)
            setSelectedCard({})
            removeCardKeysFromUrl()
          }}
          isOpen={isPreviewOpen}
          showHistory
        />
      ) : null}
      {isPriceModalOpen ? (
        <SetPriceModal
          t={t}
          isOpen={isPriceModalOpen}
          onClose={() => {
            setIsPriceModalOpen(false)
            setSelectedCard({})
          }}
          user={user}
          onSubmit={temp => {
            setIsPriceModalOpen(false)
            handleSubmitDataUpdate(temp)
          }}
          tokenData={selectedCard.card}
          setPriceSuccessMessage={setPriceSuccessMessage}
          setPriceErrorMessage={setPriceErrorMessage}
        />
      ) : null}
      {isCancelModalOpen ? (
        <ConfirmationPopup
          open={isCancelModalOpen}
          title={'Cancel Offer'}
          message={'Are you sure to cancel this offer?'}
          handleConfirm={cancelOffer}
          handleCancel={() => setCancelModalOpen(false)}
          cancelButtonText={'No'}
          saveButtonText={'Yes'}
        />
      ) : null}
      {cardLoading && !isLoading ? (
        <div
          style={{
            position: 'fixed',
            zIndex: 5000,
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          }}>
          <ProgressLoading absolute />
        </div>
      ) : null}
    </>
  )
}

CardsList.propTypes = {
  data: PropTypes.array,
  totalCount: PropTypes.number,
  loadNftList: PropTypes.func,
  t: PropTypes.func,
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  setData: PropTypes.func,
  setTotalCount: PropTypes.func,
  setRarityFilterCount: PropTypes.func,
  router: PropTypes.object,
  showLastPrice: PropTypes.bool,
}

export default CardsList
