"use strict";
// load all the things we need
var LocalStrategy = require('passport-local').Strategy;
var mongo					= require('./mongodb');
var util					= require('util')

module.exports = function(passport) {
	passport.serializeUser(function(user, done) {
		console.log("SERIALIZER: " + user._id)
    done(null, user._id);
   });

    // used to deserialize the user
  passport.deserializeUser(function(id, done) {

		mongo.db( 'paragala' )
			.collection( 'users' )
			.findOne({_id:id})
			.then(function( user ) {
				done( null, user )
			})
  })

  passport.use('local-login',new LocalStrategy({
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback: true //allows us to pass back the entire request to the callback
		},
			function (req, email, password, done) {
				mongo.db( 'paragala' )
					.collection( 'users' )
					.findOne({'email': email})
					.then(function( user ) {
						console.log("++++++++ Data found with the email " + email)
						if (user == null) {
							console.log('email not found')
							return done(null , false, req.flash('loginMessage', 'No user found.'))
						}
						if(user.password !== password) {
							console.log('password not match')
							return done(null, false , req.flash('loginMessage', 'Opps! Wrong password'))
						}

						console.log("user is been authenticated")
						return done(null, user)
					})
		}
	))
}
