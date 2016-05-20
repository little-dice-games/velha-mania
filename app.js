var express = require('express.io'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),

    home = require('./routes/index'),

    app = express(),
    ConnectMincer = require('connect-mincer'),
    Mincer = require('mincer'),
    env = process.env.NODE_ENV || 'development',
    config = require('./config/' + env),
    mincer,
    livereload;

// livereload
if (env === 'development') {
    livereload = require('express-livereload');
    livereload(app, { watchDir: __dirname + config.watchDir });
}

// Non cached when production
require('./middlewares/mincer/environment')(Mincer, env);

// assets
mincer = new ConnectMincer({
    mincer: Mincer,
    root: __dirname,
    production: env === 'production',
    mountPoint: 'assets',
    manifestFile: __dirname + '/public/assets/manifest.json',
    paths: config.assetsPath,
    precompile: env !== 'test'
});

app.use(mincer.assets());

// if (env === 'production') {
//     app.use(express.static(__dirname + '/public'));
// } else {
    app.use('/assets', mincer.createServer());
// }

// view engine setup
app.set('views', path.join(__dirname, config.viewsPath));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', home);
app.use('/users/', home);
app.use('/play/', home);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(app.get('port'), function () {
    var users = [];

    require('./routes/root_socket')(app, users);
    require('./routes/users_socket')(app, users);
    require('./routes/games_socket')(app, users);
});

module.exports = app;
