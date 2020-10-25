import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './fixture.reducer';
import { IFixture } from 'app/shared/model/fixture.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IFixtureUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IFixtureUpdateState {
  isNew: boolean;
}

export class FixtureUpdate extends React.Component<IFixtureUpdateProps, IFixtureUpdateState> {
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
      const { fixtureEntity } = this.props;
      const entity = {
        ...fixtureEntity,
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
    this.props.history.push('/entity/fixture');
  };

  render() {
    const { fixtureEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="footballUiApp.fixture.home.createOrEditLabel">
              <Translate contentKey="footballUiApp.fixture.home.createOrEditLabel">Create or edit a Fixture</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : fixtureEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="fixture-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="fixture-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="eventDateLabel" for="fixture-eventDate">
                    <Translate contentKey="footballUiApp.fixture.eventDate">Event Date</Translate>
                  </Label>
                  <AvField
                    id="fixture-eventDate"
                    type="date"
                    className="form-control"
                    name="eventDate"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="roundLabel" for="fixture-round">
                    <Translate contentKey="footballUiApp.fixture.round">Round</Translate>
                  </Label>
                  <AvField id="fixture-round" type="text" name="round" />
                </AvGroup>
                <AvGroup>
                  <Label id="statusShortLabel" for="fixture-statusShort">
                    <Translate contentKey="footballUiApp.fixture.statusShort">Status Short</Translate>
                  </Label>
                  <AvField id="fixture-statusShort" type="text" name="statusShort" />
                </AvGroup>
                <AvGroup>
                  <Label id="scoreLabel" for="fixture-score">
                    <Translate contentKey="footballUiApp.fixture.score">Score</Translate>
                  </Label>
                  <AvField id="fixture-score" type="text" name="score" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/fixture" replace color="info">
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
  fixtureEntity: storeState.fixture.entity,
  loading: storeState.fixture.loading,
  updating: storeState.fixture.updating,
  updateSuccess: storeState.fixture.updateSuccess
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
)(FixtureUpdate);
