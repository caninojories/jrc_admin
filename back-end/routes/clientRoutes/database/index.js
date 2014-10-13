  'use strict';

  var express = require('express');
  var router  = express.Router();
  var index   = require('../../restApi');

  router.use(function timeLog( req, res, next ) {
    console.log( 'Time: Database ', Date.now() );
    next();
  })

  router.get( '/database/index.html',  function( req, res) {
    console.log( req.user )
    res.render( 'database/index.html' )
  })

  module.exports = router;
