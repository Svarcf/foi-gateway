import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Standing from './standing';
import StandingDetail from './standing-detail';
import StandingUpdate from './standing-update';
import StandingDeleteDialog from './standing-delete-dialog';
import { AUTHORITIES } from 'app/config/constants';
import PrivateRoute from 'app/shared/auth/private-route';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={StandingUpdate} />
      <PrivateRoute exact path={`${match.url}/:id/edit`} component={StandingUpdate} hasAnyAuthorities={[AUTHORITIES.ADMIN]} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={StandingDetail} />
      <ErrorBoundaryRoute path={match.url} component={Standing} />
    </Switch>
    <PrivateRoute path={`${match.url}/:id/delete`} component={StandingDeleteDialog} hasAnyAuthorities={[AUTHORITIES.ADMIN]} />
  </>
);

export default Routes;
