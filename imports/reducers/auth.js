import {
  LOGIN_ERRORS,
  FORGOT_PASSWORD_ERRORS,
} from '../actions/user/login';

const initialState = {
  login: {
    errors: [],
  },
  forgotPassword: {
    errors: [],
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_ERRORS: {
      return {
        ...state,
        forgotPassword: {
          ...state.forgotPassword,
          errors: action.payload,
        },
      };
    }
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
