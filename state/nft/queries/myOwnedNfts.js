import gql from 'graphql-tag'

const MY_NFT_COLLECTION = gql`
  query getNftsByUserId() {
    getNftListByUserId() {
      nftsCount
      nfts {
        id
        tokenId
        nftMetadata {
          metadata
        }
        isOnMarketplace
        directOffer {
          id
          price
          seller
          status
        }
      }
    }
  }
`

export default MY_NFT_COLLECTION
