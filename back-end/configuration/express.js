'use strict';

var express         = require('express'),
    path            = require('path'),
    favicon         = require('serve-favicon'),
    logger          = require('morgan'),
    cookieParser    = require('cookie-parser'),
    bodyParser      = require('body-parser'),
    methodOverride  = require('method-override'),
    multer          = require('multer'),
    session         = require('express-session'),
    passport        = require('passport'),
    LocalStrategy   = require('passport-local').Strategy,
    nunjucks        = require('nunjucks'),
    flash           = require('connect-flash'),

    mongo           = require('./mongodb'),
    MongoStore      = require('connect-mongo')(session),

    rootPath        = path.normalize(__dirname + '/../../'),
    env             = new nunjucks.Environment(new nunjucks.FileSystemLoader( path.join(rootPath, 'views') ));


  /**
   ** Express Configuration
  ***/
  module.exports = function (app) {
    env.express( app )
    nunjucks.configure(path.join(rootPath, 'front-end/views'), {
      autoescape: true,
      express: app,
      watch: true,
      tags: {
        variableStart: '<$',
        variableEnd: '$>',
      }
    });
    app.set('port', process.env.PORT || 3001)
    app.set('view engine', 'html');
    app.use(favicon(rootPath + 'front-end/resources/favicon.ico'))
    app.use(logger('dev'));
    app.use(methodOverride());
    app.use(cookieParser());
    app.use(session({
                    store: new MongoStore({
                       db: 'paragala'
                    }),
                    secret: 'joriescanino',
                    saveUninitialized: true,
                    resave: true}))
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(bodyParser.json());
    app.use(multer());
    app.use('/css', express.static(path.join(rootPath, 'front-end/resources/css')))
    app.use('/fonts', express.static(path.join(rootPath, 'front-end/resources/fonts')))
    app.use('/img', express.static(path.join(rootPath,  'front-end/resources/img')))
    app.use('/js', express.static(path.join(rootPath, 'front-end/resources/js')))
    app.use('/compileCss', express.static(path.join(rootPath, 'front-end/.tmp')))
    app.use('/bower_components', express.static(path.join(rootPath, 'front-end/bower')))
    app.use('/commonsHtml', express.static(path.join(rootPath, 'front-end/views/commons')))
    app.use(flash()); /*make this module work!!!OK*/
  }
