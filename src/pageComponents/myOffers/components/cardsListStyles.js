import styled from 'styled-components'
import { constants } from 'components/Theme/constants'

export const OffersCardsList = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  flex-flow: row wrap;

  .card-item {
    padding: 16px;
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 33%;

    ${props => props.theme.breakpoints.down(constants.maxWidth)} {
      flex-basis: 50%;
    }
    ${props => props.theme.breakpoints.down('xs')} {
      flex-basis: 100%;
    }
  }
`
export const OffersCardsLoader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  flex-flow: row wrap;

  .card-item {
    padding: 16px;
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 33%;
    ${props => props.theme.breakpoints.down(constants.maxWidth)} {
      flex-basis: 50%;
    }
    ${props => props.theme.breakpoints.down('xs')} {
      flex-basis: 100%;
    }
  }
  .last-item {
    ${props => props.theme.breakpoints.down(constants.maxWidth)} {
      display: none;
    }
  }
`
