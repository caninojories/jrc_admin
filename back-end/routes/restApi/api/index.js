  'use strict';

  var express   = require('express')
  var router    = express.Router();
  var app       = express();
  var getDb 		= require('../mongoDb/getIndex.js');
  // var deleteDb 	= require('../../restApi/DELETE');
  // var postDb 	  = require('../../restApi/POST');

  router.use(function timeLog( req, res, next) {
    console.log( 'Time: ', Date.now() );
    next();
  })

  app.route( "/dbs" )
      .get( getDb.dbs )
      //.post( postDb.db )
      //.delete( deleteDb.db )

  app.route( "/db/:db" )
      .get( getDb.collections )
      //.post( postDb.collections )
      //.delete( deleteDb.collections )

  app.route( "/db/:db/:collection" )
      .get( getDb.listDocuments )
      //.post( postDb.documents )
      //.delete( deleteDb.documents )

  app.route( "/db/:db/:collection/:id" )
      .get( getDb.document )
      //.post( postDb.doc )

  module.exports = app;
