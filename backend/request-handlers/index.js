'use strict';

var emptyFavicon = require( './empty-favicon' )
var compression = require( './compression' )
var logger = require( './logger' )

/**
 * @link http://expressjs.com/en/api.html#app.use
 *
 * @param {Function} app
 * @param {Function} app.use
 *
 * @returns {undefined}
 */
function requestHandlers( app ) {
  logger( app )
  compression( app )
  emptyFavicon( app )
}

module.exports = requestHandlers
