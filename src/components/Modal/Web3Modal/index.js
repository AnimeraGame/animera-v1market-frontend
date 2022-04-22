import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import useTranslation from 'next-translate/useTranslation'
import Image from 'next/image'
import toNumber from 'lodash/toNumber'
import toLower from 'lodash/toLower'
import isEmpty from 'lodash/isEmpty'
import keys from 'lodash/keys'
import includes from 'lodash/includes'
import get from 'lodash/get'
import isUndefined from 'lodash/isUndefined'
import { useDispatch, useSelector } from 'react-redux'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector'
import { utils, providers } from 'ethers'

// local imports
import { ContainedPrimaryButton, OutlinedSecondaryButton } from 'components/Inputs/buttons'
import ModalHoc from '../ModalHoc'
import { isBrowser } from 'lib/util/window'
import usePostRequest from 'hooks/UsePostRequest'
import useQueryRequest from 'hooks/UseQueryRequest'
import GET_NONCE_BY_WALLET from 'state/auth/queries/getNonceByWallet'
import AUTH_BY_WALLET from 'state/auth/queries/authByWallet'
import { handleLogoff, handleWalletAuthSuccess } from 'state/auth'
import { modalStyles, ModalContainer, ErrorWrapper, BNBWrapper } from './styles'
import Feedback from 'components/FeedbackCards/Feedback'
import WrongNetworkModal from './WrongNetworkModal'
import storage from 'lib/util/storage'
import { getAuthState } from 'state/auth/selectors'
import { connectorsByName, supportedNetworkIds } from './config'
import { getMaticBalance, getMarsBalance } from 'lib/util/web3/balance'
import { setBalances, setWallet as handleWalletAction } from 'state/settings'

