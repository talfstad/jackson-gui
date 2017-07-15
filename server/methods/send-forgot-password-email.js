import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { handleError } from '/imports/api/meteor/methods-common/method-helpers';

import {
  requestUpdatedEmailTemplate,
  updateResetPasswordEmailTemplateHtml,
} from '/imports/api/sendinblue';

import { RESET_PASSWORD_TEMPLATE_ID } from '/imports/api/meteor/email/config';

Meteor.methods({
  sendForgotPasswordEmail(args) {
    check(args, { email: String });

    const user = Accounts.findUserByEmail(args.email);
    if (!user) {
      handleError('User not found');
    }

    const emails = _.pluck(user.emails || [], 'address');
    const caseSensitiveEmail =
      _.find(emails, email => email.toLowerCase() === args.email.toLowerCase());

    requestUpdatedEmailTemplate({ id: RESET_PASSWORD_TEMPLATE_ID })
      .then((response) => {
        const [data] = response.data;
        const templateString = data.html_content;
        updateResetPasswordEmailTemplateHtml({
          template: 'resetPassword',
          templateString,
        });

        Accounts.sendResetPasswordEmail(user._id, caseSensitiveEmail);
      });
  },
});

export default {};
