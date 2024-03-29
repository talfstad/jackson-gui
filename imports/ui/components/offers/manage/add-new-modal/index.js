import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  addNewOffer,
  updateAddValues,
} from '/imports/actions/offers';

import Base from './base';

class AddNewModal extends Component {
  getDefaultValues() {
    const { offerValues } = this.props;
    const { userId = '' } = offerValues;

    return ([
      {
        name: 'name',
        value: offerValues.name,
      },
      {
        name: 'url',
        value: offerValues.url,
      },
      {
        name: 'offer-user',
        value: userId,
      },
    ]);
  }

  handleAddNewOffer(e) {
    if (e) e.preventDefault();
    const {
      addNewOfferAction,
    } = this.props;
    const {
      offerNameInput,
      offerUrlInput,
      offerUserInput,
    } = this.baseEl;

    const name = offerNameInput.value;
    const url = offerUrlInput.value;

    let userId = null;
    let userName = null;

    if (offerUserInput) {
      const selectedOption = offerUserInput.options[offerUserInput.selectedIndex];
      userId = selectedOption.getAttribute('data-user-id');
      userName = selectedOption.getAttribute('data-user-name');
    }

    addNewOfferAction({ name, url, userId, userName }, () => {
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
      url: '',
    });
  }

  handleOnChange() {
    const {
      offerNameInput,
      offerUrlInput,
      offerUserInput,
    } = this.baseEl;

    const {
      updateAddValuesAction,
    } = this.props;

    let userId = null;
    let userName = null;

    if (offerUserInput) {
      const selectedOption = offerUserInput.options[offerUserInput.selectedIndex];
      userId = selectedOption.getAttribute('data-user-id');
      userName = selectedOption.getAttribute('data-user-name');
    }

    updateAddValuesAction({
      userId,
      userName,
      name: offerNameInput.value,
      url: offerUrlInput.value,
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
        handleModalAction={e => this.handleAddNewOffer(e)}
        modalTitle="Add New Offer"
        modalRedirectRouteOnClose="/offers/manage"
        errors={errors}
      />
    );
  }
}

AddNewModal.propTypes = {
  history: PropTypes.shape({}),
  users: PropTypes.arrayOf(PropTypes.object),
  errors: PropTypes.arrayOf(PropTypes.object),
  addNewOfferAction: PropTypes.func,
  updateAddValuesAction: PropTypes.func,
  offerValues: PropTypes.shape({}),
};

AddNewModal.defaultProps = {
  updateAddValuesAction: null,
  addNewOfferAction: null,
  history: {},
  offerValues: {},
  users: [],
  errors: [],
};

const mapStateToProps = state => ({
  users: state.users.userList,
  errors: state.offers.addNewErrors,
  offerValues: state.offers.addOffer,
});

const actions = {
  addNewOfferAction: addNewOffer,
  updateAddValuesAction: updateAddValues,
};

export default connect(mapStateToProps, actions)(AddNewModal);
