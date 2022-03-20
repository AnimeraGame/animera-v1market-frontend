import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Avatar } from '@material-ui/core'
import { useRouter } from 'next/router'
import {
  Menu,
  PowerSettingsNew,
  ArrowDropDownRounded,
  ArrowDropUpRounded,
  AccountBalanceOutlined,
} from '@material-ui/icons'
import dynamic from 'next/dynamic'
import get from 'lodash/get'
import includes from 'lodash/includes'
import isEmpty from 'lodash/isEmpty'
import split from 'lodash/split'
import some from 'lodash/some'
import toNumber from 'lodash/toNumber'
import NextImage from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import useTranslation from 'next-translate/useTranslation'
import { destroyCookie, setCookie, parseCookies } from 'nookies'
import jwt_decode from 'jwt-decode'

import {
  LogoContainer,
  Grow,
  MainContainer,
  SAppBar,
  SToolbar,
  SMenuButton,
  Wrapper,
  NavDrawer,
  ProfilePopover,
  MenuItem,
  ProfileContainer,
  AddressContainer,
  AvatarContainer,
  HeaderMenuItems,
  MobileLogo,
} from './components'
import { FontWeights, Body1 } from 'components/Typography'
import Identicon from 'components/Elements/Identicon'
import ErcAddress from 'components/Elements/ErcAddress'
import { getWallet, getBalance } from 'state/settings/selectors'
import { setWallet, setBalances } from 'state/settings'
import { handleLogoff, handleTokenRefresh } from 'state/auth'
import { getUserAuthInfo, getAccessToken, getIsOrgUser } from 'state/auth/selectors'
import { isBrowser } from 'lib/util/window'
import usePostRequest from 'hooks/UsePostRequest'
import REFRESH_ACCESS_TOKEN_MUT from 'state/auth/queries/refreshAccessToken'
import NavMenuLinks from './components/NavMenu'

// this is a dynamic method with named import component
const Web3ModalComponent = dynamic(
  () => import('components/Modal').then(mod => mod.Web3ModalComponent),
  // eslint-disable-next-line react/display-name
  { loading: () => <p>Loading...</p> }
)

// protected routes
const protectedRoutes = ['/profile']

