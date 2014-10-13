  'use strict';

  var express = require('express');
  var router  = express.Router();
  var index   = require('../../restApi');

  router.use(function timeLog( req, res, next ) {
    console.log( 'Time: Database ', Date.now() );
    next();
  })

  router.get( '/dashboard/index.html',  function( req, res) {
    res.render( 'dashboard/index.html' )
  })

  module.exports = router;
