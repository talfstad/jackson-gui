import { USER_REACTIVE_SOURCE_CHANGED } from '../actions/user/load';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_REACTIVE_SOURCE_CHANGED: {
      console.log('in reducer22');

      return {
        ...initialState,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};
