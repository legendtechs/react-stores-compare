import React, { PureComponent } from 'react';
// import {
//   Link
// } from 'react-router-dom';
import Todo from '../detail/Todo';

class Content extends PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      editStatus: false
    };
  }
  render () {
    console.log('contnet render ');
    return (
      <div className='cont'>
        content count：
        { this.props.count }
        <Todo />
      </div>
    );
  }
}
export default Content;
