import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Route,
} from 'react-router-dom';
import {
  withRouter,
  Switch,
} from 'react-router';
import RequireAuth from '../auth/hocs/require-auth';
import RSConfig from './rs-config';

class Settings extends Component {
  render() {
    const { match } = this.props;

    return (
      <Switch>
        <Route path={`${match.url}/rs-config`} component={RSConfig} />
      </Switch>
    );
  }
}

Settings.propTypes = {
  match: PropTypes.shape({}),
};

Settings.defaultProps = {
  match: null,
};

export default withRouter(RequireAuth(Settings));
