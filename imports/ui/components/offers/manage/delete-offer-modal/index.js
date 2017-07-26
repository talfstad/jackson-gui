import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { deleteOffer } from '/imports/actions/offers';

class DeleteOfferModal extends Component {
  componentWillMount() {
    const {
      history,
      location: { state = {} },
    } = this.props;
    // Require offer id to be present
    if (
      _.isUndefined(state._id) ||
      _.isUndefined(state.name)
    ) {
      history.replace('/offers/manage');
    }
  }

  componentDidMount() {
    const { history } = this.props;

    $(this.el).modal('show');
    $(this.el).draggable({ handle: '.modal-header' });

    $(this.el).on('hidden.bs.modal', () => {
      history.push('/offers/manage');
    });
  }

  componentWillUnmount() {
    // Intent: Remove backdrop to allow for a quick
    // back button press.
    $('.modal-backdrop').remove();
  }

  getErrorForField(field) {
    const { deleteOfferErrors } = this.props;
    const error = deleteOfferErrors.find(o => o.name === field);
    if (error) {
      return (
        <small
          className="form-text text-danger text-muted"
        >
          {error.message}
        </small>
      );
    }
  }

  handleDeleteOffer(e) {
    if (e) e.preventDefault();
    const {
      deleteOfferAction,
      location: { state = {} },
    } = this.props;

    deleteOfferAction({ offerId: state._id }, () => {
      this.closeModal();
    });
  }

  closeModal() {
    $(this.el).modal('hide');
  }

  render() {
    const {
      location: { state = {} },
    } = this.props;

    return (
      <div
        ref={(c) => { this.el = c; }}
        className="modal fade draggable-modal"
        tabIndex="-1"
        data-backdrop="static"
      >
        <div className="add-offer-modal modal-dialog" role="document">
          <form onSubmit={e => this.handleDeleteOffer(e)}>
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true" />
                <h4 className="modal-title">Delete Offer</h4>
              </div>
              <div className="modal-body">
                <p>
                  Are you sure you want to delete <strong>{state.name}</strong>?
                </p>
                <p>
                  {this.getErrorForField('name')}
                </p>
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

DeleteOfferModal.propTypes = {
  history: PropTypes.shape({}),
  location: PropTypes.shape({}),
  deleteOfferErrors: PropTypes.arrayOf(PropTypes.object),
  deleteOfferAction: PropTypes.func,
};

DeleteOfferModal.defaultProps = {
  deleteOfferAction: null,
  deleteOfferErrors: [],
  history: {},
  location: {},
};

const mapStateToProps = state => ({
  deleteOfferErrors: state.offers.deleteOfferErrors,
});

const actions = {
  deleteOfferAction: deleteOffer,
};

export default connect(mapStateToProps, actions)(DeleteOfferModal);
