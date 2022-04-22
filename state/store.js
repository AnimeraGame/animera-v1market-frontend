import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { createWrapper, HYDRATE } from 'next-redux-wrapper'
import get from 'lodash/get'
import includes from 'lodash/includes'
import { isLocalHosted, isDevHosted } from 'lib/system/environment'

// reducers
import auth from './auth'
import settings from './settings'

const appReducer = combineReducers({
  auth,
  settings,
})

/*
  we need to handle the HYDRATE action, which is dispatched by
  next redux wrapper. Each time when pages that have getInitialProps, getStaticProps or 
  getServerSideProps are opened by user the HYDRATE action will be dispatched. This may happen 
  during initial page load and during regular page navigation. The payload of this action will
  contain the state at the moment of static generation or server side rendering, so your reducer 
  must merge it with existing client state properly.
  https://github.com/kirill-konshin/next-redux-wrapper#usage 
*/
const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    return {
      ...get(action, 'payload.root', {}),
      ...state,
    }
  }
  return appReducer(state, action)
}

// create a makeStore function
const makeStore = context => {
  let store
  // Check if the browser is available and then instantiate the redux dev tools
  // TODO: check the production environment before instantiating the redux dev tools
  if (typeof window !== 'undefined') {
    // we need it only on client side
    const { persistStore, persistReducer } = require('redux-persist')
    const storage = require('redux-persist/lib/storage').default
    const persistConfig = {
      key: 'root',
      whitelist: ['auth'], // make sure it does not clash with server keys
      storage,
    }
    const composeEnhancers =
      ((isLocalHosted || isDevHosted) && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
    const persistedReducer = persistReducer(persistConfig, reducer)
    const store = createStore(
      combineReducers({
        root: persistedReducer,
      }),
      undefined,
      composeEnhancers(applyMiddleware())
    )

    store.__persistor = persistStore(store) // Nasty hack

    return store
  } else {
    const composeEnhancers = compose
    store = createStore(
      combineReducers({
        root: appReducer,
      }),
      undefined,
      composeEnhancers(applyMiddleware())
    )
  }
  return store
}
// export an assembled wrapper
export const wrapper = createWrapper(makeStore, {
  debug:
    typeof window !== 'undefined' &&
    (includes(window.location.host, 'localhost') || includes(window.location.host, 'app-dev')),
})
