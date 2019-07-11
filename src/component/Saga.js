import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import Store from '../stores/redux-thunk';
import 'normalize.css';
import '../assets/css/app-scss.scss';
import App from './app/App';

const makeApp = (App) => {
  class temp extends Component {
    render () {
      console.log(this);
      return (
        <App {...this.props} info='saga store info' />
      );
    }
  }
  return connect()(temp);
};

const SagaApp = makeApp(App);

let store = Store;
store.subscribe(() => {
  console.log('state change', store.getState());
});

ReactDOM.render(
  <Provider
    store={store}>
    <SagaApp />
  </Provider>,
  document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}
