import { useEffect, useState } from 'react'
import Web3Modal from 'web3modal'
// import WalletConnectProvider from '@walletconnect/web3-provider'
import { providers } from 'ethers'
import PropTypes from 'prop-types'
import useTranslation from 'next-translate/useTranslation'
import Image from 'next/image'
import toNumber from 'lodash/toNumber'
import toLower from 'lodash/toLower'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import isUndefined from 'lodash/isUndefined'
import { useDispatch } from 'react-redux'
import { setCookie, parseCookies } from 'nookies'

import { ContainedPrimaryButton, OutlinedSecondaryButton } from 'components/Inputs/buttons'
import ModalHoc from '../ModalHoc'
import { isBrowser } from 'lib/util/window'
import usePostRequest from 'hooks/UsePostRequest'
import useQueryRequest from 'hooks/UseQueryRequest'
import GET_NONCE_BY_WALLET from 'state/auth/queries/getNonceByWallet'
import AUTH_BY_WALLET from 'state/auth/queries/authByWallet'
import { handleWalletAuthSuccess } from 'state/auth'
import { modalStyles, ModalContainer, ErrorWrapper, BNBWrapper } from './styles'
import Feedback from 'components/FeedbackCards/Feedback'
import WrongNetworkModal from './WrongNetworkModal'

// network name is required for the
const NETWORK_NAME = 'binance'

// Web3Modal also supports many other wallets.
// You can see other options at https://github.com/Web3Modal/web3modal
const web3Modal =
  isBrowser() &&
  new Web3Modal({
    network: NETWORK_NAME,
    cacheProvider: true,
    providerOptions: {
      injected: {
        package: null,
        options: {
          rpc: {
            // we're using the JSON-RPC option to connect to the BSC
            56: 'https://bsc-dataseed.binance.org/',
          },
          network: NETWORK_NAME,
          chainId: 56, // chainId 56 is for binance smart chain. ChainId 97 is for testnet BSC
        },
      },
    },
  })

