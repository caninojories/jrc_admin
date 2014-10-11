  "use strict";

  var mongo = require('../../../configuration/mongodb');
  var util  = require('util');

  exports.dbs = function ( req, res ) {
    if(!req.body.name) throw({error : "Need a database name"});
    mongo.db( req.body.name )
      .createCollection('users')
      .then(function( user ) {
        res.json( {name: 'user', url: 'database/user'} )
      })
  }

  exports.collections = function (req, res) {
  //adds a collection
  var collectionName = req.body.name;
  var dbName = req.params.collection;
  var out = {};
  mongo(dbName, function(db){
    db.open(function (err, db) {
      db.createCollection(collectionName, function(err,result){
        res.send('success')
      });
    })
  });
  }


  exports.documents = function(req, res) {
  //add a document
  var documentName = req.body.name;
  var dbName = req.params.db;
  var collName = req.params.collection

  mongo(dbName, function (db) {
    db.open(function (err, db) {
      db.collection(collName).insert({_id: documentName})
      res.json({sucess: 'success'})
    })
  })
  }

  exports.doc = function (req, res) {
  var dbName 		= req.params.db;
  var collName 	= req.params.collection;
  var id 				= req.params.id;
  var doc 			= req.body.documentId;
  mongo(dbName, function (db) {
    db.open(function (err, db) {
      console.log("doc: " + doc)
      db.collection(collName).save(doc)
      res.json({sucess: 'success'})
    })
  })
  }
