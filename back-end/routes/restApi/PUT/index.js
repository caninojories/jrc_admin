  "use strict";

  var mongo = require('../../config/mongodb')
  console.log('doc')
  exports.doc = function (req, res) {
  	var dbName 		= req.params.db;
  	var collName 	= req.params.collection;
  	var id 				= req.params.id;
  	var doc 			= req.body.documentId;
  	mongo(dbName, function (db) {
  		db.open(function (err, db) {
  			console.log("doc: " + doc)
  			db.collection(collName).save(doc)
  		})
  	})
  }
