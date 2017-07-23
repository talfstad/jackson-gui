import { Counter } from 'meteor/natestrauser:publish-performant-counts';
import {
  startSubscription,
  stopSubscription,
} from 'meteor-redux-middlewares';

import { Offers } from '/imports/api/meteor/collections';

export const OFFERS_COUNT_SUB = 'OFFERS_COUNT';
export const OFFERS_COUNT_SUB_CHANGED = `${OFFERS_COUNT_SUB}_SUBSCRIPTION_CHANGED`;

export const OFFERS_SUB = 'OFFERS';
export const OFFERS_SUB_SUBSCRIPTION_READY = `${OFFERS_SUB}_SUBSCRIPTION_READY`;
export const OFFERS_SUB_SUBSCRIPTION_CHANGED = `${OFFERS_SUB}_SUBSCRIPTION_CHANGED`;

export const UPDATE_OFFERS_PAGE_SIZE = 'UPDATE_OFFERS_PAGE_SIZE';

export const fetchOffers = ({ page, pageSize, sorted }) => (dispatch) => {
  dispatch({
    type: UPDATE_OFFERS_PAGE_SIZE,
    payload: pageSize,
  });

  dispatch(stopSubscription(OFFERS_SUB));
  dispatch(startSubscription({
    key: OFFERS_SUB,
    get: () => Offers.find().fetch(),
    subscribe: () => Meteor.subscribe(OFFERS_SUB, { page, pageSize, sorted }),
  }));
};

export const fetchOffersCount = () =>
  startSubscription({
    key: OFFERS_COUNT_SUB,
    get: () => Counter.get('offersCount'),
    subscribe: () => Meteor.subscribe(OFFERS_COUNT_SUB),
  });

export const stopOffersSub = () => (dispatch) => {
  dispatch(stopSubscription(OFFERS_SUB));
  dispatch(stopSubscription(OFFERS_COUNT_SUB));
};
