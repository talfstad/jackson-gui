import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  logUserIn,
} from '/imports/actions/user/login';

import RequireNoAuth from '../hocs/require-no-auth';

class Login extends Component {
  getErrorForField(field) {
    const { authReducer } = this.props;
    const { login = {} } = authReducer;
    const { errors = [] } = login;
    const error = errors.find(o => o.name === field);
    if (error) {
      return <small className="form-text text-danger text-muted">{error.message}</small>;
    }
    return <noscript />;
  }

  handleLogUserIn(e) {
    e.preventDefault();

    const {
      logUserInAction,
    } = this.props;

    logUserInAction({
      email: this.emailInput.value,
      password: this.passwordInput.value,
    });
  }

  render() {
    return (
      <div className="login">
        <div className="content">
          <form
            onSubmit={e => this.handleLogUserIn(e)}
            className="login-form"
          >
            <div className="form-title">
              <span className="form-title">Welcome to RS.</span>
              <span className="form-subtitle">Please login.</span>
            </div>
            <div className="alert alert-danger display-hide">
              <button className="close" data-close="alert" />
              <span> Enter any email and password. </span>
            </div>
            <div className="form-group">
              <label htmlFor="email" className="control-label visible-ie8 visible-ie9">Email</label>
              <input
                ref={(c) => { this.emailInput = c; }}
                autoComplete="off"
                className="form-control form-control-solid placeholder-no-fix"
                type="text"
                placeholder="Email"
                name="email"
              />
              {this.getErrorForField('email')}
            </div>
            <div className="form-group">
              <label htmlFor="password" className="control-label visible-ie8 visible-ie9">Password</label>
              <input
                ref={(c) => { this.passwordInput = c; }}
                autoComplete="off"
                className="form-control form-control-solid placeholder-no-fix"
                type="password"
                placeholder="Password"
                name="password"
              />
              {this.getErrorForField('password')}
            </div>
            <div className="form-actions">
              <button type="submit" className="btn red btn-block uppercase">Login</button>
            </div>
            <div className="form-actions">
              <div className="pull-right forget-password-block">
                <a href="#df;" id="forget-password" className="forget-password">Forgot Password?</a>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  authReducer: PropTypes.shape({}),
  logUserInAction: PropTypes.func,
};

Login.defaultProps = {
  authReducer: {},
  logUserInAction: null,
};

const actions = {
  logUserInAction: logUserIn,
};

const mapStateToProps = state => ({
  authReducer: state.auth,
});

export default connect(mapStateToProps, actions)(RequireNoAuth(Login));
