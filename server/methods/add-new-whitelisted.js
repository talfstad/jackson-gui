import _ from 'lodash';
import { Roles } from 'meteor/alanning:roles';
import { handleError } from '/imports/api/meteor/methods-common/method-helpers';
import {
  Whitelisted,
  Users,
  Rips,
} from '/imports/api/meteor/collections';

Meteor.methods({
  addNewWhitelisted({ name, userId, userName }) {
    // General validation
    if (
      !_.isUndefined(name)
    ) {
      // Admin can add custom user
      if (
        Roles.userIsInRole(this.userId, 'admin') &&
        !_.isUndefined(userName) &&
        !_.isUndefined(userId)
      ) {
        // use custom user name if in here
        Whitelisted.insert({
          name,
          userName,
          userId,
          createdOn: new Date(),
        });
      } else {
        const user = Users.findOne({
          _id: this.userId,
        });

        if (!user) {
          handleError('User not found');
        }

        // If here, we will use the requesting user as offer owner.
        Whitelisted.insert({
          name,
          userName: user.name,
          userId: user._id,
          createdOn: new Date(),
        });
      }
      // whitelist all rips with this domain.
      Rips.update({
        url: { $regex: `^${name}`, $options: 'i' },
      }, {
        $set: { whitelisted: true },
      }, {
        multi: true,
      });
    } else {
      handleError('Invalid Request');
    }
  },
});

export default {};
