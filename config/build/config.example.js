/* eslint no-process-env: off */

'use strict'

const path = require( 'path' )
const app_root = path.join( __dirname, '..', '..' )

const config = {
  app_root: app_root,
  directories: {
    data: path.join( app_root, 'frontend', 'templates', 'data' ),
    frontend_static: path.join( app_root, 'frontend', 'assets', 'static' ),
    pages: path.join( app_root, 'frontend', 'templates', 'pages' ),
    partials: path.join( app_root, 'frontend', 'templates', 'partials' ),
    public: path.join( app_root, 'public' )
  }
}

module.exports = config
