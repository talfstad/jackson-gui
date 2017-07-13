import React from 'react';
import { Provider } from 'react-redux';

import store from '/imports/store';

import AppComponent from '/imports/ui/components/app';

const bootAppWithRedux = () => (
  <Provider store={store}>
    <AppComponent />
  </Provider>
);
export default bootAppWithRedux;
