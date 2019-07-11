import React from 'react';
// import Detail from '../component/detail/Detail';
// import Part1 from '../component/detail/Part_1';
// import Part2 from '../component/detail/Part_2';
import Bundle from './Bundle';
// const load0 = () => require('../component/detail/Detail');
const appLoad = (cb) => {
  require.ensure([], require => {
    cb(require('../component/detail/Detail'));
  }, 'app');
};
const app = (props) => (
  <Bundle load={appLoad}>
    {(Container) => <Container {...props}/>}
  </Bundle>
);
const detail = (props) => (
  <Bundle load={appLoad}>
    {(Container) => <Container {...props}/>}
  </Bundle>
);
// const load1 = () => require('../component/detail/Part_1');
const bPart1Load = (cb) => {
  require.ensure([], require => {
    cb(require('../component/detail/Part_1'));
  }, 'part1');
};
const part1 = (props) => (
  <Bundle load={bPart1Load}>
    {(Container) => <Container {...props}/>}
  </Bundle>
);
// const load2 = () => require('../component/detail/Part_2');
const bPart2Load = (cb) => {
  require.ensure([], require => {
    cb(require('../component/detail/Part_2'));
  }, 'part2');
};
const part2 = (props) => (
  <Bundle load={bPart2Load}>
    {(Container) => <Container {...props}/>}
  </Bundle>
);

let routerConfig = [
  {
    path: '/',
    component: app,
    exact: true
  },
  {
    path: '/detail',
    component: detail,
    routes: [
      {
        path: '/detail/part1',
        component: part1,
        exact: true
      },
      {
        path: '/detail/part2',
        component: part2,
        exact: true
      }
    ]
  },
  {
    path: '/part1',
    component: part1,
    exact: true
  },
  {
    path: '/part2',
    component: part2,
    exact: true
  }
];

export default routerConfig;
