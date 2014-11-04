
  'use strict';

  var mongo = require('../../../../configuration/mongodb');
  var url   = require('url')
  var querystring = require('querystring')

  exports.questionsList = function( req, res ) {
    var query   = url.parse(req.url, true).query;
    var nextUrl = 'paragala/questions?category=entertainment programs&sub=4';
    var previousUrl = 'paragala/questions';


    mongo.db( 'paragala' )
      .collection( 'questions' )
      .findOne({_id: 'paragalaQuestionnaire'})
      .then(function( questionnaire ) {
        if( Object.keys(querystring.parse(query.param)).length == 0 ) {
          questionnaire.questions.splice(1, questionnaire.questions.length - 1)
          questionnaire.questions[0].items.splice( 2, questionnaire.questions[0].items.length - 1 )
        } else {
          var queries = querystring.parse(query.param)

          for( var i = 0; i < questionnaire.questions.length; i++) {
            if(questionnaire.questions[i].title == queries.category.toUpperCase() ) {
              var spliceCounter = 0;
              queries.category = questionnaire.questions[i].title.toLowerCase();
              console.log(questionnaire.questions[i].items.length)
              console.log(parseInt(queries.sub))
              if(questionnaire.questions[i].items.length <= parseInt(queries.sub)) {
                spiceCounter = i - 1;
                queries.category = questionnaire.questions[i+1].title;
                queries.sub = 2;
              } else {
                spliceCounter = i + 1;
              }
              console.log( 'COUNTER: ' + spliceCounter )
              questionnaire.questions.splice( spliceCounter , questionnaire.questions.length - 1)
              questionnaire.questions[i].items.splice( 0, parseInt(queries.sub) )
              // for( var j = 0; j <$rootScope.list[i].items.length; j++ ) {
              //   if(questionnaire.questions[i].items[j].title == subItemTitle ) {
              //     for( var z = 0; z < questionnaire.questions[i].items[j].items.length; z++ ) {
              //       if( questionnaire.questions[i].items[j].items[z].title == SecondSubItemTitle ) {
              //         // console.log( $rootScope.list[i].items[j].items[z] )
              //         // vm.questionBuilder[i].items[j].items[0].title = SecondSubItemTitle
              //       }
              //     }
              //   }
              // }
            }
          }
          previousUrl = 'paragala/questions?category=' + queries.category + '&sub=' + (parseInt(queries.sub) - 2);
          if( parseInt(queries.sub) == 2 ) {
            previousUrl = 'paragala/questions'
          }
          nextUrl = 'paragala/questions?category=' + queries.category + '&sub=' + (parseInt(queries.sub) + 2);
        }
        res.json({questions: questionnaire.questions, previousUrl: previousUrl, nextUrl: nextUrl})
      })
   }
