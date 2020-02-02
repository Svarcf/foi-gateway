import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import FoiFootballPlayer from './foi-football-player';
import FoiFootballPlayerDetail from './foi-football-player-detail';
import FoiFootballPlayerUpdate from './foi-football-player-update';
import FoiFootballPlayerDeleteDialog from './foi-football-player-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={FoiFootballPlayerUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={FoiFootballPlayerUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={FoiFootballPlayerDetail} />
      <ErrorBoundaryRoute path={match.url} component={FoiFootballPlayer} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={FoiFootballPlayerDeleteDialog} />
  </>
);

export default Routes;
