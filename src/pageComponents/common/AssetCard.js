import PropTypes from 'prop-types'
import React, { useRef } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'

import { Body1, Body2, Caption, FontWeights, H5 } from 'components/Typography/index'
import theme from 'components/Theme/index'
import ProgressLoading from 'components/Loading/index'
import { constants } from 'components/Theme/constants'
import useDevice from 'hooks/useDevice'
import { imageCDNLoader } from 'lib/util/imageLoader'

const ContentCard = styled.div`
  min-width: 200px;
  background: ${theme.colors.white};
  box-shadow: ${({ marketPlace }) =>
    marketPlace ? `0px 64px 64px -30px rgb(0 0 0 / 10%)` : '0 4px 6px 0 #0000001a'};
  border: ${({ marketPlace }) => (marketPlace ? `1px solid ${theme.colors.n30}` : 'none')};
  border-radius: 12px;
  width: 100%;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  overflow: hidden;

  ${props => props.theme.breakpoints.down(constants.tabletWidth)} {
    max-width: 300px;
    margin: 0px auto;
  }

  &:hover {
    transform: scale(1.05);
  }

  .card_image {
    position: relative;
    width: 100%;
    height: 280px;
    overflow: hidden;

    > span,
    > div {
      width: 100%;
      height: 280px;
    }

    ${props => props.theme.breakpoints.down(constants.tabletWidth)} {
      height: 194px;
      video {
        height: 200px;
      }
      img {
        height: 194px;
      }
      > span,
      > div {
        width: 100%;
        height: 194px;
      }
    }

    video {
      width: 100%;
      object-fit: scale-down;
      transform: scale(1.28);

      ${props => props.theme.breakpoints.down(constants.tabletWidth)} {
        transform: scale(1.38);
      }
    }

    img {
      width: 100% !important;
      height: 280px;
      object-fit: contain;
    }
  }

  .card_content {
    padding-top: 20px;

    h5 {
      font-size: 18px;
      ${props => props.theme.breakpoints.down(constants.tabletWidth)} {
        font-size: 16px;
      }
    }

    .card_heading {
      display: flex;
      flex-flow: row wrap;
      padding-right: 15px;
      padding-left: 15px;
      justify-content: space-between;
      align-items: center;
    }

    .card_description {
      color: ${theme.colors.n50};
      padding-right: 15px;
      padding-left: 15px;
      padding-bottom: 20px;
    }

    .card_price_details {
      display: flex;
      justify-content: space-between;
      padding: ${({ showLastPrice }) => (showLastPrice ? '16px 15px 0px' : '16px 15px')};
      border-top: 1px solid ${theme.colors.borderColor};

      .card_price_label {
        color: ${theme.colors.n50};
      }

      .card_price_value {
        color: ${theme.colors.black};
      }
    }
    .last_price_details {
      display: flex;
      justify-content: flex-end;
      padding: 0px 15px 12px;
      min-height: 30px;

      .label {
        color: ${theme.colors.n50};
      }

      .card_price_value {
        color: ${theme.colors.n80};
      }
    }
  }

  .card_placeholder_image {
    width: 100%;
  }

  .card_header {
    padding: 16px 16px 8px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-flow: row wrap;
    width: 100%;
    position: relative;

    .MuiIconButton-root {
      padding: 0px;
    }

    img {
      width: 90px;
      height: 24px;

      ${props => props.theme.breakpoints.down(constants.tabletWidth)} {
        width: 26px !important;
        height: 22px !important;
      }
    }
  }
`

const AssetCard = ({
  handleCardClick = () => {},
  item,
  t,
  loading,
  key,
  showPrice = true,
  label = {},
  menu = {},
  marketPlace = false,
  price,
  tokenId,
  lastPrice,
  showLastPrice = false,
}) => {
  const vid = useRef(null)

  const handleOver = () => {
    if (vid.current) {
      vid.current.play()
    }
  }

  const handleLeave = () => {
    if (vid.current) {
      vid.current.pause()
    }
  }

  const { isTablet } = useDevice()
  const limit = isTablet ? 30 : 50

  return (
    <ContentCard
      marketPlace={marketPlace}
      showLastPrice={showLastPrice}
      onMouseLeave={handleLeave}
      onMouseEnter={handleOver}
      key={key}>
      <div className="card_header">
        {loading ? (
          <ProgressLoading skeleton height={20} width={80} />
        ) : (
          <>
            {isTablet ? (
              <Image alt="org-logo" width={26} height={22} src={`/images/MarsVerse_mobile.png`} />
            ) : (
              <Image alt="org-logo" width={90} height={24} src={`/images/MarsVerse.png`} />
            )}
            {!isEmpty(label) ? label : !isEmpty(menu) ? menu : null}
          </>
        )}
      </div>
      {/* eslint-disable-next-line */}
      <div onClick={() => item && handleCardClick(item)} className="card_image">
        {loading ? (
          <div className="card_placeholder_image">
            <ProgressLoading skeleton variant="rect" width="100%" height={300} />
          </div>
        ) : (
          <>
            <Image
              alt={get(item, 'name', false) ? `${item.name} image` : 'NFT thumbnail'}
              layout={'fill'}
              // height={800}
              loader={imageCDNLoader}
              src={get(item, 'image', '/images/1.png')}
            />
          </>
        )}
      </div>
      <div className="card_content">
        <div className="card_heading">
          <H5 fontWeight={FontWeights.bold}>
            {loading ? (
              <ProgressLoading skeleton height={30} width={120} />
            ) : (
              <>{get(item, 'name', 'NFT name')}</>
            )}
          </H5>
          {tokenId ? <Body2 fontWeight={FontWeights.medium}>#{tokenId}</Body2> : null}
        </div>

        <Body2 className="card_description" fontWeight={FontWeights.regular}>
          {loading ? (
            <ProgressLoading skeleton height={20} width="100%" />
          ) : (
            <>
              {get(item, 'description', 'A 3D rotating mystical crypto apple').slice(0, limit)}
              {get(item, 'description', '').length > limit && '...'}
            </>
          )}
        </Body2>
        {(showPrice || price) && !loading && (
          <div className="card_price_details">
            <Body1 className="card_price_label">{t('price')}</Body1>
            <Body1 fontWeight={FontWeights.bold} className="card_price_value">
              {price || ''}
            </Body1>
          </div>
        )}
        {showLastPrice && !loading && (
          <div className="last_price_details">
            <Caption fontWeight={FontWeights.semiBold} className="card_price_value">
              {lastPrice ? (
                <>
                  <span className="label">Last: </span>
                  {lastPrice} BNB
                </>
              ) : (
                ''
              )}
            </Caption>
          </div>
        )}
      </div>
    </ContentCard>
  )
}

AssetCard.propTypes = {
  key: PropTypes.any,
  data: PropTypes.object,
  showPrice: PropTypes.bool,
  loading: PropTypes.bool,
  item: PropTypes.object,
  handleCardClick: PropTypes.func,
  label: PropTypes.object,
  menu: PropTypes.object,
  marketPlace: PropTypes.bool,
  showLastPrice: PropTypes.bool,
  price: PropTypes.string,
  tokenId: PropTypes.string,
  lastPrice: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export default AssetCard
