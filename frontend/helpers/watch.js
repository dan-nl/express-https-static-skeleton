'use strict'

const chokidar = require( 'chokidar' )
const buildSite = require( './build-public' )
const log = console.log

/**
 * @returns {undefined}
 */
function watch() {
  chokidar.watch( './frontend' )
    .on(
      'change',
      function ( path ) {
        log( '[info]', new Date().toISOString(), 'change', path )
        buildSite()
      }
    )
}

module.exports = watch
