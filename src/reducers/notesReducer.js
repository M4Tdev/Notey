import _ from 'lodash';
import {
  FETCH_NOTE,
  FETCH_NOTES,
  CREATE_NOTE,
  EDIT_NOTE,
  DELETE_NOTE,
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_NOTES:
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    default:
      return state;
  }
};
