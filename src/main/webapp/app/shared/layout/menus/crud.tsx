import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { Translate, translate } from 'react-jhipster';
import { NavDropdown } from './menu-components';
import { IFoiFootballTournament } from 'app/shared/model/foi-football-tournament.model';

export interface ICrudMenuProps {
  tournaments: ReadonlyArray<IFoiFootballTournament>;
}

export const CrudMenu = (props: ICrudMenuProps) => (
  <NavDropdown icon="th-list" name={translate('global.menu.local')} id="entity-menu">
    <MenuItem icon="asterisk" to="/entity/foi-football-fixture">
      <Translate contentKey="global.menu.entities.foiFootballFixture" />
    </MenuItem>
    {props.tournaments.map((value, index) => {
      return (
        <MenuItem key={index} icon="asterisk" to={`/entity/foi-football-table/${value.id}`}>
          {value.name}
        </MenuItem>
      );
    })}
  </NavDropdown>
);
