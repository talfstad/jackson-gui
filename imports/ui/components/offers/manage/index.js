import React from 'react';
import { Link } from 'react-router-dom';
import ManageOffersTable from './manage-offers-table';

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
                <div className="portlet light bordered">
                  <div className="portlet-title">
                    <div className="caption">
                      <i className="icon-list font-green" />
                      <span className="caption-subject font-green bold uppercase">
                        Offers List
                      </span>
                    </div>
                    <div className="actions">
                      <a className="btn btn-circle btn-icon-only btn-default" href="#fdf">
                        <i className="fa fa-plus" />
                      </a>
                    </div>
                  </div>
                  <ManageOffersTable />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ManageOffers;
