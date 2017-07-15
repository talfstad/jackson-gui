import SimpleSchema from 'simpl-schema';
import { EmailAddress } from '../user';

const ForgotPasswordValidationSchema = new SimpleSchema({
  email: EmailAddress,
});

export default ForgotPasswordValidationSchema;
