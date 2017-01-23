var gulp = require('gulp');
var webpack = require('webpack-stream');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var reload = browserSync.reload;

gulp.task('default', function() {
    return gulp.src('src/index.js').pipe(webpack(require('./webpack.config.js'))).pipe(gulp.dest('docs/'));
});

var src = {
    sass: 'src/sass/*.sass',
    css:  'docs/css',
    html: 'docs/*.html'
};

// Static Server + watching sass/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./docs"
    });

    gulp.watch(src.sass, ['sass']);
    gulp.watch(src.html).on('change', reload);
});

// Compile sass into CSS
gulp.task('sass', function() {
    return gulp.src(src.sass)
        .pipe(sass())
        .pipe(gulp.dest(src.css))
        .pipe(reload({stream: true}));
});

gulp.task('default', ['serve']);
