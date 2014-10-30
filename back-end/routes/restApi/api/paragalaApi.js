
  'use strict';

  var express             = require('express'),
      app                 = express(),
      getDbQuestions 		  = require( '../paragala/questions/getIndex.js' ),
      postDbAddStudent 		= require( '../paragala/addStudent/postIndex.js' ),
      postDb              = require( '../paragala/postIndex.js' ),
      postDbQuestions     = require( '../paragala/questions/postIndex.js' );
      //putDb     = require( '../admin/putIndex.js' );

  // router.use(function timeLog( req, res, next) {
  //   console.log( 'Time: ', Date.now() );
  //   next();
  // })

  app.route( '/paragalaAddStudent' )
    .post( postDbAddStudent.paragalaAddStudent );

  app.route( '/studentLogin' )
    .post( postDb.studentLogin );

  app.route( '/questionsUpdate' )
    .put( postDbQuestions.questionsUpdate )

  app.route( '/questionsList' )
    .get( getDbQuestions.questionsList )

  module.exports = app;
