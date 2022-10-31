import gql from 'graphql-tag'

const GET_HISTORIES_MUTATION = gql`
  mutation getHistories($tokenId: Int!) {
    getHistories(tokenId: $tokenId) {
			histories {
				id
				tokenId
				from
				to
				price
			}
			totalCount
    }
  }
`

export default GET_HISTORIES_MUTATION
