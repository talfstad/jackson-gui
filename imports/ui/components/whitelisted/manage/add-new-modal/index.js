import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  addNewWhitelisted,
  updateAddValues,
} from '/imports/actions/whitelisted';

import Base from './base';

class AddNewModal extends Component {
  getDefaultValues() {
    const { whitelistedValues } = this.props;
    const { userId = '' } = whitelistedValues;

    return ([
      {
        name: 'name',
        value: whitelistedValues.name,
      },
      {
        name: 'whitelisted-user',
        value: userId,
      },
    ]);
  }

  handleAddNewWhitelisted(e) {
    if (e) e.preventDefault();
    const {
      addNewWhitelistedAction,
    } = this.props;
    const {
      whitelistedDomainNameInput,
      whitelistedUserInput,
    } = this.baseEl;

    const name = whitelistedDomainNameInput.value;

    let userId = null;
    let userName = null;

    if (whitelistedUserInput) {
      const selectedOption = whitelistedUserInput.options[whitelistedUserInput.selectedIndex];
      userId = selectedOption.getAttribute('data-user-id');
      userName = selectedOption.getAttribute('data-user-name');
    }

    addNewWhitelistedAction({ name, userId, userName }, () => {
      // Note: must include this here to get desired context.
      this.resetAddValues();
      this.baseEl.closeModal();
    });
  }

  resetAddValues() {
    const {
      updateAddValuesAction,
    } = this.props;

    updateAddValuesAction({
      name: '',
    });
  }

  handleOnChange() {
    const {
      whitelistedDomainNameInput,
      whitelistedUserInput = {},
    } = this.baseEl;

    const {
      updateAddValuesAction,
    } = this.props;

    let userId = null;
    let userName = null;

    if (whitelistedUserInput) {
      const selectedOption = whitelistedUserInput.options[whitelistedUserInput.selectedIndex];
      userId = selectedOption.getAttribute('data-user-id');
      userName = selectedOption.getAttribute('data-user-name');
    }

    updateAddValuesAction({
      userId,
      userName,
      name: whitelistedDomainNameInput.value,
    });
  }

  render() {
    const {
      history,
      users,
      errors,
    } = this.props;

    return (
      <Base
        ref={(c) => { this.baseEl = c; }}
        history={history}
        defaultValues={this.getDefaultValues()}
        handleOnChange={e => this.handleOnChange(e)}
        users={users}
        handleModalAction={e => this.handleAddNewWhitelisted(e)}
        modalTitle="Whitelist New Domain"
        modalRedirectRouteOnClose="/whitelisted/manage"
        errors={errors}
      />
    );
  }
}

AddNewModal.propTypes = {
  history: PropTypes.shape({}),
  users: PropTypes.arrayOf(PropTypes.object),
  errors: PropTypes.arrayOf(PropTypes.object),
  addNewWhitelistedAction: PropTypes.func,
  updateAddValuesAction: PropTypes.func,
  whitelistedValues: PropTypes.shape({}),
};

AddNewModal.defaultProps = {
  updateAddValuesAction: null,
  addNewWhitelistedAction: null,
  history: {},
  whitelistedValues: {},
  users: [],
  errors: [],
};

const mapStateToProps = state => ({
  users: state.users.userList,
  errors: state.whitelisted.addNewErrors,
  whitelistedValues: state.whitelisted.addWhitelisted,
});

const actions = {
  addNewWhitelistedAction: addNewWhitelisted,
  updateAddValuesAction: updateAddValues,
};

export default connect(mapStateToProps, actions)(AddNewModal);
