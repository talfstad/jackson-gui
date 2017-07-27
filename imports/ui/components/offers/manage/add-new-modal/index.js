import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addNewOffer } from '/imports/actions/offers';

import Base from './base';

class AddNewModal extends Component {
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
      this.baseEl.closeModal();
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
        offerUrlInputRef={(c) => { this.offerUrlInput = c; }}
        offerUserInputRef={(c) => { this.offerUserInput = c; }}
        history={history}
        defaultValues={[
          {
            name: 'name',
            value: '',
          },
          {
            name: 'url',
            value: '',
          },
        ]}
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
};

AddNewModal.defaultProps = {
  addNewOfferAction: null,
  history: {},
  users: [],
  errors: [],
};

const mapStateToProps = state => ({
  users: state.users.userList,
  errors: state.offers.addNewErrors,
});

const actions = {
  addNewOfferAction: addNewOffer,
};

export default connect(mapStateToProps, actions)(AddNewModal);
