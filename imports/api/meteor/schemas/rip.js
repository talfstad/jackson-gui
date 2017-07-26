import SimpleSchema from 'simpl-schema';

const RipSchema = new SimpleSchema({
  created_on: {
    type: Date,
  },
  last_updated: {
    type: Date,
  },
  total_hits: {
    type: Number,
  },
  consecutive_min_traffic: {
    type: Number,
  },
  hits_per_min: {
    type: Number,
  },
  take_rate: {
    type: Number,
  },
  uuid: {
    type: String,
  },
  url: {
    type: String,
  },
  offer: {
    type: Object,
    optional: true,
  },
  archive: {
    type: Object,
  },
});

export default RipSchema;
