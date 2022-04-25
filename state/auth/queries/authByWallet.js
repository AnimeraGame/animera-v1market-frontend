import gql from 'graphql-tag'

/*
  input
  type AuthByWalletInput {
    signature: String!
    wallet: String!
  }
*/

const AUTH_BY_WALLET = gql`
  mutation ($data: AuthByWalletInput!) {
    authByWallet(data: $data) {
      accessToken
      refreshToken
    }
  }
`

export default AUTH_BY_WALLET
