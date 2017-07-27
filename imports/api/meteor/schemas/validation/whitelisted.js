import SimpleSchema from 'simpl-schema';

const ResetPasswordValidationSchema = new SimpleSchema({
  name: {
    type: String,
    min: 6,
  },
});

export default ResetPasswordValidationSchema;
