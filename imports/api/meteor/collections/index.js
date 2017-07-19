// import Meteor from 'meteor/meteor';
import 'simpl-schema';
import Schemas from '../schemas';

// Intent: provide a single loading point for all collections to be attached
// to schemas
Meteor.users.attachSchema(Schemas.userSchema);

export const Users = Meteor.users;
