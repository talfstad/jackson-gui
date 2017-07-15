Accounts.urls.resetPassword = token =>
  Meteor.absoluteUrl(`login/reset-password/${token}`);

Accounts.emailTemplates.resetPassword.from = () => 'no-reply@landerrs.buildcave.com';

process.env.MAIL_URL = 'smtp://trevor@buildcave.com:mK8tzWXY0Z7cAbhV@smtp-relay.sendinblue.com:587';
