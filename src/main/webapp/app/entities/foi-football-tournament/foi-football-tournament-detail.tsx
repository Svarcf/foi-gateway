import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './foi-football-tournament.reducer';
import { IFoiFootballTournament } from 'app/shared/model/foi-football-tournament.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFoiFootballTournamentDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class FoiFootballTournamentDetail extends React.Component<IFoiFootballTournamentDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { foiFootballTournamentEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="footballUiApp.foiFootballTournament.detail.title">FoiFootballTournament</Translate> [
            <b>{foiFootballTournamentEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="footballUiApp.foiFootballTournament.name">Name</Translate>
              </span>
            </dt>
            <dd>{foiFootballTournamentEntity.name}</dd>
            <dt>
              <span id="start">
                <Translate contentKey="footballUiApp.foiFootballTournament.start">Start</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={foiFootballTournamentEntity.start} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="end">
                <Translate contentKey="footballUiApp.foiFootballTournament.end">End</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={foiFootballTournamentEntity.end} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
          </dl>
          <Button tag={Link} to="/entity/foi-football-tournament" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/foi-football-tournament/${foiFootballTournamentEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ foiFootballTournament }: IRootState) => ({
  foiFootballTournamentEntity: foiFootballTournament.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FoiFootballTournamentDetail);
