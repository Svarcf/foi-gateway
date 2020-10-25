import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './player.reducer';
import { IPlayer } from 'app/shared/model/player.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPlayerProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Player extends React.Component<IPlayerProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { playerList, match } = this.props;
    return (
      <div>
        <h2 id="player-heading">
          <Translate contentKey="footballUiApp.player.home.title">Players</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="footballUiApp.player.home.createLabel">Create a new Player</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {playerList && playerList.length > 0 ? (
            <Table responsive aria-describedby="player-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="footballUiApp.player.name">Name</Translate>
                  </th>
                  <th>
                    <Translate contentKey="footballUiApp.player.position">Position</Translate>
                  </th>
                  <th>
                    <Translate contentKey="footballUiApp.player.team">Team</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {playerList.map((player, i) => (
                  <tr key={`entity-${i}`}>
                    <td>{player.name}</td>
                    <td>{player.position}</td>
                    <td>{player.team ? <Link to={`team/${player.team.id}`}>{player.team.name}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${player.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${player.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${player.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">Delete</Translate>
                          </span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">
              <Translate contentKey="footballUiApp.player.home.notFound">No Players found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ player }: IRootState) => ({
  playerList: player.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player);
