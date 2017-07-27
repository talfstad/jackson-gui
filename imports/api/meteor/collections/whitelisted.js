const Whitelisted = new Mongo.Collection('whitelisted_domains', {
  idGeneration: 'MONGO',
});

export default Whitelisted;
