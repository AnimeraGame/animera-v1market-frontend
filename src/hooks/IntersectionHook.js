import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const IntersectionObserverHook = (ref, rootMargin = '0px') => {
  const [isIntersecting, setIntersecting] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting), {
      rootMargin,
    })

    if (ref.current) {
      observer.observe(ref.current)
    }
    return () => {
      observer.unobserve(ref.current)
    }
  }, [])

  return isIntersecting
}

IntersectionObserverHook.propTypes = {
  ref: PropTypes.string.isRequired,
  rootMargin: PropTypes.string,
}

export default IntersectionObserverHook
