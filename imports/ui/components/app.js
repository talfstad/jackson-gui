import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom';
import { Switch } from 'react-router';

import '/imports/ui/css/app.scss';
import '/imports/ui/css/imports/font-awesome.css';

import { loadUser } from '/imports/actions/user/load';

import Header from './header';
import Rips from './rips';
import Login from './auth/components/login';

class App extends Component {
  componentDidMount() {
    const { loadUserAction } = this.props;
    loadUserAction();
  }

  render() {
    return (
      <Router>
        <div className="wrapper">
          <Header />
          <Switch>
            <Route path="/rips" component={Rips} />
            <Route path="/login" component={Login} />
            <Route render={() => <Redirect to="/rips" />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  loadUserAction: PropTypes.func,
};

App.defaultProps = {
  loadUserAction: null,
};

const actions = {
  loadUserAction: loadUser,
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, actions)(App);
