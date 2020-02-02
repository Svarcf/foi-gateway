import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './foi-football-fixture.reducer';
import { IFoiFootballFixture } from 'app/shared/model/foi-football-fixture.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFoiFootballFixtureProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class FoiFootballFixture extends React.Component<IFoiFootballFixtureProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { foiFootballFixtureList, match } = this.props;
    return (
      <div>
        <h2 id="foi-football-fixture-heading">
          <Translate contentKey="footballUiApp.foiFootballFixture.home.title">Foi Football Fixtures</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="footballUiApp.foiFootballFixture.home.createLabel">Create a new Foi Football Fixture</Translate>
          </Link>
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

const mapStateToProps = ({ foiFootballFixture }: IRootState) => ({
  foiFootballFixtureList: foiFootballFixture.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FoiFootballFixture);
