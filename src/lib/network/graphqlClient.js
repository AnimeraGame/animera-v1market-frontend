import { GraphQLClient } from 'graphql-request'

const environment = process.env.NEXT_PUBLIC_ENV || process.env.NEXT_PUBLIC_LOCAL || 'local'

const devApiEndpoint = 'http://api-marketplace.neocosmos.io/graphql'

const endpoint =
  environment === 'production'
    ? process.env.NEXT_PUBLIC_PROD_API
    : environment === 'staging'
    ? process.env.NEXT_PUBLIC_STAGE_API
    : environment === 'local'
    ? devApiEndpoint
    : process.env.NEXT_PUBLIC_DEV_API

console.log('API endpoint:', endpoint)

const graphQLClient = new GraphQLClient(endpoint)

export default graphQLClient
