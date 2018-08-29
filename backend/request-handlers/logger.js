'use strict'

var config = require( '../../config/app/index' )
var morgan = require( 'morgan' )

/**
 * @link https://www.npmjs.com/package/morgan
 *
 * @param {Function} app
 * @param {Function} app.use
 *
 * @returns {undefined}
 */
function requestHandler( app ) {
  var morgan_config

  if ( !config.morgan_debug ) {
    return
  }

  morgan_config =
    ':req[x-real-ip] ' +
    '[:date[clf]] ' +
    '":method :url HTTP/:http-version" ' +
    ':status ' +
    ':response-time ms ' +
    ':res[content-length] ' +
    '":referrer" ":user-agent"'

  app.use( morgan( morgan_config ) )
}

module.exports = requestHandler
