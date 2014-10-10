  'use strict';

  var path  = require('path');
  var fs    = require('fs');
  var util  = require('util')


  /**
   * Send partial, or 404 if it doesn't exist
   */

  exports.partials = function(req, res) {
    //req.session.isLogin = false
    var message = req.flash('loginMessage')
    var stripped = req.url.split('.')[0];
    var url = req.url.split('/');
    var requestedView = path.join('./', stripped);
    //path.join will rid off the forward slash of the url
    console.log('Requested View: ' + requestedView)
    res.render(requestedView, {currentUrl : true, user: req.isAuthenticated(), messages : message, isStudentLogin: req.session.isLogin }, function(err, html) {
      if(err) {
        console.log("Error rendering partial '" + requestedView + "'\n", err);
        res.status(404);
        res.send(404);
      } else {
        console.log("REQ Login : " + req.session.isLogin)
        res.send(html);
      }
    });
  };

  /**
   * Send our single page app
   */
  exports.index = function(req, res) {

    console.log(util.inspect("URL IN INDEX: " + req.hostname, {showHidden: true, depth: null}))
    res.render('index');
  };

