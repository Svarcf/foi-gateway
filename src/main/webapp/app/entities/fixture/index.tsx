import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Fixture from './fixture';
import FixtureDetail from './fixture-detail';
import FixtureUpdate from './fixture-update';
import FixtureDeleteDialog from './fixture-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={FixtureUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={FixtureUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={FixtureDetail} />
      <ErrorBoundaryRoute path={match.url} component={Fixture} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={FixtureDeleteDialog} />
  </>
);

export default Routes;
