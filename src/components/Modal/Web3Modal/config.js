import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

const POLLING_INTERVAL = 12000

const bscUrl = `https://data-seed-prebsc-1-s1.binance.org:8545/`
const bscUrlMainnet = `https://bsc-dataseed.binance.org/`

const environment = process.env.NEXT_PUBLIC_ENV || 'dev'

export const supportedNetworkIds = environment === 'production' ? [56] : [97]

export const rpcUrl = environment === 'production' ? { 56: bscUrlMainnet } : { 97: bscUrl }

export const injected = new InjectedConnector({ supportedChainIds: supportedNetworkIds })

export const walletConnect = new WalletConnectConnector({
  rpc: rpcUrl,
  chainId: supportedNetworkIds[0],
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
})

export const connectorsByName = {
  Injected: injected,
  TrustWallet: injected,
  WalletConnect: walletConnect,
}

// export const connectorsByName = {
//   Injected: injected,
// }

export const mainnetUrl = 'https://bscscan.com'
export const testNetUrl = 'https://testnet.bscscan.com'

export const mainnetInstructions = [
  {
    label: 'networkName',
    title: 'BNB - Mainnet',
    textToCopy: 'BNB - Mainnet',
  },
  {
    label: 'newRpcUrl',
    title: 'https://bsc-dataseed.binance.org/',
    textToCopy: 'https://bsc-dataseed.binance.org/',
  },
  {
    label: 'chainId',
    title: '56',
    textToCopy: '56',
  },
  {
    label: 'symbol',
    title: 'BNB',
    textToCopy: 'BNB',
  },
  {
    label: 'blockExplorerUrl',
    title: 'https://bscscan.com/',
    textToCopy: 'https://bscscan.com/',
  },
]

export const testnetInstructions = [
  {
    label: 'networkName',
    title: 'BNB - Testnet',
    textToCopy: 'BNB - Testnet',
  },
  {
    label: 'newRpcUrl',
    title: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    textToCopy: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
  },
  {
    label: 'chainId',
    title: '97',
    textToCopy: '97',
  },
  {
    label: 'symbol',
    title: 'BNB',
    textToCopy: 'BNB',
  },
  {
    label: 'blockExplorerUrl',
    title: 'https://testnet.bscscan.com',
    textToCopy: 'https://testnet.bscscan.com',
  },
]
