import uniqid from 'uniqid';
import timestamp from 'time-stamp';
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

  // Get all user notes
  const res = await db
    .collection('notes')
    .doc(`${userId}`)
    .get();

  // Create note object
  const noteObject = {
    id: uniqid(),
    timeStamp: timestamp('YYYYMMDDHHmmss'),
    ...formValues,
  };

  // Check if user has his document and notes on server

  if (!res.data()) {
    // Create array with note object
    const newArray = [noteObject];

    // Set new note on the server in user document
    await db
      .collection('notes')
      .doc(`${userId}`)
      .set({ newArray });
  } else {
    // Get existing user document with notes
    const prevArray = res.data().newArray;

    // Create new array with saved notes and add new one
    const newArray = [...prevArray, noteObject];

    // Set new array with notes on the server in user document
    await db
      .collection('notes')
      .doc(`${userId}`)
      .set({ newArray });
  }

  // Dispatch action
  dispatch({
    type: CREATE_NOTE,
    payload: noteObject,
  });

  // Push to /notes route
  history.push('/notes');
};

export const fetchNote = id => async (dispatch, getState) => {
  const { userId } = getState().auth;

  // Get all user notes
  const res = await db
    .collection('notes')
    .doc(`${userId}`)
    .get();

  // Take data array from response
  const notes = res.data().newArray;

  // Filter all notes to one with id that we want
  const note = notes.filter(obj => obj.id === id);

  // Create note object with id and filtered note
  const noteObject = { ...note[0] };

  // Dispatch action
  dispatch({
    type: FETCH_NOTE,
    payload: noteObject,
  });
};

export const fetchNotes = () => async (dispatch, getState) => {
  const { userId } = getState().auth;

  // Get all user notes
  const res = await db
    .collection('notes')
    .doc(`${userId}`)
    .get();

  // Create empty array
  let notesArray = [];

  // Check if user has his own document with notes
  if (!res.data()) {
    // Create new empty array
    const newArray = [];

    // Set empty array to user document
    await db
      .collection('notes')
      .doc(`${userId}`)
      .set({ newArray });

    // Get user document with empty array, check if array was made
    const res = await db
      .collection('notes')
      .doc(`${userId}`)
      .get();

    // Assign empty array from server to notesArray
    notesArray = [...res.data().newArray];
  } else {
    // Spread array that we got and reverse it
    notesArray = [...res.data().newArray].reverse();
  }

  // Dispatch action
  dispatch({
    type: FETCH_NOTES,
    payload: notesArray,
  });
};

export const editNote = (id, formValues) => async (dispatch, getState) => {
  const { userId } = getState().auth;

  // Get all user notes
  const res = await db
    .collection('notes')
    .doc(`${userId}`)
    .get();

  // Take data array from response
  const notes = res.data().newArray;

  // Find index of updated note in array
  const index = notes.findIndex(obj => obj.id === id);

  // Create new array and spread all notes
  const newArray = [...notes];

  // Update note with new values
  newArray[index] = { ...newArray[index], ...formValues };

  // Set updated array on server
  await db
    .collection('notes')
    .doc(`${userId}`)
    .set({ newArray });

  // Create note object
  const noteObject = { id, ...newArray[index] };

  // Dispatch action
  dispatch({
    type: EDIT_NOTE,
    payload: noteObject,
  });
};

export const deleteNote = id => async (dispatch, getState) => {
  const { userId } = getState().auth;

  // Get all user notes
  const res = await db
    .collection('notes')
    .doc(`${userId}`)
    .get();

  // Take data array from response
  const notes = res.data().newArray;

  // Find index of note we want to delete
  const index = notes.findIndex(obj => obj.id === id);

  // Create new array without that element
  const newArray = [...notes.slice(0, index), ...notes.slice(index + 1)];

  // Set new array to server
  await db
    .collection('notes')
    .doc(`${userId}`)
    .set({ newArray });

  // Dispatch action
  dispatch({
    type: DELETE_NOTE,
    payload: id,
  });

  // Push to /notes route
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

  const newArray = [];

  await db
    .collection('notes')
    .doc(`${userId}`)
    .set({ newArray });

  dispatch({
    type: DELETE_NOTES,
  });
};
