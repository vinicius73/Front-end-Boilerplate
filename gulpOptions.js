var _ = require('lodash');

module.exports = (function() {
    var applyBowerPath = function(_string) {
        if (_.isArray(_string)) {
            return _string.map(applyBowerPath);
        }
        return './bower_components/' + _string;
    }

    var applyFontsFilter = function(_string) {
        if (_.isArray(_string)) {
            return _string.map(applyFontsFilter);
        }
        return _string + '.{eot,svg,ttf,woff,woff2}';
    }

    var applyImagesFilter = function(_string) {
        if (_.isArray(_string)) {
            return _string.map(applyImagesFilter);
        }
        return _string + '.{jpg,svg,gif,png,jpeg}';
    }

    var vendors = {
        js: applyBowerPath([
            'modernizr/modernizr.js',
            'jquery/dist/jquery.min.js',
            'jquery-migrate/jquery-migrate.min.js',
            'bootstrap-sass/assets/javascripts/bootstrap.min.js'
        ]),
        css: applyBowerPath([

        ]),
    };

    var sources = {
        root: './source',
        sass: './source/sass/main.scss',
        js: ['./source/scripts/main.js'],
        fonts: applyFontsFilter([
            './source/fonts/*',
            './bower_components/**/*'
        ]),
        images: applyImagesFilter(['./source/images/**/*'])
    };

    var dest = {
        root: './assets',
        css: './assets/css',
        js: './assets/scripts',
        fonts: './assets/fonts',
        images: './assets/images',
    };

    var watch = {
        js: './source/scripts/**/*.js',
        styles: './source/sass/**/*.{css,scss,sass}',
        images: applyImagesFilter('./source/scripts/**/*'),
    }

    return {
        vendors: vendors,
        sources: sources,
        dest: dest,
        watch: watch
    };
})();