import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import times from 'lodash/times'
import InfiniteScroll from 'react-infinite-scroll-component'
import dynamic from 'next/dynamic'
import { useSelector } from 'react-redux'
import { useRouter, Router } from 'next/router'
import { useWeb3React } from '@web3-react/core'

// local imports
import AssetCard from 'pageComponents/common/AssetCard'
import LightBox from 'pageComponents/common/CardModal'
import useDevice from 'hooks/useDevice'
import { constants } from 'components/Theme/constants'
import useQueryRequest from 'hooks/UseQueryRequest'
import WALLET_NFT_COLLECTION from 'state/nft/queries/walletNfts'
import Placeholder from 'components/Placeholder'
import { ActionMenu } from 'components/Menus'
import { wrapImagePath } from 'lib/util/imageLoader'
import { getUserAuthInfo } from 'state/auth/selectors'
import Feedback from 'components/FeedbackCards/Feedback'
import { isBrowser } from 'lib/util/window'
import ProgressLoading from 'components/Loading'
// this is a dynamic method with named default export from component
const SetPriceModal = dynamic(() => import('./components/SetPriceModal'), {
  loading: () => (
    <div
      style={{
        position: 'fixed',
        zIndex: 5000,
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
      }}>
      <ProgressLoading absolute />
    </div>
  ),
})
const TransferModal = dynamic(() => import('./components/TransferModal'))
const TokenContentModal = dynamic(() => import('./components/TokenContentModal'))
const Container = styled.div`
  .infinite-scroll-component {
    overflow: visible !important;
  }

  ${props => props.theme.breakpoints.down(constants.tabletWidth)} {
    padding: 0px 16px;
  }

  padding: 0px 0;
  width: 100%;
  .load_more_container {
    margin-top: 30px;
    button {
      margin: 0;
    }
  }
`

const CollectionList = ({ t }) => {
  const user = useSelector(state => getUserAuthInfo(state))

  const [data, setData] = useState([])
  const [skipItems, setSkipItems] = useState(0)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [totalCount, setTotalCount] = useState(0)
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false)
  const [contentModalType, setContentModalType] = useState(null)
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false)
  const [priceSuccessMessage, setPriceSuccessMessage] = useState('')
  const [priceErrorMessage, setPriceErrorMessage] = useState('')
  const { account } = useWeb3React()

  const handleCardClick = item => {
    const mediaList = [
      {
        type: 'video',
        url: wrapImagePath(get(item, 'nftMetadata.metadata.video', '')),
        thumbnailUrl: wrapImagePath(get(item, 'nftMetadata.metadata.image', '')),
        title: 'Token Front Animated',
        mimeType: 'video',
      },
      {
        type: 'back',
        url: wrapImagePath(get(item, 'nftMetadata.metadata.back_image', '')),
        title: 'Token Back Static',
        mimeType: 'image',
      },
    ]
    setSelectedCard({
      mediaList: mediaList,
      info: item,
    })
    setIsPreviewOpen(true)
  }

  const router = useRouter()
  const { wallet } = router.query

  if (wallet === account) router.push('/')

  const {
    isLoading,
    isError,
    refetch: refetchList,
    isFetching,
  } = useQueryRequest(['WALLET_NFT_COLLECTION'], { wallet: wallet }, WALLET_NFT_COLLECTION, {
    enabled: false,
    refetchOnWindowFocus: false,
    retry: 2,
  })

  const loadNftCollectionList = async () => {
    const res = await refetchList()
    setData([...data, ...get(res, 'data.getNftListByWallet.nfts', [])])
    setTotalCount(get(res, 'data.getNftListByWallet.nftsCount', 0))
  }

  const handleSubmitDataUpdate = temp => {
    const prevItem = data[selectedCard.index]

    let updatedItem = {}
    if (!temp) {
      updatedItem = {
        ...prevItem,
        estates: [],
      }
    } else {
      updatedItem = {
        ...prevItem,
        estates: [
          {
            ...temp,
          },
        ],
      }
    }

    setData([
      ...data.slice(0, selectedCard.index),
      { ...updatedItem },
      ...data.slice(selectedCard.index + 1, data.length),
    ])
    setSelectedCard({})
  }

  const { isTablet } = useDevice()
  const spacing = isTablet ? 2 : 4

  useEffect(() => {
    if (isBrowser()) {
      const node = document.getElementById('main-container')
      if (node) node.scrollTo(0, 0)
    }
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => loadNftCollectionList(), 200)
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    if (skipItems !== 0) {
      loadNftCollectionList()
    }
  }, [skipItems])

  return (
    <Container>
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
      <>
        {isError && (
          <Placeholder showShadow={false} message={t('technicalErrorOccurred')} type="error" />
        )}
        {!isLoading && !data.length && !totalCount && !isError && (
          <Placeholder showShadow={false} message={t('noCollections')} type="empty" />
        )}
        {!isError ? (
          <InfiniteScroll
            scrollableTarget="main-container"
            dataLength={data.length}
            next={() => !isFetching && data.length && setSkipItems(old => old + 12)}
            hasMore={data.length < totalCount}
            loader={
              <Grid spacing={spacing} container>
                {times(4).map((d, index) => (
                  <Grid key={index} item {...constants.responsiveGrid} xl={3}>
                    <AssetCard showPrice={false} loading={true} t={t} />
                  </Grid>
                ))}
              </Grid>
            }>
            <Grid spacing={spacing} container>
              {data.map((item, index) => (
                <Grid key={index} item {...constants.responsiveGrid} xl={3}>
                  <AssetCard
                    handleCardClick={() => handleCardClick(item)}
                    t={t}
                    item={get(item, 'nftMetadata.metadata', {})}
                    loading={isLoading}
                    showPrice={false}
                    tokenId={get(item, 'tokenId', '')}
                    menu={
                      <ActionMenu
                        iconDirection="horizontal"
                        menuItems={[
                          {
                            title:
                              get(item, 'estates', []).length > 0 ? 'Update Offer' : 'Create offer',
                            onClick: () => {
                              setSelectedCard({ card: item, index: index })
                              setIsPriceModalOpen(true)
                            },
                          },
                        ]}
                        portal={false}
                      />
                    }
                  />
                </Grid>
              ))}
            </Grid>
          </InfiniteScroll>
        ) : null}
      </>
      {/* )} */}
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
      {isPreviewOpen ? (
        <LightBox
          cardInfo={selectedCard}
          t={t}
          onClose={() => {
            setIsPreviewOpen(false)
            setSelectedCard({})
          }}
          isOpen={isPreviewOpen}
        />
      ) : null}
      {isTransferModalOpen ? (
        <TransferModal
          t={t}
          isOpen={isTransferModalOpen}
          onClose={() => {
            setIsTransferModalOpen(false)
            setSelectedCard({})
          }}
          onSubmit={() => {
            setIsTransferModalOpen(false)
            setSelectedCard({})
          }}
          tokenData={selectedCard}
        />
      ) : null}
      {!isEmpty(contentModalType) ? (
        <TokenContentModal
          t={t}
          isOpen={!isEmpty(contentModalType)}
          onClose={() => {
            setContentModalType(null)
            setSelectedCard({})
          }}
          tokenData={selectedCard}
          modalType={contentModalType}
        />
      ) : null}
    </Container>
  )
}

CollectionList.propTypes = {
  t: PropTypes.func,
}

export default CollectionList
