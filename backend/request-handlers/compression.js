'use strict'

var compression = require( 'compression' )

/**
 * adds
 * `res.flush`
 * `res.write`
 * `res.end`
 * `res.on`
 * `res.writeHead`
 *
 * @link https://www.npmjs.com/package/compression
 *
 * @param {Function} app
 * @param {Function} app.use
 *
 * @returns {undefined}
 */
function requestHandler( app ) {
  var config = {}

  app.use( compression( config ) )
}

module.exports = requestHandler
