import React from 'react'
import styled from 'styled-components'
import {
  AppBar,
  Toolbar,
  Drawer,
  IconButton,
  Popover,
  Tooltip,
  makeStyles,
} from '@material-ui/core'

// local imports
import theme from 'components/Theme'
import { FontWeights } from 'components/Typography'
import { constants } from 'components/Theme/constants'

export const MainContainer = styled(({ isImpersonated, ...rest }) => <div {...rest} />)`
  display: flex;
  flex: 1;
  min-height: calc(100vh);
  width: 100%;
  justify-content: center;
  overflow-x: auto;
  padding-top: ${theme.constants.appBarHeight}px;
  ${props => props.theme.breakpoints.down('md')} {
    min-width: auto;
    width: 100%;
  }
  ${props => props.theme.breakpoints.down(constants.tabletWidth)} {
    min-width: 0px;
    padding-top: ${theme.constants.mobileAppBarHeight}px;
  }
  background: ${theme.colors.backgroundGray};
`

export const SAppBar = styled(({ isImpersonated, ...rest }) => <AppBar {...rest} />)`
  && {
    height: ${theme.constants.appBarHeight}px;
    padding: 0;
    z-index: ${props => props.theme.zIndex.drawer + 2};
    box-shadow: none;
    width: 100%;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    ${props => props.theme.breakpoints.down(constants.tabletWidth)} {
      width: 100%;
      box-shadow: none;
      height: ${theme.constants.mobileAppBarHeight}px;
    }
    ${props => props.theme.breakpoints.down('sm')} {
      position: absolute;
    }
    ${props => props.theme.breakpoints.down('xs')} {
      height: auto;
    }
  }
`
export const SToolbar = styled(Toolbar)`
  && {
    height: ${theme.constants.appBarHeight}px;
    min-height: ${theme.constants.appBarHeight}px;
    background-color: ${theme.colors.white};
    ${props => props.theme.breakpoints.down(constants.tabletWidth)} {
      min-height: ${theme.constants.mobileAppBarHeight + 1}px;
      border-bottom: 1px solid ${theme.colors.borderColor};
      ${props => props.theme.breakpoints.down('xs')} {
        height: auto;
      }
    }
  }

  .mobile-logo {
    display: none;
    ${props => props.theme.breakpoints.down('sm')} {
      display: block;
      margin: 0px auto 0px 8px;
    }
  }
`

export const MobileLogo = styled.div`
  display: none;
  ${props => props.theme.breakpoints.down('sm')} {
    display: block;
    margin: 0px auto 0px 8px;
  }
`

export const SMenuButton = styled(IconButton)`
  && {
    margin-right: 8px;
    min-width: 40px;
    color: ${theme.colors.black};
    display: none;
    ${props => props.theme.breakpoints.down(constants.tabletWidth)} {
      display: flex;
    }
  }
`

export const DesktopBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  ${props => props.theme.breakpoints.down('sm')} {
    display: none;
  }
`

export const ProfilePopover = styled(Popover)`
  && {
    .MuiPopover-paper {
      width: 200px;
      border-radius: 4px;
      padding: 0px;
      overflow: hidden;
      box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.16);
      border: 1px solid ${theme.colors.n30};
      padding: 12px 0px 0px;
    }
  }
`

export const SLink = styled.a`
  text-decoration: none;
  position: relative;
`

export const MenuItems = styled.div`
  display: flex;
  flex-flow: ${({ horizontal }) => (horizontal ? 'row nowrap' : 'column nowrap')};
  flex-grow: 1;
  margin-top: ${({ horizontal }) => (horizontal ? '0px' : '12px')};
  .games-item {
    ${props => props.theme.breakpoints.down(1200)} {
      display: none;
    }
    ${props => props.theme.breakpoints.down(constants.tabletWidth)} {
      display: flex;
    }
  }
`

export const ProfileContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  padding: 5px 8px 5px 10px;
  margin-right: 12px;
  cursor: pointer;
  &:hover {
    background-color: ${theme.colors.n00};
  }
`

export const AvatarContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  .MuiSvgIcon-root {
    color: ${theme.colors.n70};
    font-size: 2rem;
  }
  .loading-text {
    padding: 0px 12px;
  }
  .MuiAvatar-circle {
    width: 36px;
    height: 36px;
  }
`

export const AddressContainer = styled.div`
  padding: 4px 16px;
  cursor: pointer;
  font-weight: 400;
  line-height: 22px;
  font-size: 16px;
  background-color: ${theme.colors.n30};
  border-radius: 25px;
  ${props => props.theme.breakpoints.down('xs')} {
    display: none;
  }
