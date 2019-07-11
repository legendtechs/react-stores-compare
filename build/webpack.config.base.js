var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
// var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  devtool: false,
  cache: true,
  context: path.resolve(__dirname, '../src/'),
  entry: {
    index: [
      'babel-polyfill',
      './component/index.js'
    ],
    vendor: ['react', 'react-dom', 'react-router-dom']
  },
  output: {
    filename: '[name].[chunkhash].js',
    // 输出的打包文件
    path: path.resolve(__dirname, '../public/dist'),
    // 项目输出路径
    publicPath: './dist/',
    // 对于热替换(HMR)是必须的，让 webpack 知道在哪里载入热更新的模块(chunk)
    chunkFilename: '[name].[chunkhash].js',
    sourceMapFilename: '[name].[chunkhash].map'
  },
  // https://webpack.js.org/configuration/resolve/
  resolve: {
    extensions: ['.js', '.jsx', '.json'], // 处理文件的后缀名,不需要写全 eg: .js
    alias: {
      '~': path.resolve(__dirname, '../src')
    }
  },
  stats: 'normal',
  recordsPath: path.join(__dirname, '../records.json'),
  module: {
    // 不需要再去 import require 的包，针对一些比较大的第三方library
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ],
        exclude: path.resolve(__dirname, '../node_modules')
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'postcss-loader'
          ]
        }),
        exclude: /^node_modules$/
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'postcss-loader',
            'less-loader']
        }),
        exclude: path.resolve(__dirname, '../node_modules')
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        }),
        exclude: path.resolve(__dirname, '../node_modules')
      },
      {
        // 匹配.html文件
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              attrs: ['img:src', 'link:href']
            }
          }
        ],
        exclude: path.resolve(__dirname, '../node_modules')
      },
      {
        test: /favicon\.png$/,
        use: [
          {
            // 使用file-loader
            loader: 'file-loader',
            options: {
              name: './images/[name].[ext]?[hash]'
            }
          }
        ],
        exclude: [path.resolve(__dirname, '../node_modules'), path.resolve(__dirname, '../favicon.png')]
      },
      {
        // 处理静态资源
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ],
        exclude: path.resolve(__dirname, '../node_modules')
      }
    ]
  },
  plugins: [
    // new CleanWebpackPlugin([
    //   '../public/'
    // ]),
    // // build optimazation plugins
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor-[hash].min.js'
    }),
    // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new ExtractTextPlugin({
      filename: '[name].min.css'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../view/index.html'),
      filename: '../index.html', // 生成的html存放路径，相对于 path
      minify: { // 压缩HTML文件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: false // 删除空白符与换行符
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new UglifyJsPlugin({
      sourceMap: true,
      uglifyOptions: {
        mangle: false,
        output: {
          comments: false
        },
        warning: true
      }
    })
  ]
};
