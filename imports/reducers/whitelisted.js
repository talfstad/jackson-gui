import {
  WHITELISTED_SUBSCRIPTION_CHANGED,
  WHITELISTED_SUBSCRIPTION_READY,
  WHITELISTED_COUNT_SUBSCRIPTION_CHANGED,
  UPDATE_WHITELISTED_PAGE_SIZE,
  UPDATE_WHITELISTED_SEARCH,
  UPDATE_WHITELISTED_PAGE,
  UPDATE_WHITELISTED_SORTED,
  ADD_NEW_WHITELISTED_ERRORS,
  DELETE_WHITELISTED_ERRORS,
  UPDATE_ADD_WHITELISTED_VALUES,
} from '../actions/whitelisted';

const initialState = {
  whitelist: [],
  pages: -1,
  page: 0,
  addWhitelisted: {},
  search: '',
  sorted: [],
  pageSize: 10,
  addNewErrors: [],
  deleteErrors: [],
  defaultPageSize: 10,
  count: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_WHITELISTED_SEARCH: {
      return {
        ...state,
        search: action.payload,
      };
    }
    case UPDATE_WHITELISTED_PAGE: {
      return {
        ...state,
        page: action.payload,
      };
    }
    case UPDATE_WHITELISTED_SORTED: {
      return {
        ...state,
        sorted: action.payload,
      };
    }
    case UPDATE_WHITELISTED_PAGE_SIZE: {
      return {
        ...state,
        pageSize: action.payload,
        pages: Math.ceil(state.count / action.payload),
      };
    }
    case WHITELISTED_COUNT_SUBSCRIPTION_CHANGED: {
      return {
        ...state,
        pages: Math.ceil(action.payload / state.pageSize),
        count: action.payload,
      };
    }
    case WHITELISTED_SUBSCRIPTION_READY: {
      const { ready } = action.payload;
      return {
        ...state,
        ready,
      };
    }
    case WHITELISTED_SUBSCRIPTION_CHANGED: {
      return {
        ...state,
        whitelist: action.payload,
      };
    }
    case ADD_NEW_WHITELISTED_ERRORS: {
      return {
        ...state,
        addNewErrors: action.payload,
      };
    }
    case DELETE_WHITELISTED_ERRORS: {
      return {
        ...state,
        deleteErrors: action.payload,
      };
    }
    case UPDATE_ADD_WHITELISTED_VALUES: {
      return {
        ...state,
        addWhitelisted: {
          ...state.addWhitelisted,
          ...action.payload,
        },
      };
    }
    default:
      return state;
  }
};
