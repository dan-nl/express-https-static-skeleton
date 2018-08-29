/* eslint-disable max-len */

'use strict'

const fileExists = require( 'file-exists' )
const path = require( 'path' )

const config_path = path.join( __dirname, 'config.js' )

if ( !fileExists.sync( config_path ) ) {
  throw new Error(
    '\n  config {} ( %path ) does not exist.\n  copy the example that’s in the same directory without the .example suffix and alter as necessary\n'
      .replace( '%path', config_path )
  )
}

module.exports = require( './config' )
