import nookies from 'nookies'
import isEmpty from 'lodash/isEmpty'

// auth page refers to the login and register page
// on auth page, we need to redirect to profile if the token is present

// IMPORTANT: please remember to return something to the getServerSide either a callback or some other supported
// key with some value
const Redirect =
  (context, shouldRedirectOnNonProd = true) =>
  async callback => {
    // nookies will parse the cookies and return the token object if available in the headers
    const { at: token } = nookies.get(context)
    const isDev =
      process.env.NEXT_PUBLIC_ENV !== 'production' && process.env.NEXT_PUBLIC_ENV !== 'staging'
    const shouldRedirect = isDev ? shouldRedirectOnNonProd : true
    if (!isDev) {
      return {
        redirect: {
          permanent: false,
          destination: '/collections/my-items',
        },
      }
    } else {
      if (isEmpty(token) && shouldRedirect) {
        // we need to store the last location in the cookie
        // ll = lastLocation
        return {
          redirect: {
            permanent: false,
            destination: '/collections/my-items',
          },
        }
      }
      if (!isEmpty(token)) {
        try {
          JSON.parse(token)
        } catch (err) {
          // eslint-disable-next-line no-console
          console.log(err)
          return callback()
        }
        if (shouldRedirect) {
          return {
            redirect: {
              permanent: false,
              destination: '/collections/my-items',
            },
          }
        } else return callback()
      }
      return callback()
    }
  }

export default Redirect
