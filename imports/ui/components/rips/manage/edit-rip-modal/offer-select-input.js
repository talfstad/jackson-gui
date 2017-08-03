import React, { Component } from 'react';
import PropTypes from 'prop-types';

import 'bootstrap-select';
import 'bootstrap-select/dist/css/bootstrap-select.min.css';

class OfferSelectInput extends Component {
  componentDidMount() {
    $('.bs-select').selectpicker({
      iconBase: 'fa',
      tickIcon: 'fa-check',
      useEmpty: true,
    });
  }

  componentDidUpdate() {
    $('.bs-select').selectpicker('refresh');
  }

  buildOfferList() {
    const { offers } = this.props;
    return offers.map(offer => (
      <option
        key={offer._id}
        value={offer._id}
        data-offer-id={offer._id}
        data-offer-name={offer.name}
        data-offer-url={offer.url}
      >
        {offer.name}
      </option>
    ));
  }

  handleOnChange(e) {
    e.preventDefault();
    const { handleOnChange } = this.props;

    const selectedOption = this.el.options[this.el.selectedIndex];

    handleOnChange({
      offer: {
        _id: this.el.value,
        name: selectedOption.getAttribute('data-offer-name'),
        url: selectedOption.getAttribute('data-offer-url'),
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
          onChange={e => this.handleOnChange(e)}
          value={selectedValue || ''}
          className="bs-select form-control"
          data-live-search="true"
          data-size="8"
        >
          <option data-hidden="true" />
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
  offers: PropTypes.arrayOf(PropTypes.object),
};

OfferSelectInput.defaultProps = {
  handleOnChange: null,
  selectedValue: null,
  errorForField: {},
  getErrorForField: null,
  offers: [],
};

export default OfferSelectInput;
