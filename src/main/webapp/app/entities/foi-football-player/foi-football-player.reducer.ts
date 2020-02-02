import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IFoiFootballPlayer, defaultValue } from 'app/shared/model/foi-football-player.model';

export const ACTION_TYPES = {
  FETCH_FOIFOOTBALLPLAYER_LIST: 'foiFootballPlayer/FETCH_FOIFOOTBALLPLAYER_LIST',
  FETCH_FOIFOOTBALLPLAYER: 'foiFootballPlayer/FETCH_FOIFOOTBALLPLAYER',
  CREATE_FOIFOOTBALLPLAYER: 'foiFootballPlayer/CREATE_FOIFOOTBALLPLAYER',
  UPDATE_FOIFOOTBALLPLAYER: 'foiFootballPlayer/UPDATE_FOIFOOTBALLPLAYER',
  DELETE_FOIFOOTBALLPLAYER: 'foiFootballPlayer/DELETE_FOIFOOTBALLPLAYER',
  RESET: 'foiFootballPlayer/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IFoiFootballPlayer>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type FoiFootballPlayerState = Readonly<typeof initialState>;

// Reducer

export default (state: FoiFootballPlayerState = initialState, action): FoiFootballPlayerState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_FOIFOOTBALLPLAYER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FOIFOOTBALLPLAYER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_FOIFOOTBALLPLAYER):
    case REQUEST(ACTION_TYPES.UPDATE_FOIFOOTBALLPLAYER):
    case REQUEST(ACTION_TYPES.DELETE_FOIFOOTBALLPLAYER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_FOIFOOTBALLPLAYER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FOIFOOTBALLPLAYER):
    case FAILURE(ACTION_TYPES.CREATE_FOIFOOTBALLPLAYER):
    case FAILURE(ACTION_TYPES.UPDATE_FOIFOOTBALLPLAYER):
    case FAILURE(ACTION_TYPES.DELETE_FOIFOOTBALLPLAYER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_FOIFOOTBALLPLAYER_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_FOIFOOTBALLPLAYER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_FOIFOOTBALLPLAYER):
    case SUCCESS(ACTION_TYPES.UPDATE_FOIFOOTBALLPLAYER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_FOIFOOTBALLPLAYER):
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

const apiUrl = 'services/footballcrud/api/foi-football-players';

// Actions

export const getEntities: ICrudGetAllAction<IFoiFootballPlayer> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_FOIFOOTBALLPLAYER_LIST,
  payload: axios.get<IFoiFootballPlayer>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IFoiFootballPlayer> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_FOIFOOTBALLPLAYER,
    payload: axios.get<IFoiFootballPlayer>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IFoiFootballPlayer> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_FOIFOOTBALLPLAYER,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IFoiFootballPlayer> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_FOIFOOTBALLPLAYER,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IFoiFootballPlayer> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_FOIFOOTBALLPLAYER,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
