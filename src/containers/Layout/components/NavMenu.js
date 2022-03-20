import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { List, Link as MaterialLink, Popover } from '@material-ui/core'
import { useRouter } from 'next/router'
import Link from 'next/link'
import includes from 'lodash/includes'
import isEmpty from 'lodash/isEmpty'
import styled from 'styled-components'

// local imports
import { MenuItems, Link as CustomLink, SLink } from './'
import theme from 'components/Theme'

const SPopover = styled(Popover)`
  && {
    .MuiPopover-paper {
      width: 335px;
      border-radius: 4px;
      padding: 0px;
      overflow: hidden;
      box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.16);
      border: 1px solid ${theme.colors.n30};
      padding: 12px 0px;
      max-height: 450px;
      overflow-y: auto;
    }
  }
`

const MenuItem = styled.div`
  height: 48px;
  padding-left: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.n10};
  }

  .MuiTypography-body2 {
    display: flex;
    align-items: center;
  }

  .MuiSvgIcon-root {
    margin-right: 8px;
    font-size: 20px;
    opacity: 0.6;
    color: ${theme.colors.black};
    line-height: 20px;
  }
  a {
    color: ${theme.colors.n70};
    text-decoration: none;
    font-size: 16px;
    font-weight: 500;
    line-height: 22px;
    width: 100%;
    :hover {
      text-decoration: none;
    }
  }
`

const NavMenu = ({ t, headerLink = false, handleDrawerClose }) => {
  const router = useRouter()
  const isLinkActive = (path, dynamic = false) =>
    dynamic ? includes(router.pathname, path) : router.pathname === path

  const renderConsumerLinks = (headerLink = false) => (
    <>
      <MenuItems horizontal={headerLink}>
        <CustomLink
          active={isLinkActive('/collections', true)}
          horizontal={headerLink}
          data-tc="collections">
          {isLinkActive('/collections', true) ? <div className="bottom-bar"></div> : null}
          <Link href="/collections/my-items">
            <SLink onClick={handleDrawerClose}>{t('collection')}</SLink>
          </Link>
        </CustomLink>
        <CustomLink
          active={isLinkActive('/marketplace', true)}
          horizontal={headerLink}
          data-tc="marketplace">
          {isLinkActive('/marketplace', true) ? <div className="bottom-bar"></div> : null}
          <Link href="/marketplace">
            <SLink onClick={handleDrawerClose}>{t('marketplace')}</SLink>
          </Link>
        </CustomLink>
      </MenuItems>
    </>
  )

  return (
    <>
      <List>{renderConsumerLinks(headerLink)}</List>
    </>
  )
}

NavMenu.propTypes = {
  t: PropTypes.func.isRequired,
  handleDrawerClose: PropTypes.func.isRequired,
  headerLink: PropTypes.bool,
}

export default NavMenu
