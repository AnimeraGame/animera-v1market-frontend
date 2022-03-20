import nookies from 'nookies'
import isEmpty from 'lodash/isEmpty'
import includes from 'lodash/includes'

// The purpose of this check is to redirect the org user to profile page

// IMPORTANT: please remember to return something to the getServerSide either
// a callback or some other supported key with some value
const validateRouteSimple = context => async callback => {
  // nookies will parse the cookies and return the token object if available in the headers
  // const { at: token } = nookies.get(context)
  // const { resolvedUrl } = context
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
  //   const props = {
  //     isUserLoggedIn: true,
  //   }
  //   return callback(props)
  // }
  const props = {
    isUserLoggedIn: false,
  }
  return callback(props)
}

export default validateRouteSimple
