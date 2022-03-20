import gql from 'graphql-tag'

const UPDATE_OFFER_MUTATION = gql`
  mutation updateOffer($currency: String, $id: Int!, $price: Int, $status: Int) {
    updateOffer(currency: $currency, id: $id, price: $price, status: $status) {
      id
      price
      status
      offerId
    }
  }
`

export default UPDATE_OFFER_MUTATION
