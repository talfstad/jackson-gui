import SimpleSchema from 'simpl-schema';

const EditRipValidationSchema = new SimpleSchema({
  take_rate: {
    type: Number,
    min: 0,
    max: 1,
  },
});

export default EditRipValidationSchema;
