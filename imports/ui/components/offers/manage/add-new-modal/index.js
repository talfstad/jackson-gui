import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from '/imports/ui/components/modal';
import UserSelectInput from './user-select-input';

class AddNewModal extends Component {
  componentDidMount() {
    const { history } = this.props;

    $(this.el).modal('show');
    $(this.el).draggable({ handle: '.modal-header' });

    $(this.el).on('hidden.bs.modal', () => {
      history.push('/offers/manage');
    });
  }

  componentDidUpdate() {
    // const { resetPasswordErrors } = this.props;
    // if (resetPasswordErrors.length < 1) {
    //   this.closeModal();
    // }
  }

  componentWillUnmount() {
    // Intent: Remove backdrop to allow for a quick
    // back button press.
    $('.modal-backdrop').remove();
  }

  getErrorForField(field) {
    // const { resetPasswordErrors } = this.props;
    // const error = resetPasswordErrors.find(o => o.name === field);
    // if (error) {
    //   return <small className="form-text text-danger text-muted">{error.message}</small>;
    // }
    // return <noscript />;
  }

  closeModal() {
    $(this.el).modal('hide');
  }

  handleAddNewOffer(e) {
    // if (e) e.preventDefault();
    // const {
    //   resetPassword,
    // } = this.props;
    // const token = this.getPasswordToken();
    // const password = this.passwordInput.value;
    // const confirmPassword = this.confirmPasswordInput.value;
    // resetPassword({ token, password, confirmPassword }, (errors) => {
    //   if (errors.length < 1) {
    //     this.closeModal();
    //   }
    // });
  }

  render() {
    return (
      <Modal ref={(c) => { this.modal = c; }}>
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
                    {this.getErrorForField('offer-name')}
                    <small className="help-block">
                      The offer name is a unique identifier used to select
                      this offer when adding it to a rip.
                    </small>
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
                    {this.getErrorForField('offer-url')}
                    <small className="help-block">
                      The offer URL is where we send the visitor
                      from the ripped landing page.
                    </small>
                  </div>
                  <UserSelectInput
                    ref={(c) => { this.offerUserInput = c; }}
                    users={this.props.users}
                    getErrorForField={this.getErrorForField}
                  />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn dark btn-outline" data-dismiss="modal">Cancel</button>
                  <button type="button" className="btn green">Submit</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    );
  }
}

AddNewModal.propTypes = {
  history: PropTypes.shape({}),
  users: PropTypes.arrayOf(PropTypes.object),
};

AddNewModal.defaultProps = {
  history: {},
  users: [],
};

const mapStateToProps = state => ({
  users: state.users.userList,
});

export default connect(mapStateToProps)(AddNewModal);
