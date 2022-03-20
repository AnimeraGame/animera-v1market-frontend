import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import get from 'lodash/get'
import { constants } from 'components/Theme/constants'

// Local imports
import Layout from '../Layout'
import AuthContainer from '../Auth'
import theme from 'components/Theme'

const Container = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 92px); // height is being set from layout parent component

  ${props => props.theme.breakpoints.down(constants.tabletWidth)} {
    height: calc(100vh - 72px); // height is being set from layout parent component
  }

  overflow: hidden auto;
  flex-direction: ${props => (props.hideHeader ? 'row' : 'column')};
  background: ${theme.colors.white};
  padding: 0px 0px;
  ${props => props.theme.breakpoints.down('xs')} {
    height: 100%;
  }
`

const MainWrapper = styled.div`
  display: flex;
  flex-direction: ${props => (props.hideHeader ? 'row' : 'column')};
  margin: 0px auto;
  position: relative;
  width: 100%;
  /* background: ${theme.colors.backgroundGray}; */
  padding: 0px;
`

const MainContainer = ({
  children,
  hideHeader = false,
  fullWidth = false,
  hideDrawer = false,
}) => {
  const router = useRouter()
  return (
    <Layout hideDrawer={hideDrawer}>
      <Container
        hideHeader={hideHeader}
        id="main-container">
        <MainWrapper fullWidth={fullWidth} hideHeader={hideHeader}>
          {children}
        </MainWrapper>
      </Container>
    </Layout>
  )
}

MainContainer.propTypes = {
  title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  headerActions: PropTypes.node,
  children: PropTypes.node,
  v2: PropTypes.bool,
  isAdminTemplate: PropTypes.bool,
  fixedHeaderResponsive: PropTypes.bool,
  fullWidth: PropTypes.bool,
  hideBottomBorder: PropTypes.bool,
}

export default MainContainer
