import { useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'
import { PersistGate } from 'redux-persist/integration/react'
import { ReactReduxContext } from 'react-redux'
import Head from 'next/head'
import 'styles/globals.css'
import 'styles/common.scss'
import { Web3ReactProvider } from '@web3-react/core'
import NProgress from 'nprogress'
import Router from 'next/router'
import TagManager from 'react-gtm-module'

// Local imports
import mui from 'components/Theme/mui'
import { wrapper } from 'state/store'
import '../styles/globals.css'
import Layout from 'containers/Main'
import Loading from 'components/Loading'
import { isBrowser } from 'lib/util/window'
import { getLibrary } from 'lib/util/web3/web3React'

const muiTheme = createMuiTheme(mui)

const queryClient = new QueryClient()

// This will display a progress bar at the top of the header
NProgress.configure({ easing: 'ease', speed: 500 })
Router.events.on('routeChangeStart', url => {
  NProgress.start()
})

Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const tagManagerArgs = {
  gtmId: '',
}

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode) jssStyles.parentNode.removeChild(jssStyles)
    if (process.env.NEXT_PUBLIC_ENV === 'production') TagManager.initialize(tagManagerArgs)
  }, [])

  return (
    <>
      <Head>
        <link rel="stylesheet" type="text/css" href="/nprogress.css" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Mono&family=DM+Sans:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link href="/fonts.css" rel="stylesheet" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
        <title>Marseverse Marketplace</title>
        <meta name="viewport" content="initial-scale=1.0,user-scalable=yes; width=device-width" />
        <meta
          name="description"
          content="NFT marketplace"
        />
        <meta property="og:title" content="Marsverse NFT marketplace" />
        <meta
          property="og:description"
          content="NFT marketplace"
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="MarsVerse" />
        <meta property="og:image" content={`/images/site-preview.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="612" />
        <meta name="twitter:title" content="Marsverse NFT marketplace" />
        <meta
          name="twitter:description"
          content="NFT marketplace"
        />
        <meta name="twitter:image" content={`/images/site-preview.png`} />
      </Head>
      <Web3ReactProvider getLibrary={getLibrary}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <MuiThemeProvider theme={muiTheme}>
              <ThemeProvider theme={muiTheme}>
                <CssBaseline />
                {!isBrowser() ? (
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                ) : (
                  <ReactReduxContext.Consumer>
                    {({ store }) => (
                      <PersistGate
                        persistor={store.__persistor}
                        loading={
                          <div className="main-app-loader">
                            <Loading />
                          </div>
                        }>
                        <Layout>
                          <Component {...pageProps} />
                        </Layout>
                      </PersistGate>
                    )}
                  </ReactReduxContext.Consumer>
                )}
              </ThemeProvider>
            </MuiThemeProvider>
          </Hydrate>
        </QueryClientProvider>
      </Web3ReactProvider>
    </>
  )
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  // Keep in mind that this will be called twice on server, one for page and second for error page
  return {
    pageProps: {
      ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
      appProp: ctx.pathname,
    },
  }
}

export default wrapper.withRedux(MyApp)
