import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown icon="th-list" name={translate('global.menu.entities.main')} id="entity-menu">
    <MenuItem icon="asterisk" to="/entity/player">
      <Translate contentKey="global.menu.entities.player" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/team">
      <Translate contentKey="global.menu.entities.team" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/fixture">
      <Translate contentKey="global.menu.entities.fixture" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
