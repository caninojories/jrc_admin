  "use strict";

  var mongo = require('../../../configuration/mongodb')

  var formatDbResponse = function(db){
    return {
      name : db,
      details : db,
      type : "database"
    };
  };

  //list of all databases
  exports.db = function (req,res) {
    var dbName = req.body.name;
    if(!dbName) throw({error : "Need a database name"});
    mongo(dbName, function(db){
      db.open(function (err, db) {
        db.createCollection("users",function(err,result){
          res.json(formatDbResponse(dbName));
        });
      })
    });
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
