import { providers } from 'ethers'
import { InjectedConnector } from '@web3-react/injected-connector'

export const getLibrary = (provider, connector) => {
  const library = new providers.Web3Provider(provider)
  return library
}

export const injected = new InjectedConnector({
  supportedChainIds: [5, 1],
})
