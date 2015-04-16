'use strict';

var express = require('express.io'),
    path = require('path'),
    logger = require('morgan'),
    ConnectMincer = require('connect-mincer'),
    Mincer = require('mincer');

var app = express();
var index = require('./routes/index');
app.http().io();

// assets
var mincer = new ConnectMincer({
  mincer: Mincer,
  root: __dirname,
  production: false,
  mountPoint: 'assets',
  paths: [
    '../../vendor/assets/javascripts/bower_components',
    '../../app/assets/javascripts',
    '../../node_modules',
    './assets/javascripts',
    './assets/stylesheets'
  ],

  precompile: true
});

app.use(mincer.assets());
app.use('/assets', mincer.createServer());

app.use(express.static(__dirname + '/public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use('/', index);

app.use(logger('dev'));

var server = app.listen(3001, function() {
  console.log('Express server listening on port ' + server.address().port);
})

module.exports = app;