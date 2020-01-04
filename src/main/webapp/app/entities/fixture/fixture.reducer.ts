import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IFixture, defaultValue } from 'app/shared/model/fixture.model';

export const ACTION_TYPES = {
  FETCH_FIXTURE_LIST: 'fixture/FETCH_FIXTURE_LIST',
  FETCH_FIXTURE: 'fixture/FETCH_FIXTURE',
  CREATE_FIXTURE: 'fixture/CREATE_FIXTURE',
  UPDATE_FIXTURE: 'fixture/UPDATE_FIXTURE',
  DELETE_FIXTURE: 'fixture/DELETE_FIXTURE',
  RESET: 'fixture/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IFixture>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type FixtureState = Readonly<typeof initialState>;

// Reducer

export default (state: FixtureState = initialState, action): FixtureState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_FIXTURE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FIXTURE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_FIXTURE):
    case REQUEST(ACTION_TYPES.UPDATE_FIXTURE):
    case REQUEST(ACTION_TYPES.DELETE_FIXTURE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_FIXTURE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FIXTURE):
    case FAILURE(ACTION_TYPES.CREATE_FIXTURE):
    case FAILURE(ACTION_TYPES.UPDATE_FIXTURE):
    case FAILURE(ACTION_TYPES.DELETE_FIXTURE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_FIXTURE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_FIXTURE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_FIXTURE):
    case SUCCESS(ACTION_TYPES.UPDATE_FIXTURE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_FIXTURE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'services/footballaggregation/api/fixtures';

// Actions

export const getEntities: ICrudGetAllAction<IFixture> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_FIXTURE_LIST,
  payload: axios.get<IFixture>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IFixture> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_FIXTURE,
    payload: axios.get<IFixture>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IFixture> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_FIXTURE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IFixture> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_FIXTURE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IFixture> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_FIXTURE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
