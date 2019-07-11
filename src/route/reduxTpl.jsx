import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

const withSubscription = (WrappedComponent, selectData) => {
  class temp extends Component {
    constructor (props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        data: selectData,
        info: ''
      };
    }

    handleChange () {
      this.setState({
        data: selectData
      });
    }
    commonFn (info) {
      this.setState({
        info: info
      });
    }

    render () {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return <WrappedComponent info={this.state.info} {...this.props} commonFn={(info) => this.commonFn(info)}/>;
    }
  };
  return withRouter(temp);
};

;
export default withSubscription;
