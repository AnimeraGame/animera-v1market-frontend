import gql from 'graphql-tag'

const MY_NFT_COLLECTION = gql`
  query getNftsByUserId($userId: String!) {
    getNftListByUserId(userId: $userId) {
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
