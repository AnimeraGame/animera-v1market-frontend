import isString from 'lodash/isString'
import toNumber from 'lodash/toNumber'
import toLower from 'lodash/toLower'
import isEmpty from 'lodash/isEmpty'
import has from 'lodash/has'
import omit from 'lodash/omit'
import keys from 'lodash/keys'
import includes from 'lodash/includes'

export const extractFirstLastChars = (text = '', firstChunk = 4, lastChunk = 4) => {
  if (isString(text)) {
    if (text.length > 10) {
      return `${text.slice(0, firstChunk)}...${text.slice(-lastChunk)}`
    } else return text
  } else return text
}

export const isSubstring = (string = '', subString) => {
  if (isString(string) && isString(subString)) {
    if (string?.length || subString?.length) {
      return includes(toLower(string), toLower(subString))
    } else return false
  } else return false
}

export const validateUrlInput = (options, value) => {
  const newValue = toLower(value)
  if (includes(options, newValue)) return newValue
  else return options[0]
}

export const getPriceFromUrl = (min = '0', max = '0') => {
  let minNumber = min
  let maxNumber = max
  if (isString(min)) minNumber = toNumber(min)
  if (isString(min)) maxNumber = toNumber(max)
  let priceMin = minNumber >= maxNumber ? maxNumber : minNumber
  priceMin = priceMin < 0 || priceMin > 50000 ? 0 : priceMin
  let priceMax = maxNumber <= minNumber ? minNumber : maxNumber
  priceMax = priceMax < 1 || priceMax > 5000 ? 5000 : priceMax
  return [priceMin, priceMax]
}

export const generateUrl = (order, filters, text = '') => {
  let path = `/marketplace?`
  path += `so=${order}`
  if (filters.price.length)
    path += `&pn=${filters.price[0]}&px=${filters.price[1] >= 5000 ? 50000 : filters.price[1]}`
  if (!isEmpty(filters.sale)) path += `&s=${filters.sale}`
  if (!isEmpty(filters.scarcity)) path += `&sy=${filters.scarcity}`
  return text.length ? `${path}&sq=${text}` : path
}

export const generateUrlSearch = (router, text) => {
  const { query: urlParameters } = router
  if (!text.length) {
    if (has(urlParameters, 'sq')) {
      const filterParameters = omit(urlParameters, ['sq'])
      if (isEmpty(filterParameters)) router.push('/marketplace/')
      else {
        let url = '/marketplace?'
        keys(filterParameters).map(
          (item, idx) =>
            (url +=
              idx === 0
                ? `${item}=${filterParameters[item]}`
                : `&${item}=${filterParameters[item]}`)
        )
        router.push(url)
      }
    }
  } else {
    const filterParameters = omit(urlParameters, ['sq'])
    if (isEmpty(filterParameters)) {
      const path = router?.asPath
      const newPath = path?.length > 15 ? path + `&sq=${text}` : path + `?sq=${text}`
      router.push(newPath)
    } else {
      let url = '/marketplace?'
      keys(filterParameters).map(
        (item, idx) =>
          (url +=
            idx === 0 ? `${item}=${filterParameters[item]}` : `&${item}=${filterParameters[item]}`)
      )
      router.push(`${url}&sq=${text}`)
    }
  }
}
