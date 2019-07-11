import React, { PureComponent } from 'react';

class Header extends PureComponent {
  componentDidMount () {
    // const { dispatch } = this.props;
    // dispatch(getUserInfo('getUserInfo'));
  }
  render () {
    console.log('Header render ');

    return (
      <div className='header'>
        <h4>name：{this.props.info.name}</h4>
        <h5> age：{this.props.info.age}</h5>
      </div>
    );
  }
}
export default Header;
