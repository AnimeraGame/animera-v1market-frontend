import { GraphQLClient } from 'graphql-request'

const endpoint = 'http://localhost:4444/graphql'
// const endpoint = 'http://api-marketplace.neocosmos.io/graphql'

// const endpoint =
//   environment === 'production'
//     ? process.env.NEXT_PUBLIC_PROD_API
//     : environment === 'staging'
//     ? process.env.NEXT_PUBLIC_STAGE_API
//     : environment === 'local'
//     ? process.env.REACT_APP_API_HOST
//     : process.env.NEXT_PUBLIC_DEV_API

console.log('API endpoint:', endpoint)

const graphQLClient = new GraphQLClient(endpoint)

export default graphQLClient
