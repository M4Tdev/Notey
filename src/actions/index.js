import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_NOTE,
  FETCH_NOTE,
  FETCH_NOTES,
  EDIT_NOTE,
  DELETE_NOTE,
} from './types';
import notes from '../apis/notes';

export const signIn = (userId, userEmail) => ({
  type: SIGN_IN,
  payload: { userId, userEmail },
});

export const signOut = () => ({
  type: SIGN_OUT,
});

export const createNote = formValues => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await notes.post(`/${userId}/notes/create`, {
    ...formValues,
  });

  dispatch({
    type: CREATE_NOTE,
    payload: response.data,
  });
};

export const fetchNote = id => async (dispatch, getState) => {
  // const { userId } = getState().auth;
  const response = await notes.get(`/abc123/notes/${id}`);

  dispatch({
    type: FETCH_NOTE,
    payload: response.data,
  });
};
