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
import { FETCH_DIRECT_SALES } from 'state/marketplace/queries/fetchDirectOffers'
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
  const [endCursor, setEndCursor] = useState(0)
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
    },
    FETCH_DIRECT_SALES,
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
    setEndCursor(0)
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
    setEndCursor(0)
    handleScrollToTop()
    const path = generateUrl(selectedOrder, newFilters, searchText)
    router.push(path)
  }

  const handleFiltersReset = () => {
    setData([])
    setAfterId('')
    setEndCursor(0)
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
    setEndCursor(0)
    setTotalCount(4)
    setSearchText(search)
    generateUrlSearch(router, search)
  }
  const isEqual = (first, second) => first?.id === second?.id

  useEffect(() => {
    if (!isUndefined(dataArray)) {
      if (!isInitialReqCompleted.current) isInitialReqCompleted.current = true
      const updatedCount = get(dataArray, 'findSalesBy._count', 0)
      const resData = get(dataArray, 'findSalesBy.estates', [])
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
