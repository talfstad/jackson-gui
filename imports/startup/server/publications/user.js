import { Users } from '/imports/api/meteor/collections';
import { USER_SUB } from '/imports/actions/user/load';

Meteor.publish(USER_SUB, function () {
  return Users.find({
    _id: this.userId,
  }, {
    fields: {
      createdAt: 0,
      services: 0,
    },
  });
});
