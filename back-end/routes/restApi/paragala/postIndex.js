
  'use strict';

  var passport = require('passport');

  exports.login = function ( req, res, next ) {
    console.log( 'paragala' )
    passport.authenticate('local-login', function (err, user, info) {
      var error = req.flash('loginMessage');
      if (err) { return next(err); }
      if(user) {
        return req.logIn(user, function(err) {
          req.session.isAdminLogin = true;
          return res.json( {valid: 'success', adminUser: req.isAuthenticated()} )
        });
      }
      if (!user) {
        return res.json( {  valid: error.toString() } );
      } else {
        return res.json( { valid: error.toString() } )
      }
    })(req, res, next);
  }
