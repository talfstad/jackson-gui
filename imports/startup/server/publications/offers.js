import { Roles } from 'meteor/alanning:roles';
import { Counter } from 'meteor/natestrauser:publish-performant-counts';
import { Offers } from '/imports/api/meteor/collections';
import {
  OFFERS_SUB,
  OFFERS_COUNT_SUB,
} from '/imports/actions/offers';

Meteor.publish(OFFERS_SUB, function ({ page, pageSize, sorted, search }) {
  // Map the array that comes in from react tables to the sort object
  // mongo likes.
  const sort = sorted.reduce((accumulator, val) =>
    ({
      ...accumulator,
      [val.id]: val.desc ? -1 : 1,
    }), {});

  // Admin query
  if (Roles.userIsInRole(this.userId, 'admin')) {
    return Offers.find({
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { url: { $regex: search, $options: 'i' } },
        { userName: { $regex: search, $options: 'i' } },
      ],
    }, {
      skip: (pageSize * page),
      limit: pageSize,
      sort,
    });
  }

  // NON-Admin query
  return Offers.find({
    userId: this.userId,
    $or: [
      { name: { $regex: search, $options: 'i' } },
      { url: { $regex: search, $options: 'i' } },
      { userName: { $regex: search, $options: 'i' } },
    ],
  }, {
    skip: (pageSize * page),
    limit: pageSize,
    sort,
  });
});

// TODO: pass in the search term. whenever we change the query, we need to
// re-sub to the count just as we resub to our data query.
Meteor.publish(OFFERS_COUNT_SUB, function ({ search }) {
  if (Roles.userIsInRole(this.userId, 'admin')) {
    return new Counter('offersCount', Offers.find({
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { url: { $regex: search, $options: 'i' } },
        { userName: { $regex: search, $options: 'i' } },
      ],
    }), 500);
  }

  // NON-Admin query
  return new Counter('offersCount', Offers.find({
    userId: this.userId,
    $or: [
      { name: { $regex: search, $options: 'i' } },
      { url: { $regex: search, $options: 'i' } },
      { userName: { $regex: search, $options: 'i' } },
    ],
  }), 500);
});
