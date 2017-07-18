import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ManageRips extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="page-content">
          <div className="breadcrumbs">
            <h1>Manage Rips</h1>
            <ol className="breadcrumb">
              <li>
                <Link to="/rips/manage">Rips</Link>
              </li>
              <li className="active">Manage</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

export default ManageRips;
