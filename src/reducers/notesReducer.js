import _ from 'lodash';
import {
  FETCH_NOTE,
  FETCH_NOTES,
  CREATE_NOTE,
  EDIT_NOTE,
  DELETE_NOTE,
} from '../actions/types';

export default (state = { notes: {}, selectedNote: null }, action) => {
  switch (action.type) {
    case FETCH_NOTES:
      return { ...state, notes: { ..._.mapKeys(action.payload, 'id') } };
    case FETCH_NOTE:
      return { ...state, selectedNote: { ...action.payload } };
    case EDIT_NOTE:
      return { ...state, notes: { [action.payload.id]: action.payload } };
    case DELETE_NOTE:
      return _.omit(state, action.payload);
    case CREATE_NOTE:
      return { ...state, notes: { [action.payload.id]: action.payload } };
    default:
      return state;
  }
};
