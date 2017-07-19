import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

Meteor.methods({
  addToAdmin() {
    Roles.addUsersToRoles('YGBwvpmwTaAZyD4Fh', ['admin']);
    console.log(Roles.userIsInRole('YGBwvpmwTaAZyD4Fh', 'admin'));
  },
});

export default {};
