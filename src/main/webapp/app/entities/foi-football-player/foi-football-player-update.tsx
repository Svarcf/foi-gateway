import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IFoiFootballPosition } from 'app/shared/model/foi-football-position.model';
import { getEntities as getFoiFootballPositions } from 'app/entities/foi-football-position/foi-football-position.reducer';
import { IFoiFootballTeam } from 'app/shared/model/foi-football-team.model';
import { getEntities as getFoiFootballTeams } from 'app/entities/foi-football-team/foi-football-team.reducer';
import { getEntity, updateEntity, createEntity, reset } from './foi-football-player.reducer';
import { IFoiFootballPlayer } from 'app/shared/model/foi-football-player.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IFoiFootballPlayerUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IFoiFootballPlayerUpdateState {
  isNew: boolean;
  foiFootballPositionId: string;
  foiFootballTeamId: string;
}

export class FoiFootballPlayerUpdate extends React.Component<IFoiFootballPlayerUpdateProps, IFoiFootballPlayerUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      foiFootballPositionId: '0',
      foiFootballTeamId: '0',
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

    this.props.getFoiFootballPositions();
    this.props.getFoiFootballTeams();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { foiFootballPlayerEntity } = this.props;
      const entity = {
        ...foiFootballPlayerEntity,
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
    this.props.history.push('/entity/foi-football-player');
  };

  render() {
    const { foiFootballPlayerEntity, foiFootballPositions, foiFootballTeams, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="footballUiApp.foiFootballPlayer.home.createOrEditLabel">
              <Translate contentKey="footballUiApp.foiFootballPlayer.home.createOrEditLabel">Create or edit a FoiFootballPlayer</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : foiFootballPlayerEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="foi-football-player-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="foi-football-player-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="foi-football-player-name">
                    <Translate contentKey="footballUiApp.foiFootballPlayer.name">Name</Translate>
                  </Label>
                  <AvField
                    id="foi-football-player-name"
                    type="text"
                    name="name"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="numberLabel" for="foi-football-player-number">
                    <Translate contentKey="footballUiApp.foiFootballPlayer.number">Number</Translate>
                  </Label>
                  <AvField
                    id="foi-football-player-number"
                    type="string"
                    className="form-control"
                    name="number"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="foi-football-player-foiFootballPosition">
                    <Translate contentKey="footballUiApp.foiFootballPlayer.foiFootballPosition">Foi Football Position</Translate>
                  </Label>
                  <AvInput
                    id="foi-football-player-foiFootballPosition"
                    type="select"
                    className="form-control"
                    name="foiFootballPosition.id"
                  >
                    <option value="" key="0" />
                    {foiFootballPositions
                      ? foiFootballPositions.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="foi-football-player-foiFootballTeam">
                    <Translate contentKey="footballUiApp.foiFootballPlayer.foiFootballTeam">Foi Football Team</Translate>
                  </Label>
                  <AvInput id="foi-football-player-foiFootballTeam" type="select" className="form-control" name="foiFootballTeam.id">
                    <option value="" key="0" />
                    {foiFootballTeams
                      ? foiFootballTeams.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/foi-football-player" replace color="info">
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
  foiFootballPositions: storeState.foiFootballPosition.entities,
  foiFootballTeams: storeState.foiFootballTeam.entities,
  foiFootballPlayerEntity: storeState.foiFootballPlayer.entity,
  loading: storeState.foiFootballPlayer.loading,
  updating: storeState.foiFootballPlayer.updating,
  updateSuccess: storeState.foiFootballPlayer.updateSuccess
});

const mapDispatchToProps = {
  getFoiFootballPositions,
  getFoiFootballTeams,
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
)(FoiFootballPlayerUpdate);
