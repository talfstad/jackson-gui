import React from 'react';

import '/imports/ui/css/app.scss';

import Header from './header';
import Login from './login';

const App = () => (
  <div className="wrapper">
    <Header />
    <Login />
  </div>
);

export default App;
