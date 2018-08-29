'use strict'

const glob = require( 'glob' )

/**
 * @param {string} pattern
 * @param {object} options
 * @returns {Promise<any>}
 */
function globAsPromise( pattern, options ) {
  return new Promise(
    function ( resolve, reject ) {
      glob( pattern, options,
        function ( err, files ) {
          if ( err ) {
            reject( err )
          }

          resolve( files )
        }
      )
    }
  )
}

module.exports = globAsPromise
