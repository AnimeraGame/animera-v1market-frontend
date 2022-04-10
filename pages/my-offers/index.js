import styled from 'styled-components'
import Head from 'next/head'
import { useSelector } from 'react-redux'
import useTranslation from 'next-translate/useTranslation'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'

// local imports
import MyOffersWrapper from 'pageComponents/myOffers'
import PageContent from 'containers/PageContent'
import { getAuthState } from 'state/auth/selectors'
import { getWallet } from 'state/settings/selectors'
import { Body1 } from 'components/Typography'

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 92px);
  min-height: 500px;
`

const GuestContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  max-width: 750px;
  ${props => props.theme.breakpoints.down('xs')} {
    padding: 16px;
  }
  p {
    display: flex;
    align-items: center;
  }
  svg {
    margin-right: 12px;
    font-size: 50px;
  }
`

const Offers = () => {
  const { t } = useTranslation('my-offers')
  const wallet = useSelector(state => getWallet(state))
  const isLoggedIn = useSelector(state => getAuthState(state))
  return (
    <>
      <Head>
        <title>My Offers</title>
        <meta name="description" content="NFT marketplace to buy/sell amazing NFTs" />
        <meta property="og:title" content="NFT Marketplace" />
        <meta property="og:description" content="NFT marketplace to buy/sell amazing NFTs" />
        <meta name="twitter:title" content="NFT Marketplace" />
        <meta name="twitter:description" content="NFT marketplace to buy/sell amazing NFTs" />
      </Head>
      {isLoggedIn && !wallet.wrongNetwork && wallet.address ? (
        <PageContent>
          <Container>
            <MyOffersWrapper t={t} />
          </Container>
        </PageContent>
      ) : (
        <PageContent title={t('myOffers')}>
          <GuestContainer>
            <Body1>
              <ErrorOutlineIcon color="error" />
              {wallet.wrongNetwork ? t('wrongNetworkWarning') : t('connectWalletMarketplace')}
            </Body1>
          </GuestContainer>
        </PageContent>
      )}
    </>
  )
}

export default Offers
