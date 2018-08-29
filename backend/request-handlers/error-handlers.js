'use strict'

var notFound = require( 'http-server-request-handlers-not-found' )
var errorLogger = require( 'http-server-request-handlers-error-logger' )

/**
 * note: this should load after all other requestHandlers
 *
 * @link https://www.npmjs.com/package/http-server-request-handlers-not-found
 * @link https://www.npmjs.com/package/http-server-request-handlers-error-logger
 *
 * @param {Function} app
 * @param {Function} app.use
 *
 * @returns {undefined}
 */
function requestHandler( app ) {
  app.use( notFound )
  app.use( errorLogger )
}

module.exports = requestHandler
