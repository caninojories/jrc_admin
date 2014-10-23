  'use strict';

  var express   = require('express'),
      app       = express(),
      //getDb 		= require( '../admin/getIndex.js' ),
      postDb 		= require( '../paragala/addStudent/postIndex.js' );
      //putDb     = require( '../admin/putIndex.js' );

  // router.use(function timeLog( req, res, next) {
  //   console.log( 'Time: ', Date.now() );
  //   next();
  // })

  app.route( '/paragalaAddStudent' )
    .get(function( req, res ) {
      res.json('OK')
    })
    .post( postDb.paragalaAddStudent );

  module.exports = app;
