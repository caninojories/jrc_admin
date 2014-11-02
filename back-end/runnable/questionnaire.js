
  var db      = require('promised-mongo')('paragala'),
      Promise = require('bluebird'),
      mongo   = require('../configuration/mongodb');
var promises = [];

  promises.push(
    db.collection('questions').insert({
      _id: 'paragalaQuestionnaire',
      questions: [{
        title: 'Entertainment Programs',
        editing: false,
        items: [{
          title: 'Best Television Actor',
          editing: false,
          items: [{
            title: 'Jericho Rosales',
            editing: false
          }]
        }]
      }]
    })
  )

  Promise.all(promises).then(function () {
    process.exit();
  });
