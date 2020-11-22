import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import PrivateRoute from 'app/shared/auth/private-route';

import Fixture from './fixture';
import FixtureDetail from './fixture-detail';
import FixtureUpdate from './fixture-update';
import FixtureDeleteDialog from './fixture-delete-dialog';
import { AUTHORITIES } from 'app/config/constants';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={FixtureUpdate} />
      <PrivateRoute exact path={`${match.url}/:id/edit`} component={FixtureUpdate} hasAnyAuthorities={[AUTHORITIES.ADMIN]} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={FixtureDetail} />
      <ErrorBoundaryRoute path={match.url} component={Fixture} />
    </Switch>
    <PrivateRoute path={`${match.url}/:id/delete`} component={FixtureDeleteDialog} hasAnyAuthorities={[AUTHORITIES.ADMIN]} />
  </>
);

export default Routes;
