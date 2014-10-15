 'use strict';

 var express = require('express')
 var router  = express.Router();
 var index   = require('../../restApi');

 router.use(function timeLog( req, res, next) {
   console.log( 'Time: MAIN ', Date.now() );
   next();
 })

 router.get( '/login/index.html',  function( req, res ) {
  res.render( 'login/index.html' )
 })

 router.get( '/login/about/index.html',  function( req, res ) {
  res.render( 'login/about/index.html' )
 })

 module.exports = router;
