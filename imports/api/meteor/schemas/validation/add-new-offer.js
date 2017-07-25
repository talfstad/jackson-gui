import SimpleSchema from 'simpl-schema';

const AddNewOfferValidationSchema = new SimpleSchema({
  name: {
    type: String,
    min: 5,
  },
  url: {
    type: String,
    min: 5,
  },
  userId: {
    type: String,
    optional: true,
  },
  userName: {
    type: String,
    optional: true,
  },
});

export default AddNewOfferValidationSchema;
