import { GraphQLClient } from 'graphql-request'

const environment = process.env.NEXT_PUBLIC_ENV || process.env.NEXT_PUBLIC_LOCAL || 'local'

const localApiEndpoint = 'http://localhost:4444/graphql'

const endpoint =
  environment === 'production'
    ? process.env.NEXT_PUBLIC_PROD_API
    : environment === 'staging'
    ? process.env.NEXT_PUBLIC_STAGE_API
    : environment === 'local'
    ? localApiEndpoint
    : process.env.NEXT_PUBLIC_DEV_API

console.log('API endpoint:', endpoint)

const graphQLClient = new GraphQLClient(endpoint)

export default graphQLClient
