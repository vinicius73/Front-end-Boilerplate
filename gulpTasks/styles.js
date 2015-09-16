"use strict";

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var sass = require('gulp-sass');

module.exports = function (_options) {
    //-- FRONT
    gulp.task('styles:main', function () {
        var dest = _options.dest.css;
        var src = _options.sources.sass;
        var isProduction = _options.args.production;

        return gulp.src(src)
            .pipe($.if(!isProduction, $.sourcemaps.init()))
            .pipe(sass().on('error', sass.logError))
            .pipe(_options.notify('Styles have been compiled'))
            .pipe($.if(isProduction, $.stripCssComments({preserve:false})))
            .pipe($.if(isProduction, $.csso()))
            .pipe($.if(!isProduction, $.sourcemaps.write('./')))
            .pipe($.header(_options.banner))
            .pipe(gulp.dest(dest));
    });
}