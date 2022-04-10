import styled, { css } from 'styled-components'
import useTranslation from 'next-translate/useTranslation'
// import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import Head from 'next/head'

// local imports
import PageContent from 'containers/PageContent/index'
import validateAuth from 'lib/util/validateAuthSimple' // this will validate the cookie * token * in the headers
import CollectionList from 'pageComponents/collection/CollectionList'
// import Tabs from 'components/Tabs'
import { getAuthState } from 'state/auth/selectors'
import { Body1 } from 'components/Typography'
import { constants } from 'components/Theme/constants'
import theme from 'components/Theme/index'
import { isBrowser } from 'lib/util/window'
import { getWallet } from 'state/settings/selectors'

const common = css`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
`

const Container = styled.div`
  ${common}
  width: 100%;
  margin-top: 30px;

  ${props => props.theme.breakpoints.down(constants.tabletWidth)} {
    margin-top: 0px;
  }

  .MuiTabs-root {
    ${props => props.theme.breakpoints.down(constants.tabletWidth)} {
      background: ${theme.colors.white};
      padding-left: 20px;
      border-top: 1px solid ${theme.colors.borderColor};
    }
  }

  .MuiTab-root {
    padding: 12px 2px;
    min-width: auto !important;
    margin-right: 60px;
    ${props => props.theme.breakpoints.down(constants.tabletWidth)} {
      margin-right: 20px;
    }
  }

  .MuiTab-wrapper {
    align-items: flex-start;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0px;
    text-align: left;
    ${props => props.theme.breakpoints.down(constants.tabletWidth)} {
      font-size: 16px;
    }
  }
`

const GuestContainer = styled.div`
  ${common}
  max-width: 750px;
  p {
    display: flex;
    align-items: center;
  }
  svg {
    margin-right: 12px;
    font-size: 50px;
  }
  ${props => props.theme.breakpoints.down('xs')} {
    padding: 16px;
  }
`

export const getServerSideProps = context => {
  // if the cookie token in not present in req headers, the user wil be redirected to the login page
  return validateAuth(context)(async props => {
    return {
      props: { ...props },
    }
  })
}

const Collections = ({ isUserLoggedIn }) => {
  // global state
  const wallet = useSelector(state => getWallet(state))
  const isLoggedIn = useSelector(state => getAuthState(state))
  const { t } = useTranslation('collections')

  return (
    <>
      <Head>
        <title>NFT collections</title>
        <meta property="og:title" content="NFT collections" />
        <meta name="twitter:title" content="NFT collections" />
      </Head>
      <Container>
        <PageContent title="Collections">
          {(isLoggedIn || (!isBrowser() && isUserLoggedIn)) &&
          !wallet.wrongNetwork &&
          wallet.address ? (
            <Container>
              <CollectionList t={t} />
            </Container>
          ) : (
            <GuestContainer>
              <Body1>
                <ErrorOutlineIcon color="error" />
                {wallet.wrongNetwork ? t('wrongNetworkWarning') : t('connectWallet')}
              </Body1>
            </GuestContainer>
          )}
        </PageContent>
      </Container>
    </>
  )
}

Collections.prototypes = {
  isLoggedIn: PropTypes.bool,
}

export default Collections
