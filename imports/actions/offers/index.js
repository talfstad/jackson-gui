import {
  startSubscription,
  stopSubscription,
} from 'meteor-redux-middlewares';

import { Offers } from '/imports/api/meteor/collections';

export const OFFERS_SUB = 'OFFERS';
export const OFFERS_SUB_SUBSCRIPTION_READY = `${OFFERS_SUB}_SUBSCRIPTION_READY`;
export const OFFERS_SUB_SUBSCRIPTION_CHANGED = `${OFFERS_SUB}_SUBSCRIPTION_CHANGED`;

export const fetchOffers = ({ page, pageSize }) => (dispatch) => {
  dispatch(stopSubscription(OFFERS_SUB));
  dispatch(startSubscription({
    key: OFFERS_SUB,
    get: () => Offers.find().fetch(),
    subscribe: () => Meteor.subscribe(OFFERS_SUB, { page, pageSize }),
  }));
};

export const stopOffersSub = () =>
  stopSubscription(OFFERS_SUB);
