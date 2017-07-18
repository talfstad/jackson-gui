import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class OverviewOffers extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="page-content">
          <div className="breadcrumbs">
            <h1>Overview Offers</h1>
            <ol className="breadcrumb">
              <li>
                <Link to="/offers/manage">Offers</Link>
              </li>
              <li className="active">Overview</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

export default OverviewOffers;
