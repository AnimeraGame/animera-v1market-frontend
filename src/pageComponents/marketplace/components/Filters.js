import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Divider } from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel'
import isEmpty from 'lodash/isEmpty'
import { memo } from 'react'

// local imports
import { H6, FontWeights } from 'components/Typography'
import CustomizedSlider from 'components/Inputs/CustomRangeSlider'
import { TextPrimaryButton } from 'components/Inputs'
import theme from 'components/Theme'

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  flex-flow: column nowrap;
  width: 100%;

  .price-range {
    margin-bottom: 12px;
  }

  .MuiDivider-root {
    width: 100%;
    margin: 20px 0px;
  }

  .MuiButton-textPrimary {
    color: ${theme.colors.errorColor};
    margin-left: -16px;
    :hover {
      color: ${theme.colors.darkRed};
      background-color: transparent;
    }
    svg {
      margin-right: 8px;
    }
  }
  .MuiSlider-thumb.Mui-focusVisible,
  .MuiSlider-thumb:hover {
    box-shadow: none;
  }
`

// const SaleTypeContainer = styled.div`
//   display: flex;
//   align-items: flex-start;
//   flex-flow: column nowrap;
//   width: 100%;
//   margin-bottom: 8px;

//   h6 {
//     margin-bottom: 12px;
//   }
// `

const FiltersComponent = ({
  t,
  filters,
  setFilters,
  handleReset,
  isDisabled,
  filterCounts = {},
  searchText = '',
}) => {
  const handlePriceSlider = value => {
    setFilters({ ...filters, price: value })
  }

  // const handleSaleTypeChange = e => {
  //   const value = e.target.value
  //   setFilters({ ...filters, sale: value })
  // }

  const areFiltersEnabled =
    filters.price[0] !== 0 ||
    filters.price[1] !== 5000 ||
    !isEmpty(filters.scarcity) ||
    !isEmpty(filters.sale) ||
    searchText.length

  return (
    <Container>
      <H6 id="price-range" className="price-range" fontWeight={FontWeights.bold}>
        {t('priceRange')}
      </H6>

      <CustomizedSlider
        value={filters.price}
        setValue={handlePriceSlider}
        disabled={isDisabled}
        min={0}
        max={5000}
      />
      <Divider />
      <TextPrimaryButton disabled={!areFiltersEnabled} onClick={handleReset}>
        <CancelIcon />
        {t('resetFilter')}
      </TextPrimaryButton>
    </Container>
  )
}

FiltersComponent.propTypes = {
  t: PropTypes.func,
  setFilters: PropTypes.func,
  filters: PropTypes.object,
  filterCounts: PropTypes.object,
  handleReset: PropTypes.func,
  isDisabled: PropTypes.bool,
  searchText: PropTypes.string,
}

export default memo(FiltersComponent)
