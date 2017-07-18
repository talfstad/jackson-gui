import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RenderIfAuth from '../auth/hocs/render-if-auth';

const TopbarActions = (props) => {
  const {
    user,
    handleLogUserOut,
  } = props;
  const [email] = user.emails;

  return (
    <div className="topbar-actions">
      <div className="btn-group-img btn-group">
        <button type="button" className="btn btn-sm md-skip dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" aria-expanded="false">
          <span>{email.address}</span>
          <i className="fa fa-user user-image" />
        </button>
        <ul className="dropdown-menu-v2" role="menu">
          <li>
            <Link
              to="/logout"
              onClick={handleLogUserOut}
            >
              <i className="icon-key" /> Log Out
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

TopbarActions.propTypes = {
  user: PropTypes.shape({}),
  handleLogUserOut: PropTypes.func,
};

TopbarActions.defaultProps = {
  user: null,
  handleLogUserOut: null,
};

export default RenderIfAuth(TopbarActions);
