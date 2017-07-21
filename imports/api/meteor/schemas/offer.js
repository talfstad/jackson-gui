import SimpleSchema from 'simpl-schema';

const OfferSchema = new SimpleSchema({
  name: {
    type: String,
  },
  url: {
    type: String,
  },
  user: {
    type: String,
  },
});

export default OfferSchema;
