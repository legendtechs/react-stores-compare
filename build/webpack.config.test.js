var webpack = require('webpack');
var baseConfig = require('./webpack.config.base');
var defineDev = new webpack.DefinePlugin({ // 编译成生产版本
  'process.env': {
    NODE_ENV: JSON.stringify('production'),
    BUILD_ENV: JSON.stringify('test')
  }
});
baseConfig.plugins.push(defineDev);
module.exports = baseConfig;
