  'use strict';

  var express   = require('express')
  var router    = express.Router();
  var app       = express();
  var postDb 		= require( '../admin/postIndex.js' );

  router.use(function timeLog( req, res, next) {
    console.log( 'Time: ', Date.now() );
    next();
  })

  app.route( '/users' )
      .post( postDb.login );

  app.route( '/logout' )
      .post( postDb.logoutAdmin )

  app.route( '/createAdminAccount' )
      .post( postDb.createAdminAccount )
  
  module.exports = app;
