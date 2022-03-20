import Web3 from 'web3'
import {
  nftABI,
  nftAddress,
  purchaseABI,
  purchaseAddress,
} from './contractConstants'

export const createOffer = async (library, price, kind, nfts, walletAddress) => {
  const web3 = new Web3(library.provider)

  const purchaseContract = new web3.eth.Contract(purchaseABI, purchaseAddress)
  const nftContract = new web3.eth.Contract(nftABI, nftAddress)
  // eslint-disable-next-line no-console
  price = price * Math.pow(10, 18)
  const priceBN = web3.utils.toBN(price)
  try {
    // eslint-disable-next-line no-console
    console.log('create offer info', nfts, priceBN, kind, walletAddress, library)
    const isApproved = await nftContract.methods
      .isApprovedForAll(walletAddress, purchaseAddress)
      .call()
    if (!isApproved) {
      await nftContract.methods.setApprovalForAll(purchaseAddress, true).send({
        from: walletAddress,
      })
    }
    const tx = await purchaseContract.methods.createOffer(nfts, priceBN, '0', '20', kind).send({
      from: walletAddress,
    })
    if (tx) {
      // eslint-disable-next-line no-console
      console.log('create offer success', tx)
      return tx
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('there is error on create offer', e)
    return false
  }
}

export const updateOffer = async (library, offerId, price, kind, nfts, walletAddress) => {
  const web3 = new Web3(library.provider)

  const purchaseContract = new web3.eth.Contract(purchaseABI, purchaseAddress)
  // eslint-disable-next-line no-console
  price = price * Math.pow(10, 18)
  const priceBN = web3.utils.toBN(price)
  try {
    // eslint-disable-next-line no-console
    const tx = await purchaseContract.methods
      .updateOffer(offerId, priceBN, kind, nfts, '0', '20')
      .send({
        from: walletAddress,
      })
    if (tx) {
      // eslint-disable-next-line no-console
      console.log('create offer success', tx)
      return tx
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('there is error on create offer', e)
    return false
  }
}

export const buyOffer = async (library, offerId, walletAddress) => {
  const web3 = new Web3(library.provider)
  const purchaseContract = new web3.eth.Contract(purchaseABI, purchaseAddress)

  try {
    const tx = await purchaseContract.methods.buyOffer(offerId, []).send({
      from: walletAddress,
    })
    // eslint-disable-next-line no-console
    console.log('buy success', tx)
    return tx
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('buy offer error', e)
    return null
  }
}
