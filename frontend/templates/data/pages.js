/* eslint-disable no-process-env */

'use strict'

const config = require( '../../../config/app/index' )

module.exports = {
  body: {
    scripts: {
      inline: '',
      src: []
    }
  },
  env: process.env.NODE_ENV,
  head: {
    links: {
      stylesheets: []
    },
    meta: {
      charset: config.charset
    },
    style: '',
    title: config.title
  },
  lang: config.lang_default,
  partials: {}
}
