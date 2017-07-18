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
import ManageOffers from './manage';
import OverviewOffers from './overview';

class Offers extends Component {
  render() {
    const { match } = this.props;

    return (
      <Switch>
        <Route path={`${match.url}/manage`} component={ManageOffers} />
        <Route path={`${match.url}/overview`} component={OverviewOffers} />
      </Switch>
    );
  }
}

Offers.propTypes = {
  match: PropTypes.shape({}),
};

Offers.defaultProps = {
  match: null,
};

export default withRouter(RequireAuth(Offers));
