import _ from 'lodash';
import { Roles } from 'meteor/alanning:roles';
import { handleError } from '/imports/api/meteor/methods-common/method-helpers';
import {
  Offers,
  Users,
} from '/imports/api/meteor/collections';

Meteor.methods({
  addNewOffer({ name, url, userId, userName }) {
    // General validation
    if (
      !_.isUndefined(name) &&
      !_.isUndefined(url)
    ) {
      // Admin can add custom user
      if (
        Roles.userIsInRole(this.userId, 'admin') &&
        !_.isUndefined(userName) &&
        !_.isUndefined(userId)
      ) {
        // use custom user name if in here
        Offers.insert({
          name,
          url,
          userName,
          userId,
        });
      } else {
        const user = Users.findOne({
          _id: this.userId,
        });

        if (!user) {
          handleError('User not found');
        }

        // If here, we will use the requesting user as offer owner.
        Offers.insert({
          name,
          url,
          userName: user.name,
          userId: user._id,
        });
      }
    } else {
      handleError('Invalid Request');
    }
  },
});

export default {};
