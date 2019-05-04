import _ from 'lodash';
import {
  FETCH_NOTE,
  FETCH_NOTES,
  CREATE_NOTE,
  EDIT_NOTE,
  DELETE_NOTE,
  CLEAR_SELECTED_NOTE,
  CLEAR_NOTES,
  DELETE_NOTES,
} from '../actions/types';

export default (
  state = { notes: {}, selectedNote: null, notesFetched: false },
  action
) => {
  switch (action.type) {
    case FETCH_NOTES:
      return {
        ...state,
        notesFetched: true,
        notes: { ..._.mapKeys(action.payload, 'id') },
      };
    case FETCH_NOTE:
      return { ...state, selectedNote: { ...action.payload } };
    case EDIT_NOTE:
      return {
        ...state,
        notesFetched: false,
        notes: { [action.payload.id]: action.payload },
      };
    case DELETE_NOTE:
      return _.omit(state, action.payload);
    case CREATE_NOTE:
      return {
        ...state,
        notesFetched: false,
        notes: { [action.payload.id]: action.payload },
      };
    case CLEAR_SELECTED_NOTE:
      return { ...state, selectedNote: null };
    case CLEAR_NOTES:
      return { ...state, notes: {}, selectedNote: null, notesFetched: false };
    case DELETE_NOTES:
      return { ...state, notes: {} };
    default:
      return state;
  }
};
