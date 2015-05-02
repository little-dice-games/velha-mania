var gulp      = require('gulp'),
    jshint    = require('gulp-jshint'),
    stylish   = require('jshint-stylish'),
    jscs      = require('gulp-jscs'),
    karma     = require('karma').server,
    benchmark = require('gulp-bench'),

    jsFiles   = [
        'app.js',
        'config/**/*.js',
        'bench/**/*.js',
        'middlewares/**/*.js',
        'routes/**/*.js',
        'app/assets/javascripts/**/*.js',
        'test/**/*.js',
        'gulpfile.js',
        'karma.conf.js'
    ];

function test(browsers, done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true,
        browsers: browsers
    }, done);
}

gulp.task('jshint', function () {
    return gulp.src(jsFiles)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('jscs', function () {
    return gulp.src(jsFiles)
        .pipe(jscs());
});

gulp.task('test-chrome', function (done) {
    test(['Chrome'], done);
});

gulp.task('test-chrome-canary', function (done) {
    test(['ChromeCanary'], done);
});

gulp.task('test-firefox', function (done) {
    test(['Firefox'], done);
});

gulp.task('test-safari', function (done) {
    test(['Safari'], done);
});

gulp.task('test-travis', ['jshint', 'jscs'], function (done) {
    test(['ChromeTravisCi'], done);
});

gulp.task('test-crossbrowser', [
    'test-chrome',
    'test-chrome-canary',
    'test-firefox',
    'test-safari',
    'test-travis'
]);

gulp.task('tdd', function (done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js'
    }, function () {
        done();
    });
});

gulp.task('benchmark', function () {
    return gulp.src('bench/**/*_bench.js', { read: false })
        .pipe(benchmark());
});

gulp.task('qa', ['jshint', 'jscs', 'test-crossbrowser', 'benchmark']);
gulp.task('test', ['jshint', 'jscs', 'test-chrome']);
gulp.task('default', ['qa']);