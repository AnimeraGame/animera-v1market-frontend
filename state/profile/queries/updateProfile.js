import gql from 'graphql-tag'

const UPDATE_PROFILE_MUTATION = gql`
  mutation ($data: UpdateUserInput!, $avatar: Upload) {
    updateUser(data: $data, avatar: $avatar) {
      id
    }
  }
`

export default UPDATE_PROFILE_MUTATION
