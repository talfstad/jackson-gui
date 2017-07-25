import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RenderIfAdmin from '/imports/ui/components/auth/hocs/render-if-admin';

require('bootstrap-select');
require('bootstrap-select/dist/css/bootstrap-select.css');

class UserSelectInput extends Component {
  componentDidMount() {
    $('.bs-select').selectpicker({
      iconBase: 'fa',
      tickIcon: 'fa-check',
    });
  }

  render() {
    return (
      <div className="form-group">
        <label htmlFor="confirm-password">Offer User</label>
        <select className="bs-select form-control" data-live-search="true" data-size="8">
          <option value="AF">Afghanistan</option>
        </select>
        {this.props.getErrorForField('offer-user')}
        <small className="help-block">
          Select which user this offer will be available for.
          This option is only available to admin users.
        </small>
      </div>
    );
  }
}

UserSelectInput.propTypes = {
  getErrorForField: PropTypes.func,
};

UserSelectInput.defaultProps = {
  getErrorForField: null,
};

export default RenderIfAdmin(UserSelectInput);
