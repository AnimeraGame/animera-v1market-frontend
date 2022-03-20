import gql from 'graphql-tag'

export const CREATE_OFFER_NFT_MUTATION = gql`
  mutation createOffer(
    $offerId: Int!
    $type: Int!
    $nftId: Int
    $price: Int!
    $currency: String!
    $tx: String!
    $transaction: TransactionInput!
  ) {
    createOffer(
      offerId: $offerId
      type: $type
      nftId: $nftId
      price: $price
      currency: $currency
      tx: $tx
      transaction: $transaction
    ) {
      id
      offerId
      nft {
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
