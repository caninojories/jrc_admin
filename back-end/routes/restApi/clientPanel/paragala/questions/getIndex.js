
  'use strict';

  var mongo = require('../../../../../configuration/mongodb');
  var url   = require('url')
  var querystring = require('querystring')

  //admin
  exports.questionsList = function( req, res ) {
    console.log( 'URL: ' +  req.url )
    var query   = url.parse(req.url, true).query;
    var nextUrl = 'paragala/questions?category=entertainment programs&sub=2';
    var previousUrl = 'paragala/questions';


    mongo.db( 'paragala' )
      .collection( 'questions' )
      .findOne({_id: 'paragalaQuestionnaire'})
      .then(function( questionnaire ) {
        var spliceCategory = 0;
        var spliceSubItem  = 0;
        var querySubTemp   = 2;
        var spliceSubTemp  = null;
        var questionnaireLength = null;
        var queries = querystring.parse(query.param);

        for( var i = 0; i < questionnaire.questions.length; i++) {
          if(questionnaire.questions[i].title == queries.category.toUpperCase() ) {
            console.log( questionnaire.questions[i].title )
            queries.category = questionnaire.questions[i].title.toLowerCase();
            questionnaireLength = questionnaire.questions[i].items.length % 2 == 0?
                                  questionnaire.questions[i].items.length: questionnaire.questions[i].items.length + 1;
            if( questionnaireLength == parseInt(queries.sub) ) {
              if( questionnaire.questions.length !== (i + 1) ) {
                queries.category = questionnaire.questions[i+1].title;
                nextUrl     = 'paragala/questions?category=' + queries.category.toLowerCase() + '&sub=' + querySubTemp;
              } else {
                console.log( 'sub 2' )
                queries.category = questionnaire.questions[i].title;
                nextUrl     = 'paragala/questions?category=' + queries.category.toLowerCase() + '&sub=' + (parseInt(queries.sub));
              }
              previousUrl = 'paragala/questions?category=' + questionnaire.questions[i].title.toLowerCase() + '&sub=' + (parseInt(queries.sub) - 2);
            } else {
              querySubTemp = (parseInt(queries.sub));
            }

            if( (parseInt(queries.sub)) == 2) {
              spliceSubItem = 2;
              spliceSubTemp = questionnaire.questions[i].items.length - 2;
              nextUrl = 'paragala/questions?category=' + queries.category.toLowerCase() + '&sub=' + (querySubTemp + 2);
              if( i == 0) {
                previousUrl = 'paragala/questions?category=' + queries.category + '&sub=2';
              } else {
                if( questionnaireLength !== parseInt(queries.sub) ) {
                  previousUrl = 'paragala/questions?category=' + questionnaire.questions[i - 1].title.toLowerCase() + '&sub=' +
                                (questionnaire.questions[i - 1].items.length % 2 == 0?
                                questionnaire.questions[i - 1].items.length: questionnaire.questions[i - 1].items.length + 1);
                  nextUrl     = 'paragala/questions?category=' + queries.category + '&sub=' + (querySubTemp + 2);
                }
              }
            } else {
              spliceSubItem = 0;
              spliceSubTemp = questionnaire.questions[i].items.length - (questionnaire.questions[i].items.length % 2 == 0? 2:1);
            }

            if( i == 0 ) {
              spliceCategory = i + 1;
            } else {
              spliceCategory = i - 1;
            }
            console.log( spliceCategory )
            questionnaire.questions.splice( spliceCategory , questionnaire.questions.length - 1)
            questionnaire.questions[0].items.splice( spliceSubItem, spliceSubTemp )

          }
        }
        res.json({questions: questionnaire.questions, previousUrl: previousUrl, nextUrl: nextUrl})
      })
   }

   //client
   exports.studentQuestionList = function( req, res ) {
     mongo.db( 'paragala' )
      .collection( 'students' )
      .findOne({_id: req.session.studentUser})
      .then(function( student ) {
        res.json({questions: student.questions})
      })
   }
