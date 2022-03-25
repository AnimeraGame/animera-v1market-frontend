import gql from 'graphql-tag'

export const CREATE_OFFER_NFT_MUTATION = gql`
  mutation createOffer(
    $data: CreateOfferInput!
  ) {
    createOffer(
      data: $data
    ) {
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

export const CREATE_OFFER_BUNDLE_MUTATION = gql`
  mutation (
    $offerId: Int!
    $type: Int!
    $bundleId: Int
    $price: Int!
    $currency: String!
    $tx: String!
  ) {
    createOffer(
      offerId: $offerId
      type: $type
      bundleId: $bundleId
      price: $price
      currency: $currency
      tx: $tx
    ) {
      id
      offerId
      bundle {
        id
      }
      tx
      fromUser {
        id
      }
      createdAt
      updatedAt
      price
      currency
      status
    }
  }
`
