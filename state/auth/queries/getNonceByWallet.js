import gql from 'graphql-tag'

/*
  query input
  data: {
    wallet: String!
  }
*/

const GET_NONCE_BY_WALLET = gql`
  query ($data: GetNonceByWalletInput!) {
    getNonceByWallet(data: $data) {
      nonce
    }
  }
`

export default GET_NONCE_BY_WALLET
