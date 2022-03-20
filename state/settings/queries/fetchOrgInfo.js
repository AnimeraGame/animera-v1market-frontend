import gql from 'graphql-tag'

// input FORMAT
// {
//   "id": String!
// }

const FETCH_ORG_INFO = gql`
  query fetchOrgInfo($id: String!) {
    org(id: $id) {
      billingWallet
      description
      name
      id
      squareLogoUrl
      rectangleLogoUrl
      splashImgUrl
      verified
      settingsObject {
        acceptedCoins
      }
      colorTheme {
        colorPrimary
        colorSecondary
      }
    }
  }
`

export default FETCH_ORG_INFO
