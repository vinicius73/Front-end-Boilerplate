var gulp = require('gulp');
var wrench = require('wrench');
var path = require('path');
var notify = require("gulp-notify");
var _ = require('lodash');

//-- OPTIONS
var options = require('./gulpOptions.js');

//-- BANNER
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

//-- NOTIFY
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

//-- TASKS
gulp.task('default', ['styles:main', 'scripts:vendor', 'copy']);