
  'use strict';

  var passport  = require('passport');
  var uuid      = require('node-uuid');
  var mongo     = require('../../../configuration/mongodb');

  exports.studentLogin = function ( req, res, next ) {
    console.log(req.body);

    mongo.db( 'paragala' )
      .collection( 'students' )
      .findOne( {'_id': req.body.studentNumber.toString()} )
      .then(function( paragalaUser ) {
        console.log( 'ParagalaUser: ' +  paragalaUser );
        if( paragalaUser ) {
          mongo.db( 'sessions' )
            .collection( 'sessions' )
            .insert({
              _id: req.body.studentNumber,
              token: uuid.v4()
            })
            .then(function( session ) {
              res.cookie( 'auth_token', session.token , {httpOnly: true})
              res.send(200)
            })
        }
      })
  }
