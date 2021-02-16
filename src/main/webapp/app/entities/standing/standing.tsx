import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './standing.reducer';
import { IStanding } from 'app/shared/model/standing.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT, AUTHORITIES } from 'app/config/constants';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import './standing.scss';

export interface IStandingProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Standing extends React.Component<IStandingProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { standingList, match, isAdmin } = this.props;
    return (
      <div>
        <h2 id="standing-heading">
          <Translate contentKey="footballUiApp.standing.home.title">Standings</Translate>
        </h2>
        <div className="table-responsive">
          {standingList && standingList.length > 0 ? (
            <Table responsive aria-describedby="standing-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="footballUiApp.standing.position">Position</Translate>
                  </th>
                  <th>
                    <Translate contentKey="footballUiApp.standing.team">Team</Translate>
                  </th>
                  <th>
                    <Translate contentKey="footballUiApp.standing.won">Won</Translate>
                  </th>
                  <th>
                    <Translate contentKey="footballUiApp.standing.draw">Draw</Translate>
                  </th>
                  <th>
                    <Translate contentKey="footballUiApp.standing.lost">Lost</Translate>
                  </th>
                  <th>
                    <Translate contentKey="footballUiApp.standing.points">Points</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {standingList.map((standing, i) => (
                  <tr key={`entity-${i}`}>
                    <td>{standing.position}</td>
                    <td>
                      <img src={standing.team.logo} alt="logo" className="team-logo" />
                      &nbsp;
                      {standing.team.name}
                    </td>
                    <td>{standing.won}</td>
                    <td>{standing.draw}</td>
                    <td>{standing.lost}</td>
                    <td>{standing.points}</td>
                    {isAdmin && (
                      <td className="text-right">
                        <div className="btn-group flex-btn-group-container">
                          <Button tag={Link} to={`${match.url}/${standing.id}`} color="info" size="sm">
                            <FontAwesomeIcon icon="eye" />{' '}
                            <span className="d-none d-md-inline">
                              <Translate contentKey="entity.action.view">View</Translate>
                            </span>
                          </Button>
                          <Button tag={Link} to={`${match.url}/${standing.id}/edit`} color="primary" size="sm">
                            <FontAwesomeIcon icon="pencil-alt" />{' '}
                            <span className="d-none d-md-inline">
                              <Translate contentKey="entity.action.edit">Edit</Translate>
                            </span>
                          </Button>
                          <Button tag={Link} to={`${match.url}/${standing.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="footballUiApp.standing.home.notFound">No Standings found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ standing, authentication }: IRootState) => ({
  standingList: standing.entities,
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
)(Standing);
