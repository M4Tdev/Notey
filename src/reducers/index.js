import { combineReducers } from 'redux';
import authReducer from './authReducer';

export default combineReducers({
  dummy: () => 'dummy',
  auth: authReducer,
});
