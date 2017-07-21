import 'simpl-schema';

import offers from './offers';

import Schemas from '../schemas';

// Intent: provide a single loading point for all collections to be attached
// to schemas
Meteor.users.attachSchema(Schemas.userSchema);
offers.attachSchema(Schemas.offerSchema);

export const Users = Meteor.users;

export const Offers = offers;
