import { Counter } from 'meteor/natestrauser:publish-performant-counts';
import {
  startSubscription,
  stopSubscription,
} from 'meteor-redux-middlewares';

// import OfferValidationSchema from '/imports/api/meteor/schemas/validation/add-new-offer';

import { Rips } from '/imports/api/meteor/collections';

export const RIPS_COUNT_SUB = 'RIPS_COUNT';
export const RIPS_COUNT_SUBSCRIPTION_CHANGED = `${RIPS_COUNT_SUB}_SUBSCRIPTION_CHANGED`;

export const RIPS_SUB = 'RIPS';
export const RIPS_SUBSCRIPTION_READY = `${RIPS_SUB}_SUBSCRIPTION_READY`;
export const RIPS_SUBSCRIPTION_CHANGED = `${RIPS_SUB}_SUBSCRIPTION_CHANGED`;

export const UPDATE_RIPS_SEARCH = 'UPDATE_RIPS_SEARCH';
export const UPDATE_RIPS_PAGE = 'UPDATE_RIPS_PAGE';
export const UPDATE_RIPS_SORTED = 'UPDATE_RIPS_SORTED';
export const UPDATE_RIPS_PAGE_SIZE = 'UPDATE_RIPS_PAGE_SIZE';

export const ADD_NEW_RIP_ERRORS = 'ADD_NEW_RIP_ERRORS';
export const UPDATE_EDIT_RIP_VALUES = 'UPDATE_EDIT_RIP_VALUES';

export const RIP_EDIT_SUB = 'RIP_EDIT_SUB';
export const RIP_EDIT_SUBSCRIPTION_READY = `${RIP_EDIT_SUB}_SUBSCRIPTION_READY`;
export const RIP_EDIT_SUBSCRIPTION_CHANGED = `${RIP_EDIT_SUB}_SUBSCRIPTION_CHANGED`;

export const subscribeToEditRip = ({ ripId }) => (
  startSubscription({
    key: RIP_EDIT_SUB,
    get: () =>
      Rips.find({
        _id: (new Mongo.ObjectID(ripId)),
      }).fetch(),
    subscribe: () => Meteor.subscribe(RIP_EDIT_SUB, { ripId }),
  })
);

export const fetchRips = ({ page, pageSize, sorted, search }) => (dispatch) => {
  dispatch({
    type: UPDATE_RIPS_PAGE_SIZE,
    payload: pageSize,
  });

  dispatch({
    type: UPDATE_RIPS_SEARCH,
    payload: search,
  });

  dispatch({
    type: UPDATE_RIPS_PAGE,
    payload: page,
  });

  dispatch({
    type: UPDATE_RIPS_SORTED,
    payload: sorted,
  });
  dispatch(stopSubscription(RIPS_COUNT_SUB));
  dispatch(startSubscription({
    key: RIPS_COUNT_SUB,
    get: () => Counter.get('ripsCount'),
    subscribe: () => Meteor.subscribe(RIPS_COUNT_SUB, { search }),
  }));

  dispatch(stopSubscription(RIPS_SUB));
  dispatch(startSubscription({
    key: RIPS_SUB,
    get: () => Rips.find({}, {
      limit: pageSize,
    }).fetch(),
    subscribe: () => Meteor.subscribe(RIPS_SUB, { page, pageSize, sorted, search }),
  }));
};

export const stopRipsSub = () => (dispatch) => {
  dispatch(stopSubscription(RIPS_SUB));
  dispatch(stopSubscription(RIPS_COUNT_SUB));
};

export const stopEditRipSub = () => stopSubscription(RIP_EDIT_SUB);

export const editRip = (ripValues, callback) => (dispatch) => {
  console.log('edit rip action fired TODO');
  // const {
  //   name,
  //   url,
  // } = offerValues;
  //
  // const editOfferValidationSchema = OfferValidationSchema.namedContext();
  // editOfferValidationSchema.validate({ name, url });
  //
  // if (editOfferValidationSchema.isValid()) {
  //   Meteor.call('editOffer', offerValues, (error) => {
  //     if (error) {
  //       dispatch({
  //         type: ADD_NEW_OFFER_ERRORS,
  //         payload: [{
  //           name: 'name',
  //           message: error.reason,
  //         }],
  //       });
  //     } else {
  //       dispatch({
  //         type: ADD_NEW_OFFER_ERRORS,
  //         payload: [],
  //       });
  //       callback();
  //     }
  //   });
  // } else {
  //   // Map simplschema validation errors to error messages
  //   const validationErrors = _.map(editOfferValidationSchema.validationErrors(), o =>
  //     _.extend({ message: editOfferValidationSchema.keyErrorMessage(o.name) }, o));
  //
  //   return dispatch({
  //     type: ADD_NEW_OFFER_ERRORS,
  //     payload: validationErrors,
  //   });
  // }
};

export const updateEditValues = values => ({
  type: UPDATE_EDIT_RIP_VALUES,
  payload: values,
});
