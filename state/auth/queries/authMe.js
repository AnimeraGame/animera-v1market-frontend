import gql from 'graphql-tag'

const AUTH_ME_QUERY = gql`
  query authMe {
    me {
      id
    }
  }
`

export default AUTH_ME_QUERY
