
  'use strict';

  var express = require('express')
  var router  = express.Router();

  router.use(function timeLog( req, res, next) {
    console.log( 'Time: ', Date.now() );
    next();
  })

  router.get( '/adminPanel/paragala/questions/index.html', function(req, res ) {
    res.render( 'adminPanel/paragala/questions/index.html' )
  })

  module.exports = router;
