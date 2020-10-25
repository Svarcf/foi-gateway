import React from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Col, Row, Table} from 'reactstrap';
import {Translate, ICrudGetAllAction} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, {selectFilter} from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';

import {IRootState} from 'app/shared/reducers';
import {getEntities} from './player.reducer';
import {IPlayer} from 'app/shared/model/player.model';
import {APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT} from 'app/config/constants';

export interface IPlayerProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {
}

export class Player extends React.Component<IPlayerProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const {playerList, match} = this.props;
    const teamOptions = {};
    new Set(playerList.map((player) => player.team.name)).forEach((ele) => {
      teamOptions[ele] = ele;
    });

    const columns = [
      {
        dataField: 'name',
        text: 'Name',
      },
      {
        dataField: 'position',
        text: 'Position',
      },
      {
        dataField: 'team',
        text: 'Team',
        formatter: (cellContent, player) => (
          <div>
            {player.team ? <Link to={`team/${player.team.id}`}>{player.team.name}</Link> : ''}
          </div>
        ),
        filter: selectFilter({
          options: teamOptions,
          onFilter: (filterValue) => playerList.filter(ele => ele.team.name === filterValue)
        })
      },
      {
        dataField: 'commandColumn',
        isDummyField: true,
        text: '',
        formatter: (cellContent, team) =>
          (
            <div className="btn-group flex-btn-group-container">
              <Button tag={Link} to={`${match.url}/${team.id}`} color="info" size="sm">
                <FontAwesomeIcon icon="eye"/>{' '}
                <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
              </Button>
              <Button tag={Link} to={`${match.url}/${team.id}/edit`} color="primary" size="sm">
                <FontAwesomeIcon icon="pencil-alt"/>{' '}
                <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
              </Button>
              <Button tag={Link} to={`${match.url}/${team.id}/delete`} color="danger" size="sm">
                <FontAwesomeIcon icon="trash"/>{' '}
                <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">Delete</Translate>
                          </span>
              </Button>
            </div>
          )
      }
    ]
    return (
      <div>
        <h2 id="player-heading">
          <Translate contentKey="footballUiApp.player.home.title">Players</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus"/>
            &nbsp;
            <Translate contentKey="footballUiApp.player.home.createLabel">Create a new Player</Translate>
          </Link>
        </h2>
          {playerList && playerList.length > 0 ? (
            <BootstrapTable
              keyField="id"
              data={playerList}
              columns={columns}
              filter={filterFactory()}
              pagination={ paginationFactory() }
            />
          ) : (
            <div className="alert alert-warning">
              <Translate contentKey="footballUiApp.player.home.notFound">No Players found</Translate>
            </div>
          )}
      </div>
    );
  }
}

const mapStateToProps = ({player}: IRootState) => ({
  playerList: player.entities,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player);
