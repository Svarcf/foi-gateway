import React from 'react';
import { Switch } from 'react-router-dom';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Player from './player';
import Team from './team';
import Fixture from './fixture';
import FoiFootballPlayer from './foi-football-player';
import FoiFootballPosition from './foi-football-position';
import FoiFootballTeam from './foi-football-team';
import FoiFootballFixture from './foi-football-fixture';
import FoiFootballTournament from './foi-football-tournament';
import Standing from './standing';
import Competition from './competition';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/player`} component={Player} />
      <ErrorBoundaryRoute path={`${match.url}/team`} component={Team} />
      <ErrorBoundaryRoute path={`${match.url}/fixture`} component={Fixture} />
      <ErrorBoundaryRoute path={`${match.url}/foi-football-player`} component={FoiFootballPlayer} />
      <ErrorBoundaryRoute path={`${match.url}/foi-football-position`} component={FoiFootballPosition} />
      <ErrorBoundaryRoute path={`${match.url}/foi-football-team`} component={FoiFootballTeam} />
      <ErrorBoundaryRoute path={`${match.url}/foi-football-fixture`} component={FoiFootballFixture} />
      <ErrorBoundaryRoute path={`${match.url}/foi-football-tournament`} component={FoiFootballTournament} />
      <ErrorBoundaryRoute path={`${match.url}/standing`} component={Standing} />
      <ErrorBoundaryRoute path={`${match.url}/competition`} component={Competition} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
