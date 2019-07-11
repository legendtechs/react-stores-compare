import React, { Component } from 'react';

class Part1 extends Component {
  part () {
    const localTest = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('info');
        }, 2000);
      });
    };
    // console.log(localTest());
    async function A (number) {
      const a = await localTest();
      const b = await localTest();
      return a + '  ' + b + number;
    }
    console.time('A');
    A(20).then(r => {
      console.timeEnd('A');
      console.log(r);
    });

    async function B (number) {
      const a = localTest();
      const b = localTest();
      return await a + '  ' + await b + number;
    }
    console.time('B');
    A(B).then(r => {
      console.timeEnd('B');
      console.log(r);
    });
  }
  render () {
    this.part();
    return (
      <div style={{
        marginTop: '20px',
        color: 'green'
      }}>test detail Part1{this.props.children}</div>
    );
  }
};
export default Part1;
