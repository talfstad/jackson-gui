import _ from 'lodash';
import { Roles } from 'meteor/alanning:roles';
import { handleError } from '/imports/api/meteor/methods-common/method-helpers';
import {
  Offers,
  Users,
  Rips,
} from '/imports/api/meteor/collections';

Meteor.methods({
  editOffer({ _id, name, url, userId, userName }) {
    // General validation
    if (
      !_.isUndefined(_id) &&
      !_.isUndefined(name) &&
      !_.isUndefined(url)
    ) {
      // Admin can add custom user
      if (
        Roles.userIsInRole(this.userId, 'admin') &&
        !_.isUndefined(userName) &&
        !_.isUndefined(_id) &&
        !_.isUndefined(userId)
      ) {
        // use custom user name if in here
        Offers.update({
          _id,
        },
          {
            $set: {
              name,
              url,
              userName,
              userId,
            },
          });

        Rips.update({
          'offer.offer_id': _id,
        }, {
          $set: {
            offer: {
              offer_id: _id,
              url,
              name,
            },
          },
        }, {
          multi: true,
        });
      } else {
        const user = Users.findOne({
          _id: this.userId,
        });

        if (!user) {
          handleError('User not found');
        }

        // If here, we will use the requesting user as offer owner.
        Offers.update({
          _id,
        },
          {
            $set: {
              name,
              url,
              userName: user.name,
              userId: user._id,
            },
          });
        Rips.update({
          'offer.offer_id': _id,
        }, {
          $set: {
            offer: {
              offer_id: _id,
              url,
              name,
            },
          },
        }, {
          multi: true,
        });
      }
    } else {
      handleError('Invalid Request');
    }
  },
});

export default {};
