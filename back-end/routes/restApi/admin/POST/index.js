"use strict";

var mongo 	= require('../../../config/mongodb'),
	  mongodb	= require('mongodb');

exports.user = function (req, res) {
	var SN 		= req.session.SN
	var data 	= req.body.data;
	console.log("SN: " + req.session.SN)

	mongo('paragala', function (db) {
		console.log("PARAGALA STUDENT")
		db.open(function (err, db) {
			if(err) throw err
			db.collection('student').update( {_id: SN}, {isAlreadyVoted: "true", data: data}, function (err, doc) {
				res.json({response: 'success'})
			})
		})
	})
}


exports.addStudent = function (req, res) {
	var SN = req.body.SN;
	if(SN == undefined)
		return false
	mongo("paragala", function (db) {
		db.open(function (err, db) {
			if(err) throw err;
			SN = SN.toString();
			db.collection('student').findOne({_id: SN}, function (err, doc) {
				if(doc)
					res.json({response: 'isAlreadyRegistered'})
				else {
					db.collection('student').insert({_id: SN, isAlreadyVoted: "false"}, function (err, doc) {
						res.json({response: 'notYetVoted'})
					})
				}
			})

		})
	})

}
