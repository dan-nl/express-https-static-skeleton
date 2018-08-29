'use strict'

var emptyFavicon = require( 'http-server-request-handlers-empty-favicon' )

/**
 * @link https://www.npmjs.com/package/http-server-request-handlers-empty-favicon
 *
 * @param {Function} app
 * @param {Function} app.use
 *
 * @returns {undefined}
 */
function requestHandler( app ) {
  app.use( emptyFavicon )
}

module.exports = requestHandler
