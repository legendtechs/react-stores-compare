import React, { Component } from 'react'
import { connect } from 'react-redux';
import { asyncAdd, addCount } from '../../stores/redux-thunk/actions';
import App from './App';

class ThunkApp extends Component {
  render () {
    console.log('thunk ', this.context);
    return (
      <App {...this.props} {...this.context} info='thunk store info' />
    );
  }
}

export default connect(({demoReducer}) => {
  console.log('demoReducer ', demoReducer);
  return {
    data: demoReducer
  }
}, (dispatch) => ({
  dispatch,
  onAdd(count) {
    console.log('count ', count);
    dispatch(addCount(count))
  },
  onAsyncAdd(count) {
    console.log('count ', count);
    dispatch(asyncAdd(count))
  }
}))(ThunkApp);