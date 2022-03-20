import includes from 'lodash/includes'
import { isBrowser } from 'lib/util/window'

export const isDevHosted = isBrowser() && includes(window.location.hostname, 'app-dev.marsverse.io')
export const isStageHosted =
  isBrowser() && includes(window.location.hostname, 'app-stage.marsverse.io')
export const isLocalHosted = isBrowser() && includes(window.location.hostname, 'localhost')
export const isProdHosted = !isDevHosted && !isLocalHosted && !isStageHosted

export default { isProdHosted, isDevHosted, isLocalHosted, isStageHosted }
