import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './foi-football-fixture.reducer';
import { APP_LOCAL_DATE_FORMAT, AUTHORITIES } from 'app/config/constants';
import { getEntities as getFoiFootballTournaments } from 'app/entities/foi-football-tournament/foi-football-tournament.reducer';
import { getEntities as getFoiFootballTeams } from 'app/entities/foi-football-team/foi-football-team.reducer';
import { hasAnyAuthority } from 'app/shared/auth/private-route';

export interface IFoiFootballFixtureProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class FoiFootballFixture extends React.Component<IFoiFootballFixtureProps> {
  componentDidMount() {
    this.props.getEntities();
    this.props.getFoiFootballTeams();
    this.props.getFoiFootballTournaments();
  }

  render() {
    const { foiFootballFixtureList, foiFootballTournaments, foiFootballTeams, match, isAdmin } = this.props;
    return (
      <div>
        <h2 id="foi-football-fixture-heading">
          <Translate contentKey="footballUiApp.foiFootballFixture.home.title">Foi Football Fixtures</Translate>
          {isAdmin && (
            <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
              <FontAwesomeIcon icon="plus" />
              &nbsp;
              <Translate contentKey="footballUiApp.foiFootballFixture.home.createLabel">Create a new Foi Football Fixture</Translate>
            </Link>
          )}
        </h2>
        <div className="table-responsive">
          {foiFootballFixtureList && foiFootballFixtureList.length > 0 ? (
            <Table responsive aria-describedby="foi-football-fixture-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="footballUiApp.foiFootballFixture.eventDate">Event Date</Translate>
                  </th>
                  <th>
                    <Translate contentKey="footballUiApp.foiFootballFixture.round">Round</Translate>
                  </th>
                  <th>
                    <Translate contentKey="footballUiApp.foiFootballFixture.venue">Venue</Translate>
                  </th>
                  <th>
                    <Translate contentKey="footballUiApp.foiFootballFixture.score">Score</Translate>
                  </th>
                  <th>
                    <Translate contentKey="footballUiApp.foiFootballFixture.tournament">Tournament</Translate>
                  </th>
                  <th>
                    <Translate contentKey="footballUiApp.foiFootballFixture.homeTeam">Home Team</Translate>
                  </th>
                  <th>
                    <Translate contentKey="footballUiApp.foiFootballFixture.awayTeam">Away Team</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {foiFootballFixtureList.map((foiFootballFixture, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${foiFootballFixture.id}`} color="link" size="sm">
                        {foiFootballFixture.id}
                      </Button>
                    </td>
                    <td>
                      <TextFormat type="date" value={foiFootballFixture.eventDate} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>{foiFootballFixture.round}</td>
                    <td>{foiFootballFixture.venue}</td>
                    <td>{foiFootballFixture.score}</td>
                    <td>
                      {foiFootballFixture.tournamentId && foiFootballTournaments && foiFootballTournaments.length ? (
                        <Link to={`foi-football-tournament/${foiFootballFixture.tournamentId}`}>
                          {foiFootballTournaments.find(value => value.id === foiFootballFixture.tournamentId).name}
                        </Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      {foiFootballFixture.homeTeamId && foiFootballTeams && foiFootballTeams.length ? (
                        <Link to={`foi-football-team/${foiFootballFixture.homeTeamId}`}>
                          {foiFootballTeams.find(value => value.id === foiFootballFixture.homeTeamId).name}
                        </Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      {foiFootballFixture.awayTeamId && foiFootballTeams && foiFootballTeams.length ? (
                        <Link to={`foi-football-team/${foiFootballFixture.awayTeamId}`}>
                          {foiFootballTeams.find(value => value.id === foiFootballFixture.awayTeamId).name}
                        </Link>
                      ) : (
                        ''
                      )}
                    </td>
                    {isAdmin && (
                      <td className="text-right">
                        <div className="btn-group flex-btn-group-container">
                          <Button tag={Link} to={`${match.url}/${foiFootballFixture.id}`} color="info" size="sm">
                            <FontAwesomeIcon icon="eye" />{' '}
                            <span className="d-none d-md-inline">
                              <Translate contentKey="entity.action.view">View</Translate>
                            </span>
                          </Button>
                          <Button tag={Link} to={`${match.url}/${foiFootballFixture.id}/edit`} color="primary" size="sm">
                            <FontAwesomeIcon icon="pencil-alt" />{' '}
                            <span className="d-none d-md-inline">
                              <Translate contentKey="entity.action.edit">Edit</Translate>
                            </span>
                          </Button>
                          <Button tag={Link} to={`${match.url}/${foiFootballFixture.id}/delete`} color="danger" size="sm">
                            <FontAwesomeIcon icon="trash" />{' '}
                            <span className="d-none d-md-inline">
                              <Translate contentKey="entity.action.delete">Delete</Translate>
                            </span>
                          </Button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">
              <Translate contentKey="footballUiApp.foiFootballFixture.home.notFound">No Foi Football Fixtures found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  foiFootballFixtureList: storeState.foiFootballFixture.entities,
  foiFootballTournaments: storeState.foiFootballTournament.entities,
  foiFootballTeams: storeState.foiFootballTeam.entities,
  isAdmin: hasAnyAuthority(storeState.authentication.account.authorities, [AUTHORITIES.ADMIN])
});

const mapDispatchToProps = {
  getEntities,
  getFoiFootballTournaments,
  getFoiFootballTeams
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FoiFootballFixture);
