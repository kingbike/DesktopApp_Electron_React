import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
// import ImageExportPage from './containers/ImageExportPage';

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route path={routes.COUNTER} component={CounterPage} />
        <Route path={routes.HOME} component={HomePage} />
        {/* <Route path={routes.IMAGEEXPORT} component={ImageExportPage} /> */}
      </Switch>
    </App>
  );
}
