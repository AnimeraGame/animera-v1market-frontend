import Blockies from 'react-blockies'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;

  .identicon {
    border-radius: 50%;
    max-width: 36px;
    max-height: 36px;
  }
`

const MyBlockies = ({ address, size = 6, scale = 6, className = 'identicon' }) => (
  <Container>
    <Blockies seed={address} size={size} scale={scale} className={className} />
  </Container>
)

MyBlockies.propTypes = {
  size: PropTypes.number,
  scale: PropTypes.number,
  address: PropTypes.string.isRequired,
  className: PropTypes.string,
}

export default MyBlockies
