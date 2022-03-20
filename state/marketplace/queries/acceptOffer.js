import gql from 'graphql-tag'

export const ACCEPT_OFFER_MUTATION = gql`
  mutation ($id: Int!, $buyer: String!, $buyTx: String!, $transaction: TransactionInput!) {
    acceptOffer(id: $id, buyer: $buyer, buyTx: $buyTx, transaction: $transaction)
  }
`
