
  'use strict';

  var mongo = require('../../../../configuration/mongodb');

  exports.paragalaAddStudent = function( req, res ) {
    console.log( req.body.SN )
    mongo.db( 'paragala' )
      .collection( 'students' )
      .findOne({_id: req.body.SN})
      .then(function( user ) {
        console.log( 'first User: ' + user )
        if( user ) {
          res.json({response: {alreadyRegistered:false}})
        } else {
          console.log( 'else' )
          mongo.db( 'paragala' )
            .collection( 'students' )
            .insert({_id: req.body.SN, vote: 'false'})
            .then(function( user ) {
              console.log( user )
              res.json({response: {alreadyRegistered:true}})
            })
        }
      })
  }
