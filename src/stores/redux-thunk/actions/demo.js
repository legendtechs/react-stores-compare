import {
  ADD_COUNT,
  GET_DIFF_COUNT
} from '../constrants';

const sleep = async (ms) => {
  return await new Promise(resolve => {
    setTimeout(resolve, ms);
  })
}
export const getIntiCount = () => {
  return {
    type: GET_DIFF_COUNT
  }
}

export const addCount = (count) => {
  return {
    type: ADD_COUNT,
    count
  }
}

export const asyncAdd = (count) => {
  return dispatch => {
    dispatch(addCount(count));
    sleep(1000).then(r => {
      dispatch(addCount(3));
    })
  }
}