import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './foi-football-team.reducer';
import { IFoiFootballTeam } from 'app/shared/model/foi-football-team.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFoiFootballTeamDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class FoiFootballTeamDetail extends React.Component<IFoiFootballTeamDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { foiFootballTeamEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="footballUiApp.foiFootballTeam.detail.title">FoiFootballTeam</Translate> [
            <b>{foiFootballTeamEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="footballUiApp.foiFootballTeam.name">Name</Translate>
              </span>
            </dt>
            <dd>{foiFootballTeamEntity.name}</dd>
            <dt>
              <span id="logo">
                <Translate contentKey="footballUiApp.foiFootballTeam.logo">Logo</Translate>
              </span>
            </dt>
            <dd>{foiFootballTeamEntity.logo}</dd>
            <dt>
              <span id="venueName">
                <Translate contentKey="footballUiApp.foiFootballTeam.venueName">Venue Name</Translate>
              </span>
            </dt>
            <dd>{foiFootballTeamEntity.venueName}</dd>
            <dt>
              <span id="venueCity">
                <Translate contentKey="footballUiApp.foiFootballTeam.venueCity">Venue City</Translate>
              </span>
            </dt>
            <dd>{foiFootballTeamEntity.venueCity}</dd>
          </dl>
          <Button tag={Link} to="/entity/foi-football-team" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/foi-football-team/${foiFootballTeamEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ foiFootballTeam }: IRootState) => ({
  foiFootballTeamEntity: foiFootballTeam.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FoiFootballTeamDetail);
