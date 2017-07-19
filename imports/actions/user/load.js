import { Meteor } from 'meteor/meteor';
import {
  registerReactiveSource,
  startSubscription,
} from 'meteor-redux-middlewares';
import { Users } from '/imports/api/meteor/collections';

export const USER_SUB = 'USER';
export const USER_REACTIVE_SOURCE_CHANGED = `${USER_SUB}_REACTIVE_SOURCE_CHANGED`;
export const USER_SUBSCRIPTION_READY = `${USER_SUB}_SUBSCRIPTION_READY`;
export const USER_SUBSCRIPTION_CHANGED = `${USER_SUB}_SUBSCRIPTION_CHANGED`;

// Intent: loadUser will send meteor.user to the reducer. Meteor.user is populated
// with not only waht meteor.user initially comes with but also data from loadUserSub
// which returns the name, and other things.
export const loadUser = () =>
  registerReactiveSource({
    key: 'user',
    get: () => ({
      loggingIn: Meteor.loggingIn(),
      loggingOut: Meteor.loggingOut(),
      ...(Meteor.user()),
    }),
  });

export const loadUserSub = () =>
  startSubscription({
    key: USER_SUB,
    subscribe: () => Meteor.subscribe(USER_SUB),
    get: () => Users.find().fetch(),
  });
