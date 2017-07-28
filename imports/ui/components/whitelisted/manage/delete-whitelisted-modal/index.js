import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { deleteWhitelistedDomain } from '/imports/actions/whitelisted';

class DeleteWhitelistedModal extends Component {
  componentWillMount() {
    const {
      history,
      location: { state = {} },
    } = this.props;
    // Require whitelisted id to be present
    if (
      _.isUndefined(state._id) ||
      _.isUndefined(state.name)
    ) {
      history.replace('/whitelisted/manage');
    }
  }

  componentDidMount() {
    const { history } = this.props;

    $(this.el).modal('show');
    $(this.el).draggable({ handle: '.modal-header' });

    $(this.el).on('hidden.bs.modal', () => {
      history.push('/whitelisted/manage');
    });
  }

  componentWillUnmount() {
    // Intent: Remove backdrop to allow for a quick
    // back button press.
    $('.modal-backdrop').remove();
  }

  getErrorForField(field) {
    const { deleteErrors } = this.props;
    const error = deleteErrors.find(o => o.name === field);
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

  handleDeleteWhitelisted(e) {
    if (e) e.preventDefault();
    const {
      deleteWhitelistedDomainAction,
      location: { state = {} },
    } = this.props;

    deleteWhitelistedDomainAction({ whitelistedId: state._id }, () => {
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
        <div className="delete-whitelisted-modal modal-dialog" role="document">
          <form onSubmit={e => this.handleDeleteWhitelisted(e)}>
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true" />
                <h4 className="modal-title">Remove Whitelisted Domain</h4>
              </div>
              <div className="modal-body">
                <p>
                  Are you sure you want to remove <strong>{state.name}</strong>?
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

DeleteWhitelistedModal.propTypes = {
  history: PropTypes.shape({}),
  location: PropTypes.shape({}),
  deleteErrors: PropTypes.arrayOf(PropTypes.object),
  deleteWhitelistedDomainAction: PropTypes.func,
};

DeleteWhitelistedModal.defaultProps = {
  deleteWhitelistedDomainAction: null,
  deleteErrors: [],
  history: {},
  location: {},
};

const mapStateToProps = state => ({
  deleteErrors: state.whitelisted.deleteErrors,
});

const actions = {
  deleteWhitelistedDomainAction: deleteWhitelistedDomain,
};

export default connect(mapStateToProps, actions)(DeleteWhitelistedModal);
