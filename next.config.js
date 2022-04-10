const nextTranslate = require('next-translate')

// https://nextjs.org/docs/api-reference/next.config.js/introduction
/*
  Avoid using new JavaScript features not available in your target Node.js version.
  next.config.js will not be parsed by Webpack, Babel or TypeScript.
 */

// const environment = process.env.APP_ENV || ''
const CDN_URL = process.env.CDN_URL || ''
// eslint-disable-next-line no-console
// console.log('LOGS CDN ', { CDN_URL }, ' ENV variables: ', process.env)

const moduleExports = {
  env: {
    NEXT_PUBLIC_ENV: process.env.APP_ENV,
    NEXT_PUBLIC_LOCAL: process.env.LOCAL_ENV,
    NEXT_PUBLIC_CDN_URL: CDN_URL,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (dev) {
      config.module.rules.push({
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      })
    }
    return config
  },
  sentry: {
    disableServerWebpackPlugin: true,
    disableClientWebpackPlugin: true,
  },
  assetPrefix: CDN_URL,
  poweredByHeader: false,
  ...nextTranslate(),
}

module.exports = {
  ...moduleExports,
}
