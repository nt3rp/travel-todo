var gulp    = require('gulp'),
    webpack = require('gulp-webpack'),
    connect = require('gulp-connect');

var config = {
    'src': {
        'js'  : 'src/js/app.jsx',
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

gulp.task('build', function() {
    return gulp.src(config.src.js)
        .pipe(webpack({ // TODO: Move into webpack.config.js
            output: {
                filename: 'bundle.js'
            },
            module: {
                loaders: [{
                    test: /\.jsx$/, // A regexp to test the require path
                    loader: 'jsx' // The module to load. "jsx" is short for "jsx-loader"
                }]
            }
        }))
        .pipe(gulp.dest(config.build.js));
});

gulp.task('serve', function(next) {
    connect.server({
        root: config.build.dir,
        livereload: true
    });

    return next;
});

/*
gulp.task('name', [], function() {

});
*/

gulp.task('default', ['html', 'build', 'serve']);