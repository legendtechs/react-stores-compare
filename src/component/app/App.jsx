import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Header from '../header/Header';
import Content from '../content/Content';
import Footer from '../footer/Footer';
import '../../assets/css/app-scss.scss';

@observer
class App extends Component {
  constructor (props) {
    super(props);
    this.isMobx = props.isMobx;
  }
  render () {
    const { data } = this.props;
    return (
      <div className='page-wrapper'>
        <Header info={data.appInfo}/>
        <Content count={data.diffCount}/>
        <h4>{ data.diffCount }</h4>
        <input type="number" name="" ref={(ref) => { this.inputRef = ref }} min={1} />
        <button onClick={(e) => {this.props.onAdd(Number(this.inputRef.value) || 1)}}>增加数据</button>
        <button onClick={(e) => {this.props.onAsyncAdd(Number(this.inputRef.value) || 1)}}>异步增加数据</button>
        {this.props.info}
        <Footer />
      </div>
    );
  }
}
App.contextTypes = {
  store: PropTypes.any
}
export default App;
