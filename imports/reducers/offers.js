import {
  OFFERS_SUBSCRIPTION_CHANGED,
  OFFERS_SUBSCRIPTION_READY,
  OFFERS_COUNT_SUBSCRIPTION_CHANGED,
  OFFER_EDIT_SUBSCRIPTION_CHANGED,
  UPDATE_OFFERS_PAGE_SIZE,
  UPDATE_OFFERS_SEARCH,
  UPDATE_OFFERS_PAGE,
  UPDATE_OFFERS_SORTED,
  ADD_NEW_OFFER_ERRORS,
  DELETE_OFFER_ERRORS,
  UPDATE_EDIT_OFFER_VALUES,
  UPDATE_ADD_OFFER_VALUES,
} from '../actions/offers';

const initialState = {
  offerList: [],
  pages: -1,
  page: 0,
  editOffer: {},
  addOffer: {},
  search: '',
  sorted: [],
  pageSize: 10,
  addNewErrors: [],
  deleteOfferErrors: [],
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
    case OFFERS_COUNT_SUBSCRIPTION_CHANGED: {
      return {
        ...state,
        pages: Math.ceil(action.payload / state.pageSize),
        count: action.payload,
      };
    }
    case OFFERS_SUBSCRIPTION_READY: {
      const { ready } = action.payload;
      return {
        ...state,
        ready,
      };
    }
    case OFFERS_SUBSCRIPTION_CHANGED: {
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
    case DELETE_OFFER_ERRORS: {
      return {
        ...state,
        deleteOfferErrors: action.payload,
      };
    }
    case OFFER_EDIT_SUBSCRIPTION_CHANGED: {
      const [editOffer] = action.payload;
      return {
        ...state,
        editOffer,
      };
    }
    case UPDATE_ADD_OFFER_VALUES: {
      return {
        ...state,
        addOffer: {
          ...state.addOffer,
          ...action.payload,
        },
      };
    }
    case UPDATE_EDIT_OFFER_VALUES: {
      return {
        ...state,
        editOffer: {
          ...state.editOffer,
          ...action.payload,
        },
      };
    }
    default:
      return state;
  }
};
