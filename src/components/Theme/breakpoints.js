// Helper functions for MaterialUI breakpoints

import { isWidthDown, isWidthUp } from '@material-ui/core/withWidth'

export const isExtraSmall = width => isWidthDown('sm', width, false) // 375 or smaller
export const isMobile = width => isWidthDown('md', width, false) // 768 or smaller
export const isTablet = width => isWidthUp('md', width, true) && isWidthDown('lg', width, false) // between 768 and 1024
export const isDesktop = width => isWidthUp('lg', width) // 1024 or greater
export const isExtraLarge = width => isWidthUp('xl', width, true) // 1440 or larger
