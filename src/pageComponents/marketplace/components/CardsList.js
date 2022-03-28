import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import find from 'lodash/find'
import omit from 'lodash/omit'
import keys from 'lodash/keys'
import has from 'lodash/has'
import times from 'lodash/times'
import isEmpty from 'lodash/isEmpty'
import toLower from 'lodash/toLower'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useWeb3React } from '@web3-react/core'
import { useSelector, useDispatch } from 'react-redux'
import TagManager from 'react-gtm-module'
import clsx from 'clsx'

// local imports
import AssetCard from 'pageComponents/common/MarketplaceAssetCard'
import Placeholder from 'components/Placeholder'
import BuyNowModal from './BuyNowModal'
import { ActionMenu } from 'components/Menus'
import PreviewModal from 'pageComponents/common/CardModal'
import { wrapImagePath } from 'lib/util/imageLoader'
import usePostRequest from 'hooks/UsePostRequest'
import { ACCEPT_OFFER_MUTATION } from 'state/marketplace/queries/acceptOffer'
import { buyOffer } from 'lib/util/web3/purchase'
import { nftAddress, purchaseAddress } from 'lib/util/web3/contractConstants'
import { getBalance } from 'state/settings/selectors'
import { getAuthState, getUserAuthInfo } from 'state/auth/selectors'
import Feedback from 'components/FeedbackCards/Feedback'
import { getBNBBalance } from 'lib/util/web3/balance'
import { setBalances } from 'state/settings'
import useQueryRequest from 'hooks/UseQueryRequest'
import FETCH_DIRECT_OFFERS from 'state/marketplace/queries/fetchDirectOffers'
import ProgressLoading from 'components/Loading'
import { OffersCardsList, OffersCardsLoader } from './cardsListStyles'

const getBalanceOfWallet = async (library, address) => {
  const bnbBalance = await getBNBBalance(library, address)
  return { bnbBalance }
}

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
  const cardIdInUrl = get(router, 'query.card', null)
  const modalType = get(router, 'query.type', null)
  const balance = useSelector(state => getBalance(state))
  const isUserLoggedIn = useSelector(state => getAuthState(state))
  const user = useSelector(state => getUserAuthInfo(state))

  const dispatch = useDispatch()
  // local state
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [priceSuccessMessage, setPriceSuccessMessage] = useState('')
  const [priceErrorMessage, setPriceErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { library, account } = useWeb3React()
  const { mutationRes: acceptOfferMutation } = usePostRequest(
    'ACCEPT_OFFER_MUTATION',
    ACCEPT_OFFER_MUTATION
  )

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

  const handleCardClick = item => {
    const mediaList = [
      {
        type: 'video',
        url: wrapImagePath(get(item, 'node.nft.nftMetadata.metadata.video', '')),
        thumbnailUrl: wrapImagePath(get(item, 'node.nft.nftMetadata.metadata.image', '')),
        title: 'Token Front Animated',
        mimeType: 'video',
      },
      {
        type: 'back',
        url: wrapImagePath(get(item, 'node.nft.nftMetadata.metadata.back_image', '')),
        title: 'Token Back Static',
        mimeType: 'image',
      },
    ]
    setSelectedCard({
      mediaList: mediaList,
      info: get(item, 'node.nft', {}),
    })
    setIsPreviewOpen(true)
  }

  const handleBuy = async item => {
    setIsSubmitting(true)
    const sellerSig = await buyOffer(library, item, account)
      setIsSubmitting(false)
    //   acceptOfferMutation.mutate(payload, {
    //     onSuccess: data => {
    //       TagManager.dataLayer({
    //         dataLayer: {
    //           event: 'sold_marketplace',
    //           id: item?.nft?.tokenId,
    //           price: item?.price + ' BNB',
    //           type: 'sold_marketplace',
    //         },
    //       })
    //       setPriceSuccessMessage(t('priceSuccess'))
    //       setIsBuyModalOpen(false)
    //       setSelectedCard({})
    //       setIsSubmitting(false)
    //     },
    //     onError: (err, variables) => {
    //       // eslint-disable-next-line no-console
    //       console.log({ err })
    //       setPriceErrorMessage(t('somethingWentWrongPurchase'))
    //       setIsSubmitting(false)
    //     },
    //   })
    // } else {
    //   setPriceErrorMessage(t('confirmWalletTransaction'))
    //   setIsSubmitting(false)
    // }
  }

  const removeCardKeysFromUrl = () => {
    const { query: urlParameters } = router
    if (has(urlParameters, 'card')) {
      const filterParameters = omit(urlParameters, ['card', 'type'])
      if (isEmpty(filterParameters)) router.push('/marketplace/')
      else {
        let url = '/marketplace?'
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
        setIsBuyModalOpen(true)
      }
    } else removeCardKeysFromUrl()
  }

  useEffect(() => {
    if (!isPreviewOpen && !isBuyModalOpen && cardIdInUrl && modalType && data.length) {
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
        {!isLoading && totalCount === 0 && !isError ? (
          <Placeholder showShadow={false} message={t('emptyListMessage')} type="empty" />
        ) : null}
        {!isError ? (
          <InfiniteScroll
            scrollableTarget="main-container"
            dataLength={data.length}
            next={() => !isLoading && loadNftList()}
            hasMore={data.length < totalCount}
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
                    price={get(item, 'price', '') + ' MARS'}
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
                      !isUserLoggedIn ||
                      account === get(item, 'seller', '') ? null : (
                        <ActionMenu
                          iconDirection="horizontal"
                          menuItems={[
                            {
                              title: t('buyNow'),
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
                                    setIsBuyModalOpen(true)
                                  }
                            },
                          ]}
                          portal={false}
                        />
                      )
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
      {isBuyModalOpen ? (
        <BuyNowModal
          cardInfo={selectedCard.card}
          t={t}
          cardType={'SIMPLE'}
          onClose={() => {
            setIsBuyModalOpen(false)
            setSelectedCard({})
            removeCardKeysFromUrl()
          }}
          isOpen={isBuyModalOpen}
          onSubmit={item => handleBuy(item)}
          balance={balance}
          isSubmitting={isSubmitting}
          account={account}
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