import _ from 'lodash';
import { Roles } from 'meteor/alanning:roles';
import { handleError } from '/imports/api/meteor/methods-common/method-helpers';
import {
  Rips,
} from '/imports/api/meteor/collections';

Meteor.methods({
  editRip({ _id, take_rate, offer, userId }) {
    // General validation
    if (
      !_.isUndefined(_id) &&
      !_.isUndefined(userId) &&
      !_.isUndefined(take_rate) &&
      !_.isUndefined(offer)
    ) {
      // Admin can edit rips that aren't theirs
      if (
        Roles.userIsInRole(this.userId, 'admin') ||
        this.userId === userId
      ) {
        // use custom user name if in here
        Rips.update({
          _id,
        },
          {
            $set: {
              take_rate,
              offer,
            },
          });
      } else {
        handleError('Not Authenticated');
      }
    } else {
      handleError('Invalid Request');
    }
  },
});

export default {};
