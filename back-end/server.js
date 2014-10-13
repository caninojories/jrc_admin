  'use strict'

  var express     = require('express'),
      path        = require('path'),
      colors 			= require('colors'),
      passport 		= require('passport'),
      cluster     = require('cluster'),
      numCPUs     = require('os').cpus().length,

      api         = require('./routes/restApi/api'),
      login       = require('./routes/clientRoutes/main'),
      dashboard   = require('./routes/clientRoutes/dashboard'),
      database    = require('./routes/clientRoutes/database'),
      paragala    = require('./routes/clientRoutes/paragala'),
      catchAll    = require('./routes/clientRoutes/all');

    /**
     ** Configuration File NoSQL Database
    ***/
    require('./configuration/mongodb'); //mongodb integration

    /**
     ** Start our Express Server
    ***/
    var app = express();

    /**
     ** Require our Configuration Files
    ***/
    require('./configuration/express')(app);
    require('./configuration/passport')(passport);

    /**
     ** Routes
    ***/
    //require('./config/routes')(app,  passport);

    app.use( '/api', api );
    app.use( '/', login );
    app.use( '/', database );
    app.use( '/', dashboard );
    //app.use( '/paragala', paragala )
    app.use( '*', catchAll );

    /**
     ** Cluster Configuration
    ***/
    var timeouts = [];
      function errorMsg() {
        console.error("Something must be wrong with the connection ...");
      }

    if (cluster.isMaster) {
      // Fork workers.
      for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
      }

      cluster.on('fork', function(worker) {
        timeouts[worker.id] = setTimeout(errorMsg, 2000);
      });

      cluster.on('listening', function(worker, address) {
        //clear the timeout when we successfully listening to the fork
        clearTimeout(timeouts[worker.id]);
        console.log("A worker is now connected to " + address.address + ":" + address.port);
      });

      cluster.on('online', function(worker, address) {
        console.log("the worker is ONLINE after it was forked");
      });

      // cluster.on('exit', function(worker, code, signal) {
      //   clearTimeout(timeouts[worker.id]);
      //   errorMsg();
      // });

      cluster.on('exit', function(worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' died');
      });
    } else {
      app.listen(app.get('port'), function() {
        console.log("listening to port ".cyan + "%s".magenta, app.get('port'))
      })
    }
