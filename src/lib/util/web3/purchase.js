import Web3 from 'web3'
import {
  nftABI,
  nftAddress,
  purchaseABI,
  purchaseAddress,
  tokenABI,
  tokenAddress,
} from './contractConstants'
import { getApprovalDigest } from './signature'

const NFT_GALLERY_NAME = 'MarsversMarket'

export const createOrder = async (library, price, quantity, tokenId, walletAddress) => {
  const web3 = new Web3(library.provider)

  const offerPrice = web3.utils.toWei(price.toString(), 'ether')
  const offerDeadline = Math.floor((new Date(Date.now()).valueOf()) / 1000 + 86400 * 7)
  const nftId = tokenId

  try {
    const nftContract = new web3.eth.Contract(nftABI, nftAddress)
    const isApproved = await nftContract.methods
      .isApprovedForAll(walletAddress, purchaseAddress)
      .call()

    if (!isApproved) {
      await nftContract.methods
        .approve(purchaseAddress, nftId)
        .send({ from: walletAddress })
    }

    const purchaseContract = new web3.eth.Contract(purchaseABI, purchaseAddress)

    const estimatedGas = await purchaseContract.methods
      .createOrder(
        nftAddress,
        nftId,
        offerPrice,
        offerDeadline
      )
      .estimateGas({
        from: walletAddress,
      })

    const tx = await purchaseContract.methods
      .createOrder(
        nftAddress,
        nftId,
        offerPrice,
        offerDeadline
      )
      .send({ from: walletAddress, gasLimit: estimatedGas })

    return {
      tokenAddress: tokenAddress,
      sellPrice: offerPrice,
      sellDeadline: offerDeadline,
      walletAddress: walletAddress,
      tx
    }
  } catch (e) {
    console.log('error', e)
    return e
  }
}

export const cancelOrder = async (library, walletAddress, tokenId) => {
  const web3 = new Web3(library.provider)

  try {
    const purchaseContract = new web3.eth.Contract(purchaseABI, purchaseAddress)

    const estimatedGas = await purchaseContract.methods
      .cancelOrder(
        nftAddress,
        tokenId,
      )
      .estimateGas({
        from: walletAddress,
      })

    const tx = await purchaseContract.methods
      .cancelOrder(
        nftAddress,
        tokenId
      )
      .send({ from: walletAddress, gasLimit: estimatedGas })

    return tx
  } catch (e) {
    console.log('error', e)
    return e
  }
}

export const executeOrder = async (library, cardInfo, walletAddress) => {
  const web3 = new Web3(library.provider)

  const offerPrice = cardInfo.price.toString()
  const nftId = cardInfo.nft.tokenId

  try {
    const tokenContract = new web3.eth.Contract(tokenABI, tokenAddress)
    const isApproved = await tokenContract.methods
      .allowance(walletAddress, purchaseAddress)
      .call()

    if (isApproved && isApproved < parseInt(offerPrice)) {
      await tokenContract.methods
        .approve(purchaseAddress, '1000000000000000000000000000')
        .send({ from: walletAddress })
    }

    const purchaseContract = new web3.eth.Contract(purchaseABI, purchaseAddress)

    const estimatedGas = await purchaseContract.methods
      .executeOrder(
        nftAddress,
        nftId,
        offerPrice,
      )
      .estimateGas({
        from: walletAddress,
      })

    const tx = await purchaseContract.methods
      .executeOrder(
        nftAddress,
        nftId,
        offerPrice,
      )
      .send({ from: walletAddress, gasLimit: estimatedGas })

    return tx
  } catch (e) {
    console.log('error', e)
    return e
  }
}


export const createOffer = async (library, cardInfo, walletAddress) => {
  const web3 = new Web3(library.provider)

  const offerPrice = cardInfo.price.toString()
  const offerDeadline = Math.floor(new Date(cardInfo.expireAt).valueOf() / 1000)
  const nftId = cardInfo.nft.tokenId

  try {
    const nftContract = new web3.eth.Contract(nftABI, nftAddress)
    const isApproved = await nftContract.methods
      .isApprovedForAll(walletAddress, purchaseAddress)
      .call()

    if (!isApproved) {
      await nftContract.methods
        .setApprovalForAll(purchaseAddress, true)
        .send({ from: walletAddress })
    }

    const purchaseContract = new web3.eth.Contract(purchaseABI, purchaseAddress)

    const estimatedGas = await purchaseContract.methods
      .createOrder(
        nftAddress,
        nftId,
        offerPrice,
        offerDeadline
      )
      .estimateGas({
        from: walletAddress,
      })

    const tx = await purchaseContract.methods
      .executeOffer(
        nftAddress,
        nftId,
        offerPrice,
        offerDeadline
      )
      .send({ from: walletAddress, gasLimit: estimatedGas })

    return tx
  } catch (e) {
    console.log('error', e)
    return e
  }
}

export const cancelOffer = async (library, cardInfo, walletAddress) => {
  const web3 = new Web3(library.provider)

  const nftId = cardInfo.nft.tokenId

  try {
    const purchaseContract = new web3.eth.Contract(purchaseABI, purchaseAddress)

    const estimatedGas = await purchaseContract.methods
      .cancelOrder(
        nftAddress,
        nftId,
      )
      .estimateGas({
        from: walletAddress,
      })

    const tx = await purchaseContract.methods
      .cancelOrder(
        nftAddress,
        nftId
      )
      .send({ from: walletAddress, gasLimit: estimatedGas })

    return tx
  } catch (e) {
    console.log('error', e)
    return e
  }
}

export const executeOffer = async (library, cardInfo, walletAddress) => {
  const web3 = new Web3(library.provider)

  const offerPrice = cardInfo.price.toString()
  const nftId = cardInfo.nft.tokenId

  try {
    const tokenContract = new web3.eth.Contract(tokenABI, tokenAddress)
    const isApproved = await tokenContract.methods
      .isApprovedForAll(walletAddress, purchaseAddress)
      .call()

    if (!isApproved) {
      await tokenContract.methods
        .setApprovalForAll(purchaseAddress, true)
        .send({ from: walletAddress })
    }

    const purchaseContract = new web3.eth.Contract(purchaseABI, purchaseAddress)

    const estimatedGas = await purchaseContract.methods
      .executeOrder(
        nftAddress,
        nftId,
        offerPrice,
        "",
      )
      .estimateGas({
        from: walletAddress,
      })

    const tx = await purchaseContract.methods
      .executeOrder(
        nftAddress,
        nftId,
        offerPrice,
        ""
      )
      .send({ from: walletAddress, gasLimit: estimatedGas })

    return tx
  } catch (e) {
    console.log('error', e)
    return e
  }
}