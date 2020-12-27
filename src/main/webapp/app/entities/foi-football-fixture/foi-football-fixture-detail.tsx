import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './foi-football-fixture.reducer';
import { IFoiFootballFixture } from 'app/shared/model/foi-football-fixture.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT, AUTHORITIES } from 'app/config/constants';
import { hasAnyAuthority } from 'app/shared/auth/private-route';

export interface IFoiFootballFixtureDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class FoiFootballFixtureDetail extends React.Component<IFoiFootballFixtureDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { foiFootballFixtureEntity, isAdmin } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="footballUiApp.foiFootballFixture.detail.title">FoiFootballFixture</Translate> [
            <b>{foiFootballFixtureEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="eventDate">
                <Translate contentKey="footballUiApp.foiFootballFixture.eventDate">Event Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={foiFootballFixtureEntity.eventDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="round">
                <Translate contentKey="footballUiApp.foiFootballFixture.round">Round</Translate>
              </span>
            </dt>
            <dd>{foiFootballFixtureEntity.round}</dd>
            <dt>
              <span id="venue">
                <Translate contentKey="footballUiApp.foiFootballFixture.venue">Venue</Translate>
              </span>
            </dt>
            <dd>{foiFootballFixtureEntity.venue}</dd>
            <dt>
              <span id="score">
                <Translate contentKey="footballUiApp.foiFootballFixture.score">Score</Translate>
              </span>
            </dt>
            <dd>{foiFootballFixtureEntity.score}</dd>
            <dt>
              <Translate contentKey="footballUiApp.foiFootballFixture.tournament">Tournament</Translate>
            </dt>
            <dd>{foiFootballFixtureEntity.tournamentId ? foiFootballFixtureEntity.tournamentId : ''}</dd>
            <dt>
              <Translate contentKey="footballUiApp.foiFootballFixture.homeTeam">Home Team</Translate>
            </dt>
            <dd>{foiFootballFixtureEntity.homeTeamId ? foiFootballFixtureEntity.homeTeamId : ''}</dd>
            <dt>
              <Translate contentKey="footballUiApp.foiFootballFixture.awayTeam">Away Team</Translate>
            </dt>
            <dd>{foiFootballFixtureEntity.awayTeamId ? foiFootballFixtureEntity.awayTeamId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/foi-football-fixture" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          {isAdmin && (
            <Button tag={Link} to={`/entity/foi-football-fixture/${foiFootballFixtureEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ foiFootballFixture, authentication }: IRootState) => ({
  foiFootballFixtureEntity: foiFootballFixture.entity,
  isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN])
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FoiFootballFixtureDetail);
