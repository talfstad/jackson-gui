import _ from 'lodash';
import { handleError } from '/imports/api/meteor/methods-common/method-helpers';
import {
  Whitelisted,
} from '/imports/api/meteor/collections';

Meteor.methods({
  deleteWhitelistedDomain({ whitelistedId }) {
    // General validation
    if (!_.isUndefined(whitelistedId)) {
      Whitelisted.remove({
        _id: whitelistedId,
      });
    } else {
      handleError('Invalid Request');
    }
  },
});

export default {};
