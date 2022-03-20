import graphQLClient from './graphqlClient'
import { print } from 'graphql/language/printer'
import get from 'lodash/get'
import { parseCookies } from 'nookies'

const apiRequest = async (query, variables, headers = null) => {
  const { at: token } = parseCookies()

  const requestHeaders = token
    ? {
        authorization: `Bearer ${get(JSON.parse(token), 'accessToken', '')}`,
      }
    : null
  return await graphQLClient.request(print(query), variables, requestHeaders)
}

export default apiRequest
