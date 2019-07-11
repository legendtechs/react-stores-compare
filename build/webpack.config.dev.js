var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  cache: true,
  context: path.resolve(__dirname, '../src/'),
  entry: {
    mobx: [
      // 'webpack-hot-middleware/client?reload=true&path=/_webpack_hmr',
      'react-hot-loader/patch',
      // 开启 React 代码的模块热替换(HMR)

      'webpack-dev-server/client?http://localhost:7001',
      // 为 webpack-dev-server 的环境打包代码
      // 然后连接到指定服务器域名与端口
      'webpack/hot/only-dev-server',
      'babel-polyfill',
      './component/Mobx.js'
    ],
    thunk: [
      // 'webpack-hot-middleware/client?reload=true&path=/_webpack_hmr',
      'react-hot-loader/patch',
      // 开启 React 代码的模块热替换(HMR)

      'webpack-dev-server/client?http://localhost:7001',
      // 为 webpack-dev-server 的环境打包代码
      // 然后连接到指定服务器域名与端口
      'webpack/hot/only-dev-server',
      'babel-polyfill',
      './component/Thunk.js'
    ],
    saga: [
      // 'webpack-hot-middleware/client?reload=true&path=/_webpack_hmr',
      'react-hot-loader/patch',
      // 开启 React 代码的模块热替换(HMR)

      'webpack-dev-server/client?http://localhost:7001',
      // 为 webpack-dev-server 的环境打包代码
      // 然后连接到指定服务器域名与端口
      'webpack/hot/only-dev-server',
      'babel-polyfill',
      './component/Saga.js'
    ],
    vendor: [
      'react',
      'react-dom',
      'react-router-dom'
    ]
  },
  output: {
    filename: '[name].js',
    // 输出的打包文件
    path: path.resolve(__dirname, '../public/assets'),
    // 项目输出路径
    publicPath: '/public/assets',
    // 对于热替换(HMR)是必须的，让 webpack 知道在哪里载入热更新的模块(chunk)
    chunkFilename: '[name].chunk.js'
  },
  // https://webpack.js.org/configuration/resolve/
  resolve: {
    extensions: ['.js', '.jsx', '.json'], // 处理文件的后缀名,不需要写全 eg: .js
    alias: {
      '~': path.resolve(__dirname, '../src')
    }
  },
  stats: 'normal',
  module: {
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
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ],
        exclude: /^node_modules$/
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader'
        ],
        exclude: path.resolve(__dirname, '../node_modules')
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          // {
          //   loader: 'css-loader',
          //   options: {
          //     modules: true,
          //     localIdentName: '[name]__[local]--[hash:base64:5]'
          //   }
          // },
          'postcss-loader',
          'sass-loader'
        ],
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
        exclude: [path.resolve(__dirname, '../node_modules'), path.resolve(__dirname, `../favicon.png$`)]
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
    // build optimazation plugins
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor-[hash].min.js'
    }),
    // 开启全局的模块热替换(HMR)
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({ // 编译成生产版本
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        BUILD_ENV: JSON.stringify('test')
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/view/index.html'),
      filename: './mobx.html', // 生成的html存放路径，相对于 path
      chunks: ['vendor', 'mobx']
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/view/index.html'),
      filename: './thunk.html', // 生成的html存放路径，相对于 path
      chunks: ['vendor', 'thunk']
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/view/index.html'),
      filename: './saga.html', // 生成的html存放路径，相对于 path
      chunks: ['vendor', 'saga']
    })
  ]
};
