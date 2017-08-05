import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  addNewWhitelisted,
} from '/imports/actions/whitelisted';

import Base from './base';

class WhitelistRipModal extends Component {
  componentWillMount() {
    const {
      location: { state = {} },
      history,
    } = this.props;
    // Intent: Redirect if we don't have an
    // rip id to edit.
    if (
      _.isUndefined(state.userId) ||
      _.isUndefined(state.userName) ||
      _.isUndefined(state.domain)) {
      history.push('/rips/manage');
    }
  }

  handleAddWhitelisted(e) {
    if (e) e.preventDefault();
    const {
      addNewWhitelistedAction,
      location: {
        state: {
          domain,
          userName,
          userId,
        },
      },
    } = this.props;

    addNewWhitelistedAction({
      name: domain,
      userName,
      userId,
    }, () => {
      // Note: must include this here to get desired context.
      this.baseEl.closeModal();
    });
  }

  render() {
    const {
      history,
      location: {
        state = {},
      },
    } = this.props;

    return (
      <Base
        ref={(c) => { this.baseEl = c; }}
        history={history}
        domain={state.domain}
        handleModalAction={e => this.handleAddWhitelisted(e)}
        modalRedirectRouteOnClose="/rips/manage"
      />
    );
  }
}

WhitelistRipModal.propTypes = {
  history: PropTypes.shape({}),
  location: PropTypes.shape({}),
  addNewWhitelistedAction: PropTypes.func,
};

WhitelistRipModal.defaultProps = {
  location: {},
  history: {},
  addNewWhitelistedAction: null,
};

const actions = {
  addNewWhitelistedAction: addNewWhitelisted,
};

export default connect(null, actions)(WhitelistRipModal);
