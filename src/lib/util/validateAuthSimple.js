const validateRouteSimple = () => async callback => {
  const props = {
    isUserLoggedIn: false,
  }
  return callback(props)
}

export default validateRouteSimple
