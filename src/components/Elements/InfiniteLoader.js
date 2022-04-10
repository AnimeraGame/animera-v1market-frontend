import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { IconButton } from '@material-ui/core'
import LaunchOutlinedIcon from '@material-ui/icons/LaunchOutlined'
import isUndefined from 'lodash/isUndefined'
import get from 'lodash/get'

import useQueryRequest from 'hooks/UseQueryRequest'
import useOnScreen from 'hooks/IntersectionHook'
import { H3, Body1 } from 'components/Typography'
import ProgressLoading from 'components/Loading'
import { GET_PRODUCTS } from 'state/queries/inventory/getProducts'

const PAGE_SIZE = 10

const createPayload = page => {
  return {
    options: {
      paginate: {
        page: page,
        limit: PAGE_SIZE,
      },
    },
  }
}

const Container = styled.div`
  padding: 20px 0px;

  .share-link {
    margin-left: 8px;
    padding: 6px;
  }
`
const InfiniteLoader = () => {
  const [fetchedData, setData] = useState([])
  const [page, setPage] = useState(1)
  const { data, isFetching } = useQueryRequest(
    ['getProducts', page],
    createPayload(page),
    GET_PRODUCTS,
    { keepPreviousData: true }
  )
  const issues = get(data, 'posts.data', [])
  const isEmpty = issues && issues.length === 0
  const isReachingEnd = isEmpty || (issues && issues[issues.length - 1].length < PAGE_SIZE)
  const loadMoreDiv = useRef(null)
  const isOnScreen = useOnScreen(loadMoreDiv, '0px')

  useEffect(() => {
    if (isReachingEnd || isFetching || (!isOnScreen && issues.length > 0)) return
    setPage(old => old + 1)
  }, [isReachingEnd, isOnScreen])

  useEffect(() => {
    if (!isUndefined(issues) && issues.length) setData(old => [...old, ...issues])
  }, [issues])

  return (
    <Container>
      <H3>Infinite Loader</H3>
      {isEmpty ? <p>Yay, no issues found.</p> : null}
      {fetchedData.map(issue => {
        return (
          <p key={issue.id} style={{ margin: '20px 0' }}>
            - <Body1 component="span">{issue.title}</Body1>
            <IconButton onClick={() => window.open('google.com')} className="share-link">
              <LaunchOutlinedIcon fontSize="small" />
            </IconButton>
          </p>
        )
      })}
      <div>{isFetching ? <ProgressLoading /> : null} </div>
      <div style={{ display: 'block' }} ref={loadMoreDiv}></div>
    </Container>
  )
}

export default InfiniteLoader