const Layout = ({ children }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { t } = useTranslation('common')
  // global state
  const wallet = useSelector(state => getWallet(state))
  const balance = useSelector(state => getBalance(state))
  const user = useSelector(state => getUserAuthInfo(state))
  const accessToken = useSelector(state => getAccessToken(state))
  // local state variables
  const [navDrawerOpen, setNavDrawerOpen] = useState(false) // desktop drawer
  // this will hold the provider returned by the web3 wallet
  // const [balance, setBalance] = useState(null)
  const [profileAnchorEl, setProfileAnchorEl] = useState(null)
  const [disconnected, setDisconnected] = useState(false)

  const isProfileMenuOpen = Boolean(profileAnchorEl)

  // request to refresh the token
  const { mutationRes } = usePostRequest('REFRESH_TOKEN', REFRESH_ACCESS_TOKEN_MUT)

  // refs
  const profileContainerRef = useRef()

  // actions
  const handleWalletConnect = ({ address, wrongNetwork }) => {
    if (disconnected) setDisconnected(false) //
    const result = address
      ? {
        address: address,
        wrongNetwork: wrongNetwork,
      }
      : {
        wrongNetwork: wrongNetwork,
      }

    dispatch(setWallet(result))
  }

  // this will close the drawer on click on a link
  const handleDrawerClose = () => {
    if (navDrawerOpen) setNavDrawerOpen(false)
  }

  const handleProfileMenuOpen = () => {
    setProfileAnchorEl(profileContainerRef.current)
  }

  const handleMenuClose = () => {
    setProfileAnchorEl(null)
  }

  const handleLogout = () => {
    /* Always pass path option to the destroy cookie to fix the 
      inconsistent behavior of cookie deletion
    */
    destroyCookie(null, 'at', { path: '/' })
    dispatch(handleLogoff())
    if (some(protectedRoutes, item => includes(item, split(router.pathname, '/')[1])))
      router.push('/')
  }

  const handleWalletDisconnect = () => {
    setDisconnected(true)
    dispatch(setWallet({ address: null, wrongNetwork: null }))
    dispatch(setBalances(0, 0))
    handleLogout()
  }

  useEffect(() => {
    /* we need to check, if the user is logged in and then check, if the user has
      cookies with an expiry time.
    */
    if (!isEmpty(accessToken)) {
      // get & check the expiry of the token from the cookie named token
      const { at: token } = parseCookies()
      if (token) {
        try {
          const { accessToken } = JSON.parse(token)
          const decodedToken = jwt_decode(accessToken)
          // check if the expiry is less than 1 day or already passed
          // and request to refresh the token
          if (decodedToken?.exp - decodedToken?.iat < 86400) {
            mutationRes.mutate(
              { token: accessToken },
              {
                onSuccess: data => {
                  dispatch(
                    handleTokenRefresh({
                      accessToken: get(data, 'refreshToken.accessToken', null),
                      refreshToken: get(data, 'refreshToken.refreshToken', null),
                    })
                  )
                  const cookieData = {
                    accessToken: get(data, 'refreshToken.accessToken', ''),
                    refreshToken: get(data, 'refreshToken.refreshToken', ''),
                  }
                  setCookie(null, 'at', JSON.stringify(cookieData), {
                    path: '/',
                    maxAge: 604800, // Expires after 7 days
                    sameSite: true,
                  })
                  // This will reset the mutation state to its initial state
                  mutationRes.reset()
                },
                onError: err => {
                  // eslint-disable-next-line no-console
                  console.log(err)
                  handleLogout()
                },
              }
            )
          }
        } catch (err) {
          // eslint-disable-next-line no-console
          console.log(err)
          handleLogout()
        }
      } else handleLogout()
    }
  }, [])

  const renderProfileMenu = (
    <ProfilePopover
      keepMounted
      elevation={0}
      anchorEl={profileAnchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 1, horizontal: 'right' }}
      open={isProfileMenuOpen}
      onClick={handleMenuClose}
      onClose={handleMenuClose}>
      {wallet.address ? (
        <>
          <MenuItem>
            <Body1 title={t('bnbBalance')} fontWeight={FontWeights.regular}>
              <AccountBalanceOutlined />
              {toNumber(balance.bnb).toLocaleString('en-US', { maximumFractionDigits: 4 })} BNB
            </Body1>
          </MenuItem>
          <MenuItem onClick={handleWalletDisconnect}>
            <Body1 fontWeight={FontWeights.regular}>
              <PowerSettingsNew />
              {t('disconnectWallet')}
            </Body1>
          </MenuItem>
        </>
      ) : null}
      {!isEmpty(user) && !wallet.address ? (
        <MenuItem onClick={handleLogout}>
          <Body1 fontWeight={FontWeights.regular}>
            <PowerSettingsNew />
            {t('logOut')}
          </Body1>
        </MenuItem>
      ) : null}
    </ProfilePopover>
  )

  return (
    <MainContainer className="main_app_container">
      <SAppBar color="inherit" position="fixed" elevation={0}>
        <SToolbar disableGutters>
          <Grow>
            {!isEmpty(accessToken) ? (
              <SMenuButton onClick={() => setNavDrawerOpen(old => !old)}>
                <Menu />
              </SMenuButton>
            ) : null}
            {/* Mobile Logo */}
            <MobileLogo
              onClick={() => {
                if (router.pathname !== '/') router.push('/')
              }}>
              <NextImage alt="marsverse-logo" src="/mobile-logo.png" width={66} height={66} />
            </MobileLogo>
            {/* Desktop Logo */}
            <LogoContainer
              hideOnTablet
              onClick={() => {
                if (router.pathname !== '/') router.push('/')
              }}>
              <NextImage
                alt="org-logo"
                // eslint-disable-next-line lodash/prefer-lodash-method
                src={router.pathname.includes('game') ? '/beta_dark.png' : '/logo.png'}
                // eslint-disable-next-line lodash/prefer-lodash-method
                width={router.pathname.includes('game') ? 200 : 140}
                height={53}
              />
            </LogoContainer>
            {/* Links */}
            {!isEmpty(accessToken) ? (
              <HeaderMenuItems>
                <NavMenuLinks
                  t={t}
                  headerLink
                  handleDrawerClose={handleDrawerClose}
                />
              </HeaderMenuItems>
            ) : null}
            {isBrowser() ? (
              <>
                <div className="connect-button">
                  <Web3ModalComponent
                    setWallet={handleWalletConnect}
                    disconnected={disconnected}
                    wallet={wallet}
                  />
                </div>
                {!wallet.wrongNetwork && (!isEmpty(user) || !isEmpty(wallet.address)) ? (
                  <>
                    <ProfileContainer ref={profileContainerRef} active={isProfileMenuOpen}>
                      <AvatarContainer onClick={handleProfileMenuOpen}>
                        <div className="avatar">
                          {user.avatarUrl ? (
                            <Avatar src={user.avatarUrl} alt={`${user.firstName}'s avatar` || ''} />
                          ) : wallet.address ? (
                            <Identicon address={wallet.address} />
                          ) : user.firstName ? (
                            <Avatar>{(user.firstName || '').slice(0, 1)}</Avatar>
                          ) : (
                            <Avatar src={''} alt={'avatar'} />
                          )}
                        </div>
                        <ErcAddress address={get(wallet, 'address', '')} />
                        {isProfileMenuOpen ? <ArrowDropUpRounded /> : <ArrowDropDownRounded />}
                      </AvatarContainer>
                    </ProfileContainer>
                    {isProfileMenuOpen ? renderProfileMenu : null}
                  </>
                ) : null}
              </>
            ) : null}
          </Grow>
        </SToolbar>
      </SAppBar>
      {!isEmpty(user) || !isEmpty(wallet.address) ? (
        <NavDrawer
          variant="temporary"
          anchor="left"
          onClose={() => setNavDrawerOpen(old => !old)}
          open={navDrawerOpen}
          classes={{
            paper: navDrawerOpen ? 'open' : 'close',
          }}>
          <NavMenuLinks t={t} handleDrawerClose={handleDrawerClose} />
        </NavDrawer>
      ) : null}
      <Wrapper>{children}</Wrapper>
    </MainContainer>
  )
}

Layout.propTypes = {
  children: PropTypes.shape({}).isRequired,
  hideDrawer: PropTypes.bool,
}

export default Layout
