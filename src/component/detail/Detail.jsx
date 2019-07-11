import React, { Component } from 'react';
import Testtpl from './Testtpl';

class Detail extends Component {
  render () {
    return (
      <div>test detail page
        <Testtpl />
        {
          this.props.routes && this.props.routes.map((route, index) => {
            if (route.path === this.props.location.pathname) {
              return (<route.component key={index} path={route.path}/>);
            } else {
              return null;
            }
          })
        }
      </div>
    );
  }
};
export default Detail;
