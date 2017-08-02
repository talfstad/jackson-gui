import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  editRip,
  subscribeToEditRip,
  updateEditValues,
  stopEditRipSub,
  subscribeToAvailableOffersForThisRip,
} from '/imports/actions/rips';

import Base from './base';

class EditRipModal extends Component {
  componentWillMount() {
    const {
      subscribeToEditRipAction,
      subscribeToAvailableOffersForThisRipAction,
      match: { params: { ripId, userId } },
      history,
    } = this.props;

    // Intent: Redirect if we don't have an
    // rip id to edit.
    if (_.isUndefined(ripId) || _.isUndefined(userId)) {
      history.push('/rips/manage');
    }

    subscribeToAvailableOffersForThisRipAction({ userId });
    subscribeToEditRipAction({ ripId });
  }

  componentWillUnmount() {
    const {
      stopEditRipSubAction,
    } = this.props;
    // Intent: must stop subscription to Remove
    // the edit rip from the mini mongo db.
    // Otherwise it will be in the paging for rip list.
    stopEditRipSubAction();
  }

  getDefaultValues() {
    const { ripValues } = this.props;

    return ([
      {
        name: 'take_rate',
        value: Math.floor(ripValues.take_rate * 100),
      },
      {
        name: 'offer',
        value: _.isUndefined(ripValues.offer) ? null : ripValues.offer._id,
      },
      {
        name: 'userName',
        value: ripValues.userName,
      },
    ]);
  }

  handleOnChange(values) {
    const {
      updateEditValuesAction,
    } = this.props;
    updateEditValuesAction(values);
  }

  handleEditRip(e) {
    if (e) e.preventDefault();
    const {
      editRipAction,
      ripValues,
    } = this.props;

    editRipAction(ripValues, () => {
      // Note: must include this here to get desired context.
      this.baseEl.closeModal();
    });
  }

  render() {
    const {
      history,
      errors,
      ripValues,
      availableOffersForThisRip,
    } = this.props;

    let modalTitle = ripValues.url;

    if (modalTitle) {
      if (modalTitle.length > 55) {
        modalTitle = `Edit ...${ripValues.url.substr(ripValues.url.length - 55)}`;
      } else {
        modalTitle = `Edit ${ripValues.url}`;
      }
    } else {
      modalTitle = 'Edit';
    }

    return (
      <Base
        ref={(c) => { this.baseEl = c; }}
        history={history}
        defaultValues={this.getDefaultValues()}
        handleModalAction={e => this.handleEditRip(e)}
        handleOnChange={values => this.handleOnChange(values)}
        modalTitle={modalTitle}
        offers={availableOffersForThisRip}
        modalRedirectRouteOnClose="/rips/manage"
        errors={errors}
      />
    );
  }
}

EditRipModal.propTypes = {
  history: PropTypes.shape({}),
  errors: PropTypes.arrayOf(PropTypes.object),
  stopEditRipSubAction: PropTypes.func,
  editRipAction: PropTypes.func,
  ripValues: PropTypes.shape({}),
  subscribeToEditRipAction: PropTypes.func,
  match: PropTypes.shape({}),
  updateEditValuesAction: PropTypes.func,
  availableOffersForThisRip: PropTypes.arrayOf(PropTypes.object),
  subscribeToAvailableOffersForThisRipAction: PropTypes.func,
};

EditRipModal.defaultProps = {
  subscribeToEditRipAction: null,
  stopEditRipSubAction: null,
  editRipAction: null,
  availableOffersForThisRip: [],
  subscribeToAvailableOffersForThisRipAction: null,
  ripValues: {
    offer: {
      name: '',
    },
    take_rate: 0,
  },
  history: {},
  updateEditValuesAction: null,
  errors: [],
  match: {},
};

const mapStateToProps = state => ({
  errors: state.rips.addNewErrors,
  ripValues: state.rips.editRip,
  availableOffersForThisRip: state.rips.availableOffersForThisRip,
});

const actions = {
  editRipAction: editRip,
  stopEditRipSubAction: stopEditRipSub,
  updateEditValuesAction: updateEditValues,
  subscribeToEditRipAction: subscribeToEditRip,
  subscribeToAvailableOffersForThisRipAction: subscribeToAvailableOffersForThisRip,
};

export default connect(mapStateToProps, actions)(EditRipModal);
