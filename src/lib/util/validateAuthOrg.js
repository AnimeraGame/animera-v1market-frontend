import nookies from 'nookies'
import isEmpty from 'lodash/isEmpty'
import includes from 'lodash/includes'

// auth page refers to the login and register page
// on auth page, we need to redirect to profile if the token is present

// IMPORTANT: please remember to return something to the getServerSide either a callback or some other supported
// key with some value
const validateRoute = context => async callback => {
  // nookies will parse the cookies and return the token object if available in the headers
  // const { at: token } = nookies.get(context)
  // const { resolvedUrl } = context

  // // if the token is available in the cookies, than we need to redirect the user to profile
  // // as the user is already logged In
  // if (
  //   resolvedUrl === '/login' ||
  //   resolvedUrl === '/register' ||
  //   resolvedUrl === '/password' ||
  //   resolvedUrl === '/password/reset'
  // ) {
  //   if (token) {
  //     return {
  //       redirect: {
  //         permanent: false,
  //         destination: '/profile',
  //       },
  //     }
  //   }
  //   return callback()
  // }
  // if (isEmpty(token)) {
  //   // we need to store the last location in the cookie
  //   // ll = lastLocation
  //   nookies.set(context, 'll', resolvedUrl, {
  //     expires: new Date(Date.now() + 3600000), // 1 hour
  //     path: '/',
  //     sameSite: true,
  //   })
  //   return {
  //     redirect: {
  //       permanent: false,
  //       destination: '/login',
  //     },
  //   }
  // }
  // if (!isEmpty(token)) {
  //   let userType = ''
  //   try {
  //     userType = JSON.parse(token).userType
  //   } catch (err) {
  //     // eslint-disable-next-line no-console
  //     console.log(err)
  //     return callback()
  //   }
  //   if (
  //     userType === 'personal' &&
  //     (includes(resolvedUrl, '/admin/settings') ||
  //       includes(resolvedUrl, '/inventory') ||
  //       resolvedUrl === '/admin/profile')
  //   ) {
  //     return {
  //       redirect: {
  //         permanent: false,
  //         destination: '/profile',
  //       },
  //     }
  //   }
  //   if (
  //     userType === 'org' &&
  //     (includes(resolvedUrl, '/collections') || resolvedUrl === '/profile')
  //   ) {
  //     return {
  //       redirect: {
  //         permanent: false,
  //         destination: '/admin/profile',
  //       },
  //     }
  //   }
  //   return callback()
  // }
  return callback()
}

export default validateRoute
