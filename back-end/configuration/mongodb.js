"use strict";

var mongo  = require('mongodb').Db;
var server = require('mongodb').Server
var Promise = require('bluebird');
var bodyParser = Promise.promisify(require('body-parser').json());


exports.db = function ( dbName, next ) {
  var db  = require( 'promised-mongo' )( process.env.MONGODB || 'mongodb://localhost:27017/admin');
  return db;
}

// function params( req, res ) {
//   return bodyParser( req, res ) {
//     return _.merge({}, req.query, req.params, req.body);
//   }
// }
