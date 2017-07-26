import _ from 'lodash';
import { handleError } from '/imports/api/meteor/methods-common/method-helpers';
import {
  Offers,
} from '/imports/api/meteor/collections';

Meteor.methods({
  deleteOffer({ offerId }) {
    // General validation
    if (!_.isUndefined(offerId)) {
      Offers.remove({
        _id: offerId,
      });
    } else {
      handleError('Invalid Request');
    }
  },
});

export default {};
