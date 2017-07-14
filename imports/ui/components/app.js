import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import '/imports/ui/css/app.scss';

import { loadUser } from '/imports/actions/user/load';

import Header from './header';
import Main from './main';
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
          <Route path="/" component={Main} />
          <Route path="/login" component={Login} />
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
