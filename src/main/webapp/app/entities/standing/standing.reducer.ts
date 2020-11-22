import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IStanding, defaultValue } from 'app/shared/model/standing.model';

export const ACTION_TYPES = {
  FETCH_STANDING_LIST: 'standing/FETCH_STANDING_LIST',
  FETCH_STANDING: 'standing/FETCH_STANDING',
  CREATE_STANDING: 'standing/CREATE_STANDING',
  UPDATE_STANDING: 'standing/UPDATE_STANDING',
  DELETE_STANDING: 'standing/DELETE_STANDING',
  RESET: 'standing/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IStanding>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type StandingState = Readonly<typeof initialState>;

// Reducer

export default (state: StandingState = initialState, action): StandingState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_STANDING_LIST):
    case REQUEST(ACTION_TYPES.FETCH_STANDING):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_STANDING):
    case REQUEST(ACTION_TYPES.UPDATE_STANDING):
    case REQUEST(ACTION_TYPES.DELETE_STANDING):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_STANDING_LIST):
    case FAILURE(ACTION_TYPES.FETCH_STANDING):
    case FAILURE(ACTION_TYPES.CREATE_STANDING):
    case FAILURE(ACTION_TYPES.UPDATE_STANDING):
    case FAILURE(ACTION_TYPES.DELETE_STANDING):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_STANDING_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_STANDING):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_STANDING):
    case SUCCESS(ACTION_TYPES.UPDATE_STANDING):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_STANDING):
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

const apiUrl = 'services/footballaggregation/api/standings';

// Actions

export const getEntities: ICrudGetAllAction<IStanding> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_STANDING_LIST,
  payload: axios.get<IStanding>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IStanding> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_STANDING,
    payload: axios.get<IStanding>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IStanding> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_STANDING,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IStanding> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_STANDING,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IStanding> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_STANDING,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
