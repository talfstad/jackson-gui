import _ from 'lodash';
import { Roles } from 'meteor/alanning:roles';
import { Counter } from 'meteor/natestrauser:publish-performant-counts';
import { Whitelisted } from '/imports/api/meteor/collections';
import {
  WHITELISTED_SUB,
  WHITELISTED_COUNT_SUB,
} from '/imports/actions/whitelisted';

Meteor.publish(WHITELISTED_SUB, function ({ page, pageSize, sorted, search }) {
  // Map the array that comes in from react tables to the sort object
  // mongo likes.
  const sort = sorted.reduce((accumulator, val) =>
    ({
      ...accumulator,
      [val.id]: val.desc ? -1 : 1,
    }), {});

  // Admin query
  if (Roles.userIsInRole(this.userId, 'admin')) {
    return Whitelisted.find({
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { userName: { $regex: search, $options: 'i' } },
      ],
    }, {
      skip: (pageSize * page),
      limit: pageSize,
      sort,
    });
  }

  // NON-Admin query
  return Whitelisted.find({
    userId: this.userId,
    $or: [
      { name: { $regex: search, $options: 'i' } },
      { userName: { $regex: search, $options: 'i' } },
    ],
  }, {
    skip: (pageSize * page),
    limit: pageSize,
    sort,
  });
});

Meteor.publish(WHITELISTED_COUNT_SUB, function ({ search }) {
  if (Roles.userIsInRole(this.userId, 'admin')) {
    return new Counter('whitelistedCount', Whitelisted.find({
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { userName: { $regex: search, $options: 'i' } },
      ],
    }), 500);
  }

  // NON-Admin query
  return new Counter('whitelistedCount', Whitelisted.find({
    userId: this.userId,
    $or: [
      { name: { $regex: search, $options: 'i' } },
      { userName: { $regex: search, $options: 'i' } },
    ],
  }), 500);
});

export default {};
