import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import 'nouislider/distribute/nouislider.css';

class Base extends Component {
  componentDidMount() {
    const {
      history,
      modalRedirectRouteOnClose,
    } = this.props;

    $(this.el).modal('show');
    $(this.el).draggable({ handle: '.modal-header' });

    $(this.el).on('shown.bs.modal', () => {
      $(this.offerNameInput).focus();
    });

    $(this.el).on('hidden.bs.modal', () => {
      // Intent: redirect on close if we have a prop.
      // If not, just close.
      if (!_.isEmpty(modalRedirectRouteOnClose)) {
        history.push(modalRedirectRouteOnClose);
      }
    });
  }

  componentWillUnmount() {
    // Intent: Remove backdrop to allow for a quick
    // back button press.
    $('.modal-backdrop').remove();
  }

  closeModal() {
    $(this.el).modal('hide');
  }

  render() {
    const {
      handleModalAction,
      domain,
    } = this.props;

    return (
      <div
        ref={(c) => { this.el = c; }}
        className="modal fade draggable-modal"
        tabIndex="-1"
        data-backdrop="static"
      >
        <div className="add-offer-modal modal-dialog" role="document">
          <form onSubmit={handleModalAction}>
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true" />
                <h4 className="modal-title">Whitelist {domain}</h4>
              </div>
              <div className="modal-body">
                <p>Are you sure you would like to whitelist {domain}?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn dark btn-outline" data-dismiss="modal">Cancel</button>
                <button type="submit" className="btn green">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Base.propTypes = {
  domain: PropTypes.string,
  history: PropTypes.shape({}),
  handleModalAction: PropTypes.func,
  modalRedirectRouteOnClose: PropTypes.string,
};

Base.defaultProps = {
  domain: '',
  handleModalAction: null,
  modalRedirectRouteOnClose: '/',
  history: {},
};

export default Base;
