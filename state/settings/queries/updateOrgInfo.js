import gql from 'graphql-tag'

// input FORMAT
// {
//    data: {
//      billingWallet: String
//      description: String
//      name: String
//      colorPrimary: String
//      colorSecondary: String
//      acceptedCoins: [Coin!]
//    }
//    squareLogoFile: Upload
//    splashImgFile: Upload
//    rectangleLogoFile: Upload
// }

const UPDATE_ORG_INFO = gql`
  mutation (
    $data: OrgUpdateInput
    $rectangleLogoFile: Upload
    $splashImgFile: Upload
    $squareLogoFile: Upload
  ) {
    org(
      data: $data
      rectangleLogoFile: $rectangleLogoFile
      squareLogoFile: $squareLogoFile
      splashImgFile: $splashImgFile
    ) {
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

export default UPDATE_ORG_INFO
