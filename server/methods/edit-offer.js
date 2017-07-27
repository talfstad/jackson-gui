import _ from 'lodash';
import { Roles } from 'meteor/alanning:roles';
import { handleError } from '/imports/api/meteor/methods-common/method-helpers';
import {
  Offers,
  Users,
} from '/imports/api/meteor/collections';

Meteor.methods({
  editOffer({ offerId }) {
    // General validation
    if (
      !_.isUndefined(offerId)
    ) {
      const offer = Offers.findOne({
        _id: offerId,
      });

      if (!offer) {
        handleError('Offer not found');
      }

      // Admin can get any offer
      if (
        Roles.userIsInRole(this.userId, 'admin') ||
        offer.userId === this.userId
      ) {
        // return the offer
        Offers.insert({
          name,
          url,
          userName,
          userId,
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
