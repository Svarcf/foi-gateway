import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './competition.reducer';
import { ICompetition } from 'app/shared/model/competition.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT, AUTHORITIES } from 'app/config/constants';
import { hasAnyAuthority } from 'app/shared/auth/private-route';

export interface ICompetitionProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Competition extends React.Component<ICompetitionProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { competitionList, match, isAdmin } = this.props;
    return (
      <div>
        <h2 id="competition-heading">
          <Translate contentKey="footballUiApp.competition.home.title">Competitions</Translate>
          {isAdmin && (
            <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
              <FontAwesomeIcon icon="plus" />
              &nbsp;
              <Translate contentKey="footballUiApp.competition.home.createLabel">Create a new Competition</Translate>
            </Link>
          )}
        </h2>
        <div className="table-responsive">
          {competitionList && competitionList.length > 0 ? (
            <Table responsive aria-describedby="competition-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="footballUiApp.competition.name">Name</Translate>
                  </th>
                  <th>
                    <Translate contentKey="footballUiApp.competition.code">Code</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {competitionList.map((competition, i) => (
                  <tr key={`entity-${i}`}>
                    <td>{competition.name}</td>
                    <td>{competition.code}</td>
                    {isAdmin && (
                      <td className="text-right">
                        <div className="btn-group flex-btn-group-container">
                          <Button tag={Link} to={`${match.url}/${competition.id}`} color="info" size="sm">
                            <FontAwesomeIcon icon="eye" />{' '}
                            <span className="d-none d-md-inline">
                              <Translate contentKey="entity.action.view">View</Translate>
                            </span>
                          </Button>
                          <Button tag={Link} to={`${match.url}/${competition.id}/edit`} color="primary" size="sm">
                            <FontAwesomeIcon icon="pencil-alt" />{' '}
                            <span className="d-none d-md-inline">
                              <Translate contentKey="entity.action.edit">Edit</Translate>
                            </span>
                          </Button>
                          <Button tag={Link} to={`${match.url}/${competition.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="footballUiApp.competition.home.notFound">No Competitions found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ competition, authentication }: IRootState) => ({
  competitionList: competition.entities,
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
)(Competition);
