import get from 'lodash/get'

export const getAuthState = state => {
  return get(state, 'root.auth.isLoggedIn', false)
}

export const getUserAuthInfo = state => {
  return get(state, 'root.auth.user', {})
}

export const getAccessToken = state => {
  return get(state, 'root.auth.accessToken', null)
}

export const getRefreshToken = state => {
  return get(state, 'root.auth.refreshToken', null)
}
