import { Roles } from 'meteor/alanning:roles';
import { Counter } from 'meteor/natestrauser:publish-performant-counts';
import { Offers } from '/imports/api/meteor/collections';
import {
  OFFERS_SUB,
  OFFERS_COUNT_SUB,
} from '/imports/actions/offers';

Meteor.publish(OFFERS_SUB, function ({ page, pageSize, sorted }) {
  // Map the array that comes in from react tables to the sort object
  // mongo likes.
  const sort = sorted.reduce((accumulator, val) =>
    ({
      ...accumulator,
      [val.id]: val.desc ? -1 : 1,
    }), {});

  // Admin query
  if (Roles.userIsInRole(this.userId, 'admin')) {
    return Offers.find({}, {
      skip: (pageSize * page),
      limit: pageSize,
      sort,
    });
  }

  // NON-Admin query
  return Offers.find({ userId: this.userId }, {
    skip: (pageSize * page),
    limit: pageSize,
    sort,
  });
});

Meteor.publish(OFFERS_COUNT_SUB, function () {
  if (Roles.userIsInRole(this.userId, 'admin')) {
    return new Counter('offersCount', Offers.find({}));
  }

  // NON-Admin query
  return new Counter('offersCount', Offers.find({ userId: this.userId }));
});
