import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './competition.reducer';
import { ICompetition } from 'app/shared/model/competition.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT, AUTHORITIES } from 'app/config/constants';
import { hasAnyAuthority } from 'app/shared/auth/private-route';

export interface ICompetitionDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CompetitionDetail extends React.Component<ICompetitionDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { competitionEntity, isAdmin } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="footballUiApp.competition.detail.title">Competition</Translate> [<b>{competitionEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="footballUiApp.competition.name">Name</Translate>
              </span>
            </dt>
            <dd>{competitionEntity.name}</dd>
            <dt>
              <span id="code">
                <Translate contentKey="footballUiApp.competition.code">Code</Translate>
              </span>
            </dt>
            <dd>{competitionEntity.code}</dd>
          </dl>
          <Button tag={Link} to="/entity/competition" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          {isAdmin && (
            <Button tag={Link} to={`/entity/competition/${competitionEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ competition, authentication }: IRootState) => ({
  competitionEntity: competition.entity,
  isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN])
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompetitionDetail);
