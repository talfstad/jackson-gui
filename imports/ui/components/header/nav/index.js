import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import RenderIfAuth from '../../auth/hocs/render-if-auth';
import NavItem from './nav-item';

class Nav extends Component {
  getItems() {
    const {
      match,
      history,
    } = this.props;

    return [
      <NavItem
        key="1"
        match={match}
        history={history}
        name="Rips"
        path="/rips"
        defaultPath="/rips/manage"
        icon="icon-layers"
        subNav={[
          {
            name: 'Manage',
            path: '/rips/manage',
            icon: 'icon-docs',
          },
        ]}
      />,
      <NavItem
        key="2"
        match={match}
        history={history}
        name="Offers"
        path="/offers"
        defaultPath="/offers/manage"
        icon="icon-basket"
        subNav={[
          {
            name: 'Manage',
            path: '/offers/manage',
            icon: 'icon-list',
          },
        ]}
      />,
      <NavItem
        key="3"
        match={match}
        history={history}
        name="Settings"
        path="/settings"
        defaultPath="/settings/rs-config"
        icon="icon-settings"
        subNav={[
          {
            name: 'RS Config',
            path: '/settings/rs-config',
            icon: 'icon-settings',
          },
        ]}
      />,
    ];
  }

  render() {
    return (
      <div className="nav-collapse collapse navbar-collapse navbar-responsive-collapse">
        <ul className="nav navbar-nav">
          {this.getItems()}
        </ul>
      </div>
    );
  }
}

Nav.propTypes = {
  match: PropTypes.shape({}),
  history: PropTypes.shape({}),
};

Nav.defaultProps = {
  match: {},
  history: {},
};

export default withRouter(RenderIfAuth(Nav));
