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
import ManageWhitelistedDomains from './manage';

class Whitelist extends Component {
  render() {
    const { match } = this.props;

    return (
      <Switch>
        <Route
          path={`${match.url}/manage`}
          component={ManageWhitelistedDomains}
        />
      </Switch>
    );
  }
}

Whitelist.propTypes = {
  match: PropTypes.shape({}),
};

Whitelist.defaultProps = {
  match: null,
};

export default withRouter(RequireAuth(Whitelist));
