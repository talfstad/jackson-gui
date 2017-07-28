import { Counter } from 'meteor/natestrauser:publish-performant-counts';
import {
  startSubscription,
  stopSubscription,
} from 'meteor-redux-middlewares';

import WhitelistValidationSchema from '/imports/api/meteor/schemas/validation/whitelisted';

import { Whitelisted } from '/imports/api/meteor/collections';

export const WHITELISTED_COUNT_SUB = 'WHITELISTED_COUNT_SUB';
export const WHITELISTED_COUNT_SUBSCRIPTION_CHANGED = `${WHITELISTED_COUNT_SUB}_SUBSCRIPTION_CHANGED`;

export const WHITELISTED_SUB = 'WHITELISTED';
export const WHITELISTED_SUBSCRIPTION_READY = `${WHITELISTED_SUB}_SUBSCRIPTION_READY`;
export const WHITELISTED_SUBSCRIPTION_CHANGED = `${WHITELISTED_SUB}_SUBSCRIPTION_CHANGED`;

export const UPDATE_WHITELISTED_SEARCH = 'UPDATE_WHITELISTED_SEARCH';
export const UPDATE_WHITELISTED_PAGE = 'UPDATE_WHITELISTED_PAGE';
export const UPDATE_WHITELISTED_SORTED = 'UPDATE_WHITELISTED_SORTED';
export const UPDATE_WHITELISTED_PAGE_SIZE = 'UPDATE_WHITELISTED_PAGE_SIZE';

export const ADD_NEW_WHITELISTED_ERRORS = 'ADD_NEW_WHITELISTED_ERRORS';
export const DELETE_WHITELISTED_ERRORS = 'DELETE_WHITELISTED_ERRORS';
export const UPDATE_ADD_WHITELISTED_VALUES = 'UPDATE_ADD_WHITELISTED_VALUES';

export const fetchWhitelistedDomains = ({ page, pageSize, sorted, search }) => (dispatch) => {
  dispatch({
    type: UPDATE_WHITELISTED_PAGE_SIZE,
    payload: pageSize,
  });

  dispatch({
    type: UPDATE_WHITELISTED_SEARCH,
    payload: search,
  });

  dispatch({
    type: UPDATE_WHITELISTED_PAGE,
    payload: page,
  });

  dispatch({
    type: UPDATE_WHITELISTED_SORTED,
    payload: sorted,
  });

  dispatch(stopSubscription(WHITELISTED_COUNT_SUB));
  dispatch(startSubscription({
    key: WHITELISTED_COUNT_SUB,
    get: () => Counter.get('whitelistedCount'),
    subscribe: () => Meteor.subscribe(WHITELISTED_COUNT_SUB, { search }),
  }));

  dispatch(stopSubscription(WHITELISTED_SUB));
  dispatch(startSubscription({
    key: WHITELISTED_SUB,
    get: () => Whitelisted.find({}, {
      limit: pageSize,
    }).fetch(),
    subscribe: () => Meteor.subscribe(WHITELISTED_SUB, { page, pageSize, sorted, search }),
  }));
};

export const stopWhitelistedDomainsSub = () => (dispatch) => {
  dispatch(stopSubscription(WHITELISTED_SUB));
  dispatch(stopSubscription(WHITELISTED_SUB));
};

export const addNewWhitelisted = ({ name, userId, userName }, callback) => (dispatch) => {
  const addNewWhitelistedValidationSchema = WhitelistValidationSchema.namedContext();
  addNewWhitelistedValidationSchema.validate({ name });

  if (addNewWhitelistedValidationSchema.isValid()) {
    Meteor.call('addNewWhitelisted', { name, userId, userName }, (error) => {
      if (error) {
        dispatch({
          type: ADD_NEW_WHITELISTED_ERRORS,
          payload: [{
            name: 'name',
            message: error.reason,
          }],
        });
      } else {
        dispatch({
          type: ADD_NEW_WHITELISTED_ERRORS,
          payload: [],
        });
        callback();
      }
    });
  } else {
    // Map simplschema validation errors to error messages
    const validationErrors = _.map(addNewWhitelistedValidationSchema.validationErrors(), o =>
      _.extend({ message: addNewWhitelistedValidationSchema.keyErrorMessage(o.name) }, o));

    return dispatch({
      type: ADD_NEW_WHITELISTED_ERRORS,
      payload: validationErrors,
    });
  }
};

export const updateAddValues = values => ({
  type: UPDATE_ADD_WHITELISTED_VALUES,
  payload: values,
});

export const deleteWhitelistedDomain = ({ whitelistedId }, callback) => (dispatch) => {
  if (_.isUndefined(whitelistedId)) {
    callback();
    return;
  }

  Meteor.call('deleteWhitelistedDomain', { whitelistedId }, (error) => {
    if (error) {
      dispatch({
        type: DELETE_WHITELISTED_ERRORS,
        payload: [{
          name: 'name',
          message: error.reason,
        }],
      });
    } else {
      dispatch({
        type: DELETE_WHITELISTED_ERRORS,
        payload: [],
      });
      callback();
    }
  });
};
