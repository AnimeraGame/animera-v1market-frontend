import styled from 'styled-components'
import PropTypes from 'prop-types'

import theme from 'components/Theme'
import { extractFirstLastChars } from 'lib/util/stringUtil'

const AddressContainer = styled.div`
  padding: 4px 16px;
  cursor: pointer;
  font-weight: 400;
  line-height: 20px;
  background-color: ${theme.colors.n30};
  border-radius: 25px;
  font-size: 16px;
  ${props => props.theme.breakpoints.down('xs')} {
    display: none;
  }
`

const Address = ({ address = '', firstChunk = 4, lastChunk = 4 }) => {
  return (
    <AddressContainer>{extractFirstLastChars(address, firstChunk, lastChunk)}</AddressContainer>
  )
}

Address.propTypes = {
  address: PropTypes.string,
  firstChunk: PropTypes.number,
  lastChunk: PropTypes.number,
}

export default Address
