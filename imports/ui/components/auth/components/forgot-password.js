import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  logUserIn,
} from '/imports/actions/user/login';

class ForgotPassword extends Component {
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

  handleBackButtonPress() {
    this.props.history.goBack();
  }

  render() {
    return (
      <form
        onSubmit={e => this.handleLogUserIn(e)}
        className="forget-form"
      >
        <div className="form-title">
          <span className="form-title">Forget Password ?</span>
          <span className="form-subtitle">Enter your e-mail to reset it.</span>
        </div>
        <div className="form-group">
          <input
            ref={(c) => { this.emailInput = c; }}
            className="form-control placeholder-no-fix"
            type="text"
            autoComplete="off"
            placeholder="Email"
            name="email"
          />
          {this.getErrorForField('email')}
        </div>
        <div className="form-actions">
          <button
            onClick={() => this.handleBackButtonPress()}
            type="button"
            id="back-btn"
            className="btn btn-default"
          >
            Back
          </button>
          <button type="submit" className="btn btn-primary uppercase pull-right">Submit</button>
        </div>
      </form>
    );
  }
}

ForgotPassword.propTypes = {
  history: PropTypes.shape({
    goBack: null,
  }),
  authReducer: PropTypes.shape({}),
  logUserInAction: PropTypes.func,
};

ForgotPassword.defaultProps = {
  authReducer: {},
  history: {
    goBack: PropTypes.func,
  },
  logUserInAction: null,
};

const actions = {
  logUserInAction: logUserIn,
};

const mapStateToProps = state => ({
  authReducer: state.auth,
});

export default connect(mapStateToProps, actions)(withRouter(ForgotPassword));
