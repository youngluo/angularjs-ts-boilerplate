let gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    rollup = require('rollup-stream'),
    source = require('vinyl-source-stream'),
    parsePath = require('parse-filepath')

let production = !!$.util.env.prod,
    gulpConfig = {
        buildFolder: 'build'
    },
    rollupConfig = require('./rollup.config')(production)

gulp.task('rollup', function () {
    let paths = gulpPaths('src/index.js'),
        config = Object.assign({}, rollupConfig, { entry: paths.src })

    return rollup(config)
        .pipe(source(paths.name))
        .pipe(gulp.dest(gulpConfig.buildFolder))
})

gulp.task('default', $.sequence('rollup'))

function gulpPaths(path) {
    let segments = parsePath(path)

    return {
        name: segments.basename,
        src: segments.path
    }
}