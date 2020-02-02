import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IFoiFootballTeam, defaultValue } from 'app/shared/model/foi-football-team.model';

export const ACTION_TYPES = {
  FETCH_FOIFOOTBALLTEAM_LIST: 'foiFootballTeam/FETCH_FOIFOOTBALLTEAM_LIST',
  FETCH_FOIFOOTBALLTEAM: 'foiFootballTeam/FETCH_FOIFOOTBALLTEAM',
  CREATE_FOIFOOTBALLTEAM: 'foiFootballTeam/CREATE_FOIFOOTBALLTEAM',
  UPDATE_FOIFOOTBALLTEAM: 'foiFootballTeam/UPDATE_FOIFOOTBALLTEAM',
  DELETE_FOIFOOTBALLTEAM: 'foiFootballTeam/DELETE_FOIFOOTBALLTEAM',
  RESET: 'foiFootballTeam/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IFoiFootballTeam>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type FoiFootballTeamState = Readonly<typeof initialState>;

// Reducer

export default (state: FoiFootballTeamState = initialState, action): FoiFootballTeamState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_FOIFOOTBALLTEAM_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FOIFOOTBALLTEAM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_FOIFOOTBALLTEAM):
    case REQUEST(ACTION_TYPES.UPDATE_FOIFOOTBALLTEAM):
    case REQUEST(ACTION_TYPES.DELETE_FOIFOOTBALLTEAM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_FOIFOOTBALLTEAM_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FOIFOOTBALLTEAM):
    case FAILURE(ACTION_TYPES.CREATE_FOIFOOTBALLTEAM):
    case FAILURE(ACTION_TYPES.UPDATE_FOIFOOTBALLTEAM):
    case FAILURE(ACTION_TYPES.DELETE_FOIFOOTBALLTEAM):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_FOIFOOTBALLTEAM_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_FOIFOOTBALLTEAM):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_FOIFOOTBALLTEAM):
    case SUCCESS(ACTION_TYPES.UPDATE_FOIFOOTBALLTEAM):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_FOIFOOTBALLTEAM):
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

const apiUrl = 'services/footballcrud/api/foi-football-teams';

// Actions

export const getEntities: ICrudGetAllAction<IFoiFootballTeam> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_FOIFOOTBALLTEAM_LIST,
  payload: axios.get<IFoiFootballTeam>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IFoiFootballTeam> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_FOIFOOTBALLTEAM,
    payload: axios.get<IFoiFootballTeam>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IFoiFootballTeam> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_FOIFOOTBALLTEAM,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IFoiFootballTeam> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_FOIFOOTBALLTEAM,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IFoiFootballTeam> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_FOIFOOTBALLTEAM,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
