var gulp        = require('gulp'),
    gulpWebpack = require('gulp-webpack'),
    connect     = require('gulp-connect'),
    webpack     = require('webpack'),
    path        = require('path');

var config = {
    'src': {
        'app' : './src/js/app.react.js',
        'js'  : ['src/**/*.js'],
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

gulp.task('js', function() {
    return gulp.src(config.src.js)
        .pipe(gulpWebpack({ // TODO: Move into webpack.config.js
            entry: config.src.app,
            plugins: [
                new webpack.optimize.OccurenceOrderPlugin(),
                // TODO: Enable in debug only
                //new webpack.optimize.DedupePlugin(),
                //new webpack.optimize.UglifyJsPlugin(),
                //new webpack.optimize.AggressiveMergingPlugin()
            ],
            output: {
                filename: 'bundle.js'
            },
            module: {
                loaders: [{
                    test: /\.react\.js$/,
                    loader: 'jsx'
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

gulp.task("watch", function () {
    gulp.watch(config.src.html, ["html"]);
    gulp.watch(config.src.js, ["js"]);
});

gulp.task("build", ["html", "js"]);

gulp.task('default', ['build', 'watch', 'serve']);