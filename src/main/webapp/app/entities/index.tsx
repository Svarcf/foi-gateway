import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Player from './player';
import Team from './team';
import Fixture from './fixture';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/player`} component={Player} />
      <ErrorBoundaryRoute path={`${match.url}/team`} component={Team} />
      <ErrorBoundaryRoute path={`${match.url}/fixture`} component={Fixture} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
