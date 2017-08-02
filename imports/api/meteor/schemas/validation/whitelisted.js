import SimpleSchema from 'simpl-schema';

const ResetPasswordValidationSchema = new SimpleSchema({
  name: {
    type: String,
    min: 1,
  },
});

export default ResetPasswordValidationSchema;
