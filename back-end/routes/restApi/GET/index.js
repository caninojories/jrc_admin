  "use strict";

  var mongo = require('../../../configuration/mongodb')
  var mongodb = require('mongodb')
  var ObjectId = require('mongodb').ObjectID
  var _     = require('underscore')._
  var util  = require('util')
  var url = require('url');
  var fs = require('fs');


  var formatDbResponse = function(db){
    return {
      name : db,
      details : 'database/' + db,
      type : "database"
    };
  };

  //list of all databases
  exports.dbs = function (req, res) {
    var out = [];
    var search = url.parse(req.url, true).search
    mongo("admin",function(db){
      db.open (function(err, db) {
          var adminDb = db.admin();
          adminDb.listDatabases(function(err,result){
        _.each(result.databases,function(item){
          if (item.name != 'undefined')
          out.push(formatDbResponse(item.name));
        });
        res.json(out);
      });
      })
    });

  }

  exports.collections = function (req, res) {
    var dbName = req.params.collection;
    var out = [];

    mongo(dbName, function(db){
      db.open( function (err, db) {
        db.collectionNames(function(err,collNames){
          _.each(collNames, function(collName){
            var cleanName = collName.name.replace(dbName + ".","");
            var formatted = {
              name : cleanName,
              details : 'database/' + dbName + "/" + cleanName,
              database : dbName,
              type : "collection"
            };
            if(cleanName != "system.indexes")
              out.push(formatted);
          });
          res.json(out);
        });
      })
    });
  }

  exports.listDocuments = function (req, res) {
    var dbName = req.params.db;
    var collName = req.params.collection;
    var out = [];
    mongo(dbName, function (db) {
      db.open(function () {
        db.collection(collName).find().toArray(function(err,items) {
          _.each(items,function(item) {
            var formatted = {
              name : item._id,
              details : "database/" + dbName + "/" + collName + "/" + item._id
            };
            out.push(formatted)
          });
          res.json(out);
        });
      })
    })
  }

  exports.document = function (req, res) {
    var dbName = req.params.db;
    var id = req.params.id;
    var collName = req.params.collection;
    var out = []
    mongo(dbName, function(db){
      db.open(function (err, db) {
        db.collection(collName).findOne({'_id': id},function(err,doc){
          var format = {
            document: doc
          }
          out.push(format)
          res.json(doc);
        });
      })
    });
  }
