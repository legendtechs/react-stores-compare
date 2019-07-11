var mockjs = require('mockjs');

module.exports = [{
  api: '/login/user',
  type: 'GET', // post get
  response: function (req, res) {
    res.json(mockjs.mock({
      'status': 'ok',
      'details': {
        'user': {
          userName: 'tangchuanqi@zhongan.io',
          userId: 1,
          userType: '',
          identity: null
        }
      }
    }));
  }
}, {
  api: '/api/checkLogin',
  type: 'GET', // post get
  response: function (req, res) {
    res.json(mockjs.mock({
      'ok': true
    }));
  }
}, {
  api: '/pou/add_user',
  type: 'POST', // post get
  response: function (req, res) {
    res.json(mockjs.mock({
      'id': 123,
      'message': '',
      'status': 'success'
    }));
  }
}, {
  api: '/pou/query_user',
  type: 'POST', // post get
  response: function (req, res) {
    res.json(mockjs.mock({
      'exist': true,
      'message': '',
      'status': 'success',
      'expired_time': '2017-12-21'
    }));
  }
}];
