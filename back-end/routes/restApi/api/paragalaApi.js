  'use strict';

  var express   = require('express')
  var router    = express.Router();
  var app       = express();
  var postDb 		= require('../paragala/postIndex.js');

  router.use(function timeLog( req, res, next) {
    console.log( 'Time: ', Date.now() );
    next();
  })

  app.route( "/users" )
      .get( function(req,res) {
        res.json('OK')
      })
      .post( postDb.login );

  module.exports = app;
