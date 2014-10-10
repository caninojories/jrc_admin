  "use strict";

  var mongo = require('../../../configuration/mongodb')
  var _     = require('underscore')._

  //list of all databases
  exports.db = function(req,res){
    var dbName = req.query.name
    console.log('DBNAME: ' + dbName)
    if(!dbName) throw {error : "Need a db to delete"}
    mongo(dbName, function(db){
      db.open(function (err, db) {
        db.dropDatabase(function(err,result){
          if(err) throw({error : err});
            res.send('success')
        })
      })
    })
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
