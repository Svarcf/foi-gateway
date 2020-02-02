import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './foi-football-tournament.reducer';
import { IFoiFootballTournament } from 'app/shared/model/foi-football-tournament.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFoiFootballTournamentProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class FoiFootballTournament extends React.Component<IFoiFootballTournamentProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { foiFootballTournamentList, match } = this.props;
    return (
      <div>
        <h2 id="foi-football-tournament-heading">
          <Translate contentKey="footballUiApp.foiFootballTournament.home.title">Foi Football Tournaments</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="footballUiApp.foiFootballTournament.home.createLabel">Create a new Foi Football Tournament</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {foiFootballTournamentList && foiFootballTournamentList.length > 0 ? (
            <Table responsive aria-describedby="foi-football-tournament-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="footballUiApp.foiFootballTournament.name">Name</Translate>
                  </th>
                  <th>
                    <Translate contentKey="footballUiApp.foiFootballTournament.start">Start</Translate>
                  </th>
                  <th>
                    <Translate contentKey="footballUiApp.foiFootballTournament.end">End</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {foiFootballTournamentList.map((foiFootballTournament, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${foiFootballTournament.id}`} color="link" size="sm">
                        {foiFootballTournament.id}
                      </Button>
                    </td>
                    <td>{foiFootballTournament.name}</td>
                    <td>
                      <TextFormat type="date" value={foiFootballTournament.start} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={foiFootballTournament.end} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${foiFootballTournament.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${foiFootballTournament.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${foiFootballTournament.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="footballUiApp.foiFootballTournament.home.notFound">No Foi Football Tournaments found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ foiFootballTournament }: IRootState) => ({
  foiFootballTournamentList: foiFootballTournament.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FoiFootballTournament);
