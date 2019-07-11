import { USER_INFO_STATUS } from '../constrants';
// 登录页
const userState = {
  fetched: false,
  information: {
    userName: '',
    userType: '',
    userId: ''
  }
};

const user = (state = userState, action = {}) => {
  switch (action.type) {
    case USER_INFO_STATUS:
      return {
        ...state,
        ...action.data,
        fetched: true
      };
    default:
      return state;
  }
};

export default user;
