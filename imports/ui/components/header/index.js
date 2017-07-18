import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logUserOut } from '/imports/actions/user/login';
import Nav from './nav';
import TopbarActions from './topbar-actions';

class Header extends Component {
  handleLogUserOut(e) {
    e.preventDefault();
    const { logUserOutAction } = this.props;
    logUserOutAction();
  }

  render() {
    const { user } = this.props;

    return (
      <header className="page-header">
        <nav className="navbar mega-menu">
          <div className="container-fluid">
            <div className="clearfix navbar-fixed-top">
              <Link id="index" to="/rips/manage" className="page-logo">
                <img src="/images/logo.png" alt="Lander Re-allocation System" />
              </Link>
              <TopbarActions
                user={user}
                handleLogUserOut={e => this.handleLogUserOut(e)}
              />
            </div>
            <Nav />
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
