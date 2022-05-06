import Web3 from 'web3'
import * as ethers from 'ethers'
import {
  nftABI,
  nftAddress,
  purchaseABI,
  purchaseAddress,
  tokenABI,
  tokenAddress,
  testnetPurchaseAddress,
} from './contractConstants'
import { getApprovalDigest } from './signature'
import { zeroAddress } from 'node_modules/ethereumjs-util/dist/account'
const {
  utils: { toUtf8Bytes },
} = ethers

const NFT_GALLERY_NAME = 'MarsversMarket'

export const createSale = async (library, price, kind, tokenId, walletAddress) => {
  const web3 = new Web3(library.provider)

  const chainId = process.env.NODE_ENV === 'production' ? 137 : 80001
  const sellPrice = web3.utils.toWei(price)
  const sellDeadline = ~~(new Date().getTime() / 1000 + 1000000)
  const nftId = tokenId

  const dataTypes = ['address', 'address', 'uint256', 'uint256', 'address', 'uint256']
  const dataValues = [
    walletAddress.toLowerCase(),
    tokenAddress,
    sellPrice,
    sellDeadline,
    nftAddress.toLowerCase(),
    nftId,
  ]

  try {
    const digest = getApprovalDigest(
      NFT_GALLERY_NAME,
      purchaseAddress.toLowerCase(),
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
  const sellPrice = cardInfo.price.toString()
  const sellDeadline = Math.floor(new Date(cardInfo.expireAt).valueOf() / 1000)
  const nftId = cardInfo.nft.tokenId

  const dataTypes = ['address', 'address', 'uint256', 'uint256', 'address', 'uint256']
  const dataValues = [
    cardInfo.seller.toLowerCase(),
    tokenAddress,
    sellPrice,
    sellDeadline,
    nftAddress.toLowerCase(),
    nftId,
  ]

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

    const id = web3.utils.padLeft('0x' + parseInt(cardInfo.id).toString(16), 32)

    const purchaseContract = new web3.eth.Contract(purchaseABI, purchaseAddress)

    const estimatedGas = await purchaseContract.methods
      .executeSell(
        [sellPrice, sellDeadline, cardInfo.nft.tokenId],
        [cardInfo.seller.toLowerCase(), tokenAddress, nftAddress.toLowerCase()],
        [cardInfo.seller_signature, buyerSig],
        id
      )
      .estimateGas({
        from: walletAddress,
        value: sellPrice,
      })

    const tx = await purchaseContract.methods
      .executeSell(
        [sellPrice, sellDeadline, cardInfo.nft.tokenId],
        [cardInfo.seller.toLowerCase(), tokenAddress, nftAddress.toLowerCase()],
        [cardInfo.seller_signature, buyerSig],
        id
      )
      .send({ from: walletAddress, gasLimit: estimatedGas, value: sellPrice })

    return tx
  } catch (e) {
    console.log('error', e)
    return e
  }
}

export const createOffer = async (library, price, kind, tokenId, walletAddress) => {
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
      tokenAddress: tokenAddress,
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
  const offerPrice = cardInfo.price.toString()
  const offerDeadline = Math.floor(new Date(cardInfo.expireAt).valueOf() / 1000)
  const nftId = cardInfo.nft.tokenId

  const dataTypes = ['address', 'address', 'uint256', 'uint256', 'address', 'uint256']
  const dataValues = [cardInfo.buyer, tokenAddress, offerPrice, offerDeadline, nftAddress, nftId]

  console.log('data values', dataValues)

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

    const digest = getApprovalDigest(
      NFT_GALLERY_NAME,
      purchaseAddress,
      chainId,
      dataTypes,
      dataValues
    )

    const sellerSig = await web3.eth.sign(digest, walletAddress)

    const purchaseContract = new web3.eth.Contract(purchaseABI, purchaseAddress)
    console.log('card info offer id ----', cardInfo.id)
    const id = web3.utils.padLeft('0x' + parseInt(cardInfo.id).toString(16), 64)
    console.log('card info offer id after parseInt ----', id)

    const estimatedGas = await purchaseContract.methods
      .executeOffer(
        [offerPrice, offerDeadline, offerDeadline, cardInfo.nft.tokenId],
        [cardInfo.buyer, tokenAddress, nftAddress],
        [sellerSig, cardInfo.buyer_signature],
        id
      )
      .estimateGas({
        from: walletAddress,
      })

    const tx = await purchaseContract.methods
      .executeOffer(
        [offerPrice, offerDeadline, offerDeadline, cardInfo.nft.tokenId],
        [cardInfo.buyer, tokenAddress, nftAddress],
        [sellerSig, cardInfo.buyer_signature],
        id
      )
      .send({ from: walletAddress, gasLimit: estimatedGas })

    return tx
  } catch (e) {
    console.log('error', e)
    return e
  }
}
