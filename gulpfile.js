var gulp = require('gulp');
var webpack = require('webpack');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var reload = browserSync.reload;
var webpackDevMiddleware = require('webpack-dev-middleware');
var stripAnsi            = require('strip-ansi');
var webpackConfig = require('./webpack.config');
var bundler       = webpack(webpackConfig);


var src = {
    sass: 'src/sass/*.sass',
    css:  'docs/css',
    pug: 'src/*.pug',
    html: 'docs/*.html'
};

bundler.plugin('done', function (stats) {
    if (stats.hasErrors() || stats.hasWarnings()) {
        return browserSync.sockets.emit('fullscreen:message', {
            title: "Webpack Error:",
            body:  stripAnsi(stats.toString()),
            timeout: 100000
        });
    }
    browserSync.reload();
});

gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: './docs',
        logFileChanges: false,
        middleware: [
            webpackDevMiddleware(bundler, {
                publicPath: webpackConfig.output.publicPath,
                stats: {colors: true}
            })
        ],
        plugins: ['bs-fullscreen-message'],
    });

    gulp.watch(src.sass, ['sass']);
    gulp.watch(src.pug, ['pug-watch']);
    gulp.watch(src.html).on('change', reload);
});

gulp.task('sass', function() {
    return gulp.src(src.sass)
        .pipe(sass())
        .pipe(gulp.dest(src.css))
        .pipe(reload({stream: true}));
});

gulp.task('templates', function() {

    var YOUR_LOCALS = {
        "message": "This app is powered by gulp.pug recipe for BrowserSync"
    };

    return gulp.src(src.pug)
        .pipe(pug({
            locals: YOUR_LOCALS
        }))
        .pipe(gulp.dest('./docs/'));
});

gulp.task('pug-watch', ['templates'], reload);

gulp.task('default', ['serve']);
