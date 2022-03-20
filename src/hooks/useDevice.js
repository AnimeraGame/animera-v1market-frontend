import { constants } from 'components/Theme/constants'
import { isBrowser } from 'lib/util/window'
import { useEffect, useState } from 'react'
import throttle from 'lodash/throttle'

const getBreakpoints = () => {
  if (isBrowser()) {
    const { innerWidth: width } = window
    return {
      isTablet: width < constants.tabletWidth,
    }
  } else return { isTablet: false }
}

export default function useDevice() {
  const [widths, setWidths] = useState(getBreakpoints())

  useEffect(() => {
    function handleResize() {
      setWidths(getBreakpoints())
    }

    window.addEventListener('resize', throttle(handleResize), 50)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return widths
}
