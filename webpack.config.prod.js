let path = require('path'),
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'), //css单独打包
    HtmlWebpackPlugin = require('html-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname), //项目根目录
    APP_PATH = path.resolve(ROOT_PATH, 'src'), //项目源代码目录
    BUILD_PATH = path.resolve(ROOT_PATH, 'dist'), //发布文件存放目录
    NODE_MODULES_PATH = path.resolve(ROOT_PATH, 'node_modules'), //node_modules目录
    ENTRY_FILE = path.resolve(APP_PATH, 'index'), //入口文件地址
    TEMPLATE_FILE = path.resolve(APP_PATH, 'index.html'); //html模板文件地址


module.exports = {
    entry: {
        app: ENTRY_FILE,
        vendor: [
            "angular",
            '@uirouter/angularjs'
        ]
    },
    output: {
        path: BUILD_PATH, //编译到当前目录
        filename: 'js/[name].[hash:8].js', //编译后的文件名字
        chunkFilename: 'js/[name].[chunkhash:8].js'
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        exportAsEs6Default: true,
                        minimize: true,
                        removeComments: true
                    }
                }
            },
            {
                test: /\.css$/,
                exclude: NODE_MODULES_PATH,
                use: ExtractTextPlugin.extract(['css-loader?minimize=true', 'autoprefixer-loader']),
                include: APP_PATH
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract(['css-loader?minimize=true', 'autoprefixer-loader', 'less-loader']),
            },
            {
                test: /\.scss$/,
                exclude: NODE_MODULES_PATH,
                use: ExtractTextPlugin.extract(['css-loader?minimize=true', 'autoprefixer-loader', 'sass-loader']),
                include: APP_PATH
            },
            {
                test: /\.(eot|woff|ttf|woff2)(\?|$)/,
                exclude: NODE_MODULES_PATH,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]'
                    }
                },
                include: APP_PATH
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                exclude: NODE_MODULES_PATH,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 8192, //limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
                        name: 'images/[name].[hash:8].[ext]'
                    }
                },
                include: APP_PATH
            },
            {
                test: /\.ts$/,
                exclude: NODE_MODULES_PATH,
                use: 'ts-loader',
                include: APP_PATH
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production') //定义生产环境
            }
        }),
        new HtmlWebpackPlugin({  //根据模板插入css/js等生成最终HTML
            filename: path.resolve(BUILD_PATH, 'index.html'), //生成的html存放路径
            template: TEMPLATE_FILE, //html模板路径
            hash: false,
        }),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false, // 移除所有注释
            },
            compress: {
                warnings: false,
                drop_console: true
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'js/[name].[hash:8].js'
        }),
        new ExtractTextPlugin({
            filename: 'css/[name].[chunkhash:8].css',
            allChunks: true
        })
    ],
    resolve: {
        extensions: ['.js', '.ts', '.less', '.scss', '.css'] //后缀名自动补全
    }
};