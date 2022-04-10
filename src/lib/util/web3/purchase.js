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

const NFT_GALLERY_NAME = 'MarsversMarket';

export const createOffer = async (library, price, kind, tokenId, walletAddress) => {
  const web3 = new Web3(library.provider)

  const chainId = process.env.NODE_ENV === 'production' ? 137 : 80001;
  const sellPrice = web3.utils.toWei(price);
  const sellDeadline = ~~(new Date().getTime() / 1000 + 100000);
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

  try {
    const digest = getApprovalDigest(NFT_GALLERY_NAME, purchaseAddress, chainId, dataTypes, dataValues);
    
    const nftContract = new web3.eth.Contract(nftABI, nftAddress);
    const isApproved = await nftContract.methods.isApprovedForAll(walletAddress, purchaseAddress).call();
    
    if (!isApproved) {
      await nftContract.methods.setApprovalForAll(purchaseAddress, true).send({ from: walletAddress });
    }
    console.log('going to sign');
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
  } catch(e) {
    console.log('sign', e);
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

export const buyOffer = async (library, cardInfo, walletAddress) => {
  const web3 = new Web3(library.provider)

  const chainId = process.env.NODE_ENV === 'production' ? 137 : 80001;
  const sellPrice = web3.utils.toWei(cardInfo.price.toString());
  const sellDeadline = Math.floor(new Date(cardInfo.expireAt).valueOf() / 1000);
  const nftId = cardInfo.nft.tokenId;

  const dataTypes = ['address', 'address', 'uint256', 'uint256', 'address', 'uint256'];
  const dataValues = [
    cardInfo.seller,
    tokenAddress,
    sellPrice,
    sellDeadline,
    nftAddress,
    nftId
  ];


  try {
    const tokenContract = new web3.eth.Contract(tokenABI, tokenAddress);
    const approvedAmount = await tokenContract.methods.allowance(walletAddress, purchaseAddress).call();
    if (parseInt(approvedAmount) < parseInt(sellPrice)) {
      await tokenContract.methods.increaseAllowance(purchaseAddress, web3.utils.toWei('1000000000000000000')).send({ from: walletAddress });
    }

    const digest = getApprovalDigest(NFT_GALLERY_NAME, purchaseAddress, chainId, dataTypes, dataValues);
  
    const buyerSig = await web3.eth.sign(digest, walletAddress);
  
    const purchaseContract = new web3.eth.Contract(purchaseABI, purchaseAddress)
    const tx = await purchaseContract.methods.executeSell(
      cardInfo.seller,
      tokenAddress,
      sellPrice,
      sellDeadline,
      nftAddress,
      cardInfo.nft.tokenId,
      [cardInfo.sellerSignature, buyerSig]
    ).send({ from: walletAddress });
    console.log('buy tx', tx);

    return tx;
  } catch(e) {
    console.log('error', e);
    return e;
  }
}
