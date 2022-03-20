import gql from 'graphql-tag'

/* Input format 
  id: 1
*/

const FETCH_DIRECT_OFFER = gql`
  query ($id: Int!) {
    directOffer(id: $id) {
      id
      buyTx
      createdAt
      currency
      price
      offerId
      status
      tx
      type
      fromUser {
        avatarUrl
        walletAddress
      }
      nft {
        tokenId
        isUsing
        nftMetadata {
          metadata
        }
        nftRun {
          id
          name
        }
        transactions {
          createdAt
          datetime
          transactionType
          updatedAt
          contractAddress
          fromWalletContract
          toWalletContract
          tokenId
          chain
          userId
          transactionHash
        }
      }
    }
  }
`

export default FETCH_DIRECT_OFFER
