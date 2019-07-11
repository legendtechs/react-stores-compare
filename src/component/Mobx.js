import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider, observer, inject } from 'mobx-react';
import appStore from '../stores/mobx';
import 'normalize.css';
import '../assets/css/app-scss.scss';
import MobxApp from './app/mobxApp';

ReactDOM.render(
  <Provider store={appStore}>
    <MobxApp />
  </Provider>,
  document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}
