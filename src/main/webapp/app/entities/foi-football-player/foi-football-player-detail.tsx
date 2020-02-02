import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './foi-football-player.reducer';
import { IFoiFootballPlayer } from 'app/shared/model/foi-football-player.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFoiFootballPlayerDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class FoiFootballPlayerDetail extends React.Component<IFoiFootballPlayerDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { foiFootballPlayerEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="footballUiApp.foiFootballPlayer.detail.title">FoiFootballPlayer</Translate> [
            <b>{foiFootballPlayerEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="footballUiApp.foiFootballPlayer.name">Name</Translate>
              </span>
            </dt>
            <dd>{foiFootballPlayerEntity.name}</dd>
            <dt>
              <span id="number">
                <Translate contentKey="footballUiApp.foiFootballPlayer.number">Number</Translate>
              </span>
            </dt>
            <dd>{foiFootballPlayerEntity.number}</dd>
            <dt>
              <Translate contentKey="footballUiApp.foiFootballPlayer.foiFootballPosition">Foi Football Position</Translate>
            </dt>
            <dd>{foiFootballPlayerEntity.foiFootballPosition ? foiFootballPlayerEntity.foiFootballPosition.name : ''}</dd>
            <dt>
              <Translate contentKey="footballUiApp.foiFootballPlayer.foiFootballTeam">Foi Football Team</Translate>
            </dt>
            <dd>{foiFootballPlayerEntity.foiFootballTeam ? foiFootballPlayerEntity.foiFootballTeam.name : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/foi-football-player" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/foi-football-player/${foiFootballPlayerEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ foiFootballPlayer }: IRootState) => ({
  foiFootballPlayerEntity: foiFootballPlayer.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FoiFootballPlayerDetail);
