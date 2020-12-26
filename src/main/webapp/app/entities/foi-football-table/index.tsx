import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import FoiFootballTable from './foi-football-table';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute path={`${match.url}/:id`} component={FoiFootballTable} />
    </Switch>
  </>
);

export default Routes;
