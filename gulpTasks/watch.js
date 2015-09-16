"use strict";

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

module.exports = function (_options) {
    gulp.task('watch', function () {
        var onChange = function (event) {
            console.log('file was ' + event.type);
            console.log(event.path)
            console.log('running tasks...');
        };

        gulp.watch(_options.watch.js, ['scripts:main']).on('change', onChange);
        gulp.watch(_options.watch.styles, ['styles:main']).on('change', onChange);
        gulp.watch(_options.watch.images, ['copy:images']).on('change', onChange);
    });

    gulp.task('w', ['watch']);
};