import _ from 'lodash';
import moment from 'moment';
import { Roles } from 'meteor/alanning:roles';
import { check } from 'meteor/check';
import { Counter } from 'meteor/natestrauser:publish-performant-counts';
import { Rips } from '/imports/api/meteor/collections';
import {
  RIPS_SUB,
  RIPS_COUNT_SUB,
  RIP_EDIT_SUB,
} from '/imports/actions/rips';

Meteor.publish(RIPS_SUB, function ({ page, pageSize, sorted, search }) {
  // Map the array that comes in from react tables to the sort object
  // mongo likes.
  const sort = sorted.reduce((accumulator, val) =>
    ({
      ...accumulator,
      [val.id]: val.desc ? -1 : 1,
    }), {});

  // Admin query
  if (Roles.userIsInRole(this.userId, 'admin')) {
    return Rips.find({
      total_hits: { $gt: 1 },
      last_updated: { $gte: new Date(moment.utc((moment())).subtract(1, 'day').toISOString()) },
      $or: [
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
  return Rips.find({
    userId: this.userId,
    total_hits: { $gt: 1 },
    last_updated: { $gte: new Date(moment.utc((moment())).subtract(1, 'day').toISOString()) },
    $or: [
      { url: { $regex: search, $options: 'i' } },
      { userName: { $regex: search, $options: 'i' } },
    ],
  }, {
    skip: (pageSize * page),
    limit: pageSize,
    sort,
  });
});

Meteor.publish(RIPS_COUNT_SUB, function ({ search }) {
  if (Roles.userIsInRole(this.userId, 'admin')) {
    return new Counter('ripsCount', Rips.find({
      total_hits: { $gt: 1 },
      last_updated: { $gte: new Date(moment.utc((moment())).subtract(1, 'day').toISOString()) },
      $or: [
        { url: { $regex: search, $options: 'i' } },
        { userName: { $regex: search, $options: 'i' } },
      ],
    }), 500);
  }

  // NON-Admin query
  return new Counter('ripsCount', Rips.find({
    userId: this.userId,
    total_hits: { $gt: 1 },
    last_updated: { $gte: new Date(moment.utc((moment())).subtract(1, 'day').toISOString()) },
    $or: [
      { url: { $regex: search, $options: 'i' } },
      { userName: { $regex: search, $options: 'i' } },
    ],
  }), 500);
});

Meteor.publish(RIP_EDIT_SUB, function ({ ripId }) {
  const isValidId = (id) => {
    check(id, String);
    return /[0-9a-fA-F]{24}/.test(id);
  };

  // General validation
  if (
    isValidId(ripId)
  ) {
    const objectId = new Mongo.ObjectID(ripId);

    const rip = Rips.findOne({
      _id: objectId,
    });

    if (_.isUndefined(rip._id)) {
      return null;
    }

    // Admin can get any rip, else needs to be
    // owned by this user.
    if (
      Roles.userIsInRole(this.userId, 'admin') ||
      rip.userId === this.userId
    ) {
      return Rips.find({
        _id: objectId,
      });
    }
    return null;
  }
  return null;
});

export default {};
