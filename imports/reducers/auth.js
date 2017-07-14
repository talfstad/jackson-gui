import { LOGIN_ERRORS } from '../actions/user/login';

const initialState = {
  login: {
    errors: [],
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_ERRORS: {
      return {
        ...state,
        login: {
          ...state.login,
          errors: action.payload,
        },
      };
    }
    default:
      return state;
  }
};
