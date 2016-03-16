const gulp = require('gulp');
const webpack = require('webpack');
const browserSync = require('browser-sync').create();

// Static server
gulp.task('browser-sync', ['webpack'], function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('webpack', function (done) {
    webpack(require('./webpack.config.js'), function () {
        browserSync.reload();
        done();
    });
});

gulp.watch(['./components/**/*.js', './common/**/*.js', './entry.js'], ['webpack']);
gulp.watch(['./components/**/*.css', './globals-styles/*.css'], browserSync.reload);
gulp.watch('./index.html', browserSync.reload);

gulp.task('default', ['browser-sync']);