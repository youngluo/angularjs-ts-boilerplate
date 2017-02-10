var conditional = require("rollup-plugin-conditional"),
    babel = require('rollup-plugin-babel'),
    uglify = require('rollup-plugin-uglify'),
    nodeResolve = require('rollup-plugin-node-resolve'),
    commonjs = require('rollup-plugin-commonjs')

module.exports = function (production) {
    return {
        format: 'iife',
        sourceMap: production ? false : 'inline',
        plugins: [
            nodeResolve({ jsnext: true }),
            commonjs(),
            babel({
                exclude: 'node_modules/**'
            }),
            conditional(production, [
                uglify({
                    drop_console: true
                })
            ])
        ]
    }
}