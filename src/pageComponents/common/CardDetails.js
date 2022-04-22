import get from 'lodash/get'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import toUpper from 'lodash/toUpper'
import toLower from 'lodash/toLower'
import includes from 'lodash/includes'
import styled from 'styled-components'
import { Link } from '@material-ui/core'
// import { useRouter } from 'next/router'
import CircularProgress from '@material-ui/core/CircularProgress'

import { H4, Body1 } from 'components/Typography'
import theme from 'components/Theme'
import { extractFirstLastChars } from 'lib/util/stringUtil'
import { nftAddress } from 'lib/util/web3/contractConstants'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 1 50%;
  overflow: hidden;
  color: ${theme.colors.n10};
  margin-top: 20px;
  ${props => props.theme.breakpoints.down('sm')} {
    padding: 0px 16px 16px;
  }
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 900px;
  margin: 0px 0px 20px;
  flex: 1 1 50%;
  overflow: hidden;
`

const Heading = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 900px;
  width: 100%;
  margin: 20px 0px 8px;
  ${props => props.theme.breakpoints.down('xs')} {
    flex-direction: column;
    padding: 0px 12px;
  }
`

const Row = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  padding: 8px 0px;
  width: 100%;
  box-sizing: border-box;
  p,
  .link-wrapper {
    width: 50%;
  }
  ${props => props.theme.breakpoints.down('xs')} {
    flex-direction: column;
    align-items: center;
    p,
    .link-wrapper {
      width: 95%;
      text-align: center;
      word-break: break-word;
    }
  }
  .link {
    margin-left: 4px;
  }
`

const CardDetails = ({ nftData, nftDataLoading, nftError, t }) => {
  // const router = useRouter()

  const transactionRecord = get(nftData, 'info.transactions[0]', {})
  const metadata = get(nftData, 'info.nft.nftMetadata.metadata', {})
  const contractAddress = get(transactionRecord, 'contractAddress', nftAddress)
  const chain = toUpper(get(transactionRecord, 'chain', 'testnet'))

  return (
    <Container>
      {isEmpty(nftData) ? (
        <Wrapper>
          <H4>{t('noNFTDetailsFound')}</H4>
        </Wrapper>
      ) : (
        <Wrapper>
          {/* <button onClick={getHistory}>Get History</button> */}
          <Heading>
            <H4>{t('nftDetails')}</H4>
          </Heading>
          <Row>
            <Body1>{t('tokenId')}</Body1>
            <Body1>
              <span>{get(nftData, 'info.nft.tokenId', '')}</span>
            </Body1>
          </Row>
          <Row>
            <Body1>{t('contract')}</Body1>
            <Body1 component="div" className="link-wrapper">
              {nftError ? (
                t('contractNotFound')
              ) : nftDataLoading ? (
                <CircularProgress size={16} />
              ) : (
                <>
                  {contractAddress.length ? (
                    <>
                      <span>{extractFirstLastChars(contractAddress, 4, 4)}</span>
                      <span className="link">
                        (
                        <Link
                          href={
                            includes(toLower(chain), 'testnet')
                              ? `https://mumbai.polygonscan.com/address/${contractAddress}`
                              : `https://polygonscan.com/address/${contractAddress}`
                          }
                          target="_blank"
                          rel="noopener">
                          {t('view')}
                        </Link>
                        <span>{t('onTestNet')}</span>
                      </span>
                    </>
                  ) : (
                    'n/a'
                  )}
                </>
              )}
            </Body1>
          </Row>
          <Row>
            <Body1>{t('ownerAddress')}</Body1>
            <Body1 component="div" className="link-wrapper">
              {nftError ? (
                t('noOwnerAddressFound')
              ) : nftDataLoading ? (
                <CircularProgress size={16} />
              ) : (
                get(nftData, 'info.seller', 'n/a')
              )}
            </Body1>
          </Row>
          {/* <Row>
            <Body1>{t('transaction')}</Body1>
            <Body1 component="div" className="link-wrapper">
              {nftError ? (
                t('noTransactionAddressFound')
              ) : nftDataLoading ? (
                <CircularProgress size={16} />
              ) : (
                <>
                  {transactionAddress.length ? (
                    <>
                      <span>{extractFirstLastChars(transactionAddress, 4, 4)}</span>
                      <span className="link">
                        (
                        <Link
                          href={
                            includes(toLower(chain), 'testnet')
                              ? `https://mumbai.polygonscan.com/tx/${transactionAddress}`
                              : `https://polygonscan.com/tx/${transactionAddress}`
                          }
                          target="_blank"
                          rel="noopener">
                          {t('view')}
                        </Link>
                        <span>{`${
                          includes(toLower(chain), 'testnet')
                            ? ` ${t('onTestNet')}`
                            : ` ${t('onBscScan')}`
                        }`}</span>
                      </span>
                    </>
                  ) : (
                    'n/a'
                  )}
                </>
              )}
            </Body1>
          </Row> */}
          <Row>
            <Body1>{t('blockchain')}</Body1>
            <Body1>{`Polygon (${
              includes(toLower(chain), 'testnet') ? 'Mumbai Testnet)' : 'Polygon)'
            }`}</Body1>
          </Row>
          <Row>
            <Body1>{t('description')}</Body1>
            <Body1>{get(metadata, 'description', '')}</Body1>
          </Row>
        </Wrapper>
      )}
    </Container>
  )
}

CardDetails.propTypes = {
  nftData: PropTypes.object,
  t: PropTypes.func,
  nftDataLoading: PropTypes.bool,
  nftError: PropTypes.bool,
}

export default CardDetails
