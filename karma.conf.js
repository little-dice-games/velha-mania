module.exports = function (config) {
    var bowerComponentsPath = 'vendor/assets/javascripts/bower_components/',
        appJsPath           = 'app/assets/javascripts/';

    config.set({
        basePath: '',
        frameworks: ['browserify', 'mocha'],

        files: [
            'https://cdn.socket.io/socket.io-1.3.5.js',
            bowerComponentsPath + '/chai/chai.js',
            bowerComponentsPath + 'sinon/lib/sinon.js',
            bowerComponentsPath + 'sinon/lib/sinon/util/core.js',
            bowerComponentsPath + 'sinon/lib/sinon/extend.js',
            bowerComponentsPath + 'sinon/lib/sinon/typeOf.js',
            bowerComponentsPath + 'sinon/lib/sinon/times_in_words.js',
            bowerComponentsPath + 'sinon/lib/sinon/spy.js',
            bowerComponentsPath + 'sinon/lib/sinon/call.js',
            bowerComponentsPath + 'sinon/lib/sinon/behavior.js',
            bowerComponentsPath + 'sinon/lib/sinon/stub.js',
            bowerComponentsPath + 'sinon/lib/sinon/mock.js',
            bowerComponentsPath + 'sinon/lib/sinon/collection.js',
            bowerComponentsPath + 'sinon/lib/sinon/assert.js',
            bowerComponentsPath + 'sinon/lib/sinon/sandbox.js',
            bowerComponentsPath + 'sinon/lib/sinon/test.js',
            bowerComponentsPath + 'sinon/lib/sinon/test_case.js',
            bowerComponentsPath + 'sinon/lib/sinon/match.js',
            bowerComponentsPath + 'sinon/lib/sinon/format.js',
            bowerComponentsPath + 'sinon/lib/sinon/log_error.js',

            bowerComponentsPath + 'jquery/dist/jquery.js',
            bowerComponentsPath + 'underscore/underscore.js',
            bowerComponentsPath + 'backbone/backbone.js',
            bowerComponentsPath + 'backbone.babysitter/lib/backbone.babysitter.js',
            bowerComponentsPath + 'backbone.wreqr/lib/backbone.wreqr.js',
            bowerComponentsPath + 'marionette/lib/backbone.marionette.js',
            bowerComponentsPath + 'marionette-formview/dist/FormView.js',
            bowerComponentsPath + 'backbone.localStorage/backbone.localStorage.js',
            bowerComponentsPath + 'backbone.mutators/backbone.mutators.js',
            bowerComponentsPath + 'backbone.routefilter/dist/backbone.routefilter.js',
            bowerComponentsPath + 'js-md5/js/md5.js',
            bowerComponentsPath + 'jade/runtime.js',
            bowerComponentsPath + 'materialize/dist/js/materialize.js',
            bowerComponentsPath + 'easeljs/lib/easeljs-0.7.1.min.js',

            appJsPath + 'config/**/*.js',
            appJsPath + 'application.js',
            appJsPath + 'backbone/app.js',
            appJsPath + 'backbone/lib/utilities/**/*.js',
            appJsPath + 'backbone/lib/controllers/**/*.js',
            appJsPath + 'backbone/lib/components/**/*.js',
            appJsPath + 'backbone/entities/**/*.js',
            appJsPath + 'backbone/behaviors/behaviors.js',
            appJsPath + 'backbone/behaviors/form_behavior.js',
            appJsPath + 'backbone/apps/**/*.js',
            'test/_setup.js',
            'test/**/*test.js'
        ],

        browserify: {
            debug: true
        },

        preprocessors: {
            'test/**/*test.js': ['browserify']
        },

        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browserNoActivityTimeout: 10000,
        customLaunchers: {
            ChromeTravisCi: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        },

        singleRun: false
    });
};