import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from '/imports/store';

class Modal extends Component {
  componentDidMount() {
    this.modalTarget = document.createElement('div');
    this.modalTarget.className = 'jackson-modal';
    document.body.appendChild(this.modalTarget);
    this.renderer();
  }

  componentWillUpdate() {
    this.renderer();
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.modalTarget);
    document.body.removeChild(this.modalTarget);
  }

  renderer() {
    ReactDOM.render(
      <Provider store={store}>
        <div className="jackson-modal">
          {this.props.children}
        </div>
      </Provider>,
      this.modalTarget);
  }

  render() {
    return <noscript />;
  }
}

Modal.propTypes = {
  children: PropTypes.node,
};

Modal.defaultProps = {
  children: null,
};

export default Modal;
