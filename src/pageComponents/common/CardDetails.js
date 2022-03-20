import React from 'react'
import get from 'lodash/get'
import PropTypes from 'prop-types'
import isString from 'lodash/isString'
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
  const isNumeric = str => {
    if (!isString(str)) return false // we only process strings!
    return (
      !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
      !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
    )
  }

  const transactionRecord = get(nftData, 'info.transactions[0]', {})
  const metadata = get(nftData, 'info.nftMetadata.metadata', {})
  const contractAddress = get(transactionRecord, 'contractAddress', '')
  const transactionAddress = get(transactionRecord, 'transactionHash', '')
  const chain = toUpper(get(transactionRecord, 'chain', ''))

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
              <span>{get(transactionRecord, 'tokenId', '')}</span>
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
                              ? `https://testnet.bscscan.com/address/${contractAddress}`
                              : `https://bscscan.com/address/${contractAddress}`
                          }
                          target="_blank"
                          rel="noopener">
                          {t('view')}
                        </Link>
                        <span>
                          {`${
                            includes(toLower(chain), 'testnet')
                              ? ` ${t('onTestNet')}`
                              : ` ${t('onBscScan')}`
                          }`}
                        </span>
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
                get(transactionRecord, 'toWalletContract', 'n/a')
              )}
            </Body1>
          </Row>
          <Row>
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
                              ? `https://testnet.bscscan.com/tx/${transactionAddress}`
                              : `https://bscscan.com/tx/${transactionAddress}`
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
          </Row>
          <Row>
            <Body1>{t('blockchain')}</Body1>
            <Body1>{`Binance Smart Chain (${
              includes(toLower(chain), 'testnet') ? 'BSC Testnet)' : 'BSC)'
            }`}</Body1>
          </Row>
          <Row>
            <Body1>{t('series')}</Body1>
            <Body1>{get(metadata, 'series', 'Norse Gods Genesis 01')}</Body1>
          </Row>
          <Row>
            <Body1>{t('rarity')}</Body1>
            <Body1>{get(metadata, 'rarity', 'N/A')}</Body1>
          </Row>
          <Row>
            <Body1>{t('description')}</Body1>
            <Body1>{get(metadata, 'description', '')}</Body1>
          </Row>
          {isNumeric(get(metadata, 'attributes.card_type', '')) ? (
            <>
              {/* {get(details, 'attributes.Eyes', false) ? (
                <Row>
                  <Body1>Eyes</Body1>
                  <Body1>{get(details, 'attributes.Eyes', 'none')}</Body1>
                </Row>
              ) : null} */}
              {get(metadata, 'attributes.card_type', false) ? (
                <Row>
                  <Body1>{t('face')}</Body1>
                  <Body1>{get(metadata, 'attributes.card_type', 'none')}</Body1>
                </Row>
              ) : null}
              {/* {get(details, 'attributes.Hat', false) ? (
                <Row>
                  <Body1>Hat</Body1>
                  <Body1>{get(details, 'attributes.Hat', 'none')}</Body1>
                </Row>
              ) : null} */}
              {get(metadata, 'attributes.Suit', false) ? (
                <Row>
                  <Body1>{t('suit')}</Body1>
                  <Body1>{get(metadata, 'attributes.Suit', 'none')}</Body1>
                </Row>
              ) : null}
              {/* {get(details, 'attributes.Skin', false) ? (
                <Row>
                  <Body1>Skin</Body1>
                  <Body1>{get(details, 'attributes.Skin', 'none')}</Body1>
                </Row>
              ) : null} */}
              {/* {get(details, 'attributes.Weapon', false) ? (
                <Row>
                  <Body1>Weapon</Body1>
                  <Body1>{get(details, 'attributes.Weapon', 'none')}</Body1>
                </Row>
              ) : null}
              {get(details, 'attributes.Bonus', false) ? (
                <Row>
                  <Body1>Bonus</Body1>
                  <Body1>{get(details, 'attributes.Bonus', '') || 'none'}</Body1>
                </Row>
              ) : null} */}
            </>
          ) : (
            <>
              {/* <Row>
                <Body1>Eyes</Body1>
                <Body1>{get(details, 'attributes.Eyes', 'none')}</Body1>
              </Row> */}
              <Row>
                <Body1>{t('face')}</Body1>
                <Body1>{get(metadata, 'attributes.card_type', 'none')}</Body1>
              </Row>
              {/* <Row>
                <Body1>Hat</Body1>
                <Body1>{get(details, 'attributes.Hat', 'none')}</Body1>
              </Row> */}
              <Row>
                <Body1>{t('suit')}</Body1>
                <Body1>{get(metadata, 'attributes.Suit', 'none')}</Body1>
              </Row>
              {/* <Row>
                <Body1>Skin</Body1>
                <Body1>{get(details, 'attributes.Skin', 'none')}</Body1>
              </Row>
              <Row>
                <Body1>Weapon</Body1>
                <Body1>{get(details, 'attributes.Weapon', 'none')}</Body1>
              </Row>
              <Row>
                <Body1>Bonus</Body1>
                <Body1>{get(details, 'attributes.Bonus', '') || 'none'}</Body1>
              </Row> */}
            </>
          )}
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
