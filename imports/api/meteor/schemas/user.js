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
  createdAt: {
    type: Date,
  },
});

export default UserSchema;
