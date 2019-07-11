import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import App from './App';

@inject('store') @observer
class MobxApp extends Component {
  render () {
    console.log('makeApp ', this.props.store);
    return (
      <App {...this.props} info='mobx store info' isMobx={true} data={this.props.store} onAdd={(count) => this.props.store.add(count)} onAsyncAdd={(count) => this.props.store.onAsyncAdd(count)} />
    );
  }
}
export default MobxApp;