import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { Translate, translate } from 'react-jhipster';
import { NavDropdown } from './menu-components';

export const AggregatedMenu = props => (
  <NavDropdown icon="th-list" name={translate('global.menu.aggregated')} id="entity-menu">
    <MenuItem icon="asterisk" to="/entity/player">
      <Translate contentKey="global.menu.entities.player" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/team">
      <Translate contentKey="global.menu.entities.team" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/fixture">
      <Translate contentKey="global.menu.entities.fixture" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/standing">
      <Translate contentKey="global.menu.entities.standing" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/competition">
      <Translate contentKey="global.menu.entities.competition" />
    </MenuItem>
  </NavDropdown>
);
