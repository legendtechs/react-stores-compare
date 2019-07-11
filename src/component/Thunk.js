import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import Store from '../stores/redux-thunk';
import 'normalize.css';
import '../assets/css/app-scss.scss';
import ThunkApp from '../component/app/thunkApp';

let store = Store;
store.subscribe(() => {
  console.log('state change', store.getState());
});

ReactDOM.render(
  <Provider
    store={store}>
    <ThunkApp />
  </Provider>,
  document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}
