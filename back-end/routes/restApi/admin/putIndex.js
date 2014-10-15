
  'use strict';

  var mongo    = require('../../../configuration/mongodb'),
      bcrypt   = require('bcrypt-nodejs'),
      url      = require('url');

  exports.adminUpdateProfile = function( req, res ) {
    var query = url.parse(req.url, true).query;
    console.log( req.user )
    mongo.db( 'admin' )
      .collection( 'users' )
      .update({_id: req.user._id}, {_id: query.email, username: query.username, password: bcrypt.hashSync(query.password, bcrypt.genSaltSync(10))})
      .then(function( user ) {
        res.json( {response: 'success'} )
      })
      .catch(function( message ) {
        var error = message.err
        if( message.err.indexOf('_id field cannot be changed') > 0) error = req.flash( 'error', 'Please try another email address or use your existing email address' )
        res.json( {response: req.flash('error')} )
      })
  }
