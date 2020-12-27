import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './team.reducer';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { AUTHORITIES } from 'app/config/constants';
import { hasAnyAuthority } from 'app/shared/auth/private-route';

import './team.scss';
import { ITeam } from 'app/shared/model/team.model';

export interface ITeamProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Team extends React.Component<ITeamProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { teamList, match, isAdmin } = this.props;
    const columns = [
      {
        dataField: 'name',
        text: 'Name',
        filter: textFilter()
      },
      {
        dataField: 'logo',
        text: 'Logo',
        formatter: (_cellContent, team: ITeam) => <img src={team.logo} alt="logo" className="team-logo" />
      },
      {
        dataField: 'venueName',
        text: 'Venue Name'
      }
    ];

    const commandColumn = {
      dataField: 'commandColumn',
      isDummyField: true,
      text: '',
      formatter: (cellContent, team) => (
        <div className="btn-group flex-btn-group-container">
          <Button tag={Link} to={`${match.url}/${team.id}`} color="info" size="sm">
            <FontAwesomeIcon icon="eye" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.view">View</Translate>
            </span>
          </Button>
          <Button tag={Link} to={`${match.url}/${team.id}/edit`} color="primary" size="sm">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
          <Button tag={Link} to={`${match.url}/${team.id}/delete`} color="danger" size="sm">
            <FontAwesomeIcon icon="trash" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.delete">Delete</Translate>
            </span>
          </Button>
        </div>
      )
    };

    if (isAdmin) {
      columns.push(commandColumn);
    }

    return (
      <div>
        <h2 id="team-heading">
          <Translate contentKey="footballUiApp.team.home.title">Teams</Translate>
          {isAdmin && (
            <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
              <FontAwesomeIcon icon="plus" />
              &nbsp;
              <Translate contentKey="footballUiApp.team.home.createLabel">Create a new Team</Translate>
            </Link>
          )}
        </h2>
        {teamList && teamList.length > 0 ? (
          <BootstrapTable keyField="id" data={teamList} columns={columns} filter={filterFactory()} />
        ) : (
          <div className="alert alert-warning">
            <Translate contentKey="footballUiApp.team.home.notFound">No Teams found</Translate>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ team, authentication }: IRootState) => ({
  teamList: team.entities,
  isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN])
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Team);
