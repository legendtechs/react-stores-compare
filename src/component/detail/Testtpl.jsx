import React, { Component } from 'react';
import withSubscription from '../common/reduxTpl';

class child extends Component {
  render () {
    return (
      <div>test div
        <button onClick={(e) => this.props.commonFn('infomation')}>test button</button>
      </div>
    );
  }
}
const temp = withSubscription(child, 'testsss');
export default temp;
