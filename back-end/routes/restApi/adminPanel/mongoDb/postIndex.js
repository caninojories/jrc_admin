  "use strict";

  var mongo = require('../../../../configuration/mongodb');
  var ObjectId  = require('mongodb').ObjectID;
  var util  = require('util');

  exports.dbs = function ( req, res ) {
    if(!req.body.name) throw({error : "Need a database name"});
    mongo.db( req.body.name )
      .createCollection('users')
      .then(function( user ) {
        res.json( {name: 'user', url: 'database/user'} )
      })
  }

  exports.collections = function ( req, res ) {
    var uri = 'database/' + req.params.db + '/'
    mongo.db( req.params.db )
      .createCollection( req.body.name )
      .then(function( collection ) {
        res.json( {name: collection, url: uri + collection} )
      })
  }


  exports.documents = function( req, res ) {
    mongo.db( req.params.db )
      .collection( req.params.collection )
      .insert({_id: req.body.name})
      .then(function( document ) {
        res.json({sucess: 'success'})
      })
  }

  exports.doc = function ( req, res ) {
    var update = {};
    for (var i in req.body.documentId) {
      // console.log(i === '_id');
      console.log(i === '__v');
      if (i !== '_id') {
        if (i !== '__v') {
          update[i] = req.body.documentId[i];
        }
      }
    }
    var dbName 		= req.params.db;
    var collName 	= req.params.collection;
    var id 				= req.params.id;
    var doc 			= req.body.documentId;

    console.log(update);
    mongo.db( req.params.db )
      .collection( req.params.collection )
      .findAndModify({
        query: {'_id': ObjectId.isValid(req.body.documentId._id.toString())? new ObjectId(req.body.documentId._id.toString()): req.body.documentId._id.toString()},
        update: update,
        new: true
      })
      .then(function( document ) {
        res.json({sucess: 'success'});
      });
  };
