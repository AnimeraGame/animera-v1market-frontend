import get from 'lodash/get'

const prefix = 'OPSJET/SETTINGS'

export const HANDLE_WALLET = `${prefix}/HANDLE_WALLET`

export const SET_BALANCE = `${prefix}/SET_BALANCE`

/* istanbul ignore next: do not measure coverage on static action creators */
export const setWallet = wallet => {
  return {
    type: HANDLE_WALLET,
    wallet,
  }
}

export const setBalances = (bnb) => {
  return {
    type: SET_BALANCE,
    bnb
  }
}

export const initialState = {
  wallet: {
    address: null,
    wrongNetwork: false,
    balance: null,
  },
  balance: {
    bnb: 0
  },
}
/*
  Please note that your reducer must have the HYDRATE action handler.
  HYDRATE action handler must properly reconciliate the hydrated state on top of the existing state (if any). 
*/
const settings = (state = initialState, action) => {
  switch (action.type) {
    case HANDLE_WALLET:
      return {
        ...state,
        wallet: {
          ...state.wallet,
          ...get(action, 'wallet', {}),
        },
      }
    case SET_BALANCE:
      return {
        ...state,
        balance: {
          bnb: get(action, 'bnb', 0)
        },
      }
    default:
      return state
  }
}

export default settings
