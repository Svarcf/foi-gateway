import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { ICompetition, defaultValue } from 'app/shared/model/competition.model';

export const ACTION_TYPES = {
  FETCH_COMPETITION_LIST: 'competition/FETCH_COMPETITION_LIST',
  FETCH_COMPETITION: 'competition/FETCH_COMPETITION',
  CREATE_COMPETITION: 'competition/CREATE_COMPETITION',
  UPDATE_COMPETITION: 'competition/UPDATE_COMPETITION',
  DELETE_COMPETITION: 'competition/DELETE_COMPETITION',
  RESET: 'competition/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICompetition>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type CompetitionState = Readonly<typeof initialState>;

// Reducer

export default (state: CompetitionState = initialState, action): CompetitionState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_COMPETITION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_COMPETITION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_COMPETITION):
    case REQUEST(ACTION_TYPES.UPDATE_COMPETITION):
    case REQUEST(ACTION_TYPES.DELETE_COMPETITION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_COMPETITION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_COMPETITION):
    case FAILURE(ACTION_TYPES.CREATE_COMPETITION):
    case FAILURE(ACTION_TYPES.UPDATE_COMPETITION):
    case FAILURE(ACTION_TYPES.DELETE_COMPETITION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_COMPETITION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_COMPETITION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_COMPETITION):
    case SUCCESS(ACTION_TYPES.UPDATE_COMPETITION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_COMPETITION):
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

const apiUrl = 'services/footballaggregation/api/competitions';

// Actions

export const getEntities: ICrudGetAllAction<ICompetition> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_COMPETITION_LIST,
  payload: axios.get<ICompetition>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ICompetition> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_COMPETITION,
    payload: axios.get<ICompetition>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICompetition> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_COMPETITION,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICompetition> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_COMPETITION,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICompetition> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_COMPETITION,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
