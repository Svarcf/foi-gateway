import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './foi-football-player.reducer';
import { IFoiFootballPlayer } from 'app/shared/model/foi-football-player.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { getEntities as getFoiFootballPositions } from 'app/entities/foi-football-position/foi-football-position.reducer';
import { getEntities as getFoiFootballTeams } from 'app/entities/foi-football-team/foi-football-team.reducer';
import team from '../team/team';

export interface IFoiFootballPlayerProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class FoiFootballPlayer extends React.Component<IFoiFootballPlayerProps> {
  componentDidMount() {
    this.props.getEntities();
    this.props.getFoiFootballPositions();
    this.props.getFoiFootballTeams();
  }

  render() {
    const { foiFootballPlayerList, foiFootballPositions, foiFootballTeams, match } = this.props;
    return (
      <div>
        <h2 id="foi-football-player-heading">
          <Translate contentKey="footballUiApp.foiFootballPlayer.home.title">Foi Football Players</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="footballUiApp.foiFootballPlayer.home.createLabel">Create a new Foi Football Player</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {foiFootballPlayerList && foiFootballPlayerList.length > 0 ? (
            <Table responsive aria-describedby="foi-football-player-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="footballUiApp.foiFootballPlayer.name">Name</Translate>
                  </th>
                  <th>
                    <Translate contentKey="footballUiApp.foiFootballPlayer.number">Number</Translate>
                  </th>
                  <th>
                    <Translate contentKey="footballUiApp.foiFootballPlayer.position">Position</Translate>
                  </th>
                  <th>
                    <Translate contentKey="footballUiApp.foiFootballPlayer.team">Team</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {foiFootballPlayerList.map((foiFootballPlayer, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${foiFootballPlayer.id}`} color="link" size="sm">
                        {foiFootballPlayer.id}
                      </Button>
                    </td>
                    <td>{foiFootballPlayer.name}</td>
                    <td>{foiFootballPlayer.number}</td>
                    <td>
                      {foiFootballPlayer.positionId && foiFootballPositions && foiFootballPositions.length ? (
                        <Link to={`foi-football-position/${foiFootballPlayer.positionId}`}>
                          {foiFootballPositions.find(value => value.id === foiFootballPlayer.positionId).name}
                        </Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      {foiFootballPlayer.teamId && foiFootballTeams && foiFootballTeams.length ? (
                        <Link to={`foi-football-team/${foiFootballPlayer.teamId}`}>
                          {foiFootballTeams.find(value => value.id === foiFootballPlayer.teamId).name}
                        </Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${foiFootballPlayer.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${foiFootballPlayer.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${foiFootballPlayer.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="footballUiApp.foiFootballPlayer.home.notFound">No Foi Football Players found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  foiFootballPositions: storeState.foiFootballPosition.entities,
  foiFootballTeams: storeState.foiFootballTeam.entities,
  foiFootballPlayerList: storeState.foiFootballPlayer.entities
});

const mapDispatchToProps = {
  getEntities,
  getFoiFootballPositions,
  getFoiFootballTeams
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FoiFootballPlayer);
