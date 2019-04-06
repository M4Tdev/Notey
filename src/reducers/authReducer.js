import { SIGN_IN, SIGN_OUT } from '../actions/types';

const DEFAULT_STATE = {
  isSignedIn: null,
  userId: null,
  userEmail: null,
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        isSignedIn: true,
        userId: action.payload.userId,
        userEmail: action.payload.userEmail,
      };
    case SIGN_OUT:
      return { ...state, isSignedIn: false, userId: null, userEmail: null };
    default:
      return state;
  }
};
