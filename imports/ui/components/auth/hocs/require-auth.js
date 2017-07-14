import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Route,
  Redirect,
} from 'react-router-dom';

export default function (ComposedComponent) {
  class RequireAuth extends Component {
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
      return (
        <Route
          render={() => (
            _.isUndefined(this.props.user._id) ?
              <Redirect
                to={{
                  pathname: '/login',
                  state: { from: this.props.location },
                }}
              />
            :
              <ComposedComponent {...this.props} />
          )}
        />
      );
    }
  }

  function mapStateToProps(state) {
    return { user: state.user };
  }

  return connect(mapStateToProps)(RequireAuth);
}
