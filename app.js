var express = require('express.io');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var home = require('./routes/index');
var users = require('./routes/users');

var app = express();
var ConnectMincer = require('connect-mincer');
var Mincer = require('mincer');
var env = process.env.NODE_ENV;

// assets
var mincer = new ConnectMincer({
  mincer: Mincer,
  root: __dirname,
  production: env === 'production' || env === 'staging',
  mountPoint: 'assets',
  manifestFile: __dirname + '/public/assets/manifest.json',
  paths: [
    'app/assets/images',
    'app/assets/stylesheets',
    'app/assets/javascripts',
    'vendor/assets/javascripts/bower_components'
  ],
  // precompiling can take a long time: when testing, you may want to turn it off
  precompile: env !== 'test'
});

app.use(mincer.assets());

if (env === 'production' || env === 'staging') {
  app.use(express.static(__dirname + '/public'));
} else {
  app.use('/assets', mincer.createServer());
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', home);
app.use('/users/', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(app.get('port'), function() {
    var users = [];

    require('./routes/root_socket')(app, users);
    require('./routes/users_socket')(app, users);
    require('./routes/games_socket')(app, users);
});

module.exports = app;