const Web3ModalComponent = ({ provider, setProvider, setWallet, disconnected, wallet }) => {
  // hooks
  const { t } = useTranslation('common')
  const dispatch = useDispatch()
  const classes = modalStyles()
  // local state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isWrongNetworkModalOpen, setIsWrongNetworkModalOpen] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isMetaMaskAvailable, setIsMetaMaskAvailable] = useState(false)
  const [signer, setSigner] = useState(false)
  const [isErrorOccurred, setIsErrorOccurred] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  // this will be used to keep or discard the wallet address during the sign process
  const [walletTemp, setWalletTemp] = useState(null)
  const [isSigning, setIsSigning] = useState(false)

  const {
    data,
    isError,
    remove,
    // error,
    refetch: getNonceByWallet,
  } = useQueryRequest(
    ['GET_NONCE_BY_WALLET'],
    { data: { wallet: toLower(walletTemp) } },
    GET_NONCE_BY_WALLET,
    {
      enabled: false,
      retry: false,
    }
  )

  const { mutationRes } = usePostRequest(
    'AUTH_BY_WALLET', // key
    AUTH_BY_WALLET, // mutation
    { retry: 0 }, // parameters
    false // logOutOnAuthError
  )

  const handleReset = () => {
    setIsModalOpen(false)
    setIsConnecting(false)
    setWalletTemp(null)
  }

  const loadWeb3Modal = async () => {
    setIsConnecting(true)
    let web3Provider
    try {
      web3Provider = await web3Modal.connect()
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
      handleReset()
      web3Modal.clearCachedProvider()
    }
    try {
      // await web3Provider.request({ method: 'eth_requestAccounts' })
      // Generate ethers provider
      const { at: token } = parseCookies()
      const provider = new providers.Web3Provider(web3Provider)
      setProvider(provider)
      if (!isEmpty(token)) {
        // Collect address
        const signer = provider.getSigner()
        setSigner(signer)
        const address = await signer.getAddress()
        const network = await provider.getNetwork()
        if (testValidNetwork(network.chainId)) {
          setWallet({ address: toLower(address), wrongNetwork: false })
          setIsWrongNetworkModalOpen(false)
        } else {
          setWallet({ address: address, wrongNetwork: true })
          setIsWrongNetworkModalOpen(true)
        }
        handleReset()
      } else {
        const signer = provider.getSigner()
        setSigner(signer)
        const address = await signer.getAddress()
        setWalletTemp(address)
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log({ error })
      handleReset()
    }
  }

  const handleSignature = async () => {
    try {
      const message = `MarsVerse.io will use this cryptographic signature for verifying that you are the owner of current Ethereum address ${get(
        data,
        'getNonceByWallet.nonce',
        ''
      )}`
      remove() // to remove the query from the cache
      const signature = await signer.signMessage(message)
      setIsSigning(false)
      handleSignatureSubmit(signature)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
      handleReset()
      setIsSigning(false)
      setErrorMessage('Please click the Sign in the MetaMask')
      setIsErrorOccurred(true)
      web3Modal.clearCachedProvider()
    }
  }

  useEffect(() => {
    if (walletTemp) {
      const { at: token } = parseCookies()
      // we need to check the tokens in cookie
      // if those are empty, then we can run the nonce and get the wallet to signup
      if (isEmpty(token)) getNonceByWallet()
    }
  }, [walletTemp])

  useEffect(() => {
    if (!isEmpty(data)) {
      // if error returned from the api, we need to close the modal
      if (isError) {
        setIsErrorOccurred(true)
        handleReset()
      }
      if (
        get(data, 'getNonceByWallet.nonce', false) &&
        isConnecting &&
        !isErrorOccurred &&
        !isSigning
      ) {
        setIsSigning(true)
        handleSignature()
      }
      if (isErrorOccurred && isSigning) {
        setIsModalOpen(false)
        setIsConnecting(false)
      }
    }
  }, [data])

  const handleWalletConnect = async () => {
    try {
      if (provider) {
        const signer = provider.getSigner()
        setSigner(signer)
        const address = await signer.getAddress()
        const network = await provider.getNetwork()
        if (testValidNetwork(network.chainId)) {
          setWallet({ address: toLower(address), wrongNetwork: false })
          setIsWrongNetworkModalOpen(false)
        } else {
          setWallet({ address: address, wrongNetwork: true })
          setIsWrongNetworkModalOpen(true)
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log({ error })
      setIsConnecting(false)
      setWalletTemp(null)
    }
  }

  useEffect(() => {
    if (disconnected) {
      setProvider(null)
      setSigner(null)
      setWalletTemp(null)
      web3Modal.clearCachedProvider()
    }
  }, [disconnected])

  useEffect(() => {
    if (!provider) {
      // window.ethereum is the new API to check if web3 is available in the browser
      // window.web3 is the legacy api and some wallet might be running on the older version
      // window.web3.currentProvider.isMetaMask || window.ethereum.isMetaMask could be injected by
      // non-metamask wallet, but we only have this method to check if meta mask is available or not.
      if (!isUndefined(window.ethereum) || !isUndefined(window.web3)) {
        if (window.ethereum.isMetaMask || window.web3.currentProvider.isMetaMask)
          setIsMetaMaskAvailable(true)
      }
    }
  }, [])
  // chainId 56 is for binance smart chain. ChainId 1 for Etherscan
  // const testValidNetwork = chain => chain === 56
  const testValidNetwork = chain => chain === 97

  const handleSignatureSubmit = async signature => {
    const payload = {
      data: {
        // payload
        signature,
        wallet: toLower(walletTemp),
      },
    }
    mutationRes.mutate(payload, {
      onSuccess: data => {
        handleWalletConnect()
        const response = get(data, 'authByWallet', {})
        dispatch(handleWalletAuthSuccess(response))
        const cookieData = {
          accessToken: get(response, 'accessToken', ''),
          refreshToken: get(response, 'refreshToken', ''),
        }
        setCookie(null, 'at', JSON.stringify(cookieData), {
          // at = accessToken
          path: '/',
          maxAge: 604800, // Expires after 7 days
          sameSite: true,
        })
        handleReset()
        // This will reset the mutation state to its initial state
        mutationRes.reset()
      },
      onError: err => {
        // eslint-disable-next-line no-console
        console.log({ err })
        handleReset()
        setIsErrorOccurred(true)
        mutationRes.reset()
      },
    })
  }

  const handleNetworkChange = networkId => {
    const isValidNetwork = testValidNetwork(toNumber(networkId))
    if (!isValidNetwork) {
      setWallet({ wrongNetwork: true })
      setIsWrongNetworkModalOpen(true)
    } else {
      setWallet({ wrongNetwork: false })
      setIsWrongNetworkModalOpen(false)
    }
  }
  useEffect(() => {
    const { ethereum } = window
    if (provider) {
      ethereum.on('networkChanged', handleNetworkChange)
      // eslint-disable-next-line no-console
      ethereum.on('accountsChanged', accounts => console.log('accountsChanged', accounts))

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('networkChanged', () =>
            // eslint-disable-next-line no-console
            console.log('network event removed', ethereum)
          )
          ethereum.removeListener('accountsChanged', () =>
            // eslint-disable-next-line no-console
            console.log('Accounts Event removed', ethereum)
          )
        }
      }
    }
  }, [provider, wallet])

  // below commented code is a experimental feature
  useEffect(() => {
    const { at: token } = parseCookies()
    if (web3Modal.cachedProvider && !isEmpty(token)) {
      loadWeb3Modal()
    }
    if (isEmpty(token)) web3Modal.clearCachedProvider()
  }, [])

  return (
    <>
      {isErrorOccurred ? (
        <Feedback
          type="error"
          message={errorMessage || t('walletAuthErrorOccurred')}
          onClose={() => {
            setIsErrorOccurred(false)
            setErrorMessage(null)
          }}
          open={isErrorOccurred}
        />
      ) : null}
      <BNBWrapper>
        <Image alt="BNB-logo" src="/images/bnb-logo.svg" width="20px" height="20px" />
        <span>{t('PolygonMainnet')}</span>
      </BNBWrapper>
      {wallet.wrongNetwork ? (
        <ErrorWrapper>
          <ContainedPrimaryButton onClick={() => setIsWrongNetworkModalOpen(true)}>
            {t('wrongNetwork')}
          </ContainedPrimaryButton>
        </ErrorWrapper>
      ) : null}
      {wallet.address ? null : (
        <ContainedPrimaryButton onClick={() => setIsModalOpen(true)}>
          {t('connectWallet')}
        </ContainedPrimaryButton>
      )}
      <ModalHoc
        disableBackdropClick
        classes={classes}
        openModal={isModalOpen}
        onClose={handleReset}
        title={t('connectWallet')}>
        <ModalContainer>
          {!isMetaMaskAvailable ? (
            <OutlinedSecondaryButton
              size="large"
              onClick={() => window.open('https://metamask.io/', '_blank')}>
              <Image alt="meta-mask" src="/images/metamask.svg" width="70px" height="34px" />
              {t('installMetaMask')}
            </OutlinedSecondaryButton>
          ) : (
            <OutlinedSecondaryButton loading={isConnecting} size="large" onClick={loadWeb3Modal}>
              <Image alt="meta-mask" src="/images/metamask.svg" width="70px" height="34px" />
              {t('connectMetaMask')}
            </OutlinedSecondaryButton>
          )}
        </ModalContainer>
        {isWrongNetworkModalOpen ? (
          <WrongNetworkModal
            open={isWrongNetworkModalOpen}
            onClose={() => setIsWrongNetworkModalOpen(false)}
          />
        ) : null}
      </ModalHoc>
    </>
  )
}

Web3ModalComponent.propTypes = {
  provider: PropTypes.object,
  wallet: PropTypes.object,
  setWallet: PropTypes.func,
  setProvider: PropTypes.func,
  disconnected: PropTypes.bool,
}

export default Web3ModalComponent
