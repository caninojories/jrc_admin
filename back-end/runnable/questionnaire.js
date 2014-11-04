
  var db      = require('promised-mongo')('paragala'),
      Promise = require('bluebird'),
      mongo   = require('../configuration/mongodb');
var promises = [];

  promises.push(
    db.collection('questions').insert({
      _id: 'paragalaQuestionnaire',
      questions: [{
        title: 'ENTERTAINMENT PROGRAMS',
        editing: false,
        items: [{
          title: 'Best Television Actor',
          editing: false,
          items: [{
            title: 'Jericho Rosales in The Legal Wife(ABS-CBN)',
            editing: false
          }, {
            title: 'Alden Richard in Carmela(GMA)',
            editing: false
          },{
            title: 'Coco Martin in Ikaw Lamang(ABS-CBN)',
            editing: false
          }, {
            title: 'Aljur Abrenica in Kambal Sirena(GMA)',
            editing: false
          }, {
            title: 'Enrique Gil in Mirabella(ABS-CBN)',
            editing: false
          }, {
            title: 'Paulo Avelino in Sana Bukas pa ang Kahapon(ABS-CBN)',
            editing: false
          }, {
            title: 'Richard Yap in Be Carefull with my Heart(ABS-CBN)',
            editing: false
          }, {
            title: 'Alwyn Uytingco in Beki Boxer(TV5)',
            editing: false
          }]
        }, {
          title: 'Best Television Actress',
          editing: false,
          items: [{
            title: 'Angel Locsin in The Legal Wife(ABS-CBN)',
            editing: false
          }, {
            title: 'Maja Salvador in The Legal Wife(ABS-CBN)',
            editing: false
          }, {
            title: 'Marian Rivera in Carmela(GMA)',
            editing: false
          }, {
            title: 'Jennylyn Mercado in Rhodora X(GMA)',
            editing: false
          }, {
            title: 'Anne Curtis in Dyesebel(ABS-CBN)',
            editing: false
          }, {
            title: 'Jodi Sta Maria in Be Carefull with my Heart(ABS-CBN)',
            editing: false
          }, {
            title: 'Bea Alonzo in Sana Bukas pa ang Kahapon(ABS-CBN)',
            editing: false
          }, {
            title:  'Kim Chui in Ikaw Lamang(ABS-CBN)',
            editing: false
          }]
        }, {
          title: 'Best Male Child Performer',
          editing: false,
          items: [{
            title: 'James "Bimbi" Yap in My little Bossings',
            editing: false
          }, {
            title: 'David Remo in Nino(GMA)',
            editing: false
          }, {
            title: 'JM Ibanez in Be Careful with my Heart(ABS-CBN)',
            editing: false
          }, {
            title: 'Clarrence Delgado in Home Sweetie Home(ABS-CBN)',
            editing: false
          }, {
            title: "Bugoy Cariño in Goin' Bulilit (ABS-CBN)",
            editing: false
          }]
        }]
      }, {
        title: 'NEWS PROGRAMS',
        editing: false,
        items: [{
          title: 'Best Morning Show',
          editing: false,
          items: [{
            title: 'Umagang Kay Ganda(ABS-CBN)',
            editing: false
          }, {
            title: 'Unang Hirit(GMA)',
            editing: false
          }, {
            title: 'Good Morning Club(TV5)',
            editing: false
          }]
        }, {
          title: 'Best Morning Show Host',
          editing: false,
          items: [{
            title: 'Anthony Taberna in Umagang Kay Ganda(ABS-CBN)',
            editing: false
          }, {
            title: 'Bernadette Sembrano in Umagang Kay Ganda(ABS-CBN)',
            editing: false
          }, {
            title: 'Arnold Clavio in Unang Hirit(GMA)',
            editing: false
          }, {
            title: 'Rhea Santos in Unang Hirit(GMA)',
            editing: false
          }, {
            title: 'Cheryl Cosim in Good Morning Club(TV5)',
            editing: false
          }]
        }]
      }]
    })
  )

  Promise.all(promises).then(function () {
    process.exit();
  });
