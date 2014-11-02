
  'use strict';

  var express = require('express')
  var router  = express.Router();
  var index   = require('../../restApi');
  var cookieParser = require('cookie').parse;

  router.use(function timeLog( req, res, next) {
    console.log( 'Time: ', Date.now() );
    next();
  })

  router.get( '/paragala/index.html', studentIsAuthenticated, function( req, res ) {
   res.render( 'paragala/index.html' )
  })

  router.get( '/paragala/addStudent/index.html', function( req, res ) {
    res.render( 'paragala/addStudent/index.html', res.adminCredentials )
  })

  router.get( '/paragala/questions/index.html', function(req, res ) {
    res.render( 'paragala/questions/index.html' )
  })

  function studentIsAuthenticated( req, res, next ) {
    console.log( 'COOKIES: ' + req.session.studentUser );
    if( !req.session.studentUser ) return next();
    res.redirect('/adminPanel/paragala/questions/index.html')
  }

  module.exports = router;
