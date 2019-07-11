import { GET_DIFF_COUNT, ADD_COUNT } from '../constrants';

const initialState = {
  diffCount: 0,
  appInfo: {
    name: 'scott',
    age: '25'
  }
};

const getInitCount = (state=initialState, action) => {
  console.log('state action ', state, action);
  switch(action.type) {
    case GET_DIFF_COUNT: 
      return state;
    case ADD_COUNT:
      return Object.assign({}, state, {
        diffCount: state.diffCount + action.count
      });
    default:
    console.log('default count ', state);
    return state; 
  }
}
export default getInitCount;