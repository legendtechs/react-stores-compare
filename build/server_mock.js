var express = require('express');
var fs = require('fs');
var path = require('path');
var color = require('colors-cli');
var server = express();
var config = {
  path: '../mock',
  port: 7002
};

var mockDir = path.resolve(__dirname, config.path);

function renderLog (req, res) {
  // body...
  console.log('------------------:' + new Date().toUTCString());
  console.log('');
  console.log(req.url);
  console.log('body:');
  console.log(req.body);
  console.log('query:');
  console.log(req.query);
  console.log('params:');
  console.log(req.params);
  console.log('header:');
  console.log(req.headers);
  console.log('');
  console.log('------------------:' + new Date().toUTCString());
}

function routerDefined (config) {
  if (config.type === 'GET') {
    server.get(config.api, function (req, res) {
      config.response(req, res);
      renderLog(req, res);
    });
  } else if (config.type === 'POST') {
    server.post(config.api, function (req, res) {
      config.response(req, res);
      renderLog(req, res);
    });
  } else if (config.type === 'DELETE') {
    server.delete(config.api, function (req, res) {
      config.response(req, res);
      renderLog(req, res);
    });
  } else {
    server.all(config.api, function (req, res) {
      config.response(req, res);
      renderLog(req, res);
    });
  }
}

function getTypeString (obj) {
  return Object.prototype.toString.call(obj);
}

// 文件修改，自动生成接口
// chokidar.watch(mockDir).on('change',function(){
// console.log('files change')
// startServer();
// })

fs.readdirSync(mockDir).forEach(function (file) {
  var mock = require(path.resolve(mockDir, file));
  if (getTypeString(mock) === '[object Object]') {
    routerDefined(mock);
  } else if (getTypeString(mock) === '[object Array]') {
    for (var i = mock.length - 1; i >= 0; i--) {
      routerDefined(mock[i]);
    }
  }
});

server.listen(config.port, function (argument) {
  console.log('mockjson server: ' + color.red('http://localhost:' + config.port));
  console.log('status: ' + color.red('open'));
});