const Web3ModalComponent = ({ setWallet, disconnected, wallet }) => {
  // hooks
  const { t } = useTranslation('common')
  const dispatch = useDispatch()
  const classes = modalStyles()
  // local state
  const [isNetworkChanging, setIsNetworkChanging] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isWrongNetworkModalOpen, setIsWrongNetworkModalOpen] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectingType, setConnectingType] = useState(null)
  // const [isConnected, setIsConnected] = useState(false)
  const [isMetaMaskAvailable, setIsMetaMaskAvailable] = useState(false)
  const isUserLoggedIn = useSelector(state => getAuthState(state))
  // These two will be used to notify the user about any errors in connection
  const [isErrorOccurred, setIsErrorOccurred] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [isSigning, setIsSigning] = useState(false)
  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState()
  const { connector, library, chainId, account, activate, deactivate, active, error } =
    useWeb3React()

  const {
    data,
    isError,
    remove,
    // error,
    refetch: getNonceByWallet,
  } = useQueryRequest(
    ['GET_NONCE_BY_WALLET'],
    { data: { wallet: toLower(account) } },
    GET_NONCE_BY_WALLET,
    {
      enabled: false,
      retry: false,
      refetchOnWindowFocus: false,
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
    setConnectingType(null)
  }

  const handleError = errorMessage => {
    handleReset()
    setIsSigning(false)
    setErrorMessage(t(errorMessage || 'authorizeWalletAccess'))
    setIsErrorOccurred(true)
    deactivate()
    handleWalletConnectDisconnect()
    connector?.handleClose?.()
  }

  const handleSignature = async () => {
    try {
      const message = `Marsverse will use this cryptographic signature for verifying that you are the owner of current Ethereum address ${get(
        data,
        'getNonceByWallet.nonce',
        ''
      )}`
      remove() // to remove the query from the cache
      const signer = library.getSigner(account)
      const signature = await signMessageAsync(signer, account, message)
      if (signature) {
        setIsSigning(false)
        handleSignatureSubmit(signature)
      } else handleError()
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
      handleError()
    }
  }

  const getBalanceOfWallet = async (library, address) => {
    const maticBalance = await getMaticBalance(library, address)
    const marsBalance = await getMarsBalance(library, address)
    return { maticBalance, marsBalance }
  }

  const signMessageAsync = async (signer, address, message) => {
    const messageBytes = utils.toUtf8Bytes(message)
    if (signer instanceof providers.JsonRpcSigner) {
      try {
        const signature = await signer.provider.send('personal_sign', [
          utils.hexlify(messageBytes),
          toLower(address),
        ])
        return signature
      } catch (e) {
        if (includes(e?.message, 'personal_sign')) {
          return await signer.signMessage(messageBytes)
        }
        // eslint-disable-next-line no-console
        console.log('Wallet error', e)
        handleError()
      }
    } else {
      return await signer.signMessage(messageBytes)
    }
  }

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])

  useEffect(() => {
    if (account && active) {
      const { at: token } = parseCookies()
      // we need to check the tokens in cookie
      // if those are empty, then we can run the nonce and get the wallet to signup
      if (isEmpty(token) && isConnecting) getNonceByWallet()
      if (isEmpty(wallet.address) && !isEmpty(token)) handleWalletConnect()
    }
  }, [account, active])

  const handleErrorWC = e => {
    try {
      const message = includes(supportedNetworkIds, 97)
        ? 'WrongNetworkWalletConnectTestnet'
        : 'WrongNetworkWalletConnect'
      handleError(message)
    } catch (error) {
      handleError('SomeWrongWalletConnect')
      // eslint-disable-next-line no-console
      console.log(e, error)
    }
  }

  useEffect(() => {
    window.addEventListener('error', event => {
      handleErrorWC(event)
    })

    window.addEventListener('unhandledrejection', event => {
      handleErrorWC(event)
    })
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      const handleForcedLogout = () => {
        destroyCookie(null, 'at', { path: '/' })
        dispatch(handleWalletAction({ address: null, wrongNetwork: null }))
        dispatch(setBalances(0, 0))
        dispatch(handleLogoff())
        storage.clearStorage()
        removeWeb3Listeners()
        setErrorMessage(t('walletConnectionLost'))
        setIsErrorOccurred(true)
      }
      if (wallet?.address && !wallet.wrongNetwork && !account && !active) {
        handleForcedLogout()
      }
      if (
        !isEmpty(wallet.address) &&
        !isEmpty(account) &&
        toLower(wallet.address) !== toLower(account)
      ) {
        handleForcedLogout()
      }
    }, 500)
    return () => clearTimeout(timeout)
  }, [account, active, wallet])

  useEffect(() => {
    console.log('web3 error', error)
    if (error) {
      if (error instanceof NoEthereumProviderError) {
        handleReset()
        setErrorMessage(t('noExtensionDetected'))
        setIsErrorOccurred(true)
      } else if (error instanceof UnsupportedChainIdError) {
        setWallet({ address: '', wrongNetwork: true })
        setIsWrongNetworkModalOpen(true)
        handleReset()
      } else if (
        error instanceof UserRejectedRequestErrorInjected ||
        error instanceof UserRejectedRequestErrorWalletConnect
      ) {
        // eslint-disable-next-line no-console
        console.log(t('authorizeWalletAccess'), error)
        setErrorMessage(t('authorizeWalletAccess'))
        setIsErrorOccurred(true)
        handleReset()
        if (
          connector instanceof WalletConnectConnector &&
          connector.walletConnectProvider?.wc?.uri
        ) {
          connector.walletConnectProvider = undefined
        }
      } else {
        // eslint-disable-next-line no-console
        console.error(t('unKnownError'), error)
      }
    }
  }, [active, error])

  useEffect(() => {
    if (isError) {
      setIsErrorOccurred(true)
      handleReset()
      deactivate()
      handleWalletConnectDisconnect()
      connector?.handleClose?.()
    }
    if (!isEmpty(data)) {
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
        setConnectingType(null)
      }
    }
  }, [data, isError])

  const handleWalletConnect = async () => {
    try {
      if (library && active) {
        if (testValidNetwork(chainId)) {
          console.log('here')
          setWallet({ address: toLower(account), wrongNetwork: false })
          const { maticBalance, marsBalance } = await getBalanceOfWallet(library, account)
          dispatch(setBalances(maticBalance, marsBalance))
          setIsWrongNetworkModalOpen(false)
        } else {
          setWallet({ address: account, wrongNetwork: true, balance: null })
          setIsWrongNetworkModalOpen(true)
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
      handleReset()
      deactivate()
      handleWalletConnectDisconnect()
      connector?.handleClose?.()
    }
  }
  const handleWalletConnectDisconnect = () => {
    if (window.localStorage.getItem('walletconnect')) {
      connectorsByName?.WalletConnect?.close()
      connectorsByName.WalletConnect.walletConnectProvider = null
    }
  }

  const removeWeb3Listeners = () => {
    const { ethereum } = window
    if (ethereum?.removeListener) {
      // console.log('removeWeb3Listeners ', { ethereum })
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

  const checkMetaMaskAvailability = () => {
    if (!isUndefined(window.ethereum) || !isUndefined(window.web3)) {
      if (window.ethereum.isMetaMask || window.web3.currentProvider.isMetaMask)
        setIsMetaMaskAvailable(true)
    }
  }

  useEffect(() => {
    if (disconnected) {
      handleReset()
      deactivate()
      handleWalletConnectDisconnect()
      connector?.handleClose?.()
      storage.clearStorage()
      removeWeb3Listeners()
    }
  }, [disconnected])

  useEffect(() => {
    if (isEmpty(library)) {
      // window.ethereum is the new API to check if web3 is available in the browser
      // window.web3 is the legacy api and some wallet might be running on the older version
      // window.web3.currentProvider.isMetaMask || window.ethereum.isMetaMask could be injected by
      // non-metamask wallet, but we only have this method to check if meta mask is available or not.
      checkMetaMaskAvailability()
    }
  }, [])

  // chainId 56 is for binance smart chain. ChainId 1 for Etherscan, chainId 97 for testnet bsc
  const testValidNetwork = chain => includes(supportedNetworkIds, chain)

  const handleSignatureSubmit = async signature => {
    const payload = {
      data: {
        // payload
        signature,
        wallet: toLower(account),
      },
    }
    mutationRes.mutate(payload, {
      onSuccess: data => {
        storage.WalletConnector = connectingType === 'walletConnect' ? 'WalletConnect' : 'Injected'
        handleWalletConnect()
        const response = get(data, 'authByWallet', {})
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
        dispatch(handleWalletAuthSuccess(response))
        handleReset()
        // This will reset the mutation state to its initial state
        mutationRes.reset()
      },
      onError: err => {
        // eslint-disable-next-line no-console
        console.log(err)
        handleReset()
        setIsErrorOccurred(true)
        mutationRes.reset()
      },
    })
  }

  useEffect(() => {
    if (isBrowser() && isUserLoggedIn) {
      const id = storage.WalletConnector
      if (id) activate(connectorsByName[id])
    }
    return () => {
      removeWeb3Listeners()
    }
  }, [])

  useEffect(() => {
    const { ethereum } = window
    if ((!isEmpty(library) && active) || (wallet.wrongNetwork && !isNetworkChanging)) {
      const handleNetworkChange = async networkId => {
        if (!isNetworkChanging) {
          setIsNetworkChanging(true)
          const isValidNetwork = testValidNetwork(toNumber(networkId))
          if (!isValidNetwork && !wallet.wrongNetwork) {
            setWallet({ wrongNetwork: true })
            setIsWrongNetworkModalOpen(true)
            setIsNetworkChanging(false)
          }
          if (isValidNetwork && wallet.wrongNetwork) {
            setWallet({ wrongNetwork: false })
            setIsWrongNetworkModalOpen(false)
            try {
              const { maticBalance, marsBalance } = await getBalanceOfWallet(library, account)
              dispatch(setBalances(maticBalance, marsBalance))
            } catch (err) {
              // eslint-disable-next-line no-console
              console.log(err)
            }
            setIsNetworkChanging(false)
          }
        }
      }
      ethereum?.on('networkChanged', handleNetworkChange)
      // eslint-disable-next-line no-console
      ethereum?.on('accountsChanged', accounts => console.log('accountsChanged', accounts))
    }
  }, [library, wallet])

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
          closedAfter={20000}
        />
      ) : null}
      <BNBWrapper className="network">
        <Image alt="Polygon-logo" src="/images/polygon-logo.svg" width={20} height={20} />
        <span>{includes(supportedNetworkIds, 97) ? t('mumbaiTestnet') : t('polygonMainnet')}</span>
      </BNBWrapper>
      {wallet.wrongNetwork ? (
        <ErrorWrapper>
          <ContainedPrimaryButton onClick={() => setIsWrongNetworkModalOpen(true)}>
            {t('wrongNetwork')}
          </ContainedPrimaryButton>
        </ErrorWrapper>
      ) : null}
      {wallet.address || isUserLoggedIn || wallet.wrongNetwork ? null : (
        <ContainedPrimaryButton
          onClick={() => {
            destroyCookie(null, 'at', { path: '/' })
            localStorage.removeItem('persist:root')
            storage.clearStorage()
            setIsModalOpen(true)
            if (!isMetaMaskAvailable) checkMetaMaskAvailability()
            if (active) {
              deactivate()
              handleWalletConnectDisconnect()
              connector?.handleClose?.()
            }
          }}>
          {t('connectWallet')}
        </ContainedPrimaryButton>
      )}
      <ModalHoc
        disableBackdropClick
        classes={classes}
        openModal={isModalOpen}
        onClose={handleReset}
        title={t('connectWallet')}>
        <ModalContainer isConnecting={isConnecting}>
          {keys(connectorsByName).map((name, idx) => {
            const currentConnector = connectorsByName[name]
            return name === 'Injected' ? (
              !isMetaMaskAvailable ? (
                <OutlinedSecondaryButton
                  size="large"
                  key={idx}
                  disabled={isConnecting}
                  onClick={() => window.open('https://metamask.io/', '_blank')}>
                  <Image alt="meta-mask" src="/images/metamask.svg" width={70} height={34} />
                  {t('installMetaMask')}
                </OutlinedSecondaryButton>
              ) : (
                <OutlinedSecondaryButton
                  loading={isConnecting && connectingType === 'metamask'}
                  disabled={isConnecting}
                  size="large"
                  key={idx}
                  onClick={() => {
                    setConnectingType('metamask')
                    setIsConnecting(true)
                    setActivatingConnector(currentConnector)
                    activate(connectorsByName[name], undefined, false)
                  }}>
                  <Image alt="MetaMask Logo" src="/images/metamask.svg" width={70} height={34} />
                  {t('connectMetaMask')}
                </OutlinedSecondaryButton>
              )
            ) : name === 'TrustWallet' ? (
              <OutlinedSecondaryButton
                loading={isConnecting && connectingType === 'trustWallet'}
                disabled={isConnecting}
                size="large"
                key={idx}
                onClick={() => {
                  setConnectingType('trustWallet')
                  setIsConnecting(true)
                  setActivatingConnector(currentConnector)
                  activate(connectorsByName[name])
                }}>
                <Image
                  alt="trust wallet logo"
                  src="/images/trust-wallet.png"
                  width={36}
                  height={36}
                />
                <span style={{ paddingLeft: 8 }}>{t('trustWallet')}</span>
              </OutlinedSecondaryButton>
            ) : (
              <OutlinedSecondaryButton
                loading={isConnecting && connectingType === 'walletConnect'}
                disabled={isConnecting}
                size="large"
                key={idx}
                onClick={() => {
                  setConnectingType('walletConnect')
                  setIsConnecting(true)
                  setActivatingConnector(currentConnector)
                  activate(connectorsByName[name], undefined, false)
                }}>
                <Image
                  alt="wallet connect logo"
                  src="/images/wallet-connect.svg"
                  width={60}
                  height={30}
                />
                {t('connectWalletConnect')}
              </OutlinedSecondaryButton>
            )
          })}
        </ModalContainer>
        {isWrongNetworkModalOpen ? (
          <WrongNetworkModal
            open={isWrongNetworkModalOpen}
            onClose={() => setIsWrongNetworkModalOpen(false)}
            isMetaMaskAvailable={isMetaMaskAvailable}
          />
        ) : null}
      </ModalHoc>
    </>
  )
}

Web3ModalComponent.propTypes = {
  wallet: PropTypes.object,
  setWallet: PropTypes.func,
  disconnected: PropTypes.bool,
}

export default Web3ModalComponent
