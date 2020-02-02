import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IFoiFootballFixture, defaultValue } from 'app/shared/model/foi-football-fixture.model';

export const ACTION_TYPES = {
  FETCH_FOIFOOTBALLFIXTURE_LIST: 'foiFootballFixture/FETCH_FOIFOOTBALLFIXTURE_LIST',
  FETCH_FOIFOOTBALLFIXTURE: 'foiFootballFixture/FETCH_FOIFOOTBALLFIXTURE',
  CREATE_FOIFOOTBALLFIXTURE: 'foiFootballFixture/CREATE_FOIFOOTBALLFIXTURE',
  UPDATE_FOIFOOTBALLFIXTURE: 'foiFootballFixture/UPDATE_FOIFOOTBALLFIXTURE',
  DELETE_FOIFOOTBALLFIXTURE: 'foiFootballFixture/DELETE_FOIFOOTBALLFIXTURE',
  RESET: 'foiFootballFixture/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IFoiFootballFixture>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type FoiFootballFixtureState = Readonly<typeof initialState>;

// Reducer

export default (state: FoiFootballFixtureState = initialState, action): FoiFootballFixtureState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_FOIFOOTBALLFIXTURE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FOIFOOTBALLFIXTURE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_FOIFOOTBALLFIXTURE):
    case REQUEST(ACTION_TYPES.UPDATE_FOIFOOTBALLFIXTURE):
    case REQUEST(ACTION_TYPES.DELETE_FOIFOOTBALLFIXTURE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_FOIFOOTBALLFIXTURE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FOIFOOTBALLFIXTURE):
    case FAILURE(ACTION_TYPES.CREATE_FOIFOOTBALLFIXTURE):
    case FAILURE(ACTION_TYPES.UPDATE_FOIFOOTBALLFIXTURE):
    case FAILURE(ACTION_TYPES.DELETE_FOIFOOTBALLFIXTURE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_FOIFOOTBALLFIXTURE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_FOIFOOTBALLFIXTURE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_FOIFOOTBALLFIXTURE):
    case SUCCESS(ACTION_TYPES.UPDATE_FOIFOOTBALLFIXTURE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_FOIFOOTBALLFIXTURE):
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

const apiUrl = 'services/footballcrud/api/foi-football-fixtures';

// Actions

export const getEntities: ICrudGetAllAction<IFoiFootballFixture> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_FOIFOOTBALLFIXTURE_LIST,
  payload: axios.get<IFoiFootballFixture>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IFoiFootballFixture> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_FOIFOOTBALLFIXTURE,
    payload: axios.get<IFoiFootballFixture>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IFoiFootballFixture> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_FOIFOOTBALLFIXTURE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IFoiFootballFixture> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_FOIFOOTBALLFIXTURE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IFoiFootballFixture> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_FOIFOOTBALLFIXTURE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
