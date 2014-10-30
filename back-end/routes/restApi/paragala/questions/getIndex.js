
  'use strict';

  var mongo = require('../../../../configuration/mongodb');

  exports.questionsList = function( req, res ) {

    mongo.db( 'paragala' )
      .collection( 'questions' )
      .findOne({_id: 'paragalaQuestionnaire'})
      .then(function( questionnaire ) {
        res.json({response: questionnaire.questions})
      })
  }
