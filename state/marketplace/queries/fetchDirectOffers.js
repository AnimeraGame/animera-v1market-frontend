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
    $onePage: Int
    $orderBy: OrderByInput
    $price: PriceWhereInput
    $page: Int
    $status: Int
    $searchText: String
  ) {
    findOffers(
      onePage: $onePage
      page: $page
      orderBy: $orderBy
      price: $price
      status: $status
      searchText: $searchText
    ) {
      offersCount
      offers {
        id
        createdAt
        price
        status
        seller
        expireAt
        sellerSignature
        updatedAt
        nft {
          tokenId
          isOnMarketplace
          nftMetadata {
            metadata
          }
        }
      }
    }
  }
`

export default FETCH_DIRECT_OFFERS
