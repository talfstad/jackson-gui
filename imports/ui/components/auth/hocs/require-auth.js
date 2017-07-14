import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export default function (ComposedComponent) {
  class Authentication extends Component {
    static propTypes = {
      authenticated: PropTypes.bool,
    }

    static defaultProps = {
      authenticated: false,
    }

    componentWillMount() {
      if (!this.props.authenticated) {
        this.context.router.push('/');
      }
    }

    // called when re-rendered, or gets a new set of props
    // so this triggers an authentication ?
    componentWillUpdate() {
      this.context.router.push('/');
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps)(Authentication);
}
