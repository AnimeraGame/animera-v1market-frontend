import PropTypes from 'prop-types'
import styled from 'styled-components'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'

import { H3, Body1, FontWeights } from 'components/Typography'
import theme from 'components/Theme'
import ErcAddress from 'components/Elements/ErcAddress'
import { constants } from 'components/Theme/constants'

const PageContentWrapper = styled.div`
  margin: auto;
  padding: 0px 24px;
  width: 100%;
  max-width: ${theme.constants.maxWidth + 'px'};
  margin-bottom: 30px;
  .content_header {
    padding-top: 42px;
    width: 100%;
    ${props => props.theme.breakpoints.down(constants.tabletWidth)} {
      padding-top: 16px;
      padding-left: 20px;
    }
  }
  .content_breadcrumb {
    display: flex;
    margin-top: 10px;
  }
  .content_breadcrumb_item {
    margin-right: 12px;
    display: flex;
    align-items: center;

    svg {
      margin-left: 12px;
      color: ${theme.colors.iconColor};
    }
  }
  ${props => props.theme.breakpoints.down(constants.tabletWidth)} {
    width: 100%;
    min-height: ${theme.constants.mobileAppBarHeight}px;
    max-width: 100%;
    padding: 0;
  }
`

const PageContent = ({
  children,
  style = {},
  title = '',
  breadcrumbs = [],
  showWallet = false,
}) => {
  return (
    <PageContentWrapper style={{ ...style }}>
      {title && (
        <div className="content_header">
          <H3 fontWeight={FontWeights.bold}>{title}</H3>
          <div className="content_breadcrumb">
            {breadcrumbs.map((breadcrumb, index) => {
              return (
                <div key={index} className="content_breadcrumb_item">
                  {breadcrumb.showWallet ? (
                    <ErcAddress address={breadcrumb.title} />
                  ) : (
                    <Body1>{breadcrumb.title}</Body1>
                  )}
                  {index !== breadcrumbs.length - 1 && <ArrowRightIcon />}
                </div>
              )
            })}
          </div>
        </div>
      )}
      {children}
    </PageContentWrapper>
  )
}

PageContent.propTypes = {
  style: PropTypes.object,
  children: PropTypes.node,
  title: PropTypes.string,
  breadcrumbs: PropTypes.array,
  showWallet: PropTypes.bool,
}

export default PageContent
