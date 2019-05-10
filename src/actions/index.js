import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_NOTE,
  FETCH_NOTE,
  FETCH_NOTES,
  EDIT_NOTE,
  DELETE_NOTE,
  CLEAR_SELECTED_NOTE,
  CLEAR_NOTES,
  DELETE_NOTES,
} from './types';

import { db } from '../base';

import history from '../history';

export const signIn = (userId, userEmail) => ({
  type: SIGN_IN,
  payload: { userId, userEmail },
});

export const signOut = () => ({
  type: SIGN_OUT,
});

export const createNote = formValues => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const { id } = await db.collection(`${userId}`).add({ ...formValues });

  const addedItem = await db
    .collection(`${userId}`)
    .doc(id)
    .get();

  const noteObject = { id, ...addedItem.data() };

  dispatch({
    type: CREATE_NOTE,
    payload: noteObject,
  });
  history.push('/notes');
};

export const fetchNote = id => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const note = await db
    .collection(`${userId}`)
    .doc(id)
    .get();

  const noteObject = { id, ...note.data() };

  dispatch({
    type: FETCH_NOTE,
    payload: noteObject,
  });
};

export const fetchNotes = () => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const notes = await db.collection(`${userId}`).get();

  const notesArray = [];

  await notes.forEach(note => {
    const noteObject = { id: note.id, ...note.data() };
    notesArray.push(noteObject);
  });

  dispatch({
    type: FETCH_NOTES,
    payload: notesArray,
  });
};

export const editNote = (id, formValues) => async (dispatch, getState) => {
  const { userId } = getState().auth;
  await db
    .collection(`${userId}`)
    .doc(id)
    .update({ ...formValues });

  // code bellow unlike with my own backend with mongodb is not necessary, because firestore syncs data on every edit.
  const updatedNote = await db
    .collection(`${userId}`)
    .doc(id)
    .get();

  const noteObject = { id, ...updatedNote.data() };

  dispatch({
    type: EDIT_NOTE,
    payload: noteObject,
  });
};

export const deleteNote = id => async (dispatch, getState) => {
  const { userId } = getState().auth;
  await db
    .collection(`${userId}`)
    .doc(id)
    .delete();

  dispatch({
    type: DELETE_NOTE,
    payload: id,
  });

  history.push('/notes');
};

export const clearSelectedNote = () => ({
  type: CLEAR_SELECTED_NOTE,
});

export const clearNotes = () => ({
  type: CLEAR_NOTES,
});

export const deleteNotes = () => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const { docs } = await db.collection(`${userId}`).get();

  await docs.forEach(note => {
    const { id } = note;
    db.collection(`${userId}`)
      .doc(id)
      .delete();
  });

  dispatch({
    type: DELETE_NOTES,
  });
};
