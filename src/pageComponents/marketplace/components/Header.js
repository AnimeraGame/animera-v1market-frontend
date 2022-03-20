import { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { TextField, MenuItem } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import FilterListIcon from '@material-ui/icons/FilterList'

// local imports
import { H3, H6, FontWeights } from 'components/Typography'
import { headerFilterOptions } from './config'
import { ContainedPrimaryButton } from 'components/Inputs'
import { constants } from 'components/Theme/constants'
import SearchInput from 'components/Inputs/SearchInput'

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

const ActionButtons = styled.div`
  display: flex;
  align-items: flex-end;
  flex-flow: row nowrap;
  margin-left: auto;

  ${props => props.theme.breakpoints.down('xs')} {
    flex-wrap: wrap;
  }

  .search-area {
    ${props => props.theme.breakpoints.down('xs')} {
      width: 100%;
      margin-top: 12px;
      .MuiOutlinedInput-root {
        width: 100%;
      }
    }
  }

  .MuiButton-contained {
    display: none;
    margin-left: 12px;

    ${props => props.theme.breakpoints.down(constants.tabletWidth)} {
      display: flex;
    }

    ${props => props.theme.breakpoints.down(350)} {
      margin-left: auto;
    }

    svg {
      margin-right: 4px;
    }
  }
`

const Select = styled.div`
  margin-top: 56px;
  display: flex;
  justify-content: flex-end;
  margin-left: auto;
  align-items: flex-end;

  .MuiOutlinedInput-root {
    min-height: 56px;
    min-width: 200px;

    ${props => props.theme.breakpoints.down('xs')} {
      min-height: 50px;
      min-width: 175px;
    }
  }

  ${props => props.theme.breakpoints.down(constants.tabletWidth)} {
    margin-top: 12px;
  }
  .MuiSelect-iconOutlined {
    right: 30px;
  }
  .MuiSelect-iconOpen {
    transform: none;
  }
`

const CustomIcon = styled.span`
  .less-icon {
    position: absolute;
    top: -0px;
    font-size: 1rem;
  }
  .more-icon {
    position: absolute;
    top: 8px;
    font-size: 1rem;
  }
`

const ExpandIcon = ({ className }) => {
  return (
    <CustomIcon className={className}>
      <ExpandLessIcon fontSize="small" className="less-icon" />
      <ExpandMoreIcon fontSize="small" className="more-icon" />
    </CustomIcon>
  )
}

const HeaderComponent = ({
  t,
  selectedValue,
  setSelectedValue,
  handleFilterModal,
  isLoading,
  searchText,
  setSearchText,
}) => {
  const [open, setOpen] = useState(false)
  return (
    <Header>
      <Heading>
        <H3>{t('title')}</H3>
        <H6 className="subtitle" fontWeight={FontWeights.regular}>
          {t('subtitle')}
        </H6>
      </Heading>
      <ActionButtons>
        <div className="search-area">
          <SearchInput
            onChange={value => setSearchText(value)}
            placeholder={t('searchPlaceholder')}
            searchText={searchText}
            onClearClick={() => setSearchText('')}
            searching={isLoading}
          />
        </div>
        <Select>
          <TextField
            id="select-cards-order"
            select
            disabled={isLoading}
            SelectProps={{
              IconComponent: ExpandIcon,
              open: open,
              onOpen: () => setOpen(true),
              onClose: () => setOpen(false),
            }}
            value={selectedValue}
            onChange={setSelectedValue}
            variant="outlined">
            {headerFilterOptions.map(option => (
              <MenuItem key={option} value={option}>
                {t(option)}
              </MenuItem>
            ))}
          </TextField>
        </Select>
        <ContainedPrimaryButton disabled={isLoading} onClick={handleFilterModal}>
          <FilterListIcon />
          {t('filters')}
        </ContainedPrimaryButton>
      </ActionButtons>
    </Header>
  )
}

HeaderComponent.propTypes = {
  t: PropTypes.func,
  selectedValue: PropTypes.string,
  setSelectedValue: PropTypes.func,
  handleFilterModal: PropTypes.func,
  searchText: PropTypes.string,
  setSearchText: PropTypes.func,
  isLoading: PropTypes.bool,
}

export default HeaderComponent
