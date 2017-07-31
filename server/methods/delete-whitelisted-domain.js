import _ from 'lodash';
import { handleError } from '/imports/api/meteor/methods-common/method-helpers';
import {
  Whitelisted,
  Rips,
} from '/imports/api/meteor/collections';

Meteor.methods({
  deleteWhitelistedDomain({ whitelistedId }) {
    // General validation
    if (!_.isUndefined(whitelistedId)) {
      const whitelisted = Whitelisted.findOne({ _id: whitelistedId });
      if (!_.isUndefined(whitelisted)) {
        Whitelisted.remove({
          _id: whitelistedId,
        });
        // whitelist all rips with this domain.
        Rips.update({
          url: { $regex: `^${whitelisted.name}`, $options: 'i' },
        }, {
          $unset: { whitelisted: '' },
        }, {
          multi: true,
        });
      } else {
        handleError('invalid id');
      }
    } else {
      handleError('Invalid Request');
    }
  },
});

export default {};
