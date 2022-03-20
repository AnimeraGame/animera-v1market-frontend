import { GraphQLClient } from 'graphql-request'

const environment = process.env.NEXT_PUBLIC_ENV || process.env.NEXT_PUBLIC_LOCAL || 'local'

const endpoint =
  environment === 'production'
    ? process.env.NEXT_PUBLIC_PROD_API
    : environment === 'staging'
    ? process.env.NEXT_PUBLIC_STAGE_API
    : environment === 'local'
    ? process.env.NEXT_PUBLIC_LOCAL_API
    : process.env.NEXT_PUBLIC_DEV_API

const graphQLClient = new GraphQLClient(endpoint)

export default graphQLClient
