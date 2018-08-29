'use strict'

const express = require( 'express' )
const errorHandlers = require( './request-handlers/error-handlers' )
const requestHandlers = require( './request-handlers/index' )
const app = express()

require( '../frontend/helpers/build-public' )()

requestHandlers( app )
app.use( express.static( 'public' ) )
errorHandlers( app )

module.exports = app
