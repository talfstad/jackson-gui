import { Counter } from 'meteor/natestrauser:publish-performant-counts';
import {
  startSubscription,
  stopSubscription,
} from 'meteor-redux-middlewares';

import AddNewOfferValidationSchema from '/imports/api/meteor/schemas/validation/add-new-offer';

import { Offers } from '/imports/api/meteor/collections';

export const OFFERS_COUNT_SUB = 'OFFERS_COUNT';
export const OFFERS_COUNT_SUBSCRIPTION_CHANGED = `${OFFERS_COUNT_SUB}_SUBSCRIPTION_CHANGED`;

export const OFFERS_SUB = 'OFFERS';
export const OFFERS_SUBSCRIPTION_READY = `${OFFERS_SUB}_SUBSCRIPTION_READY`;
export const OFFERS_SUBSCRIPTION_CHANGED = `${OFFERS_SUB}_SUBSCRIPTION_CHANGED`;

export const UPDATE_OFFERS_SEARCH = 'UPDATE_OFFERS_SEARCH';
export const UPDATE_OFFERS_PAGE = 'UPDATE_OFFERS_PAGE';
export const UPDATE_OFFERS_SORTED = 'UPDATE_OFFERS_SORTED';
export const UPDATE_OFFERS_PAGE_SIZE = 'UPDATE_OFFERS_PAGE_SIZE';

export const ADD_NEW_OFFER_ERRORS = 'ADD_NEW_OFFER_ERRORS';
export const DELETE_OFFER_ERRORS = 'DELETE_OFFER_ERRORS';
export const UPDATE_EDIT_OFFER_VALUES = 'UPDATE_EDIT_OFFER_VALUES';
export const UPDATE_ADD_OFFER_VALUES = 'UPDATE_ADD_OFFER_VALUES';

export const OFFER_EDIT_SUB = 'OFFER_EDIT_SUB';
export const OFFER_EDIT_SUBSCRIPTION_READY = `${OFFER_EDIT_SUB}_SUBSCRIPTION_READY`;
export const OFFER_EDIT_SUBSCRIPTION_CHANGED = `${OFFER_EDIT_SUB}_SUBSCRIPTION_CHANGED`;

export const subscribeToEditOffer = ({ offerId }) => (
  startSubscription({
    key: OFFER_EDIT_SUB,
    get: () =>
      Offers.find({
        _id: (new Mongo.ObjectID(offerId)),
      }).fetch(),
    subscribe: () => Meteor.subscribe(OFFER_EDIT_SUB, { offerId }),
  })
);

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

export const addNewOffer = ({ name, url, userId, userName }, callback) => (dispatch) => {
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
        callback();
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
};

export const updateEditValues = values => ({
  type: UPDATE_EDIT_OFFER_VALUES,
  payload: values,
});

export const updateAddValues = values => ({
  type: UPDATE_ADD_OFFER_VALUES,
  payload: values,
});

export const deleteOffer = ({ offerId }, callback) => (dispatch) => {
  if (_.isUndefined(offerId)) {
    callback();
    return;
  }

  Meteor.call('deleteOffer', { offerId }, (error) => {
    if (error) {
      dispatch({
        type: DELETE_OFFER_ERRORS,
        payload: [{
          name: 'name',
          message: error.reason,
        }],
      });
    } else {
      dispatch({
        type: DELETE_OFFER_ERRORS,
        payload: [],
      });
      callback();
    }
  });
};
