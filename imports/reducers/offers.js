import {
  OFFERS_SUB_SUBSCRIPTION_CHANGED,
  OFFERS_SUB_SUBSCRIPTION_READY,
  OFFERS_COUNT_SUB_CHANGED,
  UPDATE_OFFERS_PAGE_SIZE,
  UPDATE_OFFERS_SEARCH,
  UPDATE_OFFERS_PAGE,
  UPDATE_OFFERS_SORTED,
  ADD_NEW_OFFER_ERRORS,
} from '../actions/offers';

const initialState = {
  offerList: [],
  pages: -1,
  page: 0,
  search: '',
  sorted: [],
  pageSize: 10,
  addNewErrors: [],
  defaultPageSize: 10,
  count: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_OFFERS_SEARCH: {
      return {
        ...state,
        search: action.payload,
      };
    }
    case UPDATE_OFFERS_PAGE: {
      return {
        ...state,
        page: action.payload,
      };
    }
    case UPDATE_OFFERS_SORTED: {
      return {
        ...state,
        sorted: action.payload,
      };
    }
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
    case ADD_NEW_OFFER_ERRORS: {
      return {
        ...state,
        addNewErrors: action.payload,
      };
    }
    default:
      return state;
  }
};
