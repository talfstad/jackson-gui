import SimpleSchema from 'simpl-schema';

const ResetPasswordValidationSchema = new SimpleSchema({
  password: {
    type: String,
    min: 6,
  },
  confirmPassword: {
    type: String,
  },
});

export default ResetPasswordValidationSchema;
