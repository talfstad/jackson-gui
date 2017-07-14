import SimpleSchema from 'simpl-schema';

export const EmailAddress = {
  type: String,
  regEx: SimpleSchema.RegEx.Email,
};

const UserSchema = new SimpleSchema({
  emails: {
    type: Array,
    optional: true,
  },
  'emails.$': {
    type: Object,
  },
  'emails.$.address': {
    type: EmailAddress,
  },
  services: {
    type: Object,
    blackbox: true,
  },
  createdAt: {
    type: Date,
  },
});

export default UserSchema;
