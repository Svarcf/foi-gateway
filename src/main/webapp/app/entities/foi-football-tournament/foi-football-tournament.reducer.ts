import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IFoiFootballTournament, defaultValue } from 'app/shared/model/foi-football-tournament.model';

export const ACTION_TYPES = {
  FETCH_FOIFOOTBALLTOURNAMENT_LIST: 'foiFootballTournament/FETCH_FOIFOOTBALLTOURNAMENT_LIST',
  FETCH_FOIFOOTBALLTOURNAMENT: 'foiFootballTournament/FETCH_FOIFOOTBALLTOURNAMENT',
  CREATE_FOIFOOTBALLTOURNAMENT: 'foiFootballTournament/CREATE_FOIFOOTBALLTOURNAMENT',
  UPDATE_FOIFOOTBALLTOURNAMENT: 'foiFootballTournament/UPDATE_FOIFOOTBALLTOURNAMENT',
  DELETE_FOIFOOTBALLTOURNAMENT: 'foiFootballTournament/DELETE_FOIFOOTBALLTOURNAMENT',
  RESET: 'foiFootballTournament/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IFoiFootballTournament>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type FoiFootballTournamentState = Readonly<typeof initialState>;

// Reducer

export default (state: FoiFootballTournamentState = initialState, action): FoiFootballTournamentState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_FOIFOOTBALLTOURNAMENT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FOIFOOTBALLTOURNAMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_FOIFOOTBALLTOURNAMENT):
    case REQUEST(ACTION_TYPES.UPDATE_FOIFOOTBALLTOURNAMENT):
    case REQUEST(ACTION_TYPES.DELETE_FOIFOOTBALLTOURNAMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_FOIFOOTBALLTOURNAMENT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FOIFOOTBALLTOURNAMENT):
    case FAILURE(ACTION_TYPES.CREATE_FOIFOOTBALLTOURNAMENT):
    case FAILURE(ACTION_TYPES.UPDATE_FOIFOOTBALLTOURNAMENT):
    case FAILURE(ACTION_TYPES.DELETE_FOIFOOTBALLTOURNAMENT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_FOIFOOTBALLTOURNAMENT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_FOIFOOTBALLTOURNAMENT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_FOIFOOTBALLTOURNAMENT):
    case SUCCESS(ACTION_TYPES.UPDATE_FOIFOOTBALLTOURNAMENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_FOIFOOTBALLTOURNAMENT):
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

const apiUrl = 'services/footballcrud/api/foi-football-tournaments';

// Actions

export const getEntities: ICrudGetAllAction<IFoiFootballTournament> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_FOIFOOTBALLTOURNAMENT_LIST,
  payload: axios.get<IFoiFootballTournament>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IFoiFootballTournament> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_FOIFOOTBALLTOURNAMENT,
    payload: axios.get<IFoiFootballTournament>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IFoiFootballTournament> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_FOIFOOTBALLTOURNAMENT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IFoiFootballTournament> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_FOIFOOTBALLTOURNAMENT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IFoiFootballTournament> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_FOIFOOTBALLTOURNAMENT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
