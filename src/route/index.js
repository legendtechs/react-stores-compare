import React from 'react';
import {
  BrowserRouter,
  // Redirect,
  Switch
} from 'react-router-dom';
import App from '../component/app/App';
import RoutesConfig from './routesConfig';
import RouteWithSubRoutes from './routeWithSubRoutes';

const router = (
  <BrowserRouter>
    <App>
      <Switch>
        {RoutesConfig.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    </App>
  </BrowserRouter>
);
export default router;
