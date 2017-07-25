import { USERS_SUBSCRIPTION_CHANGED } from '/imports/actions/users';

const initialState = {
  userList: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USERS_SUBSCRIPTION_CHANGED: {
      return {
        ...initialState,
        userList: action.payload,
      };
    }
    default:
      return state;
  }
};
