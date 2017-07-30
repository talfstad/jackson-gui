import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CountryFlag extends Component {
  componentDidMount() {
    $(this.el).tooltip();
  }

  render() {
    const {
      cc,
      hits,
      className,
    } = this.props;

    return (
      <span
        ref={(c) => { this.el = c; }}
        data-toggle="tooltip"
        data-placement="top"
        title={`${hits} Hits in ${cc.toUpperCase()}`}
        className={`${className} flag-icon flag-icon-${cc.toLowerCase()}`}
      />
    );
  }
}

CountryFlag.propTypes = {
  cc: PropTypes.string,
  hits: PropTypes.number,
  className: PropTypes.string,
};

CountryFlag.defaultProps = {
  cc: '',
  hits: 0,
  className: '',
};

export default CountryFlag;
