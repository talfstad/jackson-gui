import SendInBlue from 'sendinblue-api';
import { SSR } from 'meteor/meteorhacks:ssr';

const parameters = {
  apiKey: 'mK8tzWXY0Z7cAbhV',
  timeout: 5000,
};

const client = new SendInBlue(parameters);

export const requestUpdatedEmailTemplate = options =>
  new Promise((resolve, reject) => {
    client.get_campaign_v2(options, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });

export const updateResetPasswordEmailTemplateHtml = ({ templateString }) => {
  SSR.compileTemplate('resetPassword', templateString);
  Accounts.emailTemplates.resetPassword.html = (user, url) =>
    SSR.render('resetPassword', { url });
};
