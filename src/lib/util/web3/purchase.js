import Web3 from 'web3'
import * as ethers from 'ethers'
import {
  nftABI,
  nftAddress,
  purchaseABI,
  purchaseAddress,
  tokenABI,
  tokenAddress,
} from './contractConstants'
import { getApprovalDigest } from './signature'
const {
  utils: { toUtf8Bytes },
} = ethers

const NFT_GALLERY_NAME = 'MarsversMarket'

export const createSale = async (library, price, kind, tokenId, walletAddress) => {
  const web3 = new Web3(library.provider)

  const chainId = process.env.NODE_ENV === 'production' ? 137 : 80001
  const sellPrice = web3.utils.toWei(price)
  const sellDeadline = ~~(new Date().getTime() / 1000 + 100000)
  const nftId = tokenId

  const dataTypes = ['address', 'address', 'uint256', 'uint256', 'address', 'uint256']
  const dataValues = [walletAddress, tokenAddress, sellPrice, sellDeadline, nftAddress, nftId]

  try {
    const digest = getApprovalDigest(
      NFT_GALLERY_NAME,
      purchaseAddress,
      chainId,
      dataTypes,
      dataValues
    )

    const nftContract = new web3.eth.Contract(nftABI, nftAddress)
    const isApproved = await nftContract.methods
      .isApprovedForAll(walletAddress, purchaseAddress)
      .call()

    if (!isApproved) {
      await nftContract.methods
        .setApprovalForAll(purchaseAddress, true)
        .send({ from: walletAddress })
    }
    const sellerSig = await web3.eth.sign(digest, walletAddress)

    return {
      chainId,
      tokenAddress,
      sellPrice,
      sellDeadline,
      nftAddress,
      nftId,
      walletAddress,
      sellerSig,
    }
  } catch (e) {
    console.log('sign', e)
  }
}

export const buySale = async (library, cardInfo, walletAddress) => {
  const web3 = new Web3(library.provider)

  const chainId = process.env.NODE_ENV === 'production' ? 137 : 80001
  const sellPrice = web3.utils.toWei(cardInfo.price.toString())
  const sellDeadline = Math.floor(new Date(cardInfo.expireAt).valueOf() / 1000)
  const nftId = cardInfo.nft.tokenId

  const dataTypes = ['address', 'address', 'uint256', 'uint256', 'address', 'uint256']
  const dataValues = [cardInfo.seller, tokenAddress, sellPrice, sellDeadline, nftAddress, nftId]

  try {
    const tokenContract = new web3.eth.Contract(tokenABI, tokenAddress)
    const approvedAmount = await tokenContract.methods
      .allowance(walletAddress, purchaseAddress)
      .call()
    if (parseInt(approvedAmount) < parseInt(sellPrice)) {
      await tokenContract.methods
        .increaseAllowance(purchaseAddress, web3.utils.toWei('10000000000000000000000000000000'))
        .send({ from: walletAddress })
    }

    const digest = getApprovalDigest(
      NFT_GALLERY_NAME,
      purchaseAddress,
      chainId,
      dataTypes,
      dataValues
    )

    const buyerSig = await web3.eth.sign(digest, walletAddress)

    const purchaseContract = new web3.eth.Contract(purchaseABI, purchaseAddress)
    const tx = await purchaseContract.methods
      .executeOffer(
        [sellPrice, 0, sellDeadline, cardInfo.nft.tokenId],
        [cardInfo.seller, tokenAddress, nftAddress],
        [cardInfo.sellerSignature, buyerSig],
        web3.utils.asciiToHex(cardInfo.id.replace('-', ''))
      )
      .send({ from: walletAddress })

    return tx
  } catch (e) {
    console.log('error', e)
    return e
  }
}

export const createOffer = async (library, price, kind, tokenId, sellId, walletAddress) => {
  const web3 = new Web3(library.provider)

  const chainId = process.env.NODE_ENV === 'production' ? 137 : 80001
  const sellPrice = web3.utils.toWei(price)
  const sellDeadline = ~~(new Date().getTime() / 1000 + 100000)
  const nftId = tokenId

  const dataTypes = ['address', 'address', 'uint256', 'uint256', 'address', 'uint256']
  const dataValues = [walletAddress, tokenAddress, sellPrice, sellDeadline, nftAddress, nftId]

  try {
    const digest = getApprovalDigest(
      NFT_GALLERY_NAME,
      purchaseAddress,
      chainId,
      dataTypes,
      dataValues
    )

    const nftContract = new web3.eth.Contract(nftABI, nftAddress)
    const isApproved = await nftContract.methods
      .isApprovedForAll(walletAddress, purchaseAddress)
      .call()

    if (!isApproved) {
      await nftContract.methods
        .setApprovalForAll(purchaseAddress, true)
        .send({ from: walletAddress })
    }
    const sellerSig = await web3.eth.sign(digest, walletAddress)

    return {
      chainId,
      tokenAddress,
      sellPrice,
      sellDeadline,
      nftAddress,
      nftId,
      walletAddress,
      sellerSig,
    }
  } catch (e) {
    console.log('sign', e)
  }
}

export const buyOffer = async (library, cardInfo, walletAddress) => {
  const web3 = new Web3(library.provider)

  const chainId = process.env.NODE_ENV === 'production' ? 137 : 80001
  const offerPrice = web3.utils.toWei(cardInfo.price.toString())
  const offerDeadline = Math.floor(new Date(cardInfo.expireAt).valueOf() / 1000)
  const nftId = cardInfo.nft.tokenId

  const dataTypes = ['address', 'address', 'uint256', 'uint256', 'address', 'uint256']
  const dataValues = [cardInfo.seller, tokenAddress, offerPrice, offerDeadline, nftAddress, nftId]

  try {
    const tokenContract = new web3.eth.Contract(tokenABI, tokenAddress)
    const approvedAmount = await tokenContract.methods
      .allowance(walletAddress, purchaseAddress)
      .call()
    if (parseInt(approvedAmount) < parseInt(offerPrice)) {
      await tokenContract.methods
        .increaseAllowance(purchaseAddress, web3.utils.toWei('10000000000000000000000000000000'))
        .send({ from: walletAddress })
    }

    const digest = getApprovalDigest(
      NFT_GALLERY_NAME,
      purchaseAddress,
      chainId,
      dataTypes,
      dataValues
    )

    const buyerSig = await web3.eth.sign(digest, walletAddress)

    const purchaseContract = new web3.eth.Contract(purchaseABI, purchaseAddress)
    const tx = await purchaseContract.methods
      .executeOffer(
        [offerPrice, 0, offerDeadline, cardInfo.nft.tokenId],
        [cardInfo.seller, tokenAddress, nftAddress],
        [cardInfo.sellerSignature, buyerSig],
        web3.utils.asciiToHex(cardInfo.id)
      )
      .send({ from: walletAddress })

    return tx
  } catch (e) {
    console.log('error', e)
    return e
  }
}
