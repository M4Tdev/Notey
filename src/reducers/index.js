import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './authReducer';
import notesReducer from './notesReducer';

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  notes: notesReducer,
});
