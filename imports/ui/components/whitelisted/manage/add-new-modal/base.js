import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import UserSelectInput from './user-select-input';

class Base extends Component {
  componentDidMount() {
    const {
      history,
      modalRedirectRouteOnClose,
    } = this.props;

    $(this.el).modal('show');
    $(this.el).draggable({ handle: '.modal-header' });

    $(this.el).on('shown.bs.modal', () => {
      $(this.whitelistedDomainNameInput).focus();
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

  getDefaultValueForField(field) {
    const { defaultValues } = this.props;
    const { value } = defaultValues.find(o => o.name === field);
    return value || '';
  }

  getErrorForField(field, defaultHelp) {
    const { errors } = this.props;
    const error = errors.find(o => o.name === field);
    if (error) {
      return (
        <small
          className="form-text text-danger text-muted"
        >
          {error.message}
        </small>
      );
    }
    return (
      <small className="help-block">
        {defaultHelp}
      </small>
    );
  }

  closeModal() {
    $(this.el).modal('hide');
  }

  render() {
    const {
      handleModalAction,
      modalTitle,
      users,
      handleOnChange,
    } = this.props;

    return (
      <div
        ref={(c) => { this.el = c; }}
        className="modal fade draggable-modal"
        tabIndex="-1"
        data-backdrop="static"
      >
        <div className="add-whitelisted-modal modal-dialog" role="document">
          <form onSubmit={handleModalAction}>
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true" />
                <h4 className="modal-title">{modalTitle}</h4>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="password">Domain Name</label>
                  <input
                    ref={(c) => { this.whitelistedDomainNameInput = c; }}
                    id="whitelisted-domain-name"
                    value={this.getDefaultValueForField('name')}
                    onChange={handleOnChange}
                    type="input"
                    className="form-control"
                    placeholder="Enter Domain Name"
                  />
                  {this.getErrorForField('name', 'Root domain name whitelists all subdomains as well. Ex: "domain.com" whitelists "sub.domain.com"')}
                </div>
                <UserSelectInput
                  inputRef={(c) => { this.whitelistedUserInput = c; }}
                  users={users}
                  labelText="Domain Name Owner"
                  selectedValue={this.getDefaultValueForField('whitelisted-user')}
                  errorForField={this.getErrorForField('whitelisted-user', 'Select which user owns this domain. This option is only available to admin users.')}
                  handleOnChange={handleOnChange}
                />
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
  history: PropTypes.shape({}),
  users: PropTypes.arrayOf(PropTypes.object),
  modalTitle: PropTypes.string,
  handleOnChange: PropTypes.func,
  handleModalAction: PropTypes.func,
  modalRedirectRouteOnClose: PropTypes.string,
  errors: PropTypes.arrayOf(PropTypes.object),
  defaultValues: PropTypes.arrayOf(PropTypes.object),
};

Base.defaultProps = {
  defaultValues: [],
  modalTitle: '',
  handleOnChange: null,
  handleModalAction: null,
  modalRedirectRouteOnClose: '/',
  history: {},
  users: [],
  errors: [],
};

export default Base;
