import PropTypes from 'prop-types'
import { List } from '@material-ui/core'
import { useRouter } from 'next/router'
import Link from 'next/link'
import includes from 'lodash/includes'

// local imports
import { MenuItems, Link as CustomLink, SLink } from './'

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
          active={isLinkActive('/offers', true)}
          horizontal={headerLink}
          data-tc="offers">
          {isLinkActive('/offers', true) ? <div className="bottom-bar"></div> : null}
          <Link href="/offers">
            <SLink onClick={handleDrawerClose}>{t('offers')}</SLink>
          </Link>
        </CustomLink>
        <CustomLink
          active={isLinkActive('/my-offers', true)}
          horizontal={headerLink}
          data-tc="my-offers">
          {isLinkActive('/my-offers', true) ? <div className="bottom-bar"></div> : null}
          <Link href="/my-offers">
            <SLink onClick={handleDrawerClose}>{t('myOffers')}</SLink>
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
