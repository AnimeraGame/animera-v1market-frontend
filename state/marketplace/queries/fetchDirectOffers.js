import gql from 'graphql-tag'

/* Input format 
  type OffersQuery {
    endPrice: Float
    startPrice: Float
    status: Int
  }

  type OffersOrder {
    direction: OrderDirection!
    field: OffersOrderField!
  }

  enum OrderDirection {
    asc
    desc
  }

  enum OffersOrderField {
    created_at
    id
    price
    status
    types
  }

*/

const FETCH_DIRECT_OFFERS = gql`
  query directOffers(
    $first: Int
    $orderBy: OffersOrder
    $query: OffersQuery
    $after: String
    $searchString: String
  ) {
    directOffers(
      first: $first
      orderBy: $orderBy
      query: $query
      after: $after
      searchString: $searchString
    ) {
      totalCount
      commonRarityCount
      legendaryRarityCount
      rareRarityCount
      wildRarityCount
      pageInfo {
        endCursor
      }
      edges {
        node {
          id
          buyTx
          createdAt
          currency
          price
          status
          tx
          type
          offerId
          updatedAt
          fromUser {
            avatarUrl
            walletAddress
          }
          nft {
            tokenId
            isUsing
            directOffers {
              price
            }
            nftMetadata {
              metadata
            }
            nftRun {
              id
              name
            }
            transactions {
              datetime
              transactionType
              contractAddress
              fromWalletContract
              toWalletContract
              tokenId
              chain
              userId
              transactionHash
              value
              valueCurrency
            }
          }
        }
      }
    }
  }
`

export default FETCH_DIRECT_OFFERS
