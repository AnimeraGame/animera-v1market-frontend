import { useMutation } from 'react-query'
import Router from 'next/router'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'

import apiRequest from 'lib/network/apiGraphql'

/*
  queryKey = the key for cache purpose
  payload = any payload/variables for the query
  query = the actual graphql query
  queryParameters = any custom parameters for react query

  A mutationRes can only be in one of the following states at any given moment:
  isIdle or status === 'idle' - The mutation is currently idle or in a fresh/reset state
  isLoading or status === 'loading' - The mutation is currently running
  isError or status === 'error' - The mutation encountered an error
  isSuccess or status === 'success' - The mutation was successful and mutation data is available

*/

const usePostRequest = (
  queryKey,
  mutation,
  queryParameters = { retry: 0 },
  logOutOnAuthError = true
) => {
  const mutationRes = useMutation(
    [queryKey],
    async payload => apiRequest(mutation, payload),
    queryParameters
  )
  // for some post requests, if 401 is returned, we don't want to send user to logout page
  // e.g. any auth request, which means the user is already logged out
  if (logOutOnAuthError) {
    // logout the user in case of 401 or 401 error
    const error = mutationRes.error
    if (!isEmpty(error) & mutationRes.isError) {
      const status = get(error, 'response.errors[0].extensions.exception.status', '')
      if (status === 401 || status === 403) Router.push('/logout')
    }
  }
  return { mutationRes }
}

export default usePostRequest
