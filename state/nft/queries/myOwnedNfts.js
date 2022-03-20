import gql from 'graphql-tag'

const MY_NFT_COLLECTION = gql`
  query getNftsByUserId($userId: String!) {
    getNftListByUserId(userId: $userId) {
      nftsCount
      nfts {
        id
        contract {
          publicKey,
          chainType
        }
        tokenId
        nftMetadata {
          metadata
        }
        transactions {
          createdAt
          txNameFromInput
          updatedAt
          from
          to
          transactionHash
        }
      }
    }
  }
`

export default MY_NFT_COLLECTION
