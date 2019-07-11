import { message } from 'antd';
import fetch from 'isomorphic-fetch';
import Api from './api';
import omit from 'omit.js';

const Http = {};
message.config({
  top: 60
});

const checkStatus = (response) => {
  if (response.code && (response.code === -100 || response.code === '-100')) {
    Http.rediractToLogin('您尚未登陆或登陆超时，即将为您跳转到登录页！', 3);
  } else if (response.code && (response.code === 500 || response.code === '-500')) {
    message.error('网络服务错误，错误码: 500', 3);
  } else {
    return response;
  }
};

const parseJSON = (response) => {
  return Promise.resolve(response.json()).then(data => {
    return data;
  });
};

const makePathParams = data => {
  let paramArr = [];
  let paramStr = '';
  for (let attr in data) {
    if (Object.prototype.toString.call(data[attr]) === '[object Array]') {
      paramArr.push(attr + '[]' + '=' + data[attr] + '');
    } else {
      paramArr.push(attr + '=' + data[attr]);
    }
  }
  paramStr = paramArr.join('&');
  if (paramStr) {
    paramStr = '?' + paramStr;
  }
  return paramStr;
};

// const makeBodyParams = data => {
//   let paramArr = [];
//   let paramStr = '';
//   for (let attr in data) {
//     if (Object.prototype.toString.call(data[attr]) === '[object Array]') {
//       paramArr.push(attr + '[]' + '=' + data[attr] + '');
//     } else {
//       paramArr.push(attr + '=' + data[attr]);
//     }
//   }
//   paramStr = paramArr.join('&');
//   return paramStr;
// };

/**
* ajax request
*/
Http.ajax_request = (type = 'GET', path = '', param = {}, success = (json) => {}, failure = (json) => {}) => {
  if (type === 'GET') {
    return Http.ajax_get(path, param, success, failure);
  } else if (type === 'DELETE') {
    return Http.ajax_delete(path, param, success, failure);
  } if (type === 'GETIMG') {
    return Http.ajax_get_img(path, param, success, failure);
  } else {
    return Http.ajax_post(path, param, success, failure);
  }
};
/**
* ajax get
*/
Http.ajax_get = (path = '', param = {}, success = (json) => {}, failure = (json) => {}) => {
  let url;
  let userInfo = {};
  if (path === 'getUserInfo') {
    url = Api[path] + makePathParams(param);
  } else {
    userInfo = {
      userid: param.userId,
      usertype: param.userType || ''
    };
    url = Api[path] + makePathParams(userInfo);
  }
  return fetch(url, {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    }
  })
    .then(parseJSON)
    .then(checkStatus)
    .then((data) => {
      if (data.status === 'ok' || data.status === 'success') {
        success && success(data);
      } else if (data.status === 'failure') {
        failure && failure(data);
      }
    })
    .catch((error) => {
      failure && failure(error);
    });
};

/**
* ajax post
*/
Http.ajax_post = (path = '', param = {}, success = (json) => {}, failure = (json) => {}) => {
  let url;
  let restParams;
  if (path === 'loginOut') {
    restParams = param;
    url = Api[path];
  } else if (path === 'queryOptUser' || path === 'addOptUser') {
    const userInfo = {
      userid: param.userId,
      usertype: param.userType || ''
    };
    const extraParams = omit(param, ['userId', 'userType']);
    restParams = Object.assign({}, userInfo, {...extraParams});
    url = Api[path];
  } else {
    const userInfo = {
      userid: param.userId,
      usertype: param.userType || ''
    };
    restParams = omit(param, ['userId', 'userType']);
    url = Api[path] + makePathParams(userInfo);
  }
  return fetch(url, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    },
    body: JSON.stringify(restParams)
  })
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      if (data.status === 'ok' || data.status === 'success') {
        success && success(data);
      } else {
        failure && failure(data);
      }
    })
    .catch((error) => {
      failure && failure(error);
    });
};
/**
* ajax delete
*/
Http.ajax_delete = (path = '', param = {}, success = (json) => {}, failure = (json) => {}) => {
  let url = Api[path] + path + makePathParams(param);
  return fetch(url, {
    method: 'DELETE',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    }
  })
    .then(parseJSON)
    .then(checkStatus)
    .then((data) => {
      if (data.status === 'ok' || data.status === 'success') {
        success && success(data);
      } else {
        failure && failure(data);
      }
    })
    .catch((error) => {
      failure && failure(error);
    });
};

/**
* 跳转到首页
* url /anlink
*/
Http.rediractToLogin = (msg, time = 3) => {
  message.error(msg, time, () => {
    if (process.env.NODE_ENV === 'production') {
      if (process.env.TEST === 'test') {
        document.location.href = 'https://sso-test.anlink.tech/login?service=http%3A%2F%2F12004-zis-stargate-za-option-analysis.test.za-tech.net%2FoptionAnalysis-web%2F';
      } else {
        document.location.href = 'https://sso.anlink.com/login?service=https://yq.console.anlink.com/optionAnalysis-web';
      }
    } else {
      document.location.href = 'https://sso-test.anlink.tech/login?service=http%3A%2F%2F12004-zis-stargate-za-option-analysis.test.za-tech.net%2FoptionAnalysis-web%2F';
    }
  });
};

export default Http;
