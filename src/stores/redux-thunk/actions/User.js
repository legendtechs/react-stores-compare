// import fetch from 'isomorphic-fetch';
import { RequestJson } from '../../request/';
import { USER_INFO_STATUS, GET_DIFF_COUNT } from '../constrants';

export const getDiffCount = () => {
  return {
    type: GET_DIFF_COUNT,
  }
}
// export const updateUserInfo = (data) => {
//   return {
//     type: USER_INFO_STATUS,
//     data
//   };
// };

// export const getUserInfo = (path, success) => {
//   return dispatch => {
//     return RequestJson.ajax_request('GET', path, {}, json => {
//       if (json.status !== undefined && json.status === 'ok') {
//         dispatch(updateUserInfo({
//           information: json.details.user
//         }));
//         success && success();
//       }
//     });
//   };
// };

// export const loginOut = (path, callback) => {
//   return dispatch => {
//     return RequestJson.ajax_request('POST', path, {}, json => {
//       if (json.status !== undefined && json.status === 'ok') {
//         callback && callback();
//       }
//     });
//   };
// };
