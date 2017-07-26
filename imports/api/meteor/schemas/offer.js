import SimpleSchema from 'simpl-schema';

const OfferSchema = new SimpleSchema({
  name: {
    type: String,
  },
  url: {
    type: String,
  },
  userId: {
    type: String,
  },
  userName: {
    type: String,
  },
});

export default OfferSchema;
