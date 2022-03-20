import gql from 'graphql-tag'

const REFRESH_ACCESS_TOKEN = gql`
  mutation ($token: String!) {
    refreshToken(token: $token) {
      accessToken
      refreshToken
    }
  }
`

export default REFRESH_ACCESS_TOKEN
