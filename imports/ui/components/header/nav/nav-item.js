import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Link,
} from 'react-router-dom';

class NavItem extends Component {
  componentWillMount() {
    // If we match url, load default sub nav item.
    const {
      defaultPath,
      history,
      path,
    } = this.props;

    // If we match our path redirect to our default path
    if (this.matchesPath(path)) history.replace(defaultPath);
  }

  getItem({ open }) {
    const {
      defaultPath,
      name,
      icon,
    } = this.props;

    return (
      <li className={`dropdown dropdown-fw dropdown-fw-disabled ${open ? 'open' : ''}`}>
        <Link to={defaultPath} className="text-uppercase">
          <i className={icon} />{name}
        </Link>
        <ul className="dropdown-menu dropdown-menu-fw">
          {this.getSubNav()}
        </ul>
      </li>
    );
  }

  getSubNav() {
    const {
      subNav,
    } = this.props;

    return subNav.map(item => (
      <li
        className={`dropdown ${this.matchesPath(item.path) ? 'active' : ''}`}
        key={item.name}
      >
        <Link to={item.path}>
          <i className={item.icon} /> {item.name}
        </Link>
      </li>
    ));
  }

  matchesPath(path) {
    const { match } = this.props;
    return (match.params['0'] || '').match(new RegExp(`^${path}`));
  }

  render() {
    const {
      path,
    } = this.props;

    // Match path to first part of url relative to header route
    return this.matchesPath(path) ?
      this.getItem({ open: true })
    :
      this.getItem({ open: false });
  }
}

NavItem.propTypes = {
  subNav: PropTypes.arrayOf(PropTypes.object),
  path: PropTypes.string,
  defaultPath: PropTypes.string,
  history: PropTypes.shape({}),
  match: PropTypes.shape({}),
  name: PropTypes.string,
  icon: PropTypes.string,
};

NavItem.defaultProps = {
  subNav: [],
  history: {},
  path: null,
  defaultPath: null,
  icon: null,
  match: null,
  name: null,
};

export default NavItem;
