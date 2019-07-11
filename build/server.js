var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
const proxy = require('http-proxy-middleware');
var webpackConfig = require('./webpack.config.dev');
const serverPort = 7001;
const proxyPort = 7002;
var color = require('colors-cli');
// var warn = color.yellow;
var notice = color.blue;
// 启动服务
const url = {
  localRemoteUrl: `http://localhost:${proxyPort}/`
};

var server = new WebpackDevServer(webpack(webpackConfig), {
  publicPath: webpackConfig.output.publicPath,
  hot: true,
  host: '0.0.0.0',
  contentBase: webpackConfig.output.path,
  stats: {
    colors: true
  },
  historyApiFallback: {
    index: '/public/assets/',
    disableDotRule: true
  },
  open: true
});

// 你只需要执行这一段代码，当你访问需要跨域的console资源时，就可以成功访问到了。
server.app.use('^/optionAnalysis-web/**/', proxy({
  target: url.localRemoteUrl,
  changeOrigin: true,
  pathRewrite: {
    '^/optionAnalysis-web': '/'
  },
  secure: false
}));

server.listen(serverPort, function () {
  console.log(notice(`正常打开${serverPort}端口`));
});
