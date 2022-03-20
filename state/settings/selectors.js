import get from 'lodash/get'

export const getWallet = state => {
  return get(state, 'root.settings.wallet', {})
}

export const getBalance = state => {
  return get(state, 'root.settings.balance', {})
}
