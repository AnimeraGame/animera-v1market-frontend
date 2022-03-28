import get from 'lodash/get'

const prefix = 'MARS/AUTH'

export const HANDLE_AUTH_SUCCESS = `${prefix}/HANDLE_AUTH_SUCCESS`
export const HANDLE_WALLET_AUTH_SUCCESS = `${prefix}/HANDLE_WALLET_AUTH_SUCCESS`
export const HANDLE_AUTH_TOKEN_REFRESH = `${prefix}/HANDLE_AUTH_TOKEN_REFRESH`
export const HANDLE_AUTH_LOGOFF = `${prefix}/HANDLE_AUTH_LOGOFF`
export const HANDLE_UPDATE_USER_DATA = `${prefix}/HANDLE_UPDATE_USER_DATA`

/* istanbul ignore next: do not measure coverage on static action creators */
export const loginSuccess = authResponse => ({
  type: HANDLE_AUTH_SUCCESS,
  authResponse,
})

/* istanbul ignore next: do not measure coverage on static action creators */
export const handleWalletAuthSuccess = authResponse => ({
  type: HANDLE_WALLET_AUTH_SUCCESS,
  authResponse,
})

// we only need to clear the user, access and refresh tokens from our store.
// we don't need to call api to logout the user
/* istanbul ignore next: do not measure coverage on static action creators */
export const handleLogoff = () => ({
  type: HANDLE_AUTH_LOGOFF,
})

/* istanbul ignore next: do not measure coverage on static action creators */
export const handleTokenRefresh = payload => ({
  type: HANDLE_AUTH_TOKEN_REFRESH,
  payload,
})

export const updateUserSuccess = updateResponse => ({
  type: HANDLE_UPDATE_USER_DATA,
  updateResponse,
})

export const initialState = {
  isLoginProcess: false,
  isLoggedIn: false,
  user: {},
  accessToken: null,
  refreshToken: null,
}
/*
  Please note that your reducer must have the HYDRATE action handler.
  HYDRATE action handler must properly reconciliate the hydrated state on top of the existing state (if any). 
*/
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case HANDLE_AUTH_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: get(action, 'authResponse.user', {}),
        accessToken: get(action, 'authResponse.accessToken', null),
        refreshToken: get(action, 'authResponse.refreshToken', null),
      }
    case HANDLE_AUTH_LOGOFF:
      return {
        ...initialState,
      }
    case HANDLE_UPDATE_USER_DATA:
      return {
        ...state,
        user: { ...state.user, ...action.updateResponse },
      }
    case HANDLE_AUTH_TOKEN_REFRESH:
      return {
        ...state,
        accessToken: get(action, 'payload.accessToken', null),
        refreshToken: get(action, 'payload.refreshToken', null),
      }
    case HANDLE_WALLET_AUTH_SUCCESS:
      console.log('wallet auth success here', action);
      return {
        ...state,
        isLoggedIn: true,
        accessToken: get(action, 'authResponse.accessToken', null),
        refreshToken: get(action, 'authResponse.refreshToken', null),
        user: get(action, 'authResponse.user', false),
      }
    default:
      return state
  }
}

export default reducer
