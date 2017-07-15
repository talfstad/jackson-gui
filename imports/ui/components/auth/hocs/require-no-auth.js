import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Route,
  Redirect,
} from 'react-router-dom';

export default function (ComposedComponent) {
  class RequireNoAuth extends Component {
    static propTypes = {
      user: PropTypes.shape({
        _id: PropTypes.string,
      }),
      location: PropTypes.shape({}),
    }

    static defaultProps = {
      user: null,
      location: null,
    }

    render() {
      const {
        user,
      } = this.props;

      return (
        <Route
          render={() => {
            if (_.isUndefined(user.loggingIn) || user.loggingIn || user.loggingOut) {
              return <noscript />;
            }

            if (_.isUndefined(user._id)) {
              return <ComposedComponent {...this.props} />;
            }

            return (
              <Redirect
                to={{
                  pathname: '/',
                  state: { from: this.props.location },
                }}
              />
            );
          }}
        />
      );
    }
  }

  function mapStateToProps(state) {
    return { user: state.user };
  }

  return connect(mapStateToProps)(RequireNoAuth);
}
