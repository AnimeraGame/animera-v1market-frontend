import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

// this container is for guest layout
export const Container = styled.div`
  display: flex;
  flex: 1;
  min-height: calc(100vh);
  width: 100%;
  justify-content: center;
  overflow-x: auto;
`

const MainContainer = ({ children }) => {
  return <Container id="auth-container">{children}</Container>
}

MainContainer.propTypes = {
  children: PropTypes.node,
}

export default MainContainer
