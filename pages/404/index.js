import Head from 'next/head'
import styled from 'styled-components'

import { H4, H1 } from 'components/Typography'
import theme from 'components/Theme'

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  min-height: 500px;
  padding: 0px 20px;

  h1 {
    font-size: 7rem;
    line-height: 8rem;
    margin-bottom: 20px;
    color: ${theme.colors.primaryColor};
    text-align: center;
    text-shadow: 10px 10px 25px rgb(200 200 200), -10px 10px 25px rgb(200 200 200),
      -10px -10px 25px rgb(200 200 200);
    ${props => props.theme.breakpoints.down('sm')} {
      font-size: 4rem;
      line-height: 5rem;
    }
  }
`

const NotFoundPage = ({ cardSpecs }) => {
  return (
    <>
      <Head>
        <title>Page Not Found | Marsverse</title>
        <meta property="og:title" content="Page Not Found | Marsverse" />
        <meta name="twitter:title" content="Page Not Found | Marsverse" />
      </Head>
      <Container>
        <H1>404</H1>
        <H4>The Page you request could not be found.</H4>
      </Container>
    </>
  )
}

export default NotFoundPage
