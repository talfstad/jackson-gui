import { Roles } from 'meteor/alanning:roles';
import { Offers } from '/imports/api/meteor/collections';
import { OFFERS_SUB } from '/imports/actions/offers';

Meteor.publish(OFFERS_SUB, function ({ page, pageSize }) {
  // Admin query
  if (Roles.userIsInRole(this.userId, 'admin')) {
    return Offers.find({}, {
      skip: (pageSize * page),
      limit: pageSize,
    });
  }

  // NON-Admin query
  return Offers.find({ userId: this.userId }, {
    skip: (pageSize * page),
    limit: pageSize,
  });
});
