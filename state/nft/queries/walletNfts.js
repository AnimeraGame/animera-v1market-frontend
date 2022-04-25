import gql from 'graphql-tag'

const WALLET_NFT_COLLECTION = gql`
  query getNftListByWallet($wallet: String!) {
    getNftListByWallet(wallet: $wallet) {
      nftsCount
      nfts {
        id
        tokenId
        nftMetadata {
          metadata
        }
        isOnMarketplace
        estates {
          id
          price
          seller
          status
        }
      }
    }
  }
`

export default WALLET_NFT_COLLECTION
