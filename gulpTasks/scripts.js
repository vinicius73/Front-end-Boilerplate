"use strict";

var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var $ = require('gulp-load-plugins')();

module.exports = function(_options) {

    //-- FRONT
    gulp.task('scripts:main', function() {
        var dest = _options.dest.js;
        var src = _options.sources.js;
        var isProduction = _options.args.production;

        var b = browserify({
            entries: src,
            debug: !isProduction
        });

        return b.bundle()
            .pipe(source('main.js'))
            .pipe(buffer())
            .pipe(_options.notify('Main scripts have been compiled'))
            .pipe($.sourcemaps.init({
                loadMaps: true
            }))
            .pipe($.if(isProduction, $.uglify()))
            .pipe($.if(!isProduction, $.sourcemaps.write('./')))
            .pipe($.header(_options.banner))
            .pipe(gulp.dest(dest));
    });

    //-- VENDORS
    gulp.task('scripts:vendors', function() {
        var dest = _options.dest.js;
        var src = _options.vendors.js;
        var isProduction = _options.args.production;

        return gulp.src(src)
            .pipe($.concat('vendors.js'))
            .pipe(_options.notify('Vendors scripts have been compiled'))
            .pipe($.if(isProduction, $.stripComments()))
            .pipe($.if(!isProduction, $.sourcemaps.init()))
            .pipe($.if(isProduction, $.uglify()))
            .pipe($.if(!isProduction, $.sourcemaps.write('./')))
            .pipe(gulp.dest(dest));
    });

    gulp.task('scripts', ['scripts:main', 'scripts:vendors'])
}