import Web3 from 'web3'

export const getBNBBalance = async (library, walletAddress) => {
  const web3 = new Web3(library.provider)
  const balance = await web3.eth.getBalance(walletAddress)

  return web3.utils.fromWei(balance, 'ether')
}