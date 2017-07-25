import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export default function (ComposedComponent) {
  const RenderIfAdmin = (props) => {
    const {
      user,
    } = props;

    // Intent: if admin, role will exist in user's role array.
    const isAdmin = user.roles.indexOf('admin');

    if (isAdmin < 0) {
      return <noscript />;
    }

    return <ComposedComponent {...props} />;
  };

  RenderIfAdmin.propTypes = {
    user: PropTypes.shape({
      _id: PropTypes.string,
    }),
  };

  RenderIfAdmin.defaultProps = {
    user: null,
    location: null,
  };

  function mapStateToProps(state) {
    return { user: state.user };
  }

  return connect(mapStateToProps)(RenderIfAdmin);
}
