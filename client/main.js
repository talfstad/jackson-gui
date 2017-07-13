import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import bootAppWithRedux from '/imports/startup/client/boot';

Meteor.startup(() => {
  render(bootAppWithRedux(), document.getElementById('main'));
});
