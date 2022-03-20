import gql from 'graphql-tag'

const FETCH_NFT_DETAILS = gql`
  query nft($id: Int!) {
    nft(id: $id) {
      nftMetadata {
        metadata
      }
      organizationId
      contract {
        name
      }
    }
  }
`

export default FETCH_NFT_DETAILS
