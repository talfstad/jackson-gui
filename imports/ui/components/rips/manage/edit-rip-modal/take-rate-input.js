import React, { Component } from 'react';
import PropTypes from 'prop-types';
import noUiSlider from 'nouislider';

class TakeRateInput extends Component {
  componentDidMount() {
    const {
      value,
      handleOnChange,
    } = this.props;

    noUiSlider.create(this.takeRateEl, {
      start: value,
      connect: [true, false],
      range: {
        min: 0,
        max: 100,
      },
      pips: {
        mode: 'values',
        values: [20, 80],
        density: 2,
      },
    });

    this.takeRateEl.noUiSlider.on('slide', ([newValue]) => {
      handleOnChange({ take_rate: (Math.floor(newValue) / 100) });
    });
  }

  componentDidUpdate() {
    const { value } = this.props;
    const currentVal = Math.floor(this.takeRateEl.noUiSlider.get());
    if (currentVal !== value) {
      this.takeRateEl.noUiSlider.set(value);
    }
  }

  componentWillUnmount() {
    const { handleOnChange } = this.props;
    handleOnChange({ take_rate: 0, offer: { name: '' } });
  }

  render() {
    const {
      value,
      errorField,
    } = this.props;

    return (
      <div className="take-rate-input form-group">
        <label htmlFor="take_rate">Jack Rate: {value}%</label>
        <div className="mb10">
          {errorField}
        </div>
        <div className="take-rate-slider-wrapper">
          <div
            ref={(c) => { this.takeRateEl = c; }}
            className="noUi-danger take-rate-slider"
          />
        </div>
      </div>
    );
  }
}

TakeRateInput.propTypes = {
  value: PropTypes.number,
  handleOnChange: PropTypes.func,
  errorField: PropTypes.shape({}),
};

TakeRateInput.defaultProps = {
  value: 0,
  handleOnChange: null,
  errorField: {},
};

export default TakeRateInput;
