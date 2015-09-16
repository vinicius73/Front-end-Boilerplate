"use strict";

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

module.exports = function (_options) {
    // -- FONTS
    gulp.task('clean:fonts', function () {
        var src = _options.dest.fonts;

        return gulp.src(src, {read: false})
            .pipe($.clean())
    });

    // -- IMAGES
    gulp.task('clean:images', function () {
        var src = _options.dest.images;

        return gulp.src(src, {read: false})
            .pipe($.clean())
    });

    gulp.task('clean', ['clean:fonts', 'clean:images']);
}