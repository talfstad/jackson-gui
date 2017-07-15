import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  resetPassword,
} from '/imports/actions/user/login';

class ForgotPassword extends Component {
  getErrorForField(field) {
    const { authReducer } = this.props;
    const { errors = [] } = authReducer.resetPassword;
    const error = errors.find(o => o.name === field);
    if (error) {
      return <small className="form-text text-danger text-muted">{error.message}</small>;
    }
    return <noscript />;
  }

  getPasswordToken() {
    const { match } = this.props;
    return match.params.token;
  }

  handleResetPassword(e) {
    if (e) e.preventDefault();
    const {
      resetPasswordAction,
    } = this.props;

    const token = this.getPasswordToken();
    const password = this.passwordInput.value;
    const confirmPassword = this.confirmPasswordInput.value;
    resetPasswordAction({ token, password, confirmPassword });
  }

  render() {
    return (
      <form
        onSubmit={e => this.handleResetPassword(e)}
        className="forget-form"
      >
        <div className="form-title">
          <span className="form-title">Reset Password.</span>
          <span className="form-subtitle">Enter your new password.</span>
        </div>
        <div className="form-group">
          <input
            ref={(c) => { this.passwordInput = c; }}
            autoComplete="off"
            className="form-control form-control-solid placeholder-no-fix"
            type="password"
            placeholder="New Password"
            name="password"
          />
          {this.getErrorForField('password')}
        </div>
        <div className="form-group">
          <input
            ref={(c) => { this.confirmPasswordInput = c; }}
            autoComplete="off"
            className="form-control form-control-solid placeholder-no-fix"
            type="password"
            placeholder="Confirm Password"
            name="confirm-password"
          />
          {this.getErrorForField('confirm-password')}
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary uppercase pull-right">Submit</button>
        </div>
      </form>
    );
  }
}

ForgotPassword.propTypes = {
  match: PropTypes.shape({}),
  authReducer: PropTypes.shape({}),
  resetPasswordAction: PropTypes.func,
};

ForgotPassword.defaultProps = {
  authReducer: {},
  match: {},
  resetPasswordAction: null,
};

const actions = {
  resetPasswordAction: resetPassword,
};

const mapStateToProps = state => ({
  authReducer: state.auth,
});

export default connect(mapStateToProps, actions)(withRouter(ForgotPassword));
