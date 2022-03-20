import { useQuery } from 'react-query'
import Router from 'next/router'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import { parseCookies } from 'nookies'

import apiRequest from 'lib/network/apiGraphql'

/*
  queryKey = the key for cache
  payload = any payload/variables for the query
  query = the actual graphql query
  queryParameters = any custom parameters for react query
*/

const useQueryRequest = (
  queryKey,
  payload,
  query,
  queryParameters = { staleTime: Infinity, retry: false, refetchOnWindowFocus: false }
) => {
  const { at: token } = parseCookies()

  const { data, error, ...rest } = useQuery(
    [queryKey],
    async () => apiRequest(query, payload),
    queryParameters
  )
  if (!isEmpty(error) && !isEmpty(token)) {
    const status = get(error, 'response.errors[0].extensions.exception.status', '')
    // logout the user in case of 401 or 401 error
    if (status === 401 || status === 403) Router.push('/logout')
  }

  return { data, error, ...rest }
}

export default useQueryRequest

// Following values are returned in the query
// https://react-query.tanstack.com/reference/useQuery
/*
   const {
   data,
   dataUpdatedAt,
   error,
   errorUpdatedAt,
   failureCount,
   isError,
   isFetched,
   isFetchedAfterMount,
   isFetching,
   isIdle,
   isLoading,
   isLoadingError,
   isPlaceholderData,
   isPreviousData,
   isRefetchError,
   isStale,
   isSuccess,
   refetch,
   remove,
   status,
 }
*/
