import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './foi-football-team.reducer';
import { IFoiFootballTeam } from 'app/shared/model/foi-football-team.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IFoiFootballTeamUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IFoiFootballTeamUpdateState {
  isNew: boolean;
}

export class FoiFootballTeamUpdate extends React.Component<IFoiFootballTeamUpdateProps, IFoiFootballTeamUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { foiFootballTeamEntity } = this.props;
      const entity = {
        ...foiFootballTeamEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/foi-football-team');
  };

  render() {
    const { foiFootballTeamEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="footballUiApp.foiFootballTeam.home.createOrEditLabel">
              <Translate contentKey="footballUiApp.foiFootballTeam.home.createOrEditLabel">Create or edit a FoiFootballTeam</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : foiFootballTeamEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="foi-football-team-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="foi-football-team-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="foi-football-team-name">
                    <Translate contentKey="footballUiApp.foiFootballTeam.name">Name</Translate>
                  </Label>
                  <AvField
                    id="foi-football-team-name"
                    type="text"
                    name="name"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="logoLabel" for="foi-football-team-logo">
                    <Translate contentKey="footballUiApp.foiFootballTeam.logo">Logo</Translate>
                  </Label>
                  <AvField id="foi-football-team-logo" type="text" name="logo" />
                </AvGroup>
                <AvGroup>
                  <Label id="venueNameLabel" for="foi-football-team-venueName">
                    <Translate contentKey="footballUiApp.foiFootballTeam.venueName">Venue Name</Translate>
                  </Label>
                  <AvField
                    id="foi-football-team-venueName"
                    type="text"
                    name="venueName"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="venueCityLabel" for="foi-football-team-venueCity">
                    <Translate contentKey="footballUiApp.foiFootballTeam.venueCity">Venue City</Translate>
                  </Label>
                  <AvField
                    id="foi-football-team-venueCity"
                    type="text"
                    name="venueCity"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/foi-football-team" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  foiFootballTeamEntity: storeState.foiFootballTeam.entity,
  loading: storeState.foiFootballTeam.loading,
  updating: storeState.foiFootballTeam.updating,
  updateSuccess: storeState.foiFootballTeam.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FoiFootballTeamUpdate);
