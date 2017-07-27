import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addNewOffer } from '/imports/actions/offers';

import UserSelectInput from '../user-select-input';

class EditOfferModal extends Component {
  componentDidMount() {
    const { history } = this.props;

    $(this.el).modal('show');
    $(this.el).draggable({ handle: '.modal-header' });

    $(this.el).on('shown.bs.modal', () => {
      $(this.offerNameInput).focus();
    });

    $(this.el).on('hidden.bs.modal', () => {
      history.push('/offers/manage');
    });
  }

  componentWillUnmount() {
    // Intent: Remove backdrop to allow for a quick
    // back button press.
    $('.modal-backdrop').remove();
  }

  getErrorForField(field, defaultHelp) {
    const { addOfferErrors } = this.props;
    const error = addOfferErrors.find(o => o.name === field);
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

  handleAddNewOffer(e) {
    if (e) e.preventDefault();
    const {
      addNewOfferAction,
    } = this.props;

    const name = this.offerNameInput.value;
    const url = this.offerUrlInput.value;

    let userId = null;
    let userName = null;

    if (this.offerUserInput) {
      const selectedOption = this.offerUserInput.options[this.offerUserInput.selectedIndex];
      userId = selectedOption.getAttribute('data-user-id');
      userName = selectedOption.getAttribute('data-user-name');
    }

    addNewOfferAction({ name, url, userId, userName }, () => {
      this.closeModal();
    });
  }

  render() {
    return (
      <div
        ref={(c) => { this.el = c; }}
        className="modal fade draggable-modal"
        tabIndex="-1"
        data-backdrop="static"
      >
        <div className="add-offer-modal modal-dialog" role="document">
          <form onSubmit={e => this.handleAddNewOffer(e)}>
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true" />
                <h4 className="modal-title">Add New Offer</h4>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="password">Offer Name</label>
                  <input
                    ref={(c) => { this.offerNameInput = c; }}
                    id="offer-name"
                    type="input"
                    className="form-control"
                    placeholder="Enter Offer Name"
                  />
                  {this.getErrorForField('name', 'The offer name is a unique identifier used to select this offer when adding it to a rip.')}
                </div>
                <div className="form-group">
                  <label htmlFor="confirm-password">Offer URL</label>
                  <input
                    ref={(c) => { this.offerUrlInput = c; }}
                    id="offer-url"
                    type="input"
                    className="form-control"
                    placeholder="Enter Offer URL"
                  />
                  {this.getErrorForField('url', 'The offer URL is where we send the visitor from the ripped landing page.')}
                </div>
                <UserSelectInput
                  inputRef={(c) => { this.offerUserInput = c; }}
                  users={this.props.users}
                  getErrorForField={(field, defaultHelp) =>
                    this.getErrorForField(field, defaultHelp)}
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

EditOfferModal.propTypes = {
  history: PropTypes.shape({}),
  users: PropTypes.arrayOf(PropTypes.object),
  addNewOfferAction: PropTypes.func,
  addOfferErrors: PropTypes.arrayOf(PropTypes.object),
};

EditOfferModal.defaultProps = {
  addNewOfferAction: null,
  history: {},
  users: [],
  addOfferErrors: [],
};

const mapStateToProps = state => ({
  users: state.users.userList,
  addOfferErrors: state.offers.addNewErrors,
});

const actions = {
  addNewOfferAction: addNewOffer,
};

export default connect(mapStateToProps, actions)(EditOfferModal);
