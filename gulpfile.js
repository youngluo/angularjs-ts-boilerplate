let gulp = require('gulp'),
    util = require('gulp-util'),
    rollup = require('rollup-stream'),
    source = require('vinyl-source-stream')

let production = !!util.env.prod,
    config = {
        buildFolder: 'build'
    },
    rollupConfig = require('./rollup.config')(production)

gulp.task('rollup', function () {
    let = rollupConfig = Object.assign({}, rollupConfig, { entry: 'src/index.js' })

    return rollup(rollupConfig)
        .pipe(source('index.js'))
        .pipe(gulp.dest('build'))
})

function gulpPaths() {

}