import {
  OFFERS_SUB_SUBSCRIPTION_CHANGED,
  OFFERS_SUB_SUBSCRIPTION_READY,
  OFFERS_COUNT_SUB_CHANGED,
  UPDATE_OFFERS_PAGE_SIZE,
} from '../actions/offers';

const initialState = {
  offerList: [],
  pages: -1,
  pageSize: 10,
  defaultPageSize: 10,
  count: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_OFFERS_PAGE_SIZE: {
      return {
        ...state,
        pageSize: action.payload,
        pages: Math.ceil(state.count / action.payload),
      };
    }
    case OFFERS_COUNT_SUB_CHANGED: {
      return {
        ...state,
        pages: Math.ceil(action.payload / state.pageSize),
        count: action.payload,
      };
    }
    case OFFERS_SUB_SUBSCRIPTION_READY: {
      const { ready } = action.payload;
      return {
        ...state,
        ready,
      };
    }
    case OFFERS_SUB_SUBSCRIPTION_CHANGED: {
      return {
        ...state,
        offerList: action.payload,
      };
    }
    default:
      return state;
  }
};
