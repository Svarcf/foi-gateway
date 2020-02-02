import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import FoiFootballPosition from './foi-football-position';
import FoiFootballPositionDetail from './foi-football-position-detail';
import FoiFootballPositionUpdate from './foi-football-position-update';
import FoiFootballPositionDeleteDialog from './foi-football-position-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={FoiFootballPositionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={FoiFootballPositionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={FoiFootballPositionDetail} />
      <ErrorBoundaryRoute path={match.url} component={FoiFootballPosition} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={FoiFootballPositionDeleteDialog} />
  </>
);

export default Routes;
