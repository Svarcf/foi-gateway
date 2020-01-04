import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './fixture.reducer';
import { IFixture } from 'app/shared/model/fixture.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFixtureProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Fixture extends React.Component<IFixtureProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { fixtureList, match } = this.props;
    return (
      <div>
        <h2 id="fixture-heading">
          <Translate contentKey="footballUiApp.fixture.home.title">Fixtures</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="footballUiApp.fixture.home.createLabel">Create a new Fixture</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {fixtureList && fixtureList.length > 0 ? (
            <Table responsive aria-describedby="fixture-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="footballUiApp.fixture.eventDate">Event Date</Translate>
                  </th>
                  <th>
                    <Translate contentKey="footballUiApp.fixture.round">Round</Translate>
                  </th>
                  <th>
                    <Translate contentKey="footballUiApp.fixture.statusShort">Status Short</Translate>
                  </th>
                  <th>
                    <Translate contentKey="footballUiApp.fixture.venue">Venue</Translate>
                  </th>
                  <th>
                    <Translate contentKey="footballUiApp.fixture.score">Score</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {fixtureList.map((fixture, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${fixture.id}`} color="link" size="sm">
                        {fixture.id}
                      </Button>
                    </td>
                    <td>
                      <TextFormat type="date" value={fixture.eventDate} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>{fixture.round}</td>
                    <td>{fixture.statusShort}</td>
                    <td>{fixture.venue}</td>
                    <td>{fixture.score}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${fixture.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${fixture.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${fixture.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="footballUiApp.fixture.home.notFound">No Fixtures found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ fixture }: IRootState) => ({
  fixtureList: fixture.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Fixture);
