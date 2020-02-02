import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './foi-football-team.reducer';
import { IFoiFootballTeam } from 'app/shared/model/foi-football-team.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFoiFootballTeamProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class FoiFootballTeam extends React.Component<IFoiFootballTeamProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { foiFootballTeamList, match } = this.props;
    return (
      <div>
        <h2 id="foi-football-team-heading">
          <Translate contentKey="footballUiApp.foiFootballTeam.home.title">Foi Football Teams</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="footballUiApp.foiFootballTeam.home.createLabel">Create a new Foi Football Team</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {foiFootballTeamList && foiFootballTeamList.length > 0 ? (
            <Table responsive aria-describedby="foi-football-team-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="footballUiApp.foiFootballTeam.name">Name</Translate>
                  </th>
                  <th>
                    <Translate contentKey="footballUiApp.foiFootballTeam.logo">Logo</Translate>
                  </th>
                  <th>
                    <Translate contentKey="footballUiApp.foiFootballTeam.venueName">Venue Name</Translate>
                  </th>
                  <th>
                    <Translate contentKey="footballUiApp.foiFootballTeam.venueCity">Venue City</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {foiFootballTeamList.map((foiFootballTeam, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${foiFootballTeam.id}`} color="link" size="sm">
                        {foiFootballTeam.id}
                      </Button>
                    </td>
                    <td>{foiFootballTeam.name}</td>
                    <td>{foiFootballTeam.logo}</td>
                    <td>{foiFootballTeam.venueName}</td>
                    <td>{foiFootballTeam.venueCity}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${foiFootballTeam.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${foiFootballTeam.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${foiFootballTeam.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="footballUiApp.foiFootballTeam.home.notFound">No Foi Football Teams found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ foiFootballTeam }: IRootState) => ({
  foiFootballTeamList: foiFootballTeam.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FoiFootballTeam);
