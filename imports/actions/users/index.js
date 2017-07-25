import {
  startSubscription,
} from 'meteor-redux-middlewares';
import { Users } from '/imports/api/meteor/collections';

export const USERS_SUB = 'USERS';
export const USERS_SUBSCRIPTION_READY = `${USERS_SUB}_SUBSCRIPTION_READY`;
export const USERS_SUBSCRIPTION_CHANGED = `${USERS_SUB}_SUBSCRIPTION_CHANGED`;

export const loadUsersSub = () =>
  startSubscription({
    key: USERS_SUB,
    subscribe: () => Meteor.subscribe(USERS_SUB),
    get: () => Users.find().fetch(),
  });
