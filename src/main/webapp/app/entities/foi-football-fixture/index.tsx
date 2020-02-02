import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import FoiFootballFixture from './foi-football-fixture';
import FoiFootballFixtureDetail from './foi-football-fixture-detail';
import FoiFootballFixtureUpdate from './foi-football-fixture-update';
import FoiFootballFixtureDeleteDialog from './foi-football-fixture-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={FoiFootballFixtureUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={FoiFootballFixtureUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={FoiFootballFixtureDetail} />
      <ErrorBoundaryRoute path={match.url} component={FoiFootballFixture} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={FoiFootballFixtureDeleteDialog} />
  </>
);

export default Routes;
