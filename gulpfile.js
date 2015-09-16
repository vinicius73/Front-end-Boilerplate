var gulp = require('gulp');
var wrench = require('wrench');
var path = require('path');
var notify = require("gulp-notify");
var _ = require('lodash');

var applyBowerPath = function(_string)
{
    if(_.isArray(_string)) {
        return _string.map(applyBowerPath);
    }
    return './bower_components/' + _string;
}

var options = {
    vendors: {
        js: applyBowerPath([
            'modernizr/modernizr.js',
            'jquery/dist/jquery.min.js',
            'jquery-migrate/jquery-migrate.min.js',
            'bootstrap-sass/assets/javascripts/bootstrap.min.js'
        ]),
        css: applyBowerPath([

        ]),
    },
    sources: {
        root: './sources',
        sass: './source/sass/main.scss',
        js: './sources/js',
        fonts: [
                './sources/fonts/*.{eot,svg,ttf,woff,woff2}',
                './bower_components/**/*.{eot,svg,ttf,woff,woff2}'
            ],
        images: './sources/images/**/*.{jpg,svg,gif,png,jpeg}'
    },
    dest: {
        root: './assets',
        css: './assets/css',
        js: './assets/js',
        images: './assets/images',
    }
};

options.banner = ['/*!',
    ' * My Project',
    ' * @version v0.1.' + Date.now(),
    ' * @license property',
    ' * @autor myproject.com.br',
    ' */',
    ''].join('\n');

//-- ARGS
options.args = require('yargs')
    .alias('p', 'production')
    .default('production', false)
    .argv;

// -- NOTIFY
options.notify = function (_message) {
    var options = {
        title: 'Your Project',
        //icon: path.join(__dirname, 'assets/gulp/logo.png')
    };

    if (_.isObject(_message)) {
        _.merge(options, _message);
    } else {
        options.message = _message;
    }

    return notify(options);
};


//-- LOAD TASKS
wrench.readdirSyncRecursive('./gulpTasks').filter(function (file) {
    return (/\.(js|coffee)$/i).test(file);
}).map(function (file) {
    require('./gulpTasks/' + file)(options);
});

gulp.task('default', ['styles:main']);