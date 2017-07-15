import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  forgotPassword,
} from '/imports/actions/user/login';

class ForgotPassword extends Component {
  getErrorForField(field) {
    const { authReducer } = this.props;
    const { errors = [] } = authReducer.forgotPassword;
    const error = errors.find(o => o.name === field);
    if (error) {
      return <small className="form-text text-danger text-muted">{error.message}</small>;
    }
    return <noscript />;
  }

  handleSendForgotPasswordEmail(e) {
    e.preventDefault();

    const {
      forgotPasswordAction,
    } = this.props;

    forgotPasswordAction({
      email: this.emailInput.value,
    });
  }

  handleBackButtonPress() {
    this.props.history.goBack();
  }

  render() {
    return (
      <form
        onSubmit={e => this.handleSendForgotPasswordEmail(e)}
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
  forgotPasswordAction: PropTypes.func,
};

ForgotPassword.defaultProps = {
  authReducer: {},
  history: {
    goBack: PropTypes.func,
  },
  forgotPasswordAction: null,
};

const actions = {
  forgotPasswordAction: forgotPassword,
};

const mapStateToProps = state => ({
  authReducer: state.auth,
});

export default connect(mapStateToProps, actions)(withRouter(ForgotPassword));
