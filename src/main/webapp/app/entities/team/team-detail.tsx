import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './team.reducer';
import { ITeam } from 'app/shared/model/team.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITeamDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class TeamDetail extends React.Component<ITeamDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { teamEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="footballUiApp.team.detail.title">Team</Translate> [<b>{teamEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="footballUiApp.team.name">Name</Translate>
              </span>
            </dt>
            <dd>{teamEntity.name}</dd>
            <dt>
              <span id="logo">
                <Translate contentKey="footballUiApp.team.logo">Logo</Translate>
              </span>
            </dt>
            <dd>{teamEntity.logo}</dd>
            <dt>
              <span id="venueName">
                <Translate contentKey="footballUiApp.team.venueName">Venue Name</Translate>
              </span>
            </dt>
            <dd>{teamEntity.venueName}</dd>
          </dl>
          <Button tag={Link} to="/entity/team" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/team/${teamEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ team }: IRootState) => ({
  teamEntity: team.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamDetail);
