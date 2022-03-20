import includes from 'lodash/includes'
import replace from 'lodash/replace'

export const wrapImagePath = src => {
  const path = process.env.NEXT_PUBLIC_CDN_URL || process.env.NEXT_PUBLIC_DEV_CDN
  // eslint-disable-next-line no-console
  // console.log(
  //   'PATH CDN ',
  //   process.env.NEXT_PUBLIC_CDN_URL,
  //   ' DEV CDN ',
  //   process.env.NEXT_PUBLIC_DEV_CDN_URL
  // )
  if (includes(path, 'com/')) {
    const updated = replace(path, 'com/', 'com')
    return `${updated}${src}`
  } else return `${path}${src}`
}

export const imageCDNLoader = ({ src, width, quality }) => {
  return wrapImagePath(src)
}
