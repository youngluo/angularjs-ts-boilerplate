const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const ROOT_PATH = path.resolve(__dirname); //项目根目录
const APP_PATH = path.resolve(ROOT_PATH, 'src'); //项目源代码目录
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist'); //发布文件存放目录
const NODE_MODULES_PATH = path.resolve(ROOT_PATH, 'node_modules'); //node_modules目录
const ENTRY_FILE = path.resolve(APP_PATH, 'index'); //入口文件地址
const TEMPLATE_FILE = path.resolve(APP_PATH, 'index.html'); //html模板文件地址

module.exports = {
  mode: 'production',
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
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
        include: APP_PATH
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader'],
      },
      {
        test: /\.scss$/,
        exclude: NODE_MODULES_PATH,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
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
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, './'),
      verbose: true
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css?v=[contenthash:8]'
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          chunks: 'all',
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
          name: 'common'
        },
        vendor: {
          test: /node_modules/,
          chunks: 'all',
          name: 'vendor',
          priority: 10,
          enforce: true,
          minChunks: 2
        }
      }
    }
  },
  resolve: {
    extensions: ['.js', '.ts', '.less', '.scss', '.css'], //后缀名自动补全
    alias: {
      '@': APP_PATH,
    }
  }
};