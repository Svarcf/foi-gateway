import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import FoiFootballTournament from './foi-football-tournament';
import FoiFootballTournamentDetail from './foi-football-tournament-detail';
import FoiFootballTournamentUpdate from './foi-football-tournament-update';
import FoiFootballTournamentDeleteDialog from './foi-football-tournament-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={FoiFootballTournamentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={FoiFootballTournamentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={FoiFootballTournamentDetail} />
      <ErrorBoundaryRoute path={match.url} component={FoiFootballTournament} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={FoiFootballTournamentDeleteDialog} />
  </>
);

export default Routes;
