import gql from 'graphql-tag'

const UPDATE_OFFER_MUTATION = gql`
  mutation updateEstate($data: UpdateEstateInput!) {
    updateEstate(data: $data) {
      id
      nft {
        id
        tokenId
        nftMetadata {
          metadata
        }
      }
      seller
      createdAt
      updatedAt
      expireAt
      price
      status
      type
    }
  }
`

export default UPDATE_OFFER_MUTATION
