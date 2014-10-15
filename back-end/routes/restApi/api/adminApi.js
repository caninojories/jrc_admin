  'use strict';

  var express   = require('express'),
      router    = express.Router(),
      app       = express(),
      getDb 		= require( '../admin/getIndex.js' ),
      postDb 		= require( '../admin/postIndex.js' ),
      putDb     = require( '../admin/putIndex.js' );

  // router.use(function timeLog( req, res, next) {
  //   console.log( 'Time: ', Date.now() );
  //   next();
  // })

  app.route( '/users' )
    .post( postDb.login );

  app.route( '/logout' )
    .post( postDb.logoutAdmin )

  app.route( '/createAdminAccount' )
    .post( postDb.createAdminAccount )

  app.route( '/adminProfile' )
    .get( getDb.adminProfile )

  app.route( '/adminUpdateProfile' )
    .get(function( req, res) {
      res.json('OK')
    })
    .put( putDb.adminUpdateProfile )

  module.exports = app;
