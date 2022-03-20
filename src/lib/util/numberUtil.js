import isString from 'lodash/isString'

export const isNumeric = str => {
  if (!isString(str)) return false // we only process strings!
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  )
}

export const numberWithCommas = x => {
  // eslint-disable-next-line lodash/prefer-lodash-method
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
