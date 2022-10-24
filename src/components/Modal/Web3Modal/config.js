import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

const POLLING_INTERVAL = 12000

const polygonUrl = `https://rpc.ankr.com/polygon/0xd387098b3ca4c6d592be0ce0b69e83be86011c50`
const mumbaiUrl = `https://rpc.ankr.com/polygon_mumbai/0xd387098b3ca4c6d592be0ce0b69e83be86011c50`

const environment = process.env.NEXT_PUBLIC_ENV || 'dev'

export const supportedNetworkIds = environment === 'production' ? [137] : [80001]

export const rpcUrl = environment === 'production' ? { 137: polygonUrl } : { 80001: mumbaiUrl }

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

export const mainnetUrl = 'https://polygonscan.com'
export const testNetUrl = 'https://mumbai.polygonscan.com'

export const mainnetInstructions = [
  {
    label: 'networkName',
    title: 'Polygon - Mainnet',
    textToCopy: 'Polygon - Mainnet',
  },
  {
    label: 'newRpcUrl',
    title: 'https://polygon-rpc.com/',
    textToCopy: 'https://polygon-rpc.com/',
  },
  {
    label: 'chainId',
    title: '137',
    textToCopy: '137',
  },
  {
    label: 'symbol',
    title: 'MATIC',
    textToCopy: 'MATIC',
  },
  {
    label: 'blockExplorerUrl',
    title: 'https://polygonscan.com/',
    textToCopy: 'https://polygonscan.com/',
  },
]

export const testnetInstructions = [
  {
    label: 'networkName',
    title: 'Mumbai - Testnet',
    textToCopy: 'Mumbai - Testnet',
  },
  {
    label: 'newRpcUrl',
    title: 'https://rpc-mumbai.matic.today',
    textToCopy: 'https://rpc-mumbai.matic.today',
  },
  {
    label: 'chainId',
    title: '80001',
    textToCopy: '80001',
  },
  {
    label: 'symbol',
    title: 'MATIC',
    textToCopy: 'MATIC',
  },
  {
    label: 'blockExplorerUrl',
    title: 'https://mumbai.polygonscan.com',
    textToCopy: 'https://mumbai.polygonscan.com',
  },
]
