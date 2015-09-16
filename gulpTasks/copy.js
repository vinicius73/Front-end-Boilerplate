"use strict";

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

module.exports = function (_options) {
    // -- FONTS
    gulp.task('copy:fonts', function () {
        var dest = _options.dest.fonts;
        var src = _options.sources.fonts;

        return gulp.src(src)
            .pipe($.flatten())
            .pipe(gulp.dest(dest));
    });

    gulp.task('copy:images', function () {
        var dest = _options.dest.images;
        var src = _options.sources.images;

        return gulp.src(src)
        .pipe($.imagemin({
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
                optimizationLevel: 5,
                multipass: true
            }))
        .pipe(gulp.dest(dest));
    });

    gulp.task('copy', ['copy:fonts', 'copy:images']);
}