"use strict";

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

module.exports = function (_options) {
    gulp.task('scripts:vendor', function () {
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
}