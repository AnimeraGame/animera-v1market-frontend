import RedirectRoute from 'lib/util/redirectHomeOrg'

import Collections from './collections/[tab]/index'
export default Collections

export const getServerSideProps = context => {
  // if the cookie token in not present in req headers, the user wil be redirected to the login page
  return RedirectRoute(context)(async props => {
    return {
      props: { ...props },
    }
  })
}
