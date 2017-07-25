import { Counter } from 'meteor/natestrauser:publish-performant-counts';
import {
  startSubscription,
  stopSubscription,
} from 'meteor-redux-middlewares';

import AddNewOfferValidationSchema from '/imports/api/meteor/schemas/validation/add-new-offer';

import { Offers } from '/imports/api/meteor/collections';

export const OFFERS_COUNT_SUB = 'OFFERS_COUNT';
export const OFFERS_COUNT_SUB_CHANGED = `${OFFERS_COUNT_SUB}_SUBSCRIPTION_CHANGED`;

export const OFFERS_SUB = 'OFFERS';
export const OFFERS_SUB_SUBSCRIPTION_READY = `${OFFERS_SUB}_SUBSCRIPTION_READY`;
export const OFFERS_SUB_SUBSCRIPTION_CHANGED = `${OFFERS_SUB}_SUBSCRIPTION_CHANGED`;

export const UPDATE_OFFERS_SEARCH = 'UPDATE_OFFERS_SEARCH';
export const UPDATE_OFFERS_PAGE = 'UPDATE_OFFERS_PAGE';
export const UPDATE_OFFERS_SORTED = 'UPDATE_OFFERS_SORTED';
export const UPDATE_OFFERS_PAGE_SIZE = 'UPDATE_OFFERS_PAGE_SIZE';

export const ADD_NEW_OFFER_ERRORS = 'ADD_NEW_OFFER_ERRORS';

export const fetchOffers = ({ page, pageSize, sorted, search }) => (dispatch) => {
  dispatch({
    type: UPDATE_OFFERS_PAGE_SIZE,
    payload: pageSize,
  });

  dispatch({
    type: UPDATE_OFFERS_SEARCH,
    payload: search,
  });

  dispatch({
    type: UPDATE_OFFERS_PAGE,
    payload: page,
  });

  dispatch({
    type: UPDATE_OFFERS_SORTED,
    payload: sorted,
  });

  dispatch(stopSubscription(OFFERS_COUNT_SUB));
  dispatch(startSubscription({
    key: OFFERS_COUNT_SUB,
    get: () => Counter.get('offersCount'),
    subscribe: () => Meteor.subscribe(OFFERS_COUNT_SUB, { search }),
  }));

  dispatch(stopSubscription(OFFERS_SUB));
  dispatch(startSubscription({
    key: OFFERS_SUB,
    get: () => Offers.find().fetch(),
    subscribe: () => Meteor.subscribe(OFFERS_SUB, { page, pageSize, sorted, search }),
  }));
};

export const stopOffersSub = () => (dispatch) => {
  dispatch(stopSubscription(OFFERS_SUB));
  dispatch(stopSubscription(OFFERS_COUNT_SUB));
};

export const addNewOffer = ({ name, url, userId, userName }) => (dispatch) => {
  const addNewOfferValidationSchema = AddNewOfferValidationSchema.namedContext();
  addNewOfferValidationSchema.validate({ name, url });

  if (addNewOfferValidationSchema.isValid()) {
    Meteor.call('addNewOffer', { name, url, userId, userName }, (error) => {
      if (error) {
        dispatch({
          type: ADD_NEW_OFFER_ERRORS,
          payload: [{
            name: 'name',
            message: error.reason,
          }],
        });
      } else {
        dispatch({
          type: ADD_NEW_OFFER_ERRORS,
          payload: [],
        });
      }
    });
  } else {
    // Map simplschema validation errors to error messages
    const validationErrors = _.map(addNewOfferValidationSchema.validationErrors(), o =>
      _.extend({ message: addNewOfferValidationSchema.keyErrorMessage(o.name) }, o));

    return dispatch({
      type: ADD_NEW_OFFER_ERRORS,
      payload: validationErrors,
    });
  }
  // call addOffer meteor method. This
};
