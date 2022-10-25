import gql from 'graphql-tag'

const UPDATE_ESTATE_MUTATION = gql`
  mutation updateEstateStatus($data: UpdateEstateInput!) {
    updateEstateStatus(data: $data) {
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
      buyer
    }
  }
`

export default UPDATE_ESTATE_MUTATION
