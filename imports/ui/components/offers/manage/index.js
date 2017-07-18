import React from 'react';
import { Link } from 'react-router-dom';

const ManageOffers = () => (
  <div className="container-fluid">
    <div className="page-content">
      <div className="breadcrumbs">
        <h1>Manage Offers</h1>
        <ol className="breadcrumb">
          <li>
            <Link to="/offers/manage">Offers</Link>
          </li>
          <li className="active">Manage</li>
        </ol>
      </div>
    </div>
  </div>
);

export default ManageOffers;
