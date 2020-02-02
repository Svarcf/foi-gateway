import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import FoiFootballTeam from './foi-football-team';
import FoiFootballTeamDetail from './foi-football-team-detail';
import FoiFootballTeamUpdate from './foi-football-team-update';
import FoiFootballTeamDeleteDialog from './foi-football-team-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={FoiFootballTeamUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={FoiFootballTeamUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={FoiFootballTeamDetail} />
      <ErrorBoundaryRoute path={match.url} component={FoiFootballTeam} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={FoiFootballTeamDeleteDialog} />
  </>
);

export default Routes;
