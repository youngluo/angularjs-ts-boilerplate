import conditional from "rollup-plugin-conditional";
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import hash from 'rollup-plugin-hash'

const production = !!process.env.production

export default {
    entry: 'src/index.js',
    dest: 'build/index.js',
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
            }),
            hash({
                replace: true,
                dest: 'build/index.[hash].js',
                manifest: 'build/manifest'
            })
        ])
    ]
}