import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './fixture.reducer';
import { IFixture } from 'app/shared/model/fixture.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT, AUTHORITIES } from 'app/config/constants';
import { hasAnyAuthority } from 'app/shared/auth/private-route';

export interface IFixtureDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class FixtureDetail extends React.Component<IFixtureDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { fixtureEntity, isAdmin } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="footballUiApp.fixture.detail.title">Fixture</Translate>
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="eventDate">
                <Translate contentKey="footballUiApp.fixture.eventDate">Event Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={fixtureEntity.eventDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="round">
                <Translate contentKey="footballUiApp.fixture.round">Round</Translate>
              </span>
            </dt>
            <dd>{fixtureEntity.round}</dd>
            <dt>
              <span id="statusShort">
                <Translate contentKey="footballUiApp.fixture.statusShort">Status Short</Translate>
              </span>
            </dt>
            <dd>{fixtureEntity.statusShort}</dd>
            <dt>
              <span id="score">
                <Translate contentKey="footballUiApp.fixture.score">Score</Translate>
              </span>
            </dt>
            <dd>{fixtureEntity.score}</dd>
          </dl>
          <Button tag={Link} to="/entity/fixture" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          {isAdmin && (
            <Button tag={Link} to={`/entity/fixture/${fixtureEntity.id}/edit`} replace color="primary">
              <FontAwesomeIcon icon="pencil-alt" />{' '}
              <span className="d-none d-md-inline">
                <Translate contentKey="entity.action.edit">Edit</Translate>
              </span>
            </Button>
          )}
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ fixture, authentication }: IRootState) => ({
  fixtureEntity: fixture.entity,
  isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN])
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FixtureDetail);