`

export const LogoContainer = styled.div`
  align-items: center;
  justify-content: center;
  cursor: pointer;
  display: flex;
  min-height: ${theme.constants.appBarHeight}px;
  padding-left: 2%;
  margin-right: auto;

  ${props => props.theme.breakpoints.down(constants.tabletWidth)} {
    min-height: ${theme.constants.mobileAppBarHeight}px;
  }

  ${props => props.theme.breakpoints.down('sm')} {
    margin: 0px;
    display: ${({ hideOnTablet }) => (hideOnTablet ? 'none' : 'block')};
  }
  ${props => props.theme.breakpoints.down('xs')} {
    padding-left: 10px;
  }
`

export const Link = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  box-sizing: border-box;
  margin: 0px;
  line-height: 22px;
  font-weight: ${FontWeights.semiBold};
  cursor: pointer;
  position: relative;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};

  :hover {
    background-color: ${({ disabled }) => (disabled ? 'transparent' : theme.colors.n10)};
  }

  a {
    display: flex;
    padding: ${({ horizontal }) => (horizontal ? '12px 20px' : '14px 20px 14px 28px')};
    align-items: center;
    flex-grow: 1;
    color: ${({ active }) => (active ? theme.colors.primaryColor : theme.colors.n60)};
    text-decoration: none;
    min-width: 100px;
    svg {
      margin-right: 12px;
      opacity: ${({ active }) => (active ? '1' : '0.8')};
    }
  }

  ${props => props.theme.breakpoints.down('sm')} {
    color: ${({ active }) => (active ? theme.colors.primaryColor : theme.colors.n60)};
  }
  .bottom-bar {
    width: 100%;
    background-color: ${theme.colors.primaryColor};
    border-radius: 2px;
    position: absolute;
    bottom: 0px;
    left: 0px;
    height: 3px;
    display: flex;
    ${props => props.theme.breakpoints.down(constants.tabletWidth)} {
      display: none;
    }
  }
  .nav-icon {
    color: ${theme.colors.black};
    opacity: 0.6;
    margin-right: 16px;
    font-size: 0.8rem;
  }
  .profile-link {
    margin-top: 32px;
  }
`
export const Grow = styled.div`
  flex-grow: 1;
  height: 100%;
  display: flex;
  justify-content: space-between;
  /* flex-wrap: wrap; */
  align-items: center;
  padding-left: 2%;
  .connect-button {
    margin-left: auto;
    padding-right: 20px;
    display: flex;
    align-items: center;
    ${props => props.theme.breakpoints.down('sm')} {
      padding-right: 12px;
    }
  }
  .avatar {
    padding: 0px 20px 0px 0px;
    ${props => props.theme.breakpoints.down('sm')} {
      padding-right: 8px;
    }
  }
`

export const NameContainer = styled.div`
  padding-left: 10px;
  padding-right: 20px;
  cursor: pointer;
  color: ${theme.colors.white};
  font-weight: 500;
  line-height: 16px;
  padding-top: 2px;
  ${props => props.theme.breakpoints.down('xs')} {
    display: none;
  }
`

export const MenuItem = styled.div`
  height: 48px;
  padding-left: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.n10};
  }

  .MuiTypography-body1 {
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
  }
`

export const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  overflow-x: hidden;
  position: relative;
  flex-direction: column;
`

// Left Nav menu css
export const NavDrawer = styled(Drawer)`
  && {
    box-shadow: ${({ open }) =>
      !open ? '15px 2px 5px rgba(0, 0, 0, 0.05)' : '2px 2px 5px rgba(0, 0, 0, 0.05)'};
    flex-shrink: 0;
    z-index: ${props => props.theme.zIndex.drawer - 10} !important;
    border-right: none;
    display: none;
    ${props => props.theme.breakpoints.down(constants.tabletWidth)} {
      display: block;
    }
  }
  ul {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .toolbar {
    flex-shrink: 0;
  }
  .MuiDrawer-paper {
    background-color: ${theme.colors.white};
    border-right: none;
    width: ${theme.constants.leftNavDrawerWidth}px;
    overflow-y: auto;
  }
  .MuiList-padding {
    padding-top: 92px;
  }
`

export const NavFooter = styled.div`
  border-top: 1px solid ${theme.colors.n20};
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ErrorMessage = styled.div`
  color: ${theme.colors.errorColor};
  padding-right: 12px;
`

export const HeaderMenuItems = styled.div`
  display: flex;
  flex-grow: 2;
  padding: 0px 28px 0px 50px;

  .MuiList-padding {
    padding: 0px;
  }

  ${props => props.theme.breakpoints.down('lg')} {
    padding-left: 20px;
  }

  ${props => props.theme.breakpoints.down(constants.tabletWidth)} {
    display: none;
  }
`

const useStylesBootstrap = makeStyles(theme => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
  },
}))

export const BootstrapTooltip = props => {
  const classes = useStylesBootstrap()

  return <Tooltip arrow classes={classes} {...props} />
}
