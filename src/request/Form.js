import { message } from 'antd';
import fetch from 'isomorphic-fetch';
import Api from './api';
import omit from 'omit.js';

message.config({
  top: 60
});

const Http = {};

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
const createFormData = function (data) {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });
  return formData;
};
/**
 * ajax request
 */
Http.ajax_request = (type = 'GET', path = '', param = {}, success = (json) => {
}, failure = (json) => {
}) => {
  if (type === 'GET') {
    return Http.ajax_get(path, param, success, failure);
  } else if (type === 'DELETE') {
    return Http.ajax_delete(path, param, success, failure);
  } else if (type === 'PUT') {
    return Http.ajax_put(path, param, success, failure);
  } else {
    return Http.ajax_post(path, param, success, failure);
  }
};
/**
 * ajax get
 */
Http.ajax_get = (path = '', param = {}, success = (json) => {
}, failure = (json) => {
}) => {
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
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      'X-Requested-With': 'XMLHttpRequest'
    }
  })
    .then(response => response.json())
    .then((json) => {
      if (json.code && json.code === '500') {
        Http.global_message('网络服务错误，错误码: 500', 3000);
      }
      if (json.code && json.code === -100) {
        Http.rediractToLogin('登录超时，即将为您跳转到登录页！', 3000);
      } else {
        success && success(json);
      }
    })
    .catch((error) => {
      failure && failure(error);
      Http.global_message('网络服务错误，错误码: 500', 3000);
    });
};

/**
 * ajax post
 */
Http.ajax_post = (path = '', param = {}, success = (json) => {
}, failure = (json) => {
}) => {
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
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    body: createFormData(restParams)
  })
    .then(response => response.json())
    .then((json) => {
      if (json.code && json.code === '500') {
        Http.global_message('网络服务错误，错误码: 500', 3000);
      }
      if (json.code && json.code === -100) {
        Http.rediractToLogin('登录超时，即将为您跳转到登录页！', 3000);
      } else {
        success && success(json);
      }
    })
    .catch((error) => {
      failure && failure(error);
      Http.global_message('网络服务错误，错误码: 500', 3000);
    });
};
/**
 * ajax put
 */
Http.ajax_put = (path = '', param = {}, success = (json) => {
}, failure = (json) => {
}) => {
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
    method: 'PUT',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    body: createFormData(restParams)
  })
    .then(response => response.json())
    .then((json) => {
      if (json.code && json.code === '500') {
        Http.global_message('网络服务错误，错误码: 500', 3000);
      }
      if (json.code && json.code === -100) {
        Http.rediractToLogin('登录超时，即将为您跳转到登录页！', 3000);
      } else {
        success && success(json);
      }
    })
    .catch((error) => {
      failure && failure(error);
      Http.global_message('网络服务错误，错误码: 500', 3000);
    });
};

/**
 * ajax delete
 */
Http.ajax_delete = (path = '', param = {}, success = (json) => {
}, failure = (json) => {
}) => {
  let url = Api[path] + path + makePathParams(param);
  return fetch(url, {
    method: 'DELETE',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      'X-Requested-With': 'XMLHttpRequest'
    }
  })
    .then(parseJSON)
    .then(checkStatus)
    .then((json) => {
      if (json.code && json.code === -100) {
        Http.rediractToLogin('登录超时，即将为您跳转到登录页！', 3000);
      } else {
        success && success(json);
      }
    })
    .catch((error) => {
      failure && failure(error);
      Http.global_message('网络服务错误，错误码: 500', 3000);
    });
};
/**
 * 跳转到首页
 * url /anlink
 */
Http.rediractToLogin = (msg, time = 3000) => {
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
/**
 * 全局提示
 */
Http.Trim = (value) => {
  if (value === '') {
    return '';
  } else {
    return value.replace(/(^\s*)|(\s*$)/g, '');
  }
};
export default Http;
