 'use strict';

 var express = require('express')
 var router  = express.Router();
 var index   = require('../../restApi');

 router.use(function timeLog( req, res, next) {
   console.log( 'Time: MAIN ', Date.now() );
   next();
 })

 router.get( '/main/index.html',  function( req, res ) {
  res.render( 'main/index.html' )
 })

 router.get( '/main/about/index.html',  function( req, res ) {
  res.render( 'main/about/index.html' )
 })

//  router.get( '/database/index.html',  function( req, res) {
//   console.log( 'database' );
//   res.render( 'database/index.html' )
// })

 module.exports = router;
