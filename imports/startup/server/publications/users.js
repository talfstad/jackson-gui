import { Roles } from 'meteor/alanning:roles';
import { Users } from '/imports/api/meteor/collections';
import { USERS_SUB } from '/imports/actions/users';

Meteor.publish(USERS_SUB, function () {
  // Admin query
  if (Roles.userIsInRole(this.userId, 'admin')) {
    return Users.find({}, {
      fields: {
        createdAt: 0,
        services: 0,
      },
    });
  }

  return Users.find({
    _id: this.userId,
  }, {
    fields: {
      createdAt: 0,
      services: 0,
    },
  });
});
