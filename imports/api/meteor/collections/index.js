import 'simpl-schema';

import offers from './offers';
import rips from './rips';
import whitelisted from './whitelisted';

import Schemas from '../schemas';

// Intent: provide a single loading point for all collections to be attached
// to schemas
Meteor.users.attachSchema(Schemas.userSchema);
offers.attachSchema(Schemas.offerSchema);
// rips.attachSchema(Schemas.ripSchema);

export const Users = Meteor.users;

export const Offers = offers;
export const Rips = rips;
export const Whitelisted = whitelisted;
