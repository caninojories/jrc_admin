  'use strict';

  var express = require('express');
  var router  = express.Router();
  var index   = require('../../restApi');

  router.use(function timeLog( req, res, next) {
    console.log( 'Time: ', Date.now() );
    next();
  })

  router.get( '*',  function(req, res) {
   res.render( 'index.html' )
  })

  module.exports = router;
