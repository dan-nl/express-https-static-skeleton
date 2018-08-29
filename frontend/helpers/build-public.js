/* eslint-disable max-len,consistent-return,no-sync,global-require */

'use strict'

const config = require( '../../config/build/index' )

/**
 * @typedef {function} fs.copy
 * @typedef {function} fs.emptyDir
 * @typedef {function} fs.mkdirpSync
 * @typedef {function} fs.pathExistsSync
 * @typedef {function} fs.remove
 * @typedef {function} fs.writeFileSync
 */
const fs = require( 'fs-extra' )
const glob = require( './glob-as-promise' )
const hjs = require( 'hjs' )
const log = console.log
const merge = require( 'deepmerge' )
const path = require( 'path' )
const pages_data = require( path.join( config.directories.data, 'pages.js' ) )

/**
 * @returns {undefined}
 */
function buildPublic() {
  log( '[info]', new Date().toISOString(), 'building public directory' )

  fs.remove( config.directories.public )
    .then(
      /**
       * create the public directory if it doesn’t exist
       * empty the public directory if it exists
       *
       * @returns {Promise<any>}
       */
      function () {
        return fs.emptyDir( config.directories.public )
      }
    )
    .then(
      /**
       * copy static assets directly to the public directory
       *
       * @returns {Promise<any>|undefined}
       */
      function () {
        if ( fs.pathExistsSync( config.directories.frontend_static ) ) {
          return fs.copy( config.directories.frontend_static, config.directories.public )
        }
      }
    )
    .then(
      /**
       * gather a partials file list
       *
       * @returns {Promise<any>}
       */
      function () {
        return glob( '**/*.hjs', { cwd: config.directories.partials } )
      }
    )
    .then(
      /**
       * prepare partials object
       *
       * @param {array} files
       * @returns {undefined}
       */
      function ( files ) {
        files.forEach(
          function ( file ) {
            const stat = ( path.parse( file ) )
            const name = stat.dir.split( '/' )

            if ( stat.name !== 'index' ) {
              name.push( stat.name )
            }

            pages_data.partials[ name.join( '.' ) ] = path.join( config.directories.partials, stat.dir, stat.base )
          }
        )
      }
    )
    .then(
      /**
       * gather a pages file list
       *
       * @returns {Promise<any>}
       */
      function () {
        return glob( '**/*.hjs', { cwd: config.directories.pages } )
      }
    )
    .then(
      /**
       * process each page
       * render the page with hjs
       * save the result to the public directory in the corresponding directory and <filename>.html
       *
       * @param {array} files
       * @returns {undefined}
       */
      function ( files ) {
        files.forEach(
          /**
           * @param {string} file
           * @returns {undefined}
           */
          function ( file ) {
            const stat = ( path.parse( file ) )
            let page_data = pages_data
            const page_data_path = path.join( config.directories.data, stat.dir, stat.name + '.js' )

            // add page specific data
            if ( fs.pathExistsSync( page_data_path ) ) {
              page_data = merge( page_data, require( page_data_path ) )
            }

            hjs.renderFile.call(
              {
                /**
                 * hack that allows the use of `hjs` without needing to use the express app context
                 *
                 * @param {string} template_path
                 * @returns {string}
                 */
                lookup( template_path ) {
                  return template_path
                }
              },
              path.join( config.directories.pages, stat.dir, stat.base ), page_data,
              /**
               * @param {Error|null} err
               * @param {string} result
               * @returns {undefined}
               */
              function ( err, result ) {
                if ( err ) {
                  throw err
                }

                fs.mkdirpSync( path.join( config.directories.public, stat.dir ) )
                fs.writeFileSync( path.join( config.directories.public, stat.dir, stat.name + '.html' ), result, 'utf8' )
              }
            )
          }
        )

        log( '[info]', new Date().toISOString(), 'public directory built' )
      }
    )
    .catch(
      function ( err ) {
        console.error( err )
      }
    )
}

module.exports = buildPublic
