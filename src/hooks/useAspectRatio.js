import { useEffect, useState } from 'react'

import { isBrowser } from 'lib/util/window'

const ratio = (x, y) => {
  return x / y
}

const getWindowDimensions = () => {
  if (isBrowser) {
    const { innerWidth: width, innerHeight: height } = window

    const r = ratio(width, height)

    return {
      width,
      height,
      ratio: r,
    }
  }
}

export default function useAspectRatio() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowDimensions
}

/* ratio is to get the gcd and divide each component by the gcd, then return a string with the typical colon-separated value */
