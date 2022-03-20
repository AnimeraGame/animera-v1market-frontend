import styled from 'styled-components'

// local imports
import theme from 'components/Theme'

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-flow: column nowrap;
  width: 100%;
  max-width: ${theme.constants.maxWidth}px;
  margin: 28px 0px 20px;
  padding: 16px 16px 20px;
  ${props => props.theme.breakpoints.down(theme.constants.tabletWidth)} {
    flex-flow: column nowrap;
    margin-top: 8px;
  }
`

export const BodyContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-flow: row nowrap;
  width: 100%;
  margin-top: 28px;
  ${props => props.theme.breakpoints.down(theme.constants.tabletWidth)} {
    flex-flow: column nowrap;
  }
  ${props => props.theme.breakpoints.down('xs')} {
    margin-top: 0px;
  }
  .infinite-scroll-component {
    overflow: visible !important;
  }
`

export const FiltersContainer = styled.div`
  display: flex;
  width: 300px;
  position: sticky;
  top: 20px;
  ${props => props.theme.breakpoints.down(theme.constants.tabletWidth)} {
    display: none;
  }
`

export const CardContainer = styled.div`
  margin-left: 40px;
  width: 100%;
  ${props => props.theme.breakpoints.down(theme.constants.tabletWidth)} {
    margin-left: 0px;
  }
`
