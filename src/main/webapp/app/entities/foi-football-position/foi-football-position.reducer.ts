import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IFoiFootballPosition, defaultValue } from 'app/shared/model/foi-football-position.model';

export const ACTION_TYPES = {
  FETCH_FOIFOOTBALLPOSITION_LIST: 'foiFootballPosition/FETCH_FOIFOOTBALLPOSITION_LIST',
  FETCH_FOIFOOTBALLPOSITION: 'foiFootballPosition/FETCH_FOIFOOTBALLPOSITION',
  CREATE_FOIFOOTBALLPOSITION: 'foiFootballPosition/CREATE_FOIFOOTBALLPOSITION',
  UPDATE_FOIFOOTBALLPOSITION: 'foiFootballPosition/UPDATE_FOIFOOTBALLPOSITION',
  DELETE_FOIFOOTBALLPOSITION: 'foiFootballPosition/DELETE_FOIFOOTBALLPOSITION',
  RESET: 'foiFootballPosition/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IFoiFootballPosition>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type FoiFootballPositionState = Readonly<typeof initialState>;

// Reducer

export default (state: FoiFootballPositionState = initialState, action): FoiFootballPositionState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_FOIFOOTBALLPOSITION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FOIFOOTBALLPOSITION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_FOIFOOTBALLPOSITION):
    case REQUEST(ACTION_TYPES.UPDATE_FOIFOOTBALLPOSITION):
    case REQUEST(ACTION_TYPES.DELETE_FOIFOOTBALLPOSITION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_FOIFOOTBALLPOSITION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FOIFOOTBALLPOSITION):
    case FAILURE(ACTION_TYPES.CREATE_FOIFOOTBALLPOSITION):
    case FAILURE(ACTION_TYPES.UPDATE_FOIFOOTBALLPOSITION):
    case FAILURE(ACTION_TYPES.DELETE_FOIFOOTBALLPOSITION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_FOIFOOTBALLPOSITION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_FOIFOOTBALLPOSITION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_FOIFOOTBALLPOSITION):
    case SUCCESS(ACTION_TYPES.UPDATE_FOIFOOTBALLPOSITION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_FOIFOOTBALLPOSITION):
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

const apiUrl = 'services/footballcrud/api/foi-football-positions';

// Actions

export const getEntities: ICrudGetAllAction<IFoiFootballPosition> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_FOIFOOTBALLPOSITION_LIST,
  payload: axios.get<IFoiFootballPosition>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IFoiFootballPosition> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_FOIFOOTBALLPOSITION,
    payload: axios.get<IFoiFootballPosition>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IFoiFootballPosition> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_FOIFOOTBALLPOSITION,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IFoiFootballPosition> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_FOIFOOTBALLPOSITION,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IFoiFootballPosition> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_FOIFOOTBALLPOSITION,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
