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

import { loadUser, loadUserSub } from '/imports/actions/user/load';
import { loadUsersSub } from '/imports/actions/users';

import Header from './header';
import Rips from './rips';
import Offers from './offers';
import Settings from './settings';
import Login from './auth/components/login';

class App extends Component {
  componentDidMount() {
    const {
      loadUserAction,
      loadUserSubAction,
      loadUsersSubAction,
    } = this.props;
    loadUserAction();
    loadUserSubAction();
    loadUsersSubAction();
  }

  render() {
    return (
      <Router>
        <div className="wrapper">
          <Route path="*" component={Header} />
          <Switch>
            <Route path="/rips" component={Rips} />
            <Route path="/offers" component={Offers} />
            <Route path="/settings" component={Settings} />
            <Route path="/login" component={Login} />
            <Route render={() => <Redirect to="/rips/manage" />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  loadUserAction: PropTypes.func,
  loadUserSubAction: PropTypes.func,
  loadUsersSubAction: PropTypes.func,
};

App.defaultProps = {
  loadUserAction: null,
  loadUserSubAction: null,
  loadUsersSubAction: null,
};

const actions = {
  loadUserSubAction: loadUserSub,
  loadUserAction: loadUser,
  loadUsersSubAction: loadUsersSub,
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, actions)(App);
