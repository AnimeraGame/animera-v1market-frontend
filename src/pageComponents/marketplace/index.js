import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import get from 'lodash/get'
import isUndefined from 'lodash/isUndefined'
import uniqWith from 'lodash/uniqWith'
// import isEqual from 'lodash/isEqual'
// import throttle from 'lodash/throttle'
import Dynamic from 'next/dynamic'

// local imports
import { Container, FiltersContainer, CardContainer, BodyContainer } from './styles'
import Header from './components/Header'
import FiltersComponent from './components/Filters'
import useQueryRequest from 'hooks/UseQueryRequest'
import {
  saleTypeFilterOptions,
  scarcityFilterOptions,
  headerFilterOptions,
} from './components/config'
import {
  validateUrlInput,
  getPriceFromUrl,
  generateUrl,
  generateUrlSearch,
} from 'lib/util/stringUtil'
import FiltersModalHoc from './components/FiltersModalHoc'
import FETCH_DIRECT_OFFERS from 'state/marketplace/queries/fetchDirectOffers'
// import CardsList from './components/CardsList'
import { isBrowser } from 'lib/util/window'
import ProgressLoading from 'components/Loading/index'

const CardsList = Dynamic(() => import('./components/CardsList'), {
  loading: () => <ProgressLoading absolute />,
})

const MarketplaceWrapper = ({ t }) => {
  const router = useRouter()

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
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false)
  const [totalCount, setTotalCount] = useState(4)
  const [afterId, setAfterId] = useState('')
  const [endCursor, setEndCursor] = useState('')
  const [rarityFilterCounts, setRarityFilterCount] = useState({})
  const [selectedOrder, setSelectedOrder] = useState(
    validateUrlInput(headerFilterOptions, sortOrder)
  )
  const [searchText, setSearchText] = useState(searchString)
  const [filters, setFilters] = useState({
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
      first: 18,
      after: afterId,
      orderBy: {
        direction: selectedOrder !== 'low_high' ? 'desc' : 'asc',
        field:
          selectedOrder === 'nft_last_sale'
            ? 'nftLastSale'
            : selectedOrder === 'created_at'
            ? selectedOrder
            : 'price',
      },
      query: {
        startPrice: filters.price[0],
        endPrice: filters.price[1] >= 5000 ? 50000 : filters.price[1],
        rarity: filters.scarcity || null,
        status: 'active',
      },
      searchString: searchText,
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

  const handleSelectedOrder = e => {
    setData([])
    setAfterId('')
    setEndCursor('')
    setTotalCount(4)
    const value = e.target.value
    setSelectedOrder(value)
    const path = generateUrl(value, filters, searchText)
    router.push(path)
  }

  const handleFilters = newFilters => {
    setData([])
    setTotalCount(4)
    setFilters({ ...newFilters })
    setAfterId('')
    setEndCursor('')
    handleScrollToTop()
    const path = generateUrl(selectedOrder, newFilters, searchText)
    router.push(path)
  }

  const handleFiltersReset = () => {
    setData([])
    setAfterId('')
    setEndCursor('')
    setTotalCount(4)
    setFilters({
      price: [0, 5000],
      sale: '',
      scarcity: '',
    })
    setSelectedOrder('low_high')
    setSearchText('')
    handleScrollToTop()
    router.push(`/marketplace?so=low_high`)
  }
  const handleSearch = search => {
    setData([])
    setAfterId('')
    setEndCursor('')
    setTotalCount(4)
    setSearchText(search)
    generateUrlSearch(router, search)
  }
  const isEqual = (first, second) => first?.node?.id === second?.node?.id

  useEffect(() => {
    if (!isUndefined(dataArray)) {
      if (!isInitialReqCompleted.current) isInitialReqCompleted.current = true
      const updatedCount = get(dataArray, 'directOffers.totalCount', 0)
      const resData = get(dataArray, 'directOffers.edges', [])
      const updatedData = data.length > updatedCount ? resData : [...data, ...resData]
      setData(uniqWith(updatedData, isEqual))
      // setData(updatedData)
      setTotalCount(updatedCount)
      setEndCursor(get(dataArray, 'directOffers.pageInfo.endCursor', ''))
      setRarityFilterCount({
        common: get(dataArray, 'directOffers.commonRarityCount', 0),
        wild: get(dataArray, 'directOffers.wildRarityCount', 0),
        legendary: get(dataArray, 'directOffers.legendaryRarityCount', 0),
        rare: get(dataArray, 'directOffers.rareRarityCount', 0),
      })
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
        <Header
          handleFilterModal={() => setIsFiltersModalOpen(true)}
          t={t}
          selectedValue={selectedOrder}
          setSelectedValue={handleSelectedOrder}
          isLoading={isLoading || isFetching}
          searchText={searchText}
          setSearchText={handleSearch}
        />
        <BodyContainer>
          <FiltersContainer>
            <FiltersComponent
              t={t}
              filters={filters}
              setFilters={handleFilters}
              handleReset={handleFiltersReset}
              filterCounts={rarityFilterCounts}
              isDisabled={Boolean(error) || isLoading || isFetching}
              searchText={searchText}
            />
          </FiltersContainer>
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
      {isFiltersModalOpen ? (
        <FiltersModalHoc
          t={t}
          isOpen={isFiltersModalOpen}
          onClose={() => setIsFiltersModalOpen(false)}>
          <FiltersComponent
            t={t}
            filters={filters}
            setFilters={handleFilters}
            handleReset={handleFiltersReset}
            filterCounts={rarityFilterCounts}
            isDisabled={Boolean(error) || isLoading || isFetching}
            searchText={searchText}
          />
        </FiltersModalHoc>
      ) : null}
    </>
  )
}

export default MarketplaceWrapper
