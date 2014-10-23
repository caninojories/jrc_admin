
  'use strict';

  var express = require('express')
  var router  = express.Router();
  var index   = require('../../restApi');

  router.use(function timeLog( req, res, next) {
    console.log( 'Time: ', Date.now() );
    next();
  })

  router.get( '/paragala/index.html', function( req, res ) {
   res.render( 'paragala/index.html' )
  })

  router.get( '/paragala/addStudent/index.html', function( req, res ) {
    res.render( 'paragala/addStudent/index.html', res.adminCredentials )
  })

  module.exports = router;
