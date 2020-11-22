import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './player.reducer';
import { IPlayer } from 'app/shared/model/player.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPlayerDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PlayerDetail extends React.Component<IPlayerDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { playerEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="footballUiApp.player.detail.title">Player</Translate>
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="footballUiApp.player.name">Name</Translate>
              </span>
            </dt>
            <dd>{playerEntity.name}</dd>
            <dt>
              <span id="position">
                <Translate contentKey="footballUiApp.player.position">Position</Translate>
              </span>
            </dt>
            <dd>{playerEntity.position}</dd>
            <dt>
              <Translate contentKey="footballUiApp.player.team">Team</Translate>
            </dt>
            <dd>{playerEntity.team ? playerEntity.team.name : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/player" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/player/${playerEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ player }: IRootState) => ({
  playerEntity: player.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerDetail);
