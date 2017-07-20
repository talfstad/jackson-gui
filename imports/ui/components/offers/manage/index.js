import React from 'react';
import { Link } from 'react-router-dom';
import Table from './table';

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
      <div className="page-content-container">
        <div className="page-content-row">
          <div className="page-content-col">
            <div className="row">
              <div className="col-md-12">
                <Table />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ManageOffers;
