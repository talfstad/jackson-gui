import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RenderIfAdmin from '/imports/ui/components/auth/hocs/render-if-admin';

import 'bootstrap-select';
import 'bootstrap-select/dist/css/bootstrap-select.min.css';

class OfferSelectInput extends Component {
  componentDidMount() {
    $('.bs-select').selectpicker({
      iconBase: 'fa',
      tickIcon: 'fa-check',
    });
  }

  componentDidUpdate() {
    $('.bs-select').selectpicker('refresh');
  }

  buildOfferList() {
    const { users } = this.props;
    return users.map(user => (
      <option
        key={user._id}
        value={user._id}
        data-offer-name={user.name}
        data-offer-id={user._id}
      >
        {user.name}
      </option>
    ));
  }

  handleOnChange(e) {
    e.preventDefault();
    const { handleOnChange } = this.props;

    handleOnChange({
      offer: {
        _id: this.el.value,
        url: this.el.getAttribute('data-offer-name'),
      },
    });
  }

  render() {
    const {
      selectedValue,
      errorForField,
    } = this.props;

    return (
      <div className="form-group">
        <label htmlFor="offer-user">Current Offer</label>
        <select
          ref={(c) => { this.el = c; }}
          onChange={this.handleOnChange}
          value={selectedValue || ''}
          className="bs-select form-control"
          data-live-search="true"
          data-size="8"
        >
          {this.buildOfferList()}
        </select>
        {errorForField}
      </div>
    );
  }
}

OfferSelectInput.propTypes = {
  handleOnChange: PropTypes.func,
  errorForField: PropTypes.shape({}),
  selectedValue: PropTypes.string,
  users: PropTypes.arrayOf(PropTypes.object),
};

OfferSelectInput.defaultProps = {
  handleOnChange: null,
  selectedValue: null,
  errorForField: {},
  getErrorForField: null,
  users: [],
};

export default RenderIfAdmin(OfferSelectInput);
