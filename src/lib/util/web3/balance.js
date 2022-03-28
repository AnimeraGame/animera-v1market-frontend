import Web3 from 'web3'
import { tokenABI, tokenAddress } from './contractConstants'

export const getMaticBalance = async (library, walletAddress) => {
  const web3 = new Web3(library.provider)
  const balance = await web3.eth.getBalance(walletAddress)

  return web3.utils.fromWei(balance, 'ether')
}

export const getMarsBalance = async (library, walletAddress) => {
  const web3 = new Web3(library.provider)
  const marsContract = new web3.eth.Contract(tokenABI, tokenAddress)

  const balance = await marsContract.methods.balanceOf(walletAddress).call();

  return web3.utils.fromWei(balance, 'ether');
}