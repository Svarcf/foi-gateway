import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './foi-football-tournament.reducer';
import { IFoiFootballTournament } from 'app/shared/model/foi-football-tournament.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IFoiFootballTournamentUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IFoiFootballTournamentUpdateState {
  isNew: boolean;
}

export class FoiFootballTournamentUpdate extends React.Component<IFoiFootballTournamentUpdateProps, IFoiFootballTournamentUpdateState> {
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
      const { foiFootballTournamentEntity } = this.props;
      const entity = {
        ...foiFootballTournamentEntity,
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
    this.props.history.push('/entity/foi-football-tournament');
  };

  render() {
    const { foiFootballTournamentEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="footballUiApp.foiFootballTournament.home.createOrEditLabel">
              <Translate contentKey="footballUiApp.foiFootballTournament.home.createOrEditLabel">
                Create or edit a FoiFootballTournament
              </Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : foiFootballTournamentEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="foi-football-tournament-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="foi-football-tournament-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="foi-football-tournament-name">
                    <Translate contentKey="footballUiApp.foiFootballTournament.name">Name</Translate>
                  </Label>
                  <AvField
                    id="foi-football-tournament-name"
                    type="text"
                    name="name"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="startLabel" for="foi-football-tournament-start">
                    <Translate contentKey="footballUiApp.foiFootballTournament.start">Start</Translate>
                  </Label>
                  <AvField
                    id="foi-football-tournament-start"
                    type="date"
                    className="form-control"
                    name="start"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="endLabel" for="foi-football-tournament-end">
                    <Translate contentKey="footballUiApp.foiFootballTournament.end">End</Translate>
                  </Label>
                  <AvField
                    id="foi-football-tournament-end"
                    type="date"
                    className="form-control"
                    name="end"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/foi-football-tournament" replace color="info">
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
  foiFootballTournamentEntity: storeState.foiFootballTournament.entity,
  loading: storeState.foiFootballTournament.loading,
  updating: storeState.foiFootballTournament.updating,
  updateSuccess: storeState.foiFootballTournament.updateSuccess
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
)(FoiFootballTournamentUpdate);
