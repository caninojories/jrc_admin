
  'use strict';

  var express               = require('express'),
      app                   = express(),
      getDbQuestionsAdmin   = require( '../adminPanel/paragala/questions/getIndex.js' ),
      postDbQuestionsAdmin  = require( '../adminPanel/paragala/questions/postIndex.js' ),
      getDbQuestionsClient  = require( '../clientPanel/paragala/questions/getIndex.js' ),
      postDbAddStudent 		  = require( '../clientPanel/paragala/addStudent/postIndex.js' ),
      postDbStudentLogIn    = require( '../clientPanel/paragala/studentLogIn/postIndex.js' ),
      postDbStudentLogOut   = require( '../clientPanel/paragala/studentLogOut/postIndex.js' );

      //putDb     = require( '../admin/putIndex.js' );

  // router.use(function timeLog( req, res, next) {
  //   console.log( 'Time: ', Date.now() );
  //   next();
  // })

  app.route( '/paragalaAddStudent' )
    .post( postDbAddStudent.paragalaAddStudent );

  app.route( '/studentLogin' )
    .post( postDbStudentLogIn.studentLogIn );

  app.route( '/studentLogout' )
    .post( postDbStudentLogOut.studentLogOut)

  app.route( '/questionsUpdate' )
    .put( postDbQuestionsAdmin.questionsUpdate )

  app.route( '/questionsListAdmin' )
    .get( getDbQuestionsAdmin.questionsList )

  app.route( '/questionsListClient' )
    .get( getDbQuestionsClient.questionsList )


  module.exports = app;
