import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import routes from '../route/';
import 'normalize.css';
import '../assets/css/app-scss.scss';

ReactDOM.render(
  <Provider>
    {routes}
  </Provider>,
  document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}
