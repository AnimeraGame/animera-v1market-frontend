import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import get from 'lodash/get'
import isUndefined from 'lodash/isUndefined'
import uniqWith from 'lodash/uniqWith'
import styled from 'styled-components'
import Dynamic from 'next/dynamic'
import { H3 } from 'components/Typography'
import { Container, CardContainer, BodyContainer } from './styles'
import ProgressLoading from 'components/Loading/index'
import useQueryRequest from 'hooks/UseQueryRequest'
import { getUserAuthInfo } from 'state/auth/selectors'
import {
  saleTypeFilterOptions,
  scarcityFilterOptions,
  headerFilterOptions,
} from './components/config'
import { validateUrlInput, getPriceFromUrl } from 'lib/util/stringUtil'
import { FETCH_DIRECT_OFFERS } from 'state/marketplace/queries/fetchDirectOffers'
// import CardsList from './components/CardsList'
import { isBrowser } from 'lib/util/window'

const CardsList = Dynamic(() => import('./components/CardsList'), {
  loading: () => <ProgressLoading absolute />,
})

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
  flex-flow: row wrap;

  ${props => props.theme.breakpoints.down('xs')} {
    margin-bottom: 0px;
  }
`

const Heading = styled.div`
  display: flex;
  align-items: flex-start;
  flex-flow: column wrap;

  .subtitle {
    margin-top: 8px;
  }
`

const OffersWrapper = ({ t }) => {
  const router = useRouter()
  const user = useSelector(state => getUserAuthInfo(state))

  const {
    pn: priceMin,
    px: priceMax,
    s: sale,
    sy: scarcity,
    so: sortOrder = 'low_high',
    sq: searchString = '',
  } = router.query
  const isInitialReqCompleted = useRef(false)
  // state
  const [data, setData] = useState([])
  const [totalCount, setTotalCount] = useState(4)
  const [afterId, setAfterId] = useState('')
  const [endCursor, setEndCursor] = useState(0)
  const [, setRarityFilterCount] = useState({})
  const [selectedOrder] = useState(validateUrlInput(headerFilterOptions, sortOrder))
  const [searchText] = useState(searchString)
  const [filters] = useState({
    price: [...getPriceFromUrl(priceMin, priceMax)],
    sale: sale
      ? validateUrlInput(
          saleTypeFilterOptions.map(item => item.key),
          sale
        )
      : '',
    scarcity: scarcity ? validateUrlInput(scarcityFilterOptions, scarcity) : '',
  })

  const {
    isLoading,
    isFetching,
    error,
    data: dataArray,
  } = useQueryRequest(
    [
      `FETCH_DIRECT_OFFERS_FIRST_${18}_AFTER_${afterId}_DIRECTION_${
        selectedOrder !== 'high_low' ? 'desc' : 'asc'
      }_FIELD_${selectedOrder}_QUERY_MIN_${filters.price[0]}_MAX_${filters.price[1]}_R_${
        filters.scarcity
      }_SEARCH_${searchText}`,
    ],
    {
      onePage: 18,
      page: endCursor,
      price: {
        gt: filters.price[0],
        lt: filters.price[1],
      },
      orderBy: {
        price:
          selectedOrder === 'low_high' || selectedOrder === 'high_low'
            ? selectedOrder !== 'low_high'
              ? 'desc'
              : 'asc'
            : null,
        created_at: selectedOrder === 'create_at' ? 'desc' : null,
        // last_sale: selectedOrder === 'nft_last_sale' ? 'desc' : null,
      },
      status: 0,
      searchText: searchText,
      wallet: user.walletAddress,
    },
    FETCH_DIRECT_OFFERS,
    {
      enabled: true,
      refetchOnWindowFocus: false,
      refetchOnMount: 'always',
      retry: 1,
      cacheTime: 3600000,
    }
  )

  const handleScrollToTop = () => {
    const node = document.getElementById('main-container')
    if (node) node.scrollTo(0, 0)
  }

  const isEqual = (first, second) => first?.id === second?.id

  useEffect(() => {
    if (!isUndefined(dataArray)) {
      if (!isInitialReqCompleted.current) isInitialReqCompleted.current = true
      const updatedCount = get(dataArray, 'findOffersBy._count', 0)
      const resData = get(dataArray, 'findOffersBy.estates', [])
      const updatedData = data.length > updatedCount ? resData : [...data, ...resData]
      setData(uniqWith(updatedData, isEqual))
      // setData(updatedData)
      setTotalCount(updatedCount + totalCount)
      if (resData && resData.length === 18) {
        setEndCursor(endCursor + 1)
      }
    }
  }, [dataArray])

  useEffect(() => {
    if (isBrowser()) {
      handleScrollToTop()
    }
  }, [])
  return (
    <>
      <Container>
        <Header>
          <Heading>
            <H3>{t('offers')}</H3>
          </Heading>
        </Header>
        <BodyContainer>
          <CardContainer>
            <CardsList
              t={t}
              setAfterId={setAfterId}
              data={data}
              loadNftList={() => setAfterId(endCursor)}
              totalCount={totalCount}
              isLoading={isLoading || isFetching}
              isError={Boolean(error)}
              setData={setData}
              setTotalCount={setTotalCount}
              setRarityFilterCount={setRarityFilterCount}
              router={router}
              showLastPrice={selectedOrder === 'nft_last_sale'}
            />
          </CardContainer>
        </BodyContainer>
      </Container>
    </>
  )
}

export default OffersWrapper
