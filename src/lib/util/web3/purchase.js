import Web3 from 'web3'
import {
  nftABI,
  nftAddress,
  purchaseABI,
  purchaseAddress,
  tokenABI,
  tokenAddress,
} from './contractConstants'
import { getBigNumber, getEIP712Signature, getApprovalDigest } from './signature'

const NFT_GALLERY_NAME = 'MarsversMarket';

export const createOffer = async (library, price, kind, tokenId, walletAddress) => {
  const web3 = new Web3(library.provider)

  const chainId = process.env.NODE_ENV === 'production' ? 137 : 80001;
  const sellPrice = getBigNumber(price);
  const sellDeadline = ~~(new Date().getTime() / 1000 + 1000);
  const nftId = tokenId;

  const dataTypes = ['address', 'address', 'uint256', 'uint256', 'address', 'uint256'];
  const dataValues = [
    walletAddress,
    tokenAddress,
    sellPrice,
    sellDeadline,
    nftAddress,
    nftId
  ];

  const digest = getApprovalDigest(NFT_GALLERY_NAME, purchaseAddress, chainId, dataTypes, dataValues);

  const sellerSig = await web3.eth.sign(digest, walletAddress);

  return {
    chainId,
    tokenAddress,
    sellPrice,
    sellDeadline,
    nftAddress,
    nftId,
    walletAddress,
    sellerSig
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
