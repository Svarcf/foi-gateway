import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IFoiFootballTable, defaultValue } from 'app/shared/model/foi-football-table.model';

export const ACTION_TYPES = {
  FETCH_FOIFOOTBALLTABLE_LIST: 'foiFootballTable/FETCH_FOIFOOTBALLTABLE_LIST'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IFoiFootballTable>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type FoiFootballTableState = Readonly<typeof initialState>;

// Reducer

export default (state: FoiFootballTableState = initialState, action): FoiFootballTableState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_FOIFOOTBALLTABLE_LIST):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case FAILURE(ACTION_TYPES.FETCH_FOIFOOTBALLTABLE_LIST):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_FOIFOOTBALLTABLE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    default:
      return state;
  }
};

const apiUrl = 'services/footballcrud/api/foi-football-tables';

// Actions
export const getEntities: ICrudGetAction<IFoiFootballTable> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_FOIFOOTBALLTABLE_LIST,
    payload: axios.get<IFoiFootballTable>(`${requestUrl}?cacheBuster=${new Date().getTime()}`)
  };
};
