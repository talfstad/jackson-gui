import _ from 'lodash';
import { Roles } from 'meteor/alanning:roles';
import { check } from 'meteor/check';
import { Counter } from 'meteor/natestrauser:publish-performant-counts';
import { Offers } from '/imports/api/meteor/collections';
import {
  OFFERS_SUB,
  OFFERS_COUNT_SUB,
  OFFER_EDIT_SUB,
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

Meteor.publish(OFFER_EDIT_SUB, function ({ offerId }) {
  const isValidId = (id) => {
    check(id, String);
    return /[0-9a-fA-F]{24}/.test(id);
  };

  // General validation
  if (
    isValidId(offerId)
  ) {
    const objectId = new Mongo.ObjectID(offerId);

    const offer = Offers.findOne({
      _id: objectId,
    });

    if (_.isUndefined(offer._id)) {
      return null;
    }

    // Admin can get any offer, else needs to be
    // owned by this user.
    if (
      Roles.userIsInRole(this.userId, 'admin') ||
      offer.userId === this.userId
    ) {
      return Offers.find({
        _id: objectId,
      });
    }
    return null;
  }
  return null;
});

export default {};
