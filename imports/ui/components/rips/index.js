import React from 'react';
import PropTypes from 'prop-types';
import {
  Route,
} from 'react-router-dom';
import {
  withRouter,
  Switch,
} from 'react-router';
import RequireAuth from '../auth/hocs/require-auth';
import ManageRips from './manage';

const Rips = (props) => {
  const { match } = props;

  return (
    <Switch>
      <Route path={`${match.url}/manage`} component={ManageRips} />
    </Switch>
  );
};

Rips.propTypes = {
  match: PropTypes.shape({}),
};

Rips.defaultProps = {
  match: null,
};

export default withRouter(RequireAuth(Rips));
