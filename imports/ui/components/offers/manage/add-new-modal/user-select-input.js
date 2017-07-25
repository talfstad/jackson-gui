import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RenderIfAdmin from '/imports/ui/components/auth/hocs/render-if-admin';

import 'bootstrap-select';
import 'bootstrap-select/dist/css/bootstrap-select.min.css';

class UserSelectInput extends Component {
  componentDidMount() {
    $('.bs-select').selectpicker({
      iconBase: 'fa',
      tickIcon: 'fa-check',
    });
  }

  componentDidUpdate() {
    $('.bs-select').selectpicker('refresh');
  }

  buildUserList() {
    const { users } = this.props;
    return users.map(user => (
      <option
        key={user._id}
        value={user._id}
        data-user-name={user.name}
        data-user-id={user._id}
      >
        {user.name}
      </option>
    ));
  }

  render() {
    return (
      <div className="form-group">
        <label htmlFor="offer-user">Offer User</label>
        <select
          ref={this.props.inputRef}
          className="bs-select form-control"
          data-live-search="true"
          data-size="8"
        >
          {this.buildUserList()}
        </select>
        {this.props.getErrorForField('offer-user', 'Select which user this offer will be available for. This option is only available to admin users.')}
      </div>
    );
  }
}

UserSelectInput.propTypes = {
  getErrorForField: PropTypes.func,
  users: PropTypes.arrayOf(PropTypes.object),
  inputRef: PropTypes.func,
};

UserSelectInput.defaultProps = {
  getErrorForField: null,
  users: [],
  inputRef: null,
};

export default RenderIfAdmin(UserSelectInput);
