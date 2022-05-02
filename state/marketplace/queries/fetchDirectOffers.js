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

export const FETCH_DIRECT_SALES = gql`
  query findSalesBy(
    $onePage: Int
    $orderBy: OrderByInput
    $price: PriceWhereInput
    $page: Int
    $status: Int
    $searchText: String
  ) {
    findSalesBy(
      onePage: $onePage
      page: $page
      orderBy: $orderBy
      price: $price
      status: $status
      searchText: $searchText
    ) {
      estatesCount
      estates {
        id
        createdAt
        price
        status
        seller
        expireAt
        seller_signature
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

export const FETCH_DIRECT_OFFERS = gql`
  query findOffersBy(
    $onePage: Int
    $orderBy: OrderByInput
    $price: PriceWhereInput
    $page: Int
    $status: Int
    $searchText: String
    $wallet: String
  ) {
    findOffersBy(
      onePage: $onePage
      page: $page
      orderBy: $orderBy
      price: $price
      status: $status
      searchText: $searchText
      wallet: $wallet
    ) {
      estatesCount
      estates {
        id
        createdAt
        price
        status
        seller
        buyer
        expireAt
        seller_signature
        buyer_signature
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

export const FETCH_DIRECT_MY_OFFERS = gql`
  query findMyOffersBy(
    $onePage: Int
    $orderBy: OrderByInput
    $price: PriceWhereInput
    $page: Int
    $status: Int
    $searchText: String
    $wallet: String
  ) {
    findMyOffersBy(
      onePage: $onePage
      page: $page
      orderBy: $orderBy
      price: $price
      status: $status
      searchText: $searchText
      wallet: $wallet
    ) {
      estatesCount
      estates {
        id
        createdAt
        price
        status
        seller
        expireAt
        seller_signature
        buyer_signature
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
