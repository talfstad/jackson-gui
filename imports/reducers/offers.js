import {
  OFFERS_SUB_SUBSCRIPTION_CHANGED,
  OFFERS_SUB_SUBSCRIPTION_READY,
} from '../actions/offers';

const initialState = {
  offerList: [],
  pages: 21,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case OFFERS_SUB_SUBSCRIPTION_READY: {
      const { ready } = action.payload;
      return {
        ...state,
        ready,
      };
    }
    case OFFERS_SUB_SUBSCRIPTION_CHANGED: {
      return {
        ...initialState,
        offerList: action.payload,
      };
    }
    default:
      return state;
  }
};
