import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './standing.reducer';
import { IStanding } from 'app/shared/model/standing.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT, AUTHORITIES } from 'app/config/constants';
import { hasAnyAuthority } from 'app/shared/auth/private-route';

export interface IStandingDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class StandingDetail extends React.Component<IStandingDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { standingEntity, isAdmin } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="footballUiApp.standing.detail.title">Standing</Translate> [<b>{standingEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="position">
                <Translate contentKey="footballUiApp.standing.position">Position</Translate>
              </span>
            </dt>
            <dd>{standingEntity.position}</dd>
            <dt>
              <span id="won">
                <Translate contentKey="footballUiApp.standing.won">Won</Translate>
              </span>
            </dt>
            <dd>{standingEntity.won}</dd>
            <dt>
              <span id="draw">
                <Translate contentKey="footballUiApp.standing.draw">Draw</Translate>
              </span>
            </dt>
            <dd>{standingEntity.draw}</dd>
            <dt>
              <span id="lost">
                <Translate contentKey="footballUiApp.standing.lost">Lost</Translate>
              </span>
            </dt>
            <dd>{standingEntity.lost}</dd>
            <dt>
              <span id="points">
                <Translate contentKey="footballUiApp.standing.points">Points</Translate>
              </span>
            </dt>
            <dd>{standingEntity.points}</dd>
          </dl>
          <Button tag={Link} to="/entity/standing" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          {isAdmin && (
            <Button tag={Link} to={`/entity/standing/${standingEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ standing, authentication }: IRootState) => ({
  standingEntity: standing.entity,
  isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN])
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StandingDetail);
