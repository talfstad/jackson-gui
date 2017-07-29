import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  editOffer,
  subscribeToEditOffer,
  updateEditValues,
  stopEditOfferSub,
} from '/imports/actions/offers';

import Base from './base';

class EditOfferModal extends Component {
  componentWillMount() {
    const {
      subscribeToEditOfferAction,
      match: { params: { offerId } },
      history,
    } = this.props;

    // Intent: Redirect if we don't have an
    // offer id to edit.
    if (_.isUndefined(offerId)) {
      history.push('/offers/manage');
    }

    subscribeToEditOfferAction({ offerId });
  }

  componentWillUnmount() {
    const {
      stopEditOfferSubAction,
    } = this.props;
    // Intent: must stop subscription to Remove
    // the edit offer from the mini mongo db.
    // Otherwise it will be in the paging for offer list.
    stopEditOfferSubAction();
  }

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

  handleOnChange() {
    const {
      offerNameInput,
      offerUrlInput,
      offerUserInput,
    } = this.baseEl;

    const {
      updateEditValuesAction,
      offerValues,
    } = this.props;

    let userName = offerValues.userName;
    if (offerUserInput) {
      const selectedOption = offerUserInput.options[offerUserInput.selectedIndex];
      userName = selectedOption.getAttribute('data-user-name');
    }

    updateEditValuesAction({
      userName,
      name: offerNameInput.value,
      url: offerUrlInput.value,
      userId: (offerUserInput || {}).value,
    });
  }

  handleEditOffer(e) {
    if (e) e.preventDefault();
    const {
      editOfferAction,
      offerValues,
    } = this.props;

    editOfferAction(offerValues, () => {
      // Note: must include this here to get desired context.
      this.baseEl.closeModal();
    });
  }

  render() {
    const {
      history,
      users,
      errors,
      offerValues,
    } = this.props;

    return (
      <Base
        ref={(c) => { this.baseEl = c; }}
        offerUrlInputRef={(c) => { this.offerUrlInput = c; }}
        offerUserInputRef={(c) => { this.offerUserInput = c; }}
        history={history}
        defaultValues={this.getDefaultValues()}
        users={users}
        handleModalAction={e => this.handleEditOffer(e)}
        handleOnChange={e => this.handleOnChange(e)}
        modalTitle={offerValues.name}
        modalRedirectRouteOnClose="/offers/manage"
        errors={errors}
      />
    );
  }
}

EditOfferModal.propTypes = {
  history: PropTypes.shape({}),
  users: PropTypes.arrayOf(PropTypes.object),
  errors: PropTypes.arrayOf(PropTypes.object),
  stopEditOfferSubAction: PropTypes.func,
  editOfferAction: PropTypes.func,
  offerValues: PropTypes.shape({}),
  subscribeToEditOfferAction: PropTypes.func,
  match: PropTypes.shape({}),
  updateEditValuesAction: PropTypes.func,
};

EditOfferModal.defaultProps = {
  subscribeToEditOfferAction: null,
  stopEditOfferSubAction: null,
  editOfferAction: null,
  offerValues: {},
  history: {},
  users: [],
  updateEditValuesAction: null,
  errors: [],
  match: {},
};

const mapStateToProps = state => ({
  users: state.users.userList,
  errors: state.offers.addNewErrors,
  offerValues: state.offers.editOffer,
});

const actions = {
  editOfferAction: editOffer,
  stopEditOfferSubAction: stopEditOfferSub,
  updateEditValuesAction: updateEditValues,
  subscribeToEditOfferAction: subscribeToEditOffer,
};

export default connect(mapStateToProps, actions)(EditOfferModal);
