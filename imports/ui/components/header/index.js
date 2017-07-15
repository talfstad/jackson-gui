import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logUserOut } from '/imports/actions/user/login';

class Header extends Component {
  handleLogUserOut(e) {
    e.preventDefault();

    const { logUserOutAction } = this.props;

    logUserOutAction();
  }

  renderTopbarActions() {
    const { user } = this.props;

    if (user._id) {
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
                <a
                  href="/logout"
                  onClick={e => this.handleLogUserOut(e)}
                >
                  <i className="icon-key" /> Log Out
                </a>
              </li>
            </ul>
          </div>
        </div>
      );
    }

    return <noscript />;
  }

  render() {
    return (
      <header className="page-header">
        <nav className="navbar mega-menu">
          <div className="container-fluid">
            <div className="clearfix navbar-fixed-top">
              <a id="index" className="page-logo" href="index.html">
                <img src="/images/logo.png" alt="Lander Re-allocation System" />
              </a>
              {this.renderTopbarActions()}
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
  user: PropTypes.shape({}),
  logUserOutAction: PropTypes.func,
};

Header.defaultProps = {
  user: {},
  logUserOutAction: null,
};

const mapStateToProps = state => ({
  user: state.user,
});

const actions = {
  logUserOutAction: logUserOut,
};

export default connect(mapStateToProps, actions)(Header);
