var webpack = require('webpack');
var baseConfig = require('./webpack.config.base');
var definePrd = new webpack.DefinePlugin({ // 编译成生产版本
  'process.env': {
    NODE_ENV: JSON.stringify('production'),
    BUILD_ENV: JSON.stringify('production')
  }
});
baseConfig.plugins.push(definePrd);
module.exports = baseConfig;
