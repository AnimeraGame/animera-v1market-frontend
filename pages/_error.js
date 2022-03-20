import styled from 'styled-components'

import PageContent from 'containers/PageContent'
import { Body1, H4, FontWeights } from 'components/Typography'
import Theme from 'components/Theme'

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding: 0px 16px;
  justify-content: center;
  min-height: 500px;
  max-width: 700px;
  margin: auto;

  h4 {
    margin-bottom: 20px;
    color: ${Theme.colors.primaryColor};
  }
`

function Error({ statusCode }) {
  return (
    <PageContent>
      <Container>
        <H4 fontWeight={FontWeights.semiBold}>Something Went Wrong</H4>
        <Body1 fontWeight={FontWeights.medium}>
          Our team is working on fixing this issue {statusCode || ''} and will be fixed soon. Thank
          you for your cooperation and please check back later to participate in games and get a
          chance to win exciting prizes.
        </Body1>
      </Container>
    </PageContent>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
