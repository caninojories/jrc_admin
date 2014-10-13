  "use strict";

  var mongo = require('../../../configuration/mongodb')
  var _     = require('underscore')._

  exports.dbs = function(req,res){
    if(!req.query.name) throw {error : "Need a db to delete"}
    mongo.db( req.query.name )
      .dropDatabase()
      .then(function( dbName ) {
        res.json( dbName )
      })
    // mongo(dbName, function(db){
    //   db.open(function (err, db) {
    //     db.dropDatabase(function(err,result){
    //       if(err) throw({error : err});
    //         res.send('success')
    //     })
    //   })
    // })
  }

  exports.collections = function(req,res) {
    var dbName = req.params.collection;
    var collectionName = req.query.name;
    mongo(dbName, function(db){
      db.open(function (err, db) {
        db.dropCollection(collectionName,function(err,result){
          res.send('success')
        });
      })
    });
  }

  exports.documents = function (req, res) {
    var dbName = req.params.db;
    var collName = req.params.collection;
    var documentName = req.query.name;

    mongo(dbName, function(db) {
      db.open(function (err,db) {
        db.collection(collName).remove({_id: documentName})
        res.send('Ok')
      })
    })
  }
