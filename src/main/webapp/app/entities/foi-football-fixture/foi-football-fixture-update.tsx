import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './foi-football-fixture.reducer';
import { IFoiFootballFixture } from 'app/shared/model/foi-football-fixture.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IFoiFootballFixtureUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IFoiFootballFixtureUpdateState {
  isNew: boolean;
}

export class FoiFootballFixtureUpdate extends React.Component<IFoiFootballFixtureUpdateProps, IFoiFootballFixtureUpdateState> {
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
      const { foiFootballFixtureEntity } = this.props;
      const entity = {
        ...foiFootballFixtureEntity,
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
    this.props.history.push('/entity/foi-football-fixture');
  };

  render() {
    const { foiFootballFixtureEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="footballUiApp.foiFootballFixture.home.createOrEditLabel">
              <Translate contentKey="footballUiApp.foiFootballFixture.home.createOrEditLabel">
                Create or edit a FoiFootballFixture
              </Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : foiFootballFixtureEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="foi-football-fixture-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="foi-football-fixture-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="eventDateLabel" for="foi-football-fixture-eventDate">
                    <Translate contentKey="footballUiApp.foiFootballFixture.eventDate">Event Date</Translate>
                  </Label>
                  <AvField
                    id="foi-football-fixture-eventDate"
                    type="date"
                    className="form-control"
                    name="eventDate"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="roundLabel" for="foi-football-fixture-round">
                    <Translate contentKey="footballUiApp.foiFootballFixture.round">Round</Translate>
                  </Label>
                  <AvField id="foi-football-fixture-round" type="text" name="round" />
                </AvGroup>
                <AvGroup>
                  <Label id="venueLabel" for="foi-football-fixture-venue">
                    <Translate contentKey="footballUiApp.foiFootballFixture.venue">Venue</Translate>
                  </Label>
                  <AvField id="foi-football-fixture-venue" type="text" name="venue" />
                </AvGroup>
                <AvGroup>
                  <Label id="scoreLabel" for="foi-football-fixture-score">
                    <Translate contentKey="footballUiApp.foiFootballFixture.score">Score</Translate>
                  </Label>
                  <AvField id="foi-football-fixture-score" type="text" name="score" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/foi-football-fixture" replace color="info">
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
  foiFootballFixtureEntity: storeState.foiFootballFixture.entity,
  loading: storeState.foiFootballFixture.loading,
  updating: storeState.foiFootballFixture.updating,
  updateSuccess: storeState.foiFootballFixture.updateSuccess
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
)(FoiFootballFixtureUpdate);
