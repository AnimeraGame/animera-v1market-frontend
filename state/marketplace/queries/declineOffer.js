import gql from 'graphql-tag'

const DECLINE_OFFER_MUTATION = gql`
  mutation declineOffer($data: UpdateEstateInput!) {
    declineEstate(data: $data) {
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
    }
  }
`

export default DECLINE_OFFER_MUTATION
