
  'use strict';

  var express               = require('express'),
      app                   = express(),
      getDbQuestionsAdmin   = require( '../adminPanel/paragala/questions/getIndex.js' ),
      getDbQuestionsClient  = require( '../clientPanel/paragala/questions/getIndex.js' ),
      postDbAddStudent 		  = require( '../paragala/addStudent/postIndex.js' ),
      postDb                = require( '../paragala/postIndex.js' ),
      postDbQuestions       = require( '../paragala/questions/postIndex.js' );
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

  app.route( '/questionsListAdmin' )
    .get( getDbQuestionsAdmin.questionsList )

  app.route( '/questionsListClient' )
    .get( getDbQuestionsClient.questionsList )

  module.exports = app;
