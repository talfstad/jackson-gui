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
    const {
      handleOnChange,
      selectedValue,
      errorForField,
      labelText,
    } = this.props;

    return (
      <div className="form-group">
        <label htmlFor="whitelisted-user">{labelText}</label>
        <select
          ref={this.props.inputRef}
          onChange={handleOnChange}
          value={selectedValue}
          className="bs-select form-control"
          data-live-search="true"
          data-size="8"
        >
          {this.buildUserList()}
        </select>
        {errorForField}
      </div>
    );
  }
}

UserSelectInput.propTypes = {
  labelText: PropTypes.string,
  handleOnChange: PropTypes.func,
  errorForField: PropTypes.shape({}),
  selectedValue: PropTypes.string,
  users: PropTypes.arrayOf(PropTypes.object),
  inputRef: PropTypes.func,
};

UserSelectInput.defaultProps = {
  labelText: 'User Select',
  handleOnChange: null,
  selectedValue: null,
  errorForField: {},
  getErrorForField: null,
  users: [],
  inputRef: null,
};

export default RenderIfAdmin(UserSelectInput);
