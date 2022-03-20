const CONNECTOR_ID = 'connector_id'

export default {
  get WalletConnector() {
    return localStorage.getItem(CONNECTOR_ID)
  },
  set WalletConnector(value) {
    localStorage.setItem(CONNECTOR_ID, value)
  },

  clearStorage: () => {
    localStorage.removeItem(CONNECTOR_ID)
  },
}
