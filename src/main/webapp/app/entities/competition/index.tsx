import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Competition from './competition';
import CompetitionDetail from './competition-detail';
import CompetitionUpdate from './competition-update';
import CompetitionDeleteDialog from './competition-delete-dialog';
import { AUTHORITIES } from 'app/config/constants';
import PrivateRoute from 'app/shared/auth/private-route';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CompetitionUpdate} />
      <PrivateRoute exact path={`${match.url}/:id/edit`} component={CompetitionUpdate} hasAnyAuthorities={[AUTHORITIES.ADMIN]} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CompetitionDetail} />
      <ErrorBoundaryRoute path={match.url} component={Competition} />
    </Switch>
    <PrivateRoute path={`${match.url}/:id/delete`} component={CompetitionDeleteDialog} hasAnyAuthorities={[AUTHORITIES.ADMIN]} />
  </>
);

export default Routes;
