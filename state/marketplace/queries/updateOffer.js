import gql from 'graphql-tag'

const UPDATE_OFFER_MUTATION = gql`
  mutation updateOffer(
    $data: UpdateOfferInput!
  ) {
    updateOffer(data: $data) {
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
      expiredAt
      price
      status
    }
  }
`

export default UPDATE_OFFER_MUTATION
