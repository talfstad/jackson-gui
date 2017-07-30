import {
  RIPS_SUBSCRIPTION_CHANGED,
  RIPS_SUBSCRIPTION_READY,
  RIPS_COUNT_SUBSCRIPTION_CHANGED,
  RIP_EDIT_SUBSCRIPTION_CHANGED,
  UPDATE_RIPS_PAGE_SIZE,
  UPDATE_RIPS_SEARCH,
  UPDATE_RIPS_PAGE,
  UPDATE_RIPS_SORTED,
  ADD_NEW_RIP_ERRORS,
  UPDATE_EDIT_RIP_VALUES,
} from '../actions/rips';

const initialState = {
  ripList: [],
  pages: -1,
  page: 0,
  editRip: {},
  search: '',
  sorted: [],
  pageSize: 10,
  addNewErrors: [],
  defaultPageSize: 20,
  count: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_RIPS_SEARCH: {
      return {
        ...state,
        search: action.payload,
      };
    }
    case UPDATE_RIPS_PAGE: {
      return {
        ...state,
        page: action.payload,
      };
    }
    case UPDATE_RIPS_SORTED: {
      return {
        ...state,
        sorted: action.payload,
      };
    }
    case UPDATE_RIPS_PAGE_SIZE: {
      return {
        ...state,
        pageSize: action.payload,
        pages: Math.ceil(state.count / action.payload),
      };
    }
    case RIPS_COUNT_SUBSCRIPTION_CHANGED: {
      return {
        ...state,
        pages: Math.ceil(action.payload / state.pageSize),
        count: action.payload,
      };
    }
    case RIPS_SUBSCRIPTION_READY: {
      const { ready } = action.payload;
      return {
        ...state,
        ready,
      };
    }
    case RIPS_SUBSCRIPTION_CHANGED: {
      return {
        ...state,
        ripList: action.payload,
      };
    }
    case ADD_NEW_RIP_ERRORS: {
      return {
        ...state,
        addNewErrors: action.payload,
      };
    }
    case RIP_EDIT_SUBSCRIPTION_CHANGED: {
      const [editRip] = action.payload;
      return {
        ...state,
        editRip,
      };
    }
    case UPDATE_EDIT_RIP_VALUES: {
      return {
        ...state,
        editRip: {
          ...state.editRip,
          ...action.payload,
        },
      };
    }
    default:
      return state;
  }
};
