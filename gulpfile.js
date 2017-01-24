var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackConfig = require('./webpack.config');
var bundler = webpack(webpackConfig);
var stripAnsi = require('strip-ansi');

var src = {
    src: './src',
    dist: './docs',
    sass: 'src/sass/*.sass',
    css: 'docs/css',
    csss: 'docs/css/*.css',
    pug: 'src/*.pug',
    html: 'docs/*.html'
};

gulp.task('serve', function() {
    browserSync.init({
        server: src.dist,
        open: true,
        logFileChanges: false,
        middleware: [webpackDevMiddleware(bundler, {
                publicPath: webpackConfig.output.publicPath,
                stats: {
                    colors: true
                }
            })],
        plugins: ['bs-fullscreen-message']
    });

    gulp.watch(src.sass, ['sass']);
    gulp.watch(src.pug, ['pug-watch']);
    gulp.watch(src.csss, ['auto-prefix']);
    gulp.watch(src.html).on('change', reload);
});

gulp.task('sass', function() {
    return gulp.src(src.sass)
    .pipe(sass())
    .pipe(gulp.dest(src.css))
    .pipe(reload({stream: true}));
});

gulp.task('auto-prefix', function() {
    gulp.src(src.csss)
    .pipe(autoprefixer({browsers: ['last 2 versions'], cascade: false}))
    .pipe(gulp.dest(src.css))
});

gulp.task('templates', function() {
    return gulp.src(src.pug)
    .pipe(pug())
    .pipe(gulp.dest(src.dist + '/'));
});

bundler.plugin('done', function(stats) {
    if (stats.hasErrors() || stats.hasWarnings()) {
        return browserSync.sockets.emit('fullscreen:message', {
            title: "Webpack Error:",
            body: stripAnsi(stats.toString()),
            timeout: 100000
        });
    }
    browserSync.reload();
});

gulp.task('pug-watch', ['templates'], reload);
gulp.task('default', ['serve']);
