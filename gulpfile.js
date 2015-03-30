var gulp        = require('gulp'),
    connect     = require('gulp-connect'),
    clean       = require('gulp-clean'),
    gutil       = require('gulp-util'),
    webpack     = require('webpack'),
    webpackConf = require('./webpack.config');

var config = {
    'src': {
        'app': './src/js/app.react.js',
        'webpack': ['src/**/*.js', 'src/**/*.css'],
        'html': ['src/**/*.html']
    },
    'build': {
        'dir': 'build',
        'js': 'build/js'
    }

};

gulp.task('html', function() {
    return gulp.src(config.src.html)
        .pipe(gulp.dest(config.build.dir));
});

gulp.task('webpack', function(callback) {
    webpack(webpackConf, function(err, stats) {
        if(err) {
            throw new gutil.PluginError("webpack", err);
        }
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
});

gulp.task('serve', function(next) {
    connect.server({
        root: config.build.dir,
        livereload: true
    });

    return next;
});

gulp.task('watch', function () {
    gulp.watch(config.src.html, ['html']);
    gulp.watch(config.src.webpack, ['webpack']);
});

gulp.task('clean', function() {
    gulp.src(config.build.dir, {read: false})
        .pipe(clean());
});

gulp.task('build', ['html', 'webpack']);

gulp.task('default', ['build', 'watch', 'serve']